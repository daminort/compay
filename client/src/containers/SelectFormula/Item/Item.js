import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Intl from '../../../languages';
import { Wrapper, NameHolder } from './Item.style';

class Item extends Component {

  static propTypes = {
    intlID: PropTypes.string.isRequired,
  }

  render() {
    const { intlID } = this.props;

    return (
      <Wrapper>
        <NameHolder><Intl id={intlID} /></NameHolder>
      </Wrapper>
    );
  }
}

export default Item;
