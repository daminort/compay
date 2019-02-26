import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ServiceIcon from '../../../components/ServiceIcon';

import { Wrapper, IconHolder, NameHolder } from './Item.style';

class Item extends Component {

  static propTypes = {
    name     : PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    iconName : PropTypes.string,
  }

  static defaultProps = {
    iconName: null,
  }

  render() {
    const { iconName, name } = this.props;
    return (
      <Wrapper>
        {iconName && (
          <IconHolder>
            <ServiceIcon name={iconName} />
          </IconHolder>
        )}
        <NameHolder>{name}</NameHolder>
      </Wrapper>
    );
  }
}

export default Item;
