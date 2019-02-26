import React, { Component } from 'react';
import classNames from 'classnames';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import PageHeader from '../../components/PageHeader';

import LangSwitcher from '../LangSwitcher';
import { settings } from './settings';
import Logo from './Logo';

import { Wrapper, LogoHolder, HeaderHolder } from './Header.style';

class Header extends Component {

  static propTypes = {
    App     : PropTypesMobX.observableObject.isRequired,
    Routing : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.detectRoute = this.detectRoute.bind(this);
  }

  detectRoute() {
    const { Routing } = this.props;
    const { location } = Routing;
    const { pathname } = location;

    if (pathname.includes('services/edit')) {
      return settings.serviceEdit;
    }

    if (pathname.includes('services')) {
      return settings.servicesList;
    }

    if (pathname.includes('scales/edit')) {
      return settings.scaleEdit;
    }

    if (pathname.includes('scales/create')) {
      return settings.scaleCreate;
    }

    if (pathname.includes('scales')) {
      return settings.scalesList;
    }

    if (pathname.includes('rates/edit')) {
      return settings.rateEdit;
    }

    if (pathname.includes('rates/create')) {
      return settings.rateCreate;
    }

    if (pathname.includes('rates')) {
      return settings.ratesList;
    }

    if (pathname.includes('calculations')) {
      return settings.calculations;
    }

    if (pathname.includes('reports')) {
      return settings.reports;
    }

    if (pathname.includes('settings')) {
      return settings.settings;
    }

    return {
      title    : '',
      iconName : '',
    };
  }

  render() {
    const { App } = this.props;
    const { sidebarCollapsed } = App;

    const route = this.detectRoute();
    const logoClassName = classNames({
      collapsed : sidebarCollapsed,
      normal    : !sidebarCollapsed,
    });
    const headerClassName = classNames({
      expanded : sidebarCollapsed,
      normal   : !sidebarCollapsed,
    });

    return (
      <Wrapper>
        <LogoHolder className={logoClassName}>
          <Logo />
        </LogoHolder>
        <HeaderHolder className={headerClassName}>
          <PageHeader {...route} />
          <LangSwitcher />
        </HeaderHolder>
      </Wrapper>
    );
  }
}

export default inject('App', 'Routing')(observer(Header));
