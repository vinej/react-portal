import BaseStore from './base_store';
import { todoService } from '../services/todo_service';

export default class TodoStore extends BaseStore {
  static create() {
    return new TodoStore()
  }

  constructor() {
    super();
    this.service = todoService;
    this.name = 'todo';
  }
}
