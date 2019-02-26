import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import CalculationsListPage from '../../pages/CalculationsListPage';

class CalculationRoute extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props;
    const { path } = match;

    return (
      <Switch>
        <Route exact path={`${path}/`} component={CalculationsListPage} />
      </Switch>
    );
  }
}

export default CalculationRoute;
