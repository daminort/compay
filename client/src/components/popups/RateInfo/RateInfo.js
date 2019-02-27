import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import Formatter from '../../../helpers/Formatter';
import withTheme from '../../../themes/withTheme';
import { maxCounterValue } from '../../../config';
import { CALCULATION_METHOD } from '../../../constants/calculationMethods';
import { Info as InfoIcon } from '../../svgIcons';

import { titles, infos } from './lang';
import { Wrapper, Title, Info, IconHolder, DetailsHolder } from './RateInfo.style';

class RateInfo extends Component {

  static propTypes = {
    methodID: PropTypes.number.isRequired,
    rateData: PropTypes.object.isRequired,
    theme   : PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }

  renderContent() {
    const { methodID } = this.props;
    const details = this.renderDetails();

    return (
      <Wrapper>
        <Title>{titles[methodID]}</Title>
        <Info>{infos[methodID]}</Info>
        <DetailsHolder>
          {details}
        </DetailsHolder>
      </Wrapper>
    );
  }

  renderDetails() {
    const { methodID, rateData } = this.props;

    switch (methodID) {
      case CALCULATION_METHOD.formula: {
        const arg  = Formatter.sum(rateData.argument);
        const rate = Formatter.sum(rateData.rate);

        return (
          <Fragment>
            <div>{rateData.formulaName}</div>
            <div>{`${arg} x ${rate}`}</div>
          </Fragment>
        );
      }
      case CALCULATION_METHOD.counterScale: {

        const ranges = rateData.ranges.map((range, index) => {

          const rowKey = index + 1;
          const min    = range.counterMin;
          const max    = (range.counterMax === maxCounterValue) ? '..' : range.counterMax;
          const rate   = Formatter.sum(range.rate);

          return (
            <div key={rowKey}>{`${min} / ${max}: ${rate}`}</div>
          );
        });

        return (
          <Fragment>
            {ranges}
          </Fragment>
        );
      }
      default:
        return null;
    }
  }

  render() {
    const { theme } = this.props;

    const popupContent = this.renderContent();
    const trigger = (
      <IconHolder>
        <InfoIcon
          size={18}
          color={theme.common.info}
        />
      </IconHolder>
    );

    return (
      <Popup
        wide
        trigger={trigger}
        content={popupContent}
        on="hover"
      />
    );
  }
}

export default withTheme(RateInfo);
