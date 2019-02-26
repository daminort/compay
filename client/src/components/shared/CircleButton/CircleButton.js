import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import { Button } from './CircleButton.style';

class CircleButton extends Component {

  static propTypes = {
    iconName : PropTypes.string.isRequired,
    title    : PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    size     : PropTypes.oneOf(['small', 'medium', 'large']),
  }

  static defaultProps = {
    size: 'small',
  }

  render() {
    const { iconName, title, size, className, ...restProps } = this.props;
    const defClassName = className ? `${size} ${className}` : size;

    return (
      <Popup
        trigger={(
          <Button
            circular
            className={defClassName}
            icon={iconName}
            {...restProps}
          />
        )}
        content={title}
      />
    );
  }
}

export default CircleButton;

//<Popup trigger={<Button icon='add' />} content='Add users to your feed' />
