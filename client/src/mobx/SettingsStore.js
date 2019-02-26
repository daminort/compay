import { observable, action, decorate, computed, toJS } from 'mobx';
import {
	makeResetDB,
	makeStartBackup,
	makeCheckBackup,
	makeDownloadBackup,
	makeStartRestore,
	makeCheckRestore,
} from '../api/functions/db';
import { safeMerge } from '../helpers/commonUtils';
import { storeValue, restoreValue, clearValue } from '../helpers/localStorageUtils';
import { LOCAL_STORES } from '../constants/common';

const initResetUI = {
	loading   : false,
	completed : false,
	error     : false,
};

const initBackupUI = {
	loading  : false,
	backupID : '',
	fileName : '',
};

const initBackupStatus = {
	services     : false,
	scales       : false,
	rates        : false,
	calculations : false,
	completed    : false,
	error        : false,
	errorMessage : '',
	percent      : 0,
	dump         : null,
};

const initRestoreUI = {
	loading   : false,
	restoreID : '',
	fileName  : '',
	file      : null,
};

const initRestoreStatus = {
	clearDB      : false,
	services     : false,
	scales       : false,
	rates        : false,
	calculations : false,
	completed    : false,
	error        : false,
	errorMessage : '',
	percent      : 0,
};

class SettingsStore {

	constructor() {
		this._serviceOrder  = [];
		this._resetUI       = initResetUI;
		this._backupUI      = initBackupUI;
		this._backupStatus  = initBackupStatus;
		this._restoreUI     = initRestoreUI;
		this._restoreStatus = initRestoreStatus;
	}

	// getters
	get serviceOrder() {
		return toJS(this._serviceOrder);
	}

	get resetUI() {
		return toJS(this._resetUI);
	}

	get backupUI() {
		return toJS(this._backupUI);
	}

	get restoreUI() {
		const result = toJS(this._restoreUI);
		result.file = this._restoreUI.file;

		return result;
	}

	get backupStatus() {
		return toJS(this._backupStatus);
	}

	get restoreStatus() {
		return toJS(this._restoreStatus);
	}

	// setters
	setServiceOrder(data = []) {
		this._serviceOrder = data;
	}

	setResetUI(data) {
		this._resetUI = safeMerge(this._resetUI, data);
	}

	setBackupUI(data) {
		this._backupUI = safeMerge(this._backupUI, data);
	}

	setRestoreUI(data) {
		const { file } = this._restoreUI;
		this._restoreUI = safeMerge(this._restoreUI, data);
		this._restoreUI.file = data.file || file;
	}

	setBackupStatus(data) {
		this._backupStatus = safeMerge(this._backupStatus, data);
	}

	setRestoreStatus(data) {
		this._restoreStatus = safeMerge(this._restoreStatus, data);
	}

	resetBackupData() {
		this._backupUI     = initBackupUI;
		this._backupStatus = initBackupStatus;
	}

	resetRestoreData() {
		this._restoreUI     = initRestoreUI;
		this._restoreStatus = initRestoreStatus;
	}

	// side-effects
	async resetBase() {
		this.setResetUI({
			loading   : true,
			completed : false,
			error     : false,
		});

		try {
			await makeResetDB();
			this.setResetUI({ completed: true });

		} catch (error) {
			console.error(error);
			this.setResetUI({ error: true });
		}

		this.setResetUI({ loading: false });
	}

	async backupBase() {
		this.resetBackupData();
		this.setBackupUI({ loading: true });

		try {
			const startRes = await makeStartBackup();
			const backupID = startRes.id;
			this.setBackupUI({ backupID });

			const interval = setInterval( async () => {
				const backupStatus = await makeCheckBackup(backupID);
				this.setBackupStatus(backupStatus);

				if (backupStatus.completed) {
					clearInterval(interval);
					this.setBackupUI({ fileName: backupStatus.fileName });

					const dump = await makeDownloadBackup(backupStatus.fileName);
					this.setBackupStatus({ dump });
					this.setBackupUI({ loading: false });
				}
				if (backupStatus.error) {
					clearInterval(interval);

					console.error(backupStatus.errorMessage);
					this.setBackupStatus({ error: true });
					this.setBackupUI({ loading: false });
				}
			}, 2000);

		} catch (error) {
			console.error(error);
			this.setBackupStatus({ error: true });
			this.setBackupUI({ loading: false });
		}
	}

	async restoreBase() {
		const { file } = this._restoreUI;

		this.resetRestoreData();
		this.setRestoreUI({ loading: true });

		try {
			const startRes = await makeStartRestore(file);
			const restoreID = startRes.id;
			this.setRestoreUI({ restoreID });

			const interval = setInterval( async () => {
				const restoreStatus = await makeCheckRestore(restoreID);
				this.setRestoreStatus(restoreStatus);

				if (restoreStatus.completed) {
					clearInterval(interval);
					this.setRestoreUI({ loading: false });
				}
				if (restoreStatus.error) {
					clearInterval(interval);

					console.error(restoreStatus.errorMessage);
					this.setRestoreStatus({ error: true });
					this.setRestoreUI({ loading: false });
				}
			}, 2000);

		} catch (error) {
			console.error(error);
			this.setRestoreStatus({ error: true });
			this.setRestoreUI({ loading: false });
		}
	}

	async removeMarkedDocs() {
		// TODO
		await console.log('Remove marked docs');
	}

	async loadServiceOrder() {
		const result = await restoreValue(LOCAL_STORES.serviceOrder, []);
		this.setServiceOrder(result);
	}

	async saveServiceOrder(serviceOrder) {
		await storeValue(LOCAL_STORES.serviceOrder, serviceOrder);
	}

	async resetServiceOrder() {
		await clearValue(LOCAL_STORES.serviceOrder);
		this.setServiceOrder([]);
	}
}

decorate(SettingsStore, {
	_serviceOrder     : observable,
	_resetUI          : observable,
	_backupUI         : observable,
	_restoreUI        : observable,
	_backupStatus     : observable,
	_restoreStatus    : observable,

	serviceOrder      : computed,
	resetUI           : computed,
	backupUI          : computed,
	restoreUI         : computed,
	backupStatus      : computed,
	restoreStatus     : computed,

	setServiceOrder   : action,
	setResetUI        : action,
	setBackupUI       : action,
	setRestoreUI      : action,
	setBackupStatus   : action,
	setRestoreStatus  : action,
	resetBackupData   : action,
	resetRestoreData  : action,

	resetBase         : action,
	backupBase        : action,
	restoreBase       : action,
	removeMarkedDocs  : action,

	loadServiceOrder  : action,
	saveServiceOrder  : action,
	resetServiceOrder : action,
});

export default new SettingsStore();
