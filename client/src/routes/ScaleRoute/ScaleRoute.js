import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import ScalesListPage from '../../pages/ScalesListPage';
import ScaleEditPage from '../../pages/ScaleEditPage';

class ScaleRoute extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props;
    const { path } = match;

    return (
      <Switch>
        <Route exact path={`${path}/`} component={ScalesListPage} />
        <Route exact path={`${path}/edit/:id`} component={ScaleEditPage} />
        <Route exact path={`${path}/create`} component={ScaleEditPage} />
      </Switch>
    );
  }
}

export default ScaleRoute;
