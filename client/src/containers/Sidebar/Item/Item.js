import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { Icon } from 'semantic-ui-react';
import { Segment } from './Item.style';

class Item extends Component {

  static propTypes = {
    Routing   : PropTypesMobX.observableObject.isRequired,
    url       : PropTypes.string.isRequired,
    icon      : PropTypes.string.isRequired,
    name      : PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    className : PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { Routing, url } = this.props;
    const { push } = Routing;

    push(url);
  }

	render() {
    const { icon, name, className } = this.props;

		return (
      <Segment className={className} onClick={this.onClick}>
        <Icon name={icon} />
        <span>{name}</span>
      </Segment>
		);
	}
}

export default inject('Routing')(observer(Item));
