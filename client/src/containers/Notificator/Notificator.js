import React, { Component } from 'react';
import classNames from 'classnames';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { isArray, isEmpty } from 'lodash';
import { Message } from 'semantic-ui-react';

import Intl from '../../languages/Intl';
import { NOTIFICATION_COLORS, NOTIFICATION_ICONS } from '../../constants/notifications';
import { Container, MessageHolder, Header, Content } from './Notificator.style';

class Notificator extends Component {

  static propTypes = {
    Notification: PropTypesMobX.observableObject.isRequired,
  }

  static isIntlID(message) {
    return message.includes('notification.');
  }

  constructor(props) {
    super(props);
    this.onClickMessage = this.onClickMessage.bind(this);
  }

  // Events -------------------------------------------------------------------
  onClickMessage(id) {
    const { Notification } = this.props;

    Notification.updateItem(id, { deleted: true });
    setTimeout(() => {
      Notification.removeItem(id);
    }, 1000);
  }

  // Renders ------------------------------------------------------------------
  render() {
    const { Notification } = this.props;

    const { list } = Notification;
    if (!isArray(list) || isEmpty(list)) {
      return null;
    }

    const items = list.map( item => {

      const { id, type, info } = item;
      const color = NOTIFICATION_COLORS[type];
      const icon  = NOTIFICATION_ICONS[type];
      const className = classNames({
        deleted: item.deleted,
      });
      const messageTitle = Notificator.isIntlID(item.title)
        ? (<Intl id={item.title} />)
        : item.title;
      const messageContent = Notificator.isIntlID(item.message)
        ? (<Intl id={item.message} />)
        : item.message;
      const infoContent = info
        ? (<div>{info}</div>)
        : null;

      return (
        <MessageHolder
          key={item.id}
          className={className}
          onClick={() => this.onClickMessage(id)}
        >
          <Message
            color={color}
            icon={icon}
            header={(<Header>{messageTitle}</Header>)}
            content={(<Content>{messageContent}{infoContent}</Content>)}
          />
        </MessageHolder>
      );
    });

    return (
      <Container>
        {items}
      </Container>
    );
  }
}

export default inject('Notification')(observer(Notificator));
