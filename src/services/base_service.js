import axios from 'axios';
import { ROOT_URL } from './const_service';

export default class BaseService {
  constructor() {
    this.service = "need_to_be_set_by_the_extend_class";
  }

  add(dispatch, store, entity, next, err) {
    axios.post(`${ROOT_URL}/${this.service}`, entity, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch(next(store, entity)); 
    })
    .catch(response => dispatch(err(store, response.data)));
  };

  delete(dispatch, store, entity, next, err) {
    axios.delete(`${ROOT_URL}/${this.service}/${entity._id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch(next(store, entity)); 
    })
    .catch(response => dispatch(err(store, response.data)));
  };

  update(dispatch, store, entity, next, err) {
    axios.put(`${ROOT_URL}/${this.service}`, entity, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch(next(store, entity)); 
    })
    .catch(response => dispatch(err(store, response.data)));
  };

  getAll(dispatch, store, next, err) {
    axios.get(`${ROOT_URL}/${this.service}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
        dispatch(next(store, response.data));
    })
    .catch(response => dispatch(err(store, response.data)));
  };
}

