import { observable, action, decorate, computed, toJS } from 'mobx';
import { find, merge } from 'lodash';

/**
 * Notification item must look like shown below:
 * {
 * 		id      : uuid/v4,
 * 		type    : ['error', 'success', 'warning', 'info'],
 * 		title   : string,
 * 		message : string,
 * 		deleted : boolean (optional)
 * }
 */

class NotificationStore {

	constructor() {
		this._list = [];
	}

	// Getters ------------------------------------------------------------------
	get list() {
		return toJS(this._list);
	}

	// Actions ------------------------------------------------------------------
	addItem(item) {
		this._list.push(item);
	}

	removeItem(id) {
		this._list = this._list.filter( item => item.id !== id );
	}

	updateItem(id, data) {
		const item = find(this._list, { id });
		merge(item, data);
	}
}

decorate(NotificationStore, {
	_list      : observable,
	list       : computed,
	addItem    : action,
	removeItem : action,
	updateItem : action,
});

export default new NotificationStore();
