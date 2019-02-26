import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { Form, Header } from 'semantic-ui-react';

import Input from '../../../components/FormControls/Input';
import Grid, { Row, Col } from '../../../components/ui/Grid';
import { lang } from '../lang';

class SectionPayment extends Component {

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
    const { account } = ServiceEdit.serviceItem;

    account[dataID] = value;
    ServiceEdit.setServiceData({ account });
  }

  // Renders ------------------------------------------------------------------

  render() {
    const { ServiceEdit } = this.props;
    const { serviceItem } = ServiceEdit;

    const account = serviceItem.account || {};

    return (
      <Row>
        <Col width={16}>
          <Header size="medium" color="blue">{lang.account}</Header>

          <Grid>
            <Row>
              <Col width={8}>
                <Form>
                  <Input
                    dataID="number"
                    label={lang.accountNumber}
                    value={account.number}
                    onChange={this.onChangeField}
                  />
                  <Input
                    dataID="bank"
                    label={lang.accountBank}
                    value={account.bank}
                    onChange={this.onChangeField}
                  />
                </Form>
              </Col>

              <Col width={8}>
                <Form>
                  <Input
                    dataID="mfo"
                    label={lang.accountMFO}
                    value={account.mfo}
                    onChange={this.onChangeField}
                  />
                  <Input
                    dataID="okpo"
                    label={lang.accountOKPO}
                    value={account.okpo}
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

export default inject('ServiceEdit')(observer(SectionPayment));
