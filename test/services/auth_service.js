import { dispatch } from '../../src/helpers/dispatcher'

export default class MockAuthService {
  signIn({ email, password }, next, err) {
    if (email === 'jyvinet@hotmail.ca' && password === 'test') {
      dispatch(next('token', 'Jean-Yves'))
    } else {
      dispatch(err('Unauthorized'));
    }
  }

  signUp({ email, password, name }, next, err) {
    if (email === 'jyvinet@hotmail.ca' && password === 'test') {
      dispatch(next('token', 'Jean-Yves')) 
    } else {
      dispatch(err('Unauthorized'));
    }
  }

  setAuthorizations(render, next, err) {
    dispatch(next(render, 'token'))
  }
}