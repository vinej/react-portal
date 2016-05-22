import { observable } from 'mobx';

export default class UserStore {
	static create() {
		return new UserStore()
	}

	@observable page = [];
	@observable error = '';
	
	users = [];
	pageStart = 0;
	pageEnd = 10;
	pageSize = 10;
}

