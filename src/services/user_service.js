import axios from 'axios';
import { ROOT_URL } from './const_service';
import BaseService from './base_service';

class UserService extends BaseService {
  constructor() {
    super();
    this.service= "users";
  }
}
export let userService = new UserService();
