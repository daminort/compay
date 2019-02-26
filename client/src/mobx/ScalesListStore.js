import { observable, action, decorate, computed, toJS } from 'mobx';
import {
	getScalesList,
	makeScaleRemove,
	makeScaleRestore,
} from '../api/functions/scales';
import {
	NOTIFICATION_ERRORS,
	NOTIFICATION_SUCCESS,
} from '../constants/notifications';
import { showSuccess, showError } from '../helpers/notifications';

import AppStore from './AppStore';

class ScalesListStore {

	constructor() {
		this.scaleslist  = [];
		this.showDeleted = false;
	}

	// getters
	get list() {
		return toJS(this.scaleslist);
	}

	get isList() {
		return this.scaleslist.length > 0;
	}

	// setters
	setList(scaleslist) {
		this.scaleslist = scaleslist;
	}

	setShowDeleted(showDeleted) {
		this.showDeleted = showDeleted;
	}

	// side-effects
	async reloadList() {
		AppStore.setLoading(true);

		const params = this.showDeleted ? { showAll: true } : {};
		try {
			const scaleslist = await getScalesList(params);
			this.setList(scaleslist);

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.scaleListReload,
			});
		}
		AppStore.setLoading(false);
	}

	async removeScale(id) {
		AppStore.setLoading(true);
		try {
			await makeScaleRemove(id);
			await this.reloadList();
			showSuccess({
				message: NOTIFICATION_SUCCESS.scaleRemove,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.scaleRemove,
			});
		}
		AppStore.setLoading(false);
	}

	async restoreScale(id) {
		AppStore.setLoading(true);
		try {
			await makeScaleRestore(id);
			await this.reloadList();
			showSuccess({
				message: NOTIFICATION_SUCCESS.scaleRestore,
			});

		} catch (error) {
			console.error(error);
			showError({
				message: NOTIFICATION_ERRORS.scaleRestore,
			});
		}
		AppStore.setLoading(false);
	}
}

decorate(ScalesListStore, {
	scaleslist   : observable,
	showDeleted  : observable,
	list         : computed,
	isList       : computed,
	setList      : action,
	reloadList   : action,
	removeScale  : action,
	restoreScale : action,
});

export default new ScalesListStore();
