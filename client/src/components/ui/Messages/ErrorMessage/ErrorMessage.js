import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { NOTIFICATION_COLORS, NOTIFICATION_ICONS } from '../../../../constants/notifications';

const ErrorMessage = ({ icon, title, content }) => {

  return (
    <Message icon color={NOTIFICATION_COLORS.error}>
      <Icon name={icon} />
      <Message.Content>
        <Message.Header>{title}</Message.Header>
        {content}
      </Message.Content>
    </Message>
  );
};

ErrorMessage.propTypes = {
  icon    : PropTypes.string,
  title   : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  content : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

ErrorMessage.defaultProps = {
  icon    : NOTIFICATION_ICONS.error,
  title   : 'Error',
  content : '',
};

export default ErrorMessage;
