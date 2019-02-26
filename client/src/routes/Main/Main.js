import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ServiceRoute from '../ServiceRoute';
import ScaleRoute from '../ScaleRoute';
import RateRoute from '../RateRoute';
import CalculationRoute from '../CalculationRoute';
import SettingsRoute from '../SettingsRoute';

import Dahsboard from '../../pages/Dahsboard';

class Main extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ServiceRoute} />
        <Route exact path="/dashboard" component={Dahsboard} />
        <Route path="/services" component={ServiceRoute} />
        <Route path="/scales" component={ScaleRoute} />
        <Route path="/rates" component={RateRoute} />
        <Route path="/calculations" component={CalculationRoute} />
        <Route path="/settings" component={SettingsRoute} />
      </Switch>
    );
  }
}

export default Main;
