import PageStore from './page_store';
import { userService } from '../services/user_service';
import { registerStore } from './register_store';

export default class UserStore extends PageStore {
  static create() {
    return registerStore.add( new UserStore() );
  }

  static remove(store) {
    registerStore.remove( store );
    store = null;
  }

  constructor() {
    super();
    this.service = userService;
    this.name = 'user';
  }
}

