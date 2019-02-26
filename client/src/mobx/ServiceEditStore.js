import { observable, action, decorate, computed, toJS } from 'mobx';
import { merge } from 'lodash';
import {
	getServicesInfo,
	makeServiceUpdate,
} from '../api/functions/services';
import { showSuccess, showError } from '../helpers/notifications';
import {
	NOTIFICATION_ERRORS,
	NOTIFICATION_SUCCESS,
} from '../constants/notifications';

import AppStore from './AppStore';

class ServiceEditStore {

	constructor() {
		this.serviceID    = null;
		this._serviceItem = {};
	}

	// Getters ------------------------------------------------------------------
	get serviceItem() {
		return toJS(this._serviceItem);
	}

	// Setters ------------------------------------------------------------------
	setServiceID(id) {
		this.serviceID = id;
	}

	setServiceData(data) {
		this._serviceItem = merge(this.serviceItem, data);
	}

	// Side-Effects -------------------------------------------------------------
	async reloadServiceData(id) {
		AppStore.setLoading(true);

		try {
			const serviceItem = await getServicesInfo(id);
			this.setServiceData(serviceItem);
			this.setServiceID(serviceItem.id);

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.serviceDataReload,
			});
		}
		AppStore.setLoading(false);
	}

	async serviceSave(id, serviceItem) {
		AppStore.setLoading(true);

		try {
			const updatedItem = await makeServiceUpdate(id, serviceItem);
			this.setServiceData(updatedItem);
			showSuccess({
				message: NOTIFICATION_SUCCESS.serviceDataUpdate,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.serviceDataUpdate,
			});
		}
		AppStore.setLoading(false);
	}
}

decorate(ServiceEditStore, {
	serviceID         : observable,
	_serviceItem      : observable,

	serviceItem       : computed,

	setServiceID      : action,
	setServiceData    : action,
	reloadServiceData : action,
	serviceSave       : action,
});

export default new ServiceEditStore();
