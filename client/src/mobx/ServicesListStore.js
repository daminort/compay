import { observable, action, decorate, computed, toJS } from 'mobx';
import {
	getServicesList,
	makeServiceRemove,
	makeServiceRestore,
} from '../api/functions/services';
import {
	NOTIFICATION_ERRORS,
	NOTIFICATION_SUCCESS,
} from '../constants/notifications';
import { showSuccess, showError } from '../helpers/notifications';

import AppStore from './AppStore';

class ServicesListStore {

	constructor() {
		this.serviceslist = [];
		this.showDeleted  = false;
	}

	// getters
	get list() {
		return toJS(this.serviceslist);
	}

	// setters
	setList(serviceslist) {
		this.serviceslist = serviceslist;
	}

	setShowDeleted(showDeleted) {
		this.showDeleted = showDeleted;
	}

	// side-effects
	async reloadList(includeDeleted = false) {
		AppStore.setLoading(true);

		const params = (this.showDeleted || includeDeleted) ? { showAll: true } : {};
		try {
			const servicesList = await getServicesList(params);
			this.setList(servicesList);

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.serviceListReload,
			});
		}
		AppStore.setLoading(false);
	}

	async removeService(id) {
		AppStore.setLoading(true);
		try {
			await makeServiceRemove(id);
			await this.reloadList();
			showSuccess({
				message: NOTIFICATION_SUCCESS.serviceRemove,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.serviceRemove,
			});
		}
		AppStore.setLoading(false);
	}

	async restoreService(id) {
		AppStore.setLoading(true);
		try {
			await makeServiceRestore(id);
			await this.reloadList();
			showSuccess({
				message: NOTIFICATION_SUCCESS.serviceRestore,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.serviceRestore,
			});
		}
		AppStore.setLoading(false);
	}
}

decorate(ServicesListStore, {
	serviceslist   : observable,
	showDeleted    : observable,
	list           : computed,
	setList        : action,
	reloadList     : action,
	removeService  : action,
	restoreService : action,
});

export default new ServicesListStore();
