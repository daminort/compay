import { observable, action, decorate, computed, toJS } from 'mobx';
import { merge, isArray, isEmpty } from 'lodash';
import {
	getScaleInfo,
	makeScaleCreate,
	makeScaleUpdate,
} from '../api/functions/scales';
import { showSuccess, showError } from '../helpers/notifications';
import {
	NOTIFICATION_ERRORS,
	NOTIFICATION_SUCCESS,
} from '../constants/notifications';

import ScaleNormalizer from '../api/normalizers/ScaleNormalizer';
import AppStore from './AppStore';
import RoutingStore from './RoutingStore';

class ScaleEditStore {

	constructor() {
		this.scaleID    = null;
		this._scaleItem = {};
		this._errors    = [];
	}

	// Getters ------------------------------------------------------------------
	get scaleItem() {
		return toJS(this._scaleItem);
	}

	get scaleItemRanges() {
		const ranges = toJS(this._scaleItem).range;
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
	setScaleID(id) {
		this.scaleID = id;
	}

	setScaleData(data) {
		this._scaleItem = merge(this.scaleItem, data);
	}

	setScaleRange(data) {
		if (isArray(data)) {
			this._scaleItem.range = data.map(item => ({
				counterMin: item.counterMin,
				counterMax: item.counterMax,
			}));

		} else {
			console.log('ScaleEditStore.setScaleRange(): data is not an array: ', data);
		}
	}

	setErrors(data) {
		if (isArray(data)) {
			this._errors = data;

		} else {
			console.log('ScaleEditStore.setErrors(): data is not an array: ', data);
		}
	}

	clearErrors() {
		this._errors = [];
	}

	// Side-Effects -------------------------------------------------------------
	async reloadScaleData(id) {
		AppStore.setLoading(true);

		try {
			const scaleItem = await getScaleInfo(id);
			this.setScaleData(scaleItem);
			this.setScaleID(scaleItem.id);
			this.setScaleRange(scaleItem.range);
			this.clearErrors();

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.scaleDataReload,
			});
		}
		AppStore.setLoading(false);
	}

	async scaleUpdate(id, scaleItem) {
		AppStore.setLoading(true);
		const data = ScaleNormalizer.normalizeForServer(scaleItem);
		try {
			const updatedItem = await makeScaleUpdate(id, data);
			this.setScaleData(updatedItem);
			this.setScaleRange(updatedItem.range);
			this.clearErrors();
			showSuccess({
				message: NOTIFICATION_SUCCESS.scaleDataUpdate,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.scaleDataUpdate,
			});
		}
		AppStore.setLoading(false);
	}

	async scaleCreate(scaleItem) {
		AppStore.setLoading(true);
		const data = ScaleNormalizer.normalizeForServer(scaleItem);
		try {
			const createdItem = await makeScaleCreate(data);
			this.setScaleData(createdItem);
			this.setScaleID(createdItem.id);
			this.setScaleRange(createdItem.range);
			this.clearErrors();

			RoutingStore.push(`/scales/edit/${createdItem.id}`);
			showSuccess({
				message: NOTIFICATION_SUCCESS.scaleDataCreate,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.scaleDataCreate,
			});
		}
		AppStore.setLoading(false);
	}
}

decorate(ScaleEditStore, {
	scaleID         : observable,
	_scaleItem      : observable,
	_errors         : observable,

	scaleItem       : computed,
	scaleItemRanges : computed,
	errors          : computed,
	isErrors        : computed,

	setScaleID      : action,
	setScaleData    : action,
	setScaleRange   : action,
	setErrors       : action,
	clearErrors     : action,

	reloadScaleData : action,
	scaleUpdate     : action,
	scaleCreate     : action,
});

export default new ScaleEditStore();
