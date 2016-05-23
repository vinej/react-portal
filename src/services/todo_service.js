import axios from 'axios';
import { ROOT_URL } from './const_service';
import BaseService from './base_service';

class TodoService extends BaseService {
  constructor() {
    super();
    this.service= "todos";
  }
}
export let todoService = new TodoService();

