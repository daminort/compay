import React, { Component } from 'react';
import { Wrapper } from './Footer.style';

import TestButton from '../TestButton';

class Footer extends Component {
  render() {
    return (
      <Wrapper>
        <TestButton />
        <span style={{ marginLeft: 16 }}>© Daminort, 2018. Version: 0.1</span>
      </Wrapper>
    );
  }
}

export default Footer;
