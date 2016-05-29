import BaseStore from './base_store';
import { todoService } from '../services/todo_service';
import { registerStore } from './register_store';
import { observable, action } from 'mobx';

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

  static createTodo() {
    return {
      description : "",
      status : "waiting",
      done : false
    }
  }

  static getFormStore(_todo) {
    return {
      // keep the todo before the modification
      todo : _todo,

      @observable description : _todo.description,
      @observable status : _todo.status,
      @observable done : _todo.done,
      @observable descriptionError : "",
      @observable statusError : "",

      isError : false,

      @action
      reset : function() {
        this.description = "";
        this.status = "";
        this.done = false;
      },

      @action
      isValidate : function() {
        this.isError = false;
        this.descriptionError = '';
        this.statusError = '';

        if (!this.description) {
          this.descriptionError = "Enter a description";
          this.isError = true;
        }

        if (!this.status) {
          this.statusError = "Enter a status";
          this.isError = true;
        }
        return this.isError === false;
      },

      @action
      getTodo : function() {
        this.todo.description = this.description
        this.todo.status = this.status
        this.todo.done = this.done
        return this.todo
      }
    }
  }
}

