import axios from 'axios'
import { ROOT_URL, HEADERS, PARAMETERS } from './const_service'
import { dispatch } from '../helpers/dispatcher'

export default class AuthService {
  constructor() {
    this.instanceService = null
  }

  static setInstance(instanceService) {
    this.instanceService = instanceService
  }

  static getInstance() {
    if (!this.instanceService) {
      this.instanceService = new AuthService()
    }
    return this.instanceService
  }

  signIn({ email, password }, next, err) {
    axios.post(`${ROOT_URL}/auth/signin?${PARAMETERS()}`, { email, password })
    .then(response => {
      dispatch(next(response.data.token, response.data.name)); 
    })
    .catch(response => dispatch(err(response.data)));
  }

  signUp({ email, password, name }, next, err) {
    axios.post(`${ROOT_URL}/auth/signup?${PARAMETERS()}`, { email, password, name })
    .then(response => {
      dispatch(next(response.data.token, name)); 
    })
    .catch(response => dispatch(err(response.data)));
  }

  setAuthorizations(render, next, err) {
    axios.get(`${ROOT_URL}/api/actions?${PARAMETERS()}`, HEADERS())
    .then(response => {
      dispatch(next(render, response.data))
    })
    .catch(response => {
      dispatch(err(response.data, render))
    })
  }
}


