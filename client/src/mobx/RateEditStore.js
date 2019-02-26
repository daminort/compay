import { observable, action, decorate, computed, toJS } from 'mobx';
import { merge, isArray, isEmpty } from 'lodash';
import {
	getRateInfo,
	makeRateCreate,
	makeRateUpdate,
} from '../api/functions/rates';
import { showSuccess, showError } from '../helpers/notifications';
import {
	NOTIFICATION_ERRORS,
	NOTIFICATION_SUCCESS,
} from '../constants/notifications';

import RateNormalizer from '../api/normalizers/RateNormalizer';
import AppStore from './AppStore';
import RoutingStore from './RoutingStore';

class RateEditStore {

	constructor() {
		this.rateID    = null;
		this._rateItem = {};
		this._errors   = [];
	}

	// Getters ------------------------------------------------------------------
	get rateItem() {
		return toJS(this._rateItem);
	}

	get rateItemRanges() {
		const { ranges } = toJS(this._rateItem);
		if (!isArray(ranges) || isEmpty(ranges)) {
			return [];
		}

		const result = ranges.map((item, index) => {
      const rangeID = `range-${index}`;

      return {
        ...item,
        id    : rangeID,
        range : index + 1,
      };
    });

    return result;
	}

	get errors() {
		return toJS(this._errors);
	}

	get isErrors() {
		return this._errors.length > 0;
	}

	// Setters ------------------------------------------------------------------
	setRateID(id) {
		this.rateID = id;
	}

	setRateData(data) {
		this._rateItem = merge(this.rateItem, data);
	}

	setRateRanges(data) {
		if (isArray(data)) {
			this._rateItem.ranges = data.map(item => ({
				counterMin: item.counterMin,
				counterMax: item.counterMax,
				rate      : item.rate,
			}));

		} else {
			console.log('RateEditStore.setRateRange(): data is not an array: ', data);
		}
	}

	setErrors(data) {
		if (isArray(data)) {
			this._errors = data;

		} else {
			console.log('RateEditStore.setErrors(): data is not an array: ', data);
		}
	}

	clearErrors() {
		this._errors = [];
	}

	// Side-Effects -------------------------------------------------------------
	async reloadRateData(id) {
		AppStore.setLoading(true);

		try {
			const rateItem = await getRateInfo(id);
			this.setRateData(rateItem);
			this.setRateID(rateItem.id);
			this.setRateRanges(rateItem.ranges);
			this.clearErrors();

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.rateDataReload,
			});
		}
		AppStore.setLoading(false);
	}

	async rateUpdate(id, rateItem) {
		AppStore.setLoading(true);
		const data = RateNormalizer.normalizeForServer(rateItem);
		try {
			const updatedItem = await makeRateUpdate(id, data);
			this.setRateData(updatedItem);
			this.setRateRanges(updatedItem.ranges);
			this.clearErrors();
			showSuccess({
				message: NOTIFICATION_SUCCESS.rateDataUpdate,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.rateDataUpdate,
			});
		}
		AppStore.setLoading(false);
	}

	async rateCreate(rateItem) {
		AppStore.setLoading(true);
		const data = RateNormalizer.normalizeForServer(rateItem);
		try {
			const createdItem = await makeRateCreate(data);
			this.setRateData(createdItem);
			this.setRateID(createdItem.id);
			this.setRateRanges(createdItem.ranges);
			this.clearErrors();

			RoutingStore.push(`/rates/edit/${createdItem.id}`);
			showSuccess({
				message: NOTIFICATION_SUCCESS.rateDataCreate,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.rateDataCreate,
			});
		}
		AppStore.setLoading(false);
	}
}

decorate(RateEditStore, {
	rateID         : observable,
	_rateItem      : observable,
	_errors        : observable,

	rateItem       : computed,
	rateItemRanges : computed,
	errors         : computed,
	isErrors       : computed,

	setRateID      : action,
	setRateData    : action,
	setRateRanges  : action,
	setErrors      : action,
	clearErrors    : action,

	reloadRateData : action,
	rateUpdate     : action,
	rateCreate     : action,
});

export default new RateEditStore();
