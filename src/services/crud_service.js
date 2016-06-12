import axios from 'axios';
import { API_URL, HEADERS, PARAMETERS } from './const_service';
import { dispatch } from '../helpers/dispatcher';

export default class CrudService {
  constructor() {
    this.service = "need_to_be_set_by_the_extend_class";
  }

  add(store, entity, next, err) {
    axios.post(`${API_URL}/${this.service}?${PARAMETERS()}`, entity, HEADERS())
    .then(response => {
      dispatch(next(store, response.data)); 
    })
    .catch(response => dispatch(err(store, response.data)));
  };

  delete(store, entity, next, err) {
    axios.delete(`${API_URL}/${this.service}/${entity._id}?${PARAMETERS()}`, HEADERS())
    .then(response => {
      dispatch(next(store, entity)); 
    })
    .catch(response => dispatch(err(store, response.data)));
  };

  update(store, entity, next, err) {
    axios.put(`${API_URL}/${this.service}?${PARAMETERS()}`, entity, HEADERS())
    .then(response => {
      dispatch(next(store, response.data)); 
    })
    .catch(response => dispatch(err(store, response.data)));
  };

  getAll(store, next, err) {
    axios.get(`${API_URL}/${this.service}?${PARAMETERS()}`, HEADERS())
    .then(response => {
        dispatch(next(store, response.data));
    })
    .catch(response => dispatch(err(store, response.data)));
  };
}

