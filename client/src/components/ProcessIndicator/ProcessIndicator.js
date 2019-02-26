import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Intl from '../../languages/Intl';
import { NOTIFICATION_ICONS } from '../../constants/notifications';

import Loader from '../ui/Loader';
import Icon from '../ui/Icon';

import { Wrapper } from './ProcessIndicator.style';

const ProcessIndicator = (props) => {

  const {
    showInert,
    loading,
    completed,
    error,
    inertTitleID,
    loadingTitleID,
    completedTitleID,
    errorTitleID,
  } = props;

  const className = classnames({
    loading,
    completed,
    error,
    inert: showInert,
  });

  if (error) {
    return (
      <Wrapper className={className}>
        <Icon name={NOTIFICATION_ICONS.error} />
        <Intl id={errorTitleID} />
      </Wrapper>
    );
  }

  if (completed) {
    return (
      <Wrapper className={className}>
        <Icon name={NOTIFICATION_ICONS.success} />
        <Intl id={completedTitleID} />
      </Wrapper>
    );
  }

  if (loading) {
    return (
      <Wrapper className={className}>
        <Loader active inline indeterminate size="tiny" />
        <Intl id={loadingTitleID} />
      </Wrapper>
    );
  }

  if (showInert) {
    return (
      <Wrapper className={className}>
        <Intl id={inertTitleID} />
      </Wrapper>
    );
  }

  return null;
};

ProcessIndicator.propTypes = {
  showInert        : PropTypes.bool,
  loading          : PropTypes.bool,
  completed        : PropTypes.bool,
  error            : PropTypes.bool,
  inertTitleID     : PropTypes.string,
  loadingTitleID   : PropTypes.string,
  completedTitleID : PropTypes.string,
  errorTitleID     : PropTypes.string,
};

ProcessIndicator.defaultProps = {
  showInert        : false,
  loading          : false,
  completed        : false,
  error            : false,
  inertTitleID     : 'common.waiting',
  loadingTitleID   : 'common.loading',
  completedTitleID : 'common.completed',
  errorTitleID     : 'common.error',
};

export default ProcessIndicator;
