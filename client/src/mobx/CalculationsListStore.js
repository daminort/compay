import { observable, action, decorate, computed, toJS } from 'mobx';
import { isArray, isEmpty, findIndex, find } from 'lodash';
import {
	getCalculationsList,
	makeCalculationRemove,
	makeCalculationCreateMany,
	makeCalculationUpdateAll,
} from '../api/functions/calculations';
import { NOTIFICATION_ERRORS, NOTIFICATION_SUCCESS } from '../constants/notifications';
import { showSuccess, showError } from '../helpers/notifications';

import CalculationFactory from '../api/factories/CalculationFactory';
import CalculationNormalizer from '../api/normalizers/CalculationNormalizer';
import Formatter from '../helpers/Formatter';
import AppStore from './AppStore';

class CalculationsListStore {

	constructor() {
		this.calculationslist = [];
		this.period           = Formatter.startPreviousMonth();
		this.showEmpty        = false;
	}

	// getters
	get list() {
		return toJS(this.calculationslist).filter(item => {
			if (this.showEmpty) {
				return true;
			}
			return item.calcResult > 0;
		});
	}

	getItem(id) {
		const list = toJS(this.calculationslist);
		return find(list, { id });
	}

	// setters
	setList(calculationslist) {
		this.calculationslist = calculationslist;
	}

	setItem(id, item) {
		const index = findIndex(this.calculationslist, { id });
		this.calculationslist[index] = item;
	}

	setSelected(id, selected) {
		const item = this.getItem(id);
		item.selected = selected;
		this.setItem(id, item);
	}

	setPeriod(period) {
		this.period = period;
	}

	setShowEmpty(showEmpty) {
		this.showEmpty = showEmpty;
	}

	// side-effects
	async reloadList() {
		AppStore.setLoading(true);

		const params = { period: this.period };

		try {
			let calculationslist = await getCalculationsList(params);
			if (!isArray(calculationslist) || isEmpty(calculationslist)) {
				calculationslist = await makeCalculationCreateMany(this.period);
				this.setShowEmpty(true);
			}
			this.setList(calculationslist);

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.calculationListReload,
			});
		}
		AppStore.setLoading(false);
	}

	async removeCalculation(id) {
		AppStore.setLoading(true);
		try {
			await makeCalculationRemove(id);
			await this.reloadList();
			showSuccess({
				message: NOTIFICATION_SUCCESS.calculationRemove,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.calculationRemove,
			});
		}
		AppStore.setLoading(false);
	}

	async calculateAll() {
		AppStore.setLoading(true);
		try {
			const resultList = await CalculationFactory.calculateAll(this.list);
			resultList
				.filter(item => Boolean(item.error))
				.forEach(item => {
					showError({
						message: item.error,
						info: item.service.name,
					});
				});
			this.setList(resultList);

		} catch (error) {
			console.log('CalculationsListStore.js [105], error:', error);
		}
		AppStore.setLoading(false);
	}

	async saveAll() {
		AppStore.setLoading(true);
		try {
			const resultList = await CalculationNormalizer.normalizeForServerAll(this.list);
			await makeCalculationUpdateAll(resultList);
			await this.reloadList();
			showSuccess({
				message: NOTIFICATION_SUCCESS.calculationDataUpdate,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.calculationDataUpdate,
			});
		}
		AppStore.setLoading(false);
	}
}

decorate(CalculationsListStore, {
	calculationslist   : observable,
	period             : observable,
	showEmpty          : observable,
	list               : computed,
	getItem            : action,
	setList            : action,
	setItem            : action,
	setSelected        : action,
	setPeriod          : action,
	setShowEmpty       : action,
	reloadList         : action,
	removeCalculation  : action,
	calculateAll       : action,
	saveAll            : action,
});

export default new CalculationsListStore();
