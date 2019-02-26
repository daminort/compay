import { observable, action, decorate, computed } from 'mobx';

import { defaultLocale } from '../config';
import { THEMES } from '../constants/common';
import { getTheme } from '../themes';
import { storeValue, restoreValue } from '../helpers/localStorageUtils';

class AppStore {

	constructor() {
		this.themeName = THEMES.default;
		this.locale    = restoreValue('locale') || defaultLocale;
		this.loading   = false;
	}

	get theme() {
		return getTheme(this.themeName);
	}

	get currentLocale() {
		return this.locale;
	}

	setTheme(themeName) {
		this.themeName = themeName;
	}

	setLocale(locale) {
		this.locale = locale;
		storeValue('locale', locale);
	}

	setLoading(loading) {
		this.loading = loading;
	}
}

decorate(AppStore, {
	themeName     : observable,
	locale        : observable,
	loading       : observable,

	theme         : computed,
	currentLocale : computed,

	setTheme      : action,
	setLocale     : action,
	setLoading    : action,
});

export default new AppStore();
