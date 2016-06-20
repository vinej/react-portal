import Signin from '../src/components/auth/signin'
import { authStore } from '../src/stores/auth_store'
import { signinForm, signupForm } from '../src/forms/signin_form'
import { renderComponent , expect } from './test_helper';

describe('Authentification' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Signin, { store: authStore, form: signinForm});
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

  it('bad signin', () => {
    component.find('input[name="email"]').simulate('change', 'jyv');
    component.find('input[name="password"]').simulate('change', 'sds');
    component.find('button').simulate('click');
    // need that to be able to rerender the component before validating the result
    setTimeout( () => expect(component.find('div[class="alert alert-danger"]')).to.exist,1);
  });

  it('good signin', () => {
    component.find('input[name="email"]').simulate('change', 'jyvinet@hotmail.ca');
    component.find('input[name="password"]').simulate('change', 'test');
    component.find('button').simulate('click');
    expect(component.find('div[class="alert alert-danger"]')).not.to.exist;
  });
});

