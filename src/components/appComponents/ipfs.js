import React, { Component } from "react";
import { Row, Col, notification, Input, Icon, Button, Card } from "antd";
import { inject, observer } from "mobx-react";

@inject("augesco")
@observer
class Ipfs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      hash: "",
      ipfsUrl: "",
      ipfsFilename: "",
      ipfsMime: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  async uploadToIpfs() {
    const { augesco } = this.props;

    try {
      const uploadReceipt = await augesco.upload(this.state.file);
      augesco.exec("Ipfs", "setHash", [uploadReceipt[0].hash], {
        from: augesco.account
      });
    } catch (error) {
      console.error(error);
    }
  }

  async downloadFromIpfs() {
    const { augesco } = this.props;

    const hash = await augesco.call("Ipfs", "getHash", []);
    console.log(hash);
    if (hash) {
      const data = await augesco.download(hash);

      console.log(data);
      this.setState({
        hash: hash,
        ipfsUrl: data.data,
        ipfsFilename: data.name,
        ipfsMime: data.mime
      });
    }
  }

  async componentDidMount() {
    const { augesco } = this.props;

    this.downloadFromIpfs();

    augesco.listen("Ipfs", "NewHash", {}, (err, event) => {
      this.downloadFromIpfs();

      notification.open({
        key: "event-increment",
        message: event.event,
        description: "Contract event fired : New IPFS file",
        duration: 5,
        placement: "bottomLeft",
        icon: <Icon type="file" style={{ color: "green" }} />
      });
    });
  }

  render() {
    return (
      <div>
        <br />
        <br />

        <Row>
          <Col span={3} />
          <Col span={18} style={{ textAlign: "center" }}>
            <Card
              title={this.state.ipfsFilename + " - " + this.state.hash}
              bordered={true}
              hoverable={true}
              extra={
                <div>
                  <Input
                    onChange={e => this.handleImageChange(e)}
                    id="fileupload"
                    type="file"
                    size="large"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <Button
                    onClick={() => {
                      document.getElementById("fileupload").click();
                    }}
                    type="primary"
                    icon="upload"
                    size="large"
                  >
                    Choose File
                  </Button>
                </div>
              }
            >
              <img alt="ipfs" src={this.state.ipfsUrl} />
            </Card>
          </Col>
          <Col span={3} />
        </Row>
      </div>
    );
  }
}

export default Ipfs;
