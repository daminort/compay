import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { Button } from './IconButton.style';

class IconButton extends Component {

  static propTypes = {
    iconName : PropTypes.string.isRequired,
    title    : PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  }

  render() {
    const { iconName, title, ...restProps } = this.props;

    return (
      <Button {...restProps}>
        <Icon name={iconName} />
        {title}
      </Button>
    );
  }
}

export default IconButton;
