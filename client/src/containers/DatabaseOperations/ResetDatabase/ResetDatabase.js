import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Button from '../../../components/ui/Button';
import ProcessIndicator from '../../../components/ProcessIndicator';
import { ErrorMessage } from '../../../components/ui/Messages';

import { NOTIFICATION_ICONS } from '../../../constants/notifications';

import { Wrapper, Controls } from './ResetDatabase.style';
import { lang } from './lang';

class ResetDatabase extends Component {

  static propTypes = {
    Settings : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onClickReset = this.onClickReset.bind(this);
  }

  onClickReset() {
    const { Settings } = this.props;
    Settings.resetBase();
  }

  render() {
    const { Settings } = this.props;
    const { resetUI } = Settings;
    const { loading, completed, error } = resetUI;

    return (
      <Wrapper>
        <ErrorMessage
          icon={NOTIFICATION_ICONS.warning}
          title={lang.alertTitle}
          content={lang.alertInfo}
        />
        <Controls>
          <Button color="red" disabled={loading} onClick={this.onClickReset}>
            {lang.reset}
          </Button>
          <ProcessIndicator
            loading={loading}
            completed={completed}
            error={error}
            loadingTitleID={lang.loading}
            completedTitleID={lang.completed}
            errorTitleID={lang.error}
          />
        </Controls>
      </Wrapper>
    );
  }
}

export default inject('Settings')(observer(ResetDatabase));
