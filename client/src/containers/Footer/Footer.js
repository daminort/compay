import React, { Component } from 'react';
import { Wrapper } from './Footer.style';

class Footer extends Component {
  render() {
    return (
      <Wrapper>
        <span style={{ marginLeft: 16 }}>© Daminort, 2018. Version: 0.1</span>
      </Wrapper>
    );
  }
}

export default Footer;
