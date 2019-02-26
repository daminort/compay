import uuid from 'uuid/v4';
import { isNumber } from 'lodash';

import NotificationStore from '../mobx/NotificationStore';
import { NOTIFICATION_TYPES, NOTIFICATION_TITLE } from '../constants/notifications';

const defaultTimeout = 7000;

function showNotification({ title, type, message, info, timeout }) {

  const messageTimeout = isNumber(timeout) ? timeout * 1000 : defaultTimeout;

  const item = {
    type,
    title,
    message,
    info,
    id      : uuid(),
    deleted : false,
  };

  NotificationStore.addItem(item);
  if (messageTimeout && messageTimeout > 0) {
    setTimeout(() => {
      NotificationStore.updateItem(item.id, { deleted: true });
      setTimeout(() => {
        NotificationStore.removeItem(item.id);
      }, 1000);
    }, messageTimeout);
  }
}

function showSuccess({ message, title, timeout }) {

  const messageTitle = title || NOTIFICATION_TITLE.success;
  showNotification({
    message,
    timeout,
    type: NOTIFICATION_TYPES.success,
    title: messageTitle,
  });
}

function showError({ message, title, info, timeout }) {

  const messageTitle = title || NOTIFICATION_TITLE.error;
  showNotification({
    message,
    info,
    timeout : timeout || 0,
    type    : NOTIFICATION_TYPES.error,
    title   : messageTitle,
  });
}

function showWarning({ message, title, timeout }) {

  const messageTitle = title || NOTIFICATION_TITLE.warning;
  showNotification({
    message,
    timeout,
    type: NOTIFICATION_TYPES.warning,
    title: messageTitle,
  });
}

function showInfo({ message, title, timeout }) {

  const messageTitle = title || NOTIFICATION_TITLE.info;
  showNotification({
    message,
    timeout,
    type: NOTIFICATION_TYPES.info,
    title: messageTitle,
  });
}

export {
  showSuccess,
  showError,
  showWarning,
  showInfo,
};
