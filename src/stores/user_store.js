import CrudStore from './crud_store';

export default class UserStore extends CrudStore {
	static create() {
		return new UserStore()
	}
}

