import Form from './form'

export let signupForm = new Form(
  { 
    email: '',  
    name: '', 
    password: '', 
    passwordConfirm : '' 
  }
  , 
  { 
    email: {
      errorMessage: 'Required!',
      fn: (field, fields) => {
        return (field.value || '').length > 0;
      }
    },
    name:  {
      errorMessage: 'Required!',
      fn: (field, fields) => {
        return (field.value || '').length > 0;
      }
    },
    password: {
      fn: (field, fields) => {
        return new Promise((resolve, reject) => {
          if ((field.value || '').length === 0) {
            reject({ error: 'Required!'});
            return;
          }
          if (field.value === fields.email.value) {
            reject({ error: 'Password cannot be the same as the email'});
            return;
          }
          resolve();
        });
      }
    },
    passwordConfirm : {
      errorMessage: 'Both passwords are not equal!',
      fn: (field, fields) => {
        return new Promise((resolve, reject) => {
          if ((field.value || '').length === 0) {
            reject({ error: 'Required!'});
            return;
          }
          if (field.value !== fields.password.value) {
            reject({ error: 'Both passwords are not equal!'});
            return;
          }
          resolve();
        });
      }
    }
  }
)

