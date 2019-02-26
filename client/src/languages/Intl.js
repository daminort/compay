import { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import AppStore from '../mobx/AppStore';

import enMessages from './en';
import ruMessages from './ru';

const allMessages = {
  en: enMessages,
  ru: ruMessages,
};

class Intl extends Component {

  static propTypes = {
    id  : PropTypes.string.isRequired,
    App : PropTypesMobX.observableObject.isRequired,
  }

  static translate(locale, messageID) {
    const messages = allMessages[locale];
    if (!messages) {
      return '';
    }
    const result = messages[messageID];

    return result || '';
  }

  render() {
    const { App, id } = this.props;
    const { locale } = App;

    const result = Intl.translate(locale, id);

    return result;
  }
}

export function translate(messageID) {
  const { locale } = AppStore;
  return Intl.translate(locale, messageID);
}

export default inject('App')(observer(Intl));
