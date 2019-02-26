import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Grid, { Row, Col } from '../../../components/ui/Grid';
import Button from '../../../components/ui/Button';
import InputFile from '../../../components/ui/InputFile';
import ProcessListIndicator from '../../../components/ProcessListIndicator';

import { Wrapper, Title } from './RestoreDatabase.style';
import { lang } from './lang';

class RestoreDatabase extends Component {

  static propTypes = {
    Settings : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.createDataSource = this.createDataSource.bind(this);
    this.onClickRestore   = this.onClickRestore.bind(this);
    this.onChangeFile     = this.onChangeFile.bind(this);
  }

  createDataSource() {
    const { Settings } = this.props;
    const { restoreUI, restoreStatus } = Settings;
    const { loading } = restoreUI;
    const {
      clearDB,
      services,
			scales,
			rates,
			calculations,
			error,
    } = restoreStatus;

    const result = [
      {
        titleID   : lang.clearDB,
        loading   : (loading && !clearDB),
        completed : clearDB,
        error     : (error && !clearDB),
      }, {
        titleID   : lang.services,
        loading   : (loading && clearDB && !services),
        completed : services,
        error     : (error && !services),
      }, {
        titleID   : lang.scales,
        loading   : (loading && services && !scales),
        completed : scales,
        error     : (error && !scales),
      }, {
        titleID   : lang.rates,
        loading   : (loading && scales && !rates),
        completed : rates,
        error     : (error && !rates),
      }, {
        titleID   : lang.calculations,
        loading   : (loading && rates && !calculations),
        completed : calculations,
        error     : (error && !calculations),
      },
    ];

    return result;
  }

  onClickRestore() {
    const { Settings } = this.props;
    Settings.restoreBase();
  }

  onChangeFile({ file, name }) {
    const { Settings } = this.props;
    Settings.setRestoreUI({
      file,
      fileName: name,
    });
  }

  render() {
    const { Settings } = this.props;
    const { restoreUI } = Settings;
    const { loading, fileName } = restoreUI;

    const dataSource = this.createDataSource();

    return (
      <Wrapper>
        <Grid>
          <Row className="input-file">
            <Col width={16}>
              <InputFile
                fileName={fileName}
                accept=".json"
                placeholder={lang.selectFile}
                onChange={this.onChangeFile}
              />
            </Col>
          </Row>
          <Row>
            <Col width={6}>
              <Button color="green" disabled={loading || !fileName} onClick={this.onClickRestore}>
                {lang.restore}
              </Button>
            </Col>
            <Col width={10}>
              <Title>{lang.process}:</Title>
              <ProcessListIndicator dataSource={dataSource} />
            </Col>
          </Row>
        </Grid>
      </Wrapper>
    );
  }
}

export default inject('Settings')(observer(RestoreDatabase));
