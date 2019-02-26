import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import ServicesListPage from '../../pages/ServicesListPage';
import ServiceEditPage from '../../pages/ServiceEditPage';

class ServiceRoute extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props;
    const { path } = match;

    return (
      <Switch>
        <Route exact path={`${path}/`} component={ServicesListPage} />
        <Route exact path={`${path}/edit/:id`} component={ServiceEditPage} />
      </Switch>
    );
  }
}

export default ServiceRoute;
