import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { find } from 'lodash';

import FormControl from '../../../components/FormControls/FormControl';
import RangeTable from '../../../components/RangeTable';
import Grid, { Row, Col } from '../../../components/ui/Grid';

import { RANGE_TABLE_MODE } from '../../../constants/componentsUI';

import SelectScale from '../../SelectScale';
import BoxSimleRate from '../BoxSimleRate';

import { lang } from '../lang';
import { RangesWrapper } from './BoxScale.style';

class BoxScale extends Component {

  static propTypes = {
    RateEdit   : PropTypesMobX.observableObject.isRequired,
    ScalesList : PropTypesMobX.observableObject.isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
      range   : PropTypes.number,
      message : PropTypes.string.isRequired,
    })),
  }

  static defaultProps = {
    errors: [],
  }

  constructor(props) {
    super(props);
    this.createRanges      = this.createRanges.bind(this);
    this.onChangeBaseField = this.onChangeBaseField.bind(this);
    this.onChangeRanges    = this.onChangeRanges.bind(this);
  }

  // Service ------------------------------------------------------------------
  createRanges() {
    const { RateEdit, ScalesList } = this.props;
    const { rateItem, rateItemRanges } = RateEdit;
    const { scaleID } = rateItem;

    const scale = find(ScalesList.list, { id: scaleID });
    if (!scale) {
      return [];
    }

    const ranges = scale.range.map((scaleRangeItem, index) => {

      const rateRangeItem = rateItemRanges[index] || { rate: 0 };
      const rangeID       = `range-${index}`;

      return {
        id         : rangeID,
        range      : index + 1,
        counterMin : scaleRangeItem.counterMin,
        counterMax : scaleRangeItem.counterMax,
        rate       : rateRangeItem.rate,
      };
    });

    return ranges;
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
    const firstRate = ranges[0].rate;

    RateEdit.setRateRanges(ranges);
    RateEdit.setRateData({
      rate: firstRate,
    });
  }

  // Renders ------------------------------------------------------------------
  render() {
    const { RateEdit, errors } = this.props;
    const { rateItem } = RateEdit;
    const { serviceID, scaleID } = rateItem;

    const ranges = this.createRanges();

    return (
      <Fragment>
        <FormControl label={lang.scale}>
          <SelectScale
            dataID="scaleID"
            value={scaleID}
            serviceID={serviceID}
            onChange={this.onChangeBaseField}
          />
        </FormControl>
        <BoxSimleRate disabled />
        <RangesWrapper>
          <Grid>
            <Row>
              <Col width={16}>
                <RangeTable
                  mode={RANGE_TABLE_MODE.rate}
                  dataSource={ranges}
                  errors={errors}
                  onChange={this.onChangeRanges}
                />
              </Col>
            </Row>
          </Grid>
        </RangesWrapper>
      </Fragment>
    );
  }
}

export default inject('RateEdit', 'ScalesList')(observer(BoxScale));
