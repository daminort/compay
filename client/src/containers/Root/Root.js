import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { withRouter } from 'react-router';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Notificator from '../Notificator';
import MainRouter from '../../routes/Main';
import AppLoader from '../../components/shared/AppLoader';

import { SegmentGroup, Content, ContentContainer } from './Root.style';

class Root extends Component {

  static propTypes = {
    App      : PropTypesMobX.observableObject.isRequired,
    Settings : PropTypesMobX.observableObject.isRequired,
  }

  componentDidMount() {
    const { Settings } = this.props;
    Settings.loadServiceOrder();
  }

  render() {
    const { App } = this.props;
    const { sidebarCollapsed } = App;

    const contentClassName = classNames({
      expanded : sidebarCollapsed,
      normal   : !sidebarCollapsed,
    });

    return (
      <Fragment>
        <Header />
        <SegmentGroup horizontal>
          <Sidebar />
          <Content className={contentClassName}>
            <ContentContainer>
              <MainRouter />
            </ContentContainer>
            <Footer />
          </Content>
          <AppLoader visible={App.loading} />
        </SegmentGroup>
        <Notificator />
      </Fragment>
    );
  }
}

export default withRouter( inject('App', 'Settings')(observer(Root)) );
