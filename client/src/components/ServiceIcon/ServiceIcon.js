import React, { Component } from 'react';
import PropTypes from 'prop-types';

import electric from '../../images/electric.svg';
import garage from '../../images/garage.svg';
import garbage from '../../images/garbage.svg';
import gas from '../../images/gas.svg';
import home from '../../images/home.svg';
import hot from '../../images/hot.svg';
import internet from '../../images/internet.svg';
import tv from '../../images/tv.svg';
import water from '../../images/water.svg';
import noIcon from '../../images/noIcon.svg';

import { Wrapper, Image } from './ServiceIcon.style';

const icons = {
  electric,
  garage,
  garbage,
  gas,
  home,
  hot,
  internet,
  tv,
  water,
  noIcon,
};

const sizes = {
  tiny   : 16,
  small  : 20,
  medium : 24,
  large  : 32,
  huge   : 40,
  giant  : 64,
};

class ServiceIcon extends Component {

  static propTypes = {
    name      : PropTypes.string,
    size      : PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'huge', 'giant']),
    title     : PropTypes.string,
    centered  : PropTypes.bool,
    className : PropTypes.string,
  }

  static defaultProps = {
    name      : 'noIcon',
    size      : 'small',
    title     : 'Service Icon',
    centered  : true,
    className : '',
  }

  render() {
    const { name, size, title, centered, className } = this.props;

    const realSize = sizes[size];
    const iconSrc = icons[name] || icons.noIcon;

    return (
      <Wrapper size={realSize} centered={centered} className={className}>
        <Image src={iconSrc} alt={title} />
      </Wrapper>
    );
  }
}

export default ServiceIcon;
