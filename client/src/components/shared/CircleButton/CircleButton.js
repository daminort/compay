import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import { Edit, Cancel, Undo } from '../../svgIcons';
import { Button } from './CircleButton.style';

const icons = {
  edit     : <Edit size={16} />,
  cancel   : <Cancel size={16} />,
  undo     : <Undo size={16} />,
};

class CircleButton extends Component {

  static propTypes = {
    icon     : PropTypes.oneOf(['edit', 'cancel', 'undo']).isRequired,
    title    : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    size     : PropTypes.oneOf(['small', 'medium', 'large']),
  }

  static defaultProps = {
    size     : 'small',
    title    : '',
  }

  render() {
    const { icon, title, size, className, ...restProps } = this.props;
    const defClassName = className ? `${size} ${className}` : size;

    return (
      <Popup
        trigger={(
          <Button className={defClassName} {...restProps}>
            {icons[icon]}
          </Button>
        )}
        content={title}
      />
    );
  }
}

export default CircleButton;
