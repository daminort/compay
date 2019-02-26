import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import MainContainer from '../../containers/MainContainer';
import SelectService from '../../containers/SelectService';
import SelectMethod from '../../containers/SelectMethod';
import MonthSelect from '../../components/MonthSelect';
import Errors from '../../components/Errors';
import FormControl from '../../components/FormControls/FormControl';
import Grid, { Row, Col } from '../../components/ui/Grid';

import RateFactory from '../../api/factories/RateFactory';
import Formatter from '../../helpers/Formatter';
import { CALCULATION_METHOD } from '../../constants/calculationMethods';

import ToolBar from '../../containers/Toolbars/RateEdit';
import BoxSimleRate from '../../containers/RateBoxes/BoxSimleRate';
import BoxFormula from '../../containers/RateBoxes/BoxFormula';
import BoxScale from '../../containers/RateBoxes/BoxScale';

import { lang } from './lang';

class RateEditPage extends Component {

  static propTypes = {
    RateEdit     : PropTypesMobX.observableObject.isRequired,
    ServicesList : PropTypesMobX.observableObject.isRequired,
    ScalesList   : PropTypesMobX.observableObject.isRequired,
    match        : PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { id } = props.match.params;

    this.onChangeBaseField = this.onChangeBaseField.bind(this);
    this.onChangeRanges    = this.onChangeRanges.bind(this);

    this.state = {
      editMode: Boolean(id),
    };
  }

  componentWillMount() {
    const { RateEdit, ServicesList, ScalesList, match } = this.props;
    const { editMode } = this.state;
    const { id } = match.params;

    if (editMode) {
      RateEdit.reloadRateData(id);

    } else {
      const newRate = RateFactory.createEmptyRate();
      RateEdit.setRateData(newRate);
      RateEdit.setRateID(null);
      RateEdit.setRateRanges(newRate.ranges);
			RateEdit.clearErrors();
    }

    if (!ServicesList.isList) {
      ServicesList.reloadList();
    }
    if (!ScalesList.isList) {
      ScalesList.reloadList();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    const { editMode } = this.state;
    if (!editMode && Boolean(id)) {
      this.setState({ editMode: true });
    }
  }

  // Events -------------------------------------------------------------------
  onChangeBaseField({ value, dataID }) {
    const { RateEdit } = this.props;
    RateEdit.setRateData({
      [dataID]: value,
    });
  }

  onChangeRanges(ranges) {
    const { RateEdit } = this.props;
    RateEdit.setRateRanges(ranges);
  }

  // Renders ------------------------------------------------------------------
  render() {
    const { RateEdit } = this.props;
    const { rateItem, errors } = RateEdit;
    const { serviceID, methodID, startDate } = rateItem;

    const showBoxFixSum  = (methodID === CALCULATION_METHOD.fixSum);
    const showBoxCounter = (methodID === CALCULATION_METHOD.counter);
    const showBoxFormula = (methodID === CALCULATION_METHOD.formula);
    const showBoxScale   = (methodID === CALCULATION_METHOD.counterScale);

    const maxMonthValue = Formatter.startMonth(moment().add(12, 'month'));

    return (
      <MainContainer>
          <ToolBar />
          <Grid>
            <Row>
              <Col width={16}>
                <FormControl label={lang.startFrom}>
                  <MonthSelect
                    dataID="startDate"
                    value={startDate}
                    maxValue={maxMonthValue}
                    onChange={this.onChangeBaseField}
                  />
                </FormControl>
                <FormControl label={lang.service}>
                  <SelectService
                    dataID="serviceID"
                    value={serviceID}
                    onChange={this.onChangeBaseField}
                  />
                </FormControl>
                <FormControl label={lang.method}>
                  <SelectMethod
                    dataID="methodID"
                    value={methodID}
                    onChange={this.onChangeBaseField}
                  />
                </FormControl>

                {showBoxFixSum && (<BoxSimleRate errors={errors} />)}
                {showBoxCounter && (<BoxSimleRate errors={errors} />)}
                {showBoxFormula && (<BoxFormula errors={errors} />)}
                {showBoxScale && (<BoxScale errors={errors} />)}

              </Col>
            </Row>
            <Row>
              <Col width={16}>
                <Errors errors={errors} />
              </Col>
            </Row>
          </Grid>
      </MainContainer>
    );
  }
}

export default inject('RateEdit', 'ServicesList', 'ScalesList')(observer(RateEditPage));
