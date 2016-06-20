import * as t from '../types/todo_types';

export function todoDone(store,record) {
  return  {
    type: t.TODO_DONE,
    store: store,
    payload: record
  };
}
