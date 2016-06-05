import PageStore from './page_store';
import { userService } from '../services/user_service';
import { registerStore } from './register_store';

export default class UserStore extends PageStore {
  static mount() {
    return registerStore.add( new UserStore() );
  }

  static unmount(store) {
    registerStore.remove( store );
    store = null;
  }

  constructor() {
    super();
    this.service = userService;
    this.name = 'user';
  }
}

