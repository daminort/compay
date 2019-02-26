import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { Form, Header } from 'semantic-ui-react';

import Input from '../../../components/FormControls/Input';
import Grid, { Row, Col } from '../../../components/ui/Grid';
import { lang } from '../lang';

class SectionContacts extends Component {

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
    const { contacts } = ServiceEdit.serviceItem;

    contacts[dataID] = value;
    ServiceEdit.setServiceData({ contacts });
  }

  // Renders ------------------------------------------------------------------

  render() {
    const { ServiceEdit } = this.props;
    const { serviceItem } = ServiceEdit;

    const contacts = serviceItem.contacts || {};

    return (
      <Row>
        <Col width={16}>
          <Header size="medium" color="blue">{lang.contacts}</Header>

          <Grid>
            <Row>
              <Col width={8}>
                <Form>
                  <Input
                    dataID="address"
                    label={lang.contactsAddress}
                    value={contacts.address}
                    onChange={this.onChangeField}
                  />
                </Form>
              </Col>
              <Col width={8}>
                <Form>
                  <Input
                    dataID="phone"
                    label={lang.contactsPhone}
                    value={contacts.phone}
                    onChange={this.onChangeField}
                  />
                </Form>
              </Col>
            </Row>
          </Grid>
        </Col>
      </Row>
    );
  }
}

export default inject('ServiceEdit')(observer(SectionContacts));
