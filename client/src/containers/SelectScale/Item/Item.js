import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, NameHolder } from './Item.style';

class Item extends Component {

  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  }

  render() {
    const { name } = this.props;

    return (
      <Wrapper>
        <NameHolder>{name}</NameHolder>
      </Wrapper>
    );
  }
}

export default Item;
