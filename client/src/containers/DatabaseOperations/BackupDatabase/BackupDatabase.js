import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Grid, { Row, Col } from '../../../components/ui/Grid';
import Button from '../../../components/ui/Button';
import ProcessListIndicator from '../../../components/ProcessListIndicator';
import DownloadLink from '../../../components/shared/DownloadLink';

import { Wrapper, Title } from './BackupDatabase.style';
import { lang } from './lang';

class BackupDatabase extends Component {

  static propTypes = {
    Settings : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.createDataSource = this.createDataSource.bind(this);
    this.onClickBackup    = this.onClickBackup.bind(this);
  }

  createDataSource() {
    const { Settings } = this.props;
    const { backupUI, backupStatus } = Settings;
    const { loading } = backupUI;
    const {
      services,
			scales,
			rates,
			calculations,
			error,
    } = backupStatus;

    const result = [
      {
        titleID   : lang.services,
        loading   : (loading && !services),
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

  onClickBackup() {
    const { Settings } = this.props;
    Settings.backupBase();
  }

  render() {
    const { Settings } = this.props;
    const { backupUI, backupStatus } = Settings;
    const { loading, fileName } = backupUI;
    const { dump } = backupStatus;

    const dataSource = this.createDataSource();

    return (
      <Wrapper>
        <Grid>
          <Row>
            <Col width={6}>
              <Button color="green" disabled={loading} onClick={this.onClickBackup}>
                {lang.backup}
              </Button>
            </Col>
            <Col width={10}>
              <Title>{lang.process}:</Title>
              <ProcessListIndicator dataSource={dataSource} />
            </Col>
          </Row>
          {(fileName && dump) && (
            <Row>
              <Col width={16}>
                <DownloadLink
                  type="application/json"
                  label={(<span>{lang.download}:</span>)}
                  title={fileName}
                  fileName={fileName}
                  fileData={JSON.stringify(dump, null, 2)}
                />
              </Col>
            </Row>
          )}
        </Grid>
      </Wrapper>
    );
  }
}

export default inject('Settings')(observer(BackupDatabase));
