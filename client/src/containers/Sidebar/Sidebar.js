import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router';

import { SIDEBAR_ICONS } from '../../constants/sidebar';

import Item from './Item';
import { lang } from './lang';
import { Wrapper } from './Sidebar.style';

const urls = {
  dashboard    : '/dashboard',
  services     : '/services',
  rates        : '/rates',
  scales       : '/scales',
  calculations : '/calculations',
  reports      : '/reports',
  settings     : '/settings',
};

class Sidebar extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.defineClassNames = this.defineClassNames.bind(this);
  }

  defineClassNames() {
    const { location } = this.props;
    const { pathname } = location;

    const isDashboard    = pathname.includes('/dashboard');
    const isServices     = pathname.includes('/services');
    const isRates        = pathname.includes('/rates');
    const isScales       = pathname.includes('/scales');
    const isCalculations = pathname.includes('/calculations');
    const isReports      = pathname.includes('/reports');
    const isSettings     = pathname.includes('/settings');

    return {
      dashboard    : classNames({ active: isDashboard }),
      services     : classNames({ active: isServices }),
      rates        : classNames({ active: isRates }),
      scales       : classNames({ active: isScales }),
      calculations : classNames({ active: isCalculations }),
      reports      : classNames({ active: isReports }),
      settings     : classNames({ active: isSettings }),
    };
  }

	render() {
    const classes = this.defineClassNames();

		return (
			<Wrapper>
        <Item
          icon={SIDEBAR_ICONS.dahboard}
          name={lang.dahboard}
          className={classes.dashboard}
          url={urls.dashboard}
        />
        <Item
          icon={SIDEBAR_ICONS.services}
          name={lang.services}
          className={classes.services}
          url={urls.services}
        />
        <Item
          icon={SIDEBAR_ICONS.rates}
          name={lang.rates}
          className={classes.rates}
          url={urls.rates}
        />
        <Item
          icon={SIDEBAR_ICONS.scales}
          name={lang.scales}
          className={classes.scales}
          url={urls.scales}
        />
        <Item
          icon={SIDEBAR_ICONS.calculations}
          name={lang.calculations}
          className={classes.calculations}
          url={urls.calculations}
        />
        <Item
          icon={SIDEBAR_ICONS.reports}
          name={lang.reports}
          className={classes.reports}
          url={urls.reports}
        />
        <Item
          icon={SIDEBAR_ICONS.settings}
          name={lang.settings}
          className={classes.settings}
          url={urls.settings}
        />
			</Wrapper>
		);
	}
}

export default withRouter(Sidebar);
