import { 
  todoAddIt, 
  todoDeleteIt, 
  todoUpdateIt, 
  todoSetAll, 
  todoError } from '../actions/todo_actions';
import axios from 'axios';
import { ROOT_URL } from './const_service';

class TodoService {
  add(dispatch, store, todo) {
    axios.post(`${ROOT_URL}/todos`, todo, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch(todoAddIt(store, todo)); 
    })
    .catch(response => dispatch(todoError(response.data)));
  };

  delete(dispatch, store, todo) {
    axios.delete(`${ROOT_URL}/todos/${todo._id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch(todoDeleteIt(store, todo)); 
    })
    .catch(response => dispatch(todoError(response.data)));
  };

  update(dispatch, store, todo) {
    axios.put(`${ROOT_URL}/todos`, todo, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch(todoUpdateIt(store, todo)); 
    })
    .catch(response => dispatch(todoError(response.data)));
  };

  getFakeTodo() {
    var list = [];
    for(var i = 0; i < 100; i++) {
      list.push( { "_id": `${i}`, "description":`Fake todo ${i}`, "status":"waiting" } );
    }
    return list;
  }

  getAll(dispatch, store) {
    axios.get(`${ROOT_URL}/todos`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
      if (response.data.length == 0) {
        console.log("using fake todo");
        dispatch(todoSetAll(store, this.getFakeTodo())); 
      } else {
        dispatch(todoSetAll(store, response.data)); 
      }
    })
    .catch(response => dispatch(todoError(response.data)));
  };
}
export let todoService = new TodoService();

