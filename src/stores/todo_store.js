import { observable } from 'mobx';
import CrudStore from './crud_store';

export default class TodoStore extends CrudStore {
	static create() {
		return new TodoStore()
	}
}

/**
 * [authFormStore is used to fill up the sign in / sign up form]
 * @type {Object}
 */
export var todoFormStore = {
	@observable description : "",
	@observable startDate 	: Date.now,
	@observable endDate			: Date.now,
	@observable status			: "waiting",
	@observable category    : "standard",
	@observable done        : false,
	@observable color       : 'green'
}
