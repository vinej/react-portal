import { authError, authSignInUp } from '../actions/auth_actions';
import axios from 'axios';
import { ROOT_URL } from './const_service';

class AuthService {
  signIn(dispatch, { email, password }, next, err) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      dispatch(next(response.data.token, response.data.name)); 
    })
    .catch(response => dispatch(err(response.data)));
  };

  signUp(dispatch, { email, password, name }, next, err) {
    axios.post(`${ROOT_URL}/signup`, { email, password, name })
    .then(response => {
      dispatch(next(response.data.token, name)); 
    })
    .catch(response => dispatch(err(response.data)));
  };
}
export let authService = new AuthService();

