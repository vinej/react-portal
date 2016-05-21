import axios from 'axios';
import { ROOT_URL } from './const_service';
import { userSetAll, userError } from '../actions/user_actions';
//import BaseService from './base_service';

class UserService  {
 	getAll(store, dispatch) {
		axios.get(`${ROOT_URL}/users`)
		.then(response => {
				dispatch(userSetAll(store, response.data));
		})
		.catch((error) => {
				dispatch(userError(store, error));
		});
 	}
}
export let userService = new UserService();