import { todoService } from '../services/todo_service';
import * as t from '../types/todo_types';

export function todoNextPage(store) {
  return {
    type: t.TODO_NEXT_PAGE,
    store: store
  };
}

export function todoPreviousPage(store) {
  return {
    type: t.TODO_PREVIOUS_PAGE,
    store: store
  };
}

export function todoDelete(store,todo) {
  return function(dispatch) {
    todoService.delete(dispatch, store, todo);
  };
}

export function todoDeleteIt(store,todo) {
  return {
    type: t.TODO_DELETE,
    store: store
  };
}

export function todoUpdate(store,todo) {
  return function(dispatch) {
    todoService.update(dispatch, store, todo);
  };
}

export function todoUpdateIt(store,todo) {
  return {
    type: t.TODO_UPDATE,
    store: store
  };
}

export function todoAdd(store,todo) {
  return function(dispatch) {
    todoService.add(dispatch, store, todo);
  };
}

export function todoAddIt(store,todo) {
  return {
    type: t.TODO_ADD,
    store: store
  };
}

export function todoGetAll(store) {
  return function(dispatch) {
    todoService.getAll(dispatch, store);
  };
} 

export function todoSetAll(store, data) {
  return {
     type: t.TODO_SET_ALL, 
     store : store,
     payload: data 
  }
}

export function todoError(store, error) {
  return {
    type: t.TODO_ERROR, 
    store : store,
    payload : error 
  }
}
