import React, { Component } from "react";
import { Row, Col, Input, Icon, Button } from "antd";
import { inject, observer } from "mobx-react";

@inject("augesco")
@observer
class Ipfs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: []
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
