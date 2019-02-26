import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'mobx-react-router';

import AppStore from '../../mobx/AppStore';
import RoutingStore from '../../mobx/RoutingStore';
import NotificationStore from '../../mobx/NotificationStore';
import ServicesListStore from '../../mobx/ServicesListStore';
import ServiceEditStore from '../../mobx/ServiceEditStore';
import ScalesListStore from '../../mobx/ScalesListStore';
import ScaleEditStore from '../../mobx/ScaleEditStore';
import RatesListStore from '../../mobx/RatesListStore';
import RateEditStore from '../../mobx/RateEditStore';
import CalculationsListStore from '../../mobx/CalculationsListStore';
import SettingsStore from '../../mobx/SettingsStore';

import Root from '../Root';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, RoutingStore);

class App extends Component {
  render() {

    return (
      <Provider
        App={AppStore}
        Notification={NotificationStore}
        Routing={RoutingStore}
        ServicesList={ServicesListStore}
        ServiceEdit={ServiceEditStore}
        ScalesList={ScalesListStore}
        ScaleEdit={ScaleEditStore}
        RatesList={RatesListStore}
        RateEdit={RateEditStore}
        CalculationsList={CalculationsListStore}
        Settings={SettingsStore}
      >
        <Router history={history}>
          <Root />
        </Router>
      </Provider>
    );
  }
}

export default App;
