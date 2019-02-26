import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { Form, Header } from 'semantic-ui-react';

import Input from '../../../components/FormControls/Input';
import Grid, { Row, Col } from '../../../components/ui/Grid';
import { lang } from '../lang';

class SectionOnline extends Component {

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
    const { online } = ServiceEdit.serviceItem;

    online[dataID] = value;
    ServiceEdit.setServiceData({ online });
  }

  // Renders ------------------------------------------------------------------

  render() {
    const { ServiceEdit } = this.props;
    const { serviceItem } = ServiceEdit;

    const online = serviceItem.online || {};

    return (
      <Row>
        <Col width={16}>
          <Header size="medium" color="blue">{lang.online}</Header>

          <Grid>
            <Row>
              <Col width={8}>
                <Form>
                  <Input
                    dataID="website"
                    label={lang.onlineWebsite}
                    value={online.website}
                    onChange={this.onChangeField}
                  />
                  <Input
                    dataID="login"
                    label={lang.onlineLogin}
                    value={online.login}
                    onChange={this.onChangeField}
                  />
                </Form>
              </Col>

              <Col width={8}>
                <Form>
                  <Input
                    dataID="password"
                    label={lang.onlinePassword}
                    value={online.password}
                    onChange={this.onChangeField}
                  />
                  <Input
                    dataID="email"
                    label={lang.onlineEmail}
                    value={online.email}
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

export default inject('ServiceEdit')(observer(SectionOnline));
