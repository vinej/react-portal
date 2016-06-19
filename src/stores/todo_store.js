import PageStore from './page_store';
import { todoService } from '../services/todo_service';
import { registerStore } from './register_store';
import { observable, action } from 'mobx';

export default class TodoStore extends PageStore {
  static create() {
    return registerStore.add( new TodoStore() );
  }

  static remove(store) {
    registerStore.remove( store );
    store = null;
  }

  constructor() {
    super()
    this.service = todoService
    this.name = 'todo'
    this.id = 0
    this.error = null
  }

  static getEditFormDimension() {
    return {
      width: '50%',
      height: '245px',
      left: '50%',
      top: '100px'
    }
  }
}

