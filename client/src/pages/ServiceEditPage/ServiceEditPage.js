import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { Grid } from 'semantic-ui-react';

import MainContainer from '../../containers/MainContainer';
import ToolBar from '../../containers/Toolbars/ServiceEdit';

import SectionMain from './SectionMain';
import SectionPayment from './SectionPayment';
import SectionContacts from './SectionContacts';
import SectionOnline from './SectionOnline';

import { Wrapper } from './ServiceEditPage.style';

class ServiceEditPage extends Component {

  static propTypes = {
    ServiceEdit : PropTypesMobX.observableObject.isRequired,
    match       : PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onChangeBaseField = this.onChangeBaseField.bind(this);
  }

  componentDidMount() {
    const { ServiceEdit, match } = this.props;
    const { id } = match.params;

    ServiceEdit.reloadServiceData(id);
  }

  // Events -------------------------------------------------------------------

  onChangeBaseField({ value, dataID }) {
    const { ServiceEdit } = this.props;

    ServiceEdit.setServiceData({
      [dataID]: value,
    });
  }

  // Renders ------------------------------------------------------------------

  render() {

    return (
      <MainContainer>
        <Wrapper>
          <ToolBar />
          <Grid>
            <SectionMain />
            <SectionPayment />
            <SectionContacts />
            <SectionOnline />
          </Grid>
        </Wrapper>
      </MainContainer>
    );
  }
}

export default inject('ServiceEdit')(observer(ServiceEditPage));
