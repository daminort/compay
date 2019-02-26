import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import Icon from '../../components/ui/Icon';
import Accordion, { AccordionTitle, AccordionContent } from '../../components/ui/Accordion';
import Grid, { Row, Col } from '../../components/ui/Grid';

import MainContainer from '../../containers/MainContainer';
import ResetDatabase from '../../containers/DatabaseOperations/ResetDatabase';
import BackupDatabase from '../../containers/DatabaseOperations/BackupDatabase';
import RestoreDatabase from '../../containers/DatabaseOperations/RestoreDatabase';
import ServiceOrder from '../../containers/ServiceOrder';

import { lang } from './lang';

class SettingsPage extends Component {

  constructor(props) {
    super(props);
    this.onClickPanel = this.onClickPanel.bind(this);

    this.state = {
      activeIndex: 1,
    };
  }

  // Events -------------------------------------------------------------------

  onClickPanel(event, { index }) {
    const { activeIndex } = this.state;
    const newIndex = (activeIndex === index) ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  // Renders ------------------------------------------------------------------

  render() {
    const { activeIndex } = this.state;
    const isDatabaseActive = (activeIndex === 1);
    const isServicesActive = (activeIndex === 2);

    return (
      <MainContainer>
        <Accordion fluid styled>

          <AccordionTitle active={isServicesActive} index={2} onClick={this.onClickPanel}>
            <Icon name="dropdown" />
            {lang.servicesOrder}
          </AccordionTitle>
          <AccordionContent active={isServicesActive}>
            <ServiceOrder />
          </AccordionContent>

          <AccordionTitle active={isDatabaseActive} index={1} onClick={this.onClickPanel}>
            <Icon name="dropdown" />
            {lang.dataBaseOperations}
          </AccordionTitle>
          <AccordionContent active={isDatabaseActive}>
            <Grid>
              <Row>
                <Col width={8}>
                  <Header size="small" color="violet">{lang.storeDatabase}</Header>
                  <BackupDatabase />
                </Col>
                <Col width={8}>
                  <Header size="small" color="violet">{lang.restoreDatabase}</Header>
                  <RestoreDatabase />
                </Col>
              </Row>
              <Row>
                <Col width={8}>
                  <Header size="small" color="orange">{lang.removeMarkedDocs}</Header>
                </Col>
                <Col width={8}>
                  <Header size="small" color="red">{lang.resetDatabase}</Header>
                  <ResetDatabase />
                </Col>
              </Row>
            </Grid>
          </AccordionContent>

        </Accordion>
      </MainContainer>
    );
  }
}

export default SettingsPage;
