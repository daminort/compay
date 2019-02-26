import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import SettingsPage from '../../pages/SettingsPage';

class SettingsRoute extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props;
    const { path } = match;

    return (
      <Switch>
        <Route exact path={`${path}/`} component={SettingsPage} />
      </Switch>
    );
  }
}

export default SettingsRoute;
