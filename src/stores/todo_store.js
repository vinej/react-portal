import BaseStore from './base_store';
import { todoService } from '../services/todo_service';
import { registerStore } from './register_store';

export default class TodoStore extends BaseStore {
  static mount() {
    return registerStore.add( new TodoStore() );
  }

  static unmount(store) {
    registerStore.remove( store );
    store = null;
  }

  constructor() {
    super();
    this.service = todoService;
    this.name = 'todo';
  }
}
