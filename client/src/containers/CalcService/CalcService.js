import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '../../components/ui/Icon';
import Accordion, { AccordionTitle, AccordionContent } from '../../components/ui/Accordion';
import { CALCULATION_METHOD } from '../../constants/calculationMethods';

import CardManual from '../CalculationCards/CardManual';
import CardFixSum from '../CalculationCards/CardFixSum';
import CardFormula from '../CalculationCards/CardFormula';
import CardCounter from '../CalculationCards/CardCounter';
import CardCounterScale from '../CalculationCards/CardCounterScale';

import { Wrapper, Content } from './CalcService.style';

class CalcService extends Component {

  static propTypes = {
    calculation : PropTypes.object.isRequired,
    title       : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  }

  static defaultProps = {
    title: '',
  }

  constructor(props) {
    super(props);
    this.onClick       = this.onClick.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.state = { activeIndex: 0 };
  }

  onClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? 0 : index;

    this.setState({ activeIndex: newIndex });
  }

  renderContent() {
    const { calculation } = this.props;
    const { rate } = calculation;
    const { methodID } = rate;

    switch (methodID) {
      case CALCULATION_METHOD.manual: {
        return (
          <CardManual calculation={calculation} />
        );
      }
      case CALCULATION_METHOD.fixSum: {
        return (
          <CardFixSum calculation={calculation} />
        );
      }
      case CALCULATION_METHOD.formula: {
        return (
          <CardFormula calculation={calculation} />
        );
      }
      case CALCULATION_METHOD.counter: {
        return (
          <CardCounter calculation={calculation} />
        );
      }
      case CALCULATION_METHOD.counterScale: {
        return (
          <CardCounterScale calculation={calculation} />
        );
      }
      default: {
        return (
          'Unknown Calculation method...'
        );
      }
    }
  }

  render() {
    const { title } = this.props;
    const { activeIndex } = this.state;
    const isActive = (activeIndex === 1);
    const titleClass = classnames({
      active: isActive,
    });

    const content = this.renderContent();

    return (
      <Wrapper>
      <Accordion>
        <AccordionTitle active={isActive} index={1} onClick={this.onClick}>
          <Icon name="dropdown" />
          <span className={titleClass}>{title}</span>
        </AccordionTitle>
        <AccordionContent active={isActive}>
          <Content>
            {content}
          </Content>
        </AccordionContent>
      </Accordion>
      </Wrapper>
    );
  }
}

export default CalcService;
