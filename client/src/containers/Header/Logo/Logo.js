import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { Icon } from 'semantic-ui-react';

import { Wrapper } from './Logo.style';

class Logo extends Component {

	static propTypes = {
		App: PropTypesMobX.observableObject.isRequired,
	}

	constructor(props) {
		super(props);
		this.onToggleSidebar = this.onToggleSidebar.bind(this);
	}

	onToggleSidebar() {
    const { App } = this.props;
    App.toggleSidebar();
	}

	render() {
		const { App } = this.props;
		const { sidebarCollapsed } = App;

		if (sidebarCollapsed) {
			return (
				<Wrapper onClick={this.onToggleSidebar}>
					<Icon name="bars" />
				</Wrapper>
			);
		}

		return (
      <Wrapper onClick={this.onToggleSidebar}>
        COMPAY
      </Wrapper>
		);
	}
}

export default inject('App')(observer(Logo));
