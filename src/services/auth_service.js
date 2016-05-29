import { authError, authSignInUp } from '../actions/auth_actions'
import axios from 'axios'
import { ROOT_URL, HEADERS, PARAMETERS } from './const_service'
import { dispatch } from '../helpers/dispatcher'

class AuthService {
  constructor() {
    this.userActions = {}
    this.isInit = false
  }

  signIn({ email, password }, next, err) {
    axios.post(`${ROOT_URL}/auth/signin?${PARAMETERS}`, { email, password })
    .then(response => {
      dispatch(next(response.data.token, response.data.name)); 
    })
    .catch(response => dispatch(err(response.data)));
  }

  signUp({ email, password, name }, next, err) {
    axios.post(`${ROOT_URL}/auth/signup?${PARAMETERS}`, { email, password, name })
    .then(response => {
      dispatch(next(response.data.token, name)); 
    })
    .catch(response => dispatch(err(response.data)));
  }

  isActionAvailable(action) {
    return true;
    // Activate this code when all tre security will be implemented
    // if (this.isInit === false) {
    //   this.getActions(action, this.isActionAvailable);
    // }
    // return userActions[action.type]
  }

  clearCache() {
    this.isInit = false
    this.userActions = null
  }

  getActions(action) {
    axios.get(`${ROOT_URL}/api/actions?${PARAMETERS}`, HEADERS())
    .then(response => {
      this.userActions = response.data.reduce( (hash,elem) => hash[elem] = true , {} )
      this.isInit = true
      dispatch(action)
    })
    .catch(response => {
      this.isInit = false
      console.log('security service error', response.data)
      alert('security service error, not connected to the server!')
    })
  }
}
export let authService = new AuthService();

