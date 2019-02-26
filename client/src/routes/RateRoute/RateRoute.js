import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import RatesListPage from '../../pages/RatesListPage';
import RateEditPage from '../../pages/RateEditPage';

class RateRoute extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props;
    const { path } = match;

    return (
      <Switch>
        <Route exact path={`${path}/`} component={RatesListPage} />
        <Route exact path={`${path}/edit/:id`} component={RateEditPage} />
        <Route exact path={`${path}/create`} component={RateEditPage} />
      </Switch>
    );
  }
}

export default RateRoute;
