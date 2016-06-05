import axios from 'axios';
import CrudService from './crud_service';

class UserService extends CrudService {
  constructor() {
    super();
    this.service= "users";
  }
}
export let userService = new UserService();
