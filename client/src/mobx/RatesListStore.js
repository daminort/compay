import { observable, action, decorate, computed, toJS } from 'mobx';
import {
	getRatesList,
	makeRateRemove,
	makeRateRestore,
} from '../api/functions/rates';
import {
	NOTIFICATION_ERRORS,
	NOTIFICATION_SUCCESS,
} from '../constants/notifications';
import {
	showSuccess,
	showError,
} from '../helpers/notifications';

import Formatter from '../helpers/Formatter';
import AppStore from './AppStore';

class RatesListStore {

	constructor() {
		this.rateslist   = [];
		this.forDate     = Formatter.startMonth();
		this.showDeleted = false;
	}

	// getters
	get list() {
		return toJS(this.rateslist);
	}

	// setters
	setList(rateslist) {
		this.rateslist = rateslist;
	}

	setForDate(forDate) {
		this.forDate = forDate;
	}

	setShowDeleted(showDeleted) {
		this.showDeleted = showDeleted;
	}

	// side-effects
	async reloadList() {
		AppStore.setLoading(true);

		const params = { forDate: this.forDate };
		if (this.showDeleted) { params.showAll = true; }

		try {
			const rateslist = await getRatesList(params);
			this.setList(rateslist);

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.rateListReload,
			});
		}
		AppStore.setLoading(false);
	}

	async removeRate(id) {
		AppStore.setLoading(true);
		try {
			await makeRateRemove(id);
			await this.reloadList();
			showSuccess({
				message: NOTIFICATION_SUCCESS.rateRemove,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.rateRemove,
			});
		}
		AppStore.setLoading(false);
	}

	async restoreRate(id) {
		AppStore.setLoading(true);
		try {
			await makeRateRestore(id);
			await this.reloadList();
			showSuccess({
				message: NOTIFICATION_SUCCESS.rateRestore,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.rateRestore,
			});
		}
		AppStore.setLoading(false);
	}
}

decorate(RatesListStore, {
	rateslist      : observable,
	forDate        : observable,
	showDeleted    : observable,
	list           : computed,
	setList        : action,
	setForDate     : action,
	setShowDeleted : action,
	reloadList     : action,
	removeRate     : action,
	restoreRate    : action,
});

export default new RatesListStore();
