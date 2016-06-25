import Signin from '../src/components/auth/signin'
import { authStore } from '../src/stores/auth_store'
import { signinForm, signupForm } from '../src/forms/signin_form'
import { renderComponent , expect } from './test_helper';
import AuthService from '../src/services/auth_service';
import MockAuthService from './services/auth_service';
import { setTestFunction } from '../src/resolvers/test_resolver';

describe('Authentification' , () => {
  let component;
  let instance;

  beforeEach(() => {
    const result = renderComponent(Signin, { store: authStore, form: signinForm});
    component = result.component
    instance = result.instance
  });

  afterEach(() => {
    setTestFunction(null)
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('email exist', () => {
    expect(component.find('input[name="email"]')).to.exist;
  });

  it('password exist', () => {
    expect(component.find('input[name="password"]')).to.exist;
  });

  it('bad signin with store', () => {
    var testPromise = new Promise(function(resolve, reject) {
      AuthService.setInstance(new MockAuthService())
      component.find('input[name="email"]').simulate('change', 'jyv');
      component.find('input[name="password"]').simulate('change', 'sds');
      setTestFunction(function() { 
        resolve(authStore.getError())
      })
      component.find('button').simulate('click');
    });

    return testPromise.then(function(result){
        expect(result).to.equal("Unauthorized");
    });
  });

  it('bad signin with component', () => {
    var testPromise = new Promise(function(resolve, reject) {
      AuthService.setInstance(new MockAuthService())
      component.find('input[name="email"]').simulate('change', 'jyv');
      component.find('input[name="password"]').simulate('change', 'sds');
      setTestFunction(function() { 
        resolve(component.find('div[class="rp-field-error"]'))
      })
      component.find('button').simulate('click');
    });

    return testPromise.then(function(result){
        expect(result).to.exist
    });
  });
});

