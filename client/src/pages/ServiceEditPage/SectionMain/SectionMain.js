import React, { Component, Fragment } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { Form, Header, TextArea } from 'semantic-ui-react';

import ServiceIcon from '../../../components/ServiceIcon';
import Input from '../../../components/FormControls/Input';
import { Row, Col } from '../../../components/ui/Grid';

import { lang } from '../lang';
import { IconHolder } from './SectionMain.style';

class SectionMain extends Component {

  static propTypes = {
    ServiceEdit : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
  }

  // Events -------------------------------------------------------------------

  onChangeField({ value, dataID }) {
    const { ServiceEdit } = this.props;

    ServiceEdit.setServiceData({
      [dataID]: value,
    });
  }

  // Renders ------------------------------------------------------------------

  render() {
    const { ServiceEdit } = this.props;
    const { serviceItem } = ServiceEdit;

    const status = serviceItem.deleted ? lang.unused : lang.active;

    return (
      <Fragment>
        <Row>
          <Col width={2}>
            <IconHolder>
              <ServiceIcon name={serviceItem.icon} size="giant" />
            </IconHolder>
          </Col>
          <Col width={14}>
            <Form>
              <Input
                readOnly
                label={lang.status}
                value={status}
              />
              <Input
                dataID="name"
                label={lang.name}
                value={serviceItem.name}
                onChange={this.onChangeField}
              />
              <Input
                dataID="personalAccount"
                label={lang.personalAccount}
                value={serviceItem.personalAccount}
                onChange={this.onChangeField}
              />
            </Form>
          </Col>
        </Row>

        <Row>
          <Col width={16}>
            <Header size="medium" color="blue">{lang.info}</Header>
            <Form>
              <TextArea
                autoHeight
                rows={1}
                value={serviceItem.info}
                onChange={(event, data) => this.onChangeField({ value: data.value, dataID: 'info' })}
              />
            </Form>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default inject('ServiceEdit')(observer(SectionMain));
