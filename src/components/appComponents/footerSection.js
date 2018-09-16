import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class FooterSection extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Augesco - sirromDev
      </Footer>
    );
  }
}

export default FooterSection;
