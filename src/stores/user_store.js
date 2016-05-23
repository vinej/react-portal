import BaseStore from './base_store';
import { userService } from '../services/user_service';

export default class UserStore extends BaseStore {
  static create() {
    return new UserStore()
  }

  constructor() {
    super();
    this.name = 'user';
    this.service = userService;
  }
}

