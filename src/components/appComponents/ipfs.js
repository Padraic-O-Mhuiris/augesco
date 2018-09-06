import React, { Component } from "react";
import { Row, Col, notification, Input, Icon, Button } from "antd";
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
        <Row>
          <Col span={6} style={{ textAlign: "center" }}>
            <Input
              onChange={e => this.handleImageChange(e)}
              id="fileupload"
              type="file"
              size="large"
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
            &nbsp;&nbsp;
            {this.state.file.name}
            <br />
            <br />
            {this.state.imagePreviewUrl && (
              <div>
                <img
                  alt="preview"
                  src={this.state.imagePreviewUrl}
                  style={{ height: "200px", width: "200px" }}
                />
                <br />
                <br />
                <Button
                  onClick={() => {
                    this.uploadToIpfs();
                  }}
                  type="primary"
                  icon="upload"
                  size="large"
                >
                  Upload To Ipfs
                </Button>
              </div>
            )}
          </Col>
          <Col span={18}>
            {this.state.ipfsUrl && (
              <div>
                <h3>
                  {this.state.ipfsFilename} - {this.state.hash}
                </h3>
                <img alt="ipfs" src={this.state.ipfsUrl} />
              </div>
            )}
          </Col>
        </Row>
        <br />
        <br />

        <Row>
          <Col span={8} />
          <Col span={8} style={{ textAlign: "center" }} />
          <Col span={8} />
        </Row>
      </div>
    );
  }
}

export default Ipfs;
