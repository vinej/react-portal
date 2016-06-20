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
});

