import { authError, authSignInUp } from '../actions/auth_actions';
import axios from 'axios';
import { ROOT_URL } from './const_service';

class AuthService {
	signIn(dispatch, { email, password }) {
		axios.post(`${ROOT_URL}/signin`, { email, password })
		.then(response => {
			dispatch(authSignInUp(response.data.token, response.data.name)); 
		})
		.catch(response => dispatch(authError(response.data)));
	};

	signUp(dispatch, { email, password, name }) {
		axios.post(`${ROOT_URL}/signup`, { email, password, name })
		.then(response => {
			dispatch(authSignInUp(response.data.token, response.data.name)); 
		})
		.catch(response => dispatch(authError(response.data)));
	};
}
export let authService = new AuthService();

