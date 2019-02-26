import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { Dropdown } from 'semantic-ui-react';
import { LOCALES } from '../../constants/common';

const { en, ru } = LOCALES;

const countryOptions = [
  { key: en, value: en, flag: 'gb', text: 'English' },
  { key: ru, value: ru, flag: ru, text: 'Русский' },
];

class LangSwitcher extends Component {

  static propTypes = {
    App: PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onChangeLang = this.onChangeLang.bind(this);
  }

  onChangeLang(event, data) {
    const { App } = this.props;
    const locale = data.value;

    App.setLocale(locale);
  }

  render() {
    const { App } = this.props;
    const { currentLocale } = App;

    return (
      <Dropdown
        button
        className="icon"
        floating
        labeled
        icon="world"
        options={countryOptions}
        text={currentLocale.toUpperCase()}
        onChange={this.onChangeLang}
      />
    );
  }
}

export default inject('App')(observer(LangSwitcher));
