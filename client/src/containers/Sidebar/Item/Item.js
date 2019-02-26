import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    collapsed : PropTypes.bool,
  }

  static defaultProps = {
    className : '',
    collapsed : false,
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
    const { icon, name, className, collapsed } = this.props;
    const realClassName = classNames(className, {
      collapsed,
    });

		return (
      <Segment className={realClassName} onClick={this.onClick}>
        <Icon name={icon} />
        {!collapsed && (<span>{name}</span>)}
      </Segment>
		);
	}
}

export default inject('Routing')(observer(Item));
