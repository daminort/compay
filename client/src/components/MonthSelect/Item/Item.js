import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { months } from './lang';
import { Wrapper } from './Item.style';

class Item extends Component {

  static propTypes = {
    month : PropTypes.number.isRequired,
    year  : PropTypes.number.isRequired,
  }

  render() {
    const { month, year } = this.props;

    return (
      <Wrapper>
        <span>{months[month]}</span>
        <span>{year}</span>
      </Wrapper>
    );
  }
}

export default Item;
