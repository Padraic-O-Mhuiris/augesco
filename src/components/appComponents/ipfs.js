import React, { Component } from "react";
import { Row, Col, Input, Icon, Button } from "antd";
import { inject, observer } from "mobx-react";

@inject("augesco")
@observer
class Ipfs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: ""
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
      console.log(this.state);
    };
  }

  async uploadToIpfs(file, fileList) {
    console.log(file, fileList);
  }

  async componentDidMount() {
    const { augesco } = this.props;
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
