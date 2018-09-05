import React, { Component } from "react";
import { Row, Col, Input, Icon, Button } from "antd";
import { inject, observer } from "mobx-react";
const Buffer = require('buffer/').Buffer

@inject("augesco")
@observer
class Ipfs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      buffer: {},
      ipfsUrl: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });

      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        this.setState({
          buffer: Buffer.from(reader.result)
        });
      };
    };
  }

  async uploadToIpfs() {
    const { augesco } = this.props;

    augesco.ipfs.add([this.state.buffer], function(err, res) {
      console.log(err, res);
    });
  }

  async componentDidMount() {
    const { augesco } = this.props;
    const file = await augesco.ipfs.get(
      "QmRWZbpMspDdRV9tBKtVd61BD6TR6Hcqh3M2AY71mXQdhs"
    );
    console.log(file);
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={6} style={{ textAlign: "center" }}>
            <Input
              onChange={e => this.handleImageChange(e)}
              id="fileupload"
              accept="image/*"
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
          <Col span={18} />
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
