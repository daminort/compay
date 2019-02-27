import { observable, action, decorate, computed } from 'mobx';

import { defaultLocale } from '../config';
import { THEMES } from '../constants/common';
import { getTheme } from '../themes';
import { storeValue, restoreValue } from '../helpers/localStorageUtils';

class AppStore {

	constructor() {
		this.themeName   = THEMES.default;
		this.locale      = restoreValue('locale') || defaultLocale;
		this.loading     = false;
		this.sdCollapsed = restoreValue('sdCollapsed') || false;
	}

	get theme() {
		return getTheme(this.themeName);
	}

	get currentLocale() {
		return this.locale;
	}

	get sidebarCollapsed() {
		return this.sdCollapsed;
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

	toggleSidebar() {
		const collapsed = this.sdCollapsed;
		this.sdCollapsed = !collapsed;
		storeValue('sdCollapsed', this.sdCollapsed);
	}
}

decorate(AppStore, {
	themeName        : observable,
	locale           : observable,
	loading          : observable,
	sdCollapsed      : observable,

	theme            : computed,
	currentLocale    : computed,
	sidebarCollapsed : computed,

	setTheme         : action,
	setLocale        : action,
	setLoading       : action,
	toggleSidebar    : action,
});

export default new AppStore();
