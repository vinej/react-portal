import Form from './form'

export let signinForm = new Form(
  { 
    email: '', 
    password: ''
  },
  {
    email: {
      errorMessage: 'Required!',
      fn: (field, fields) => {
        return (field.value || '').length > 0;
      }
    },
    password: {
      // this is the validation
      fn: (field, fields) => {
        return new Promise((resolve, reject) => {
          // simulate server validation
          setTimeout(() => {
            if ((field.value || '').length === 0) {
              reject({ error: 'Required!'});
              return;
            }
            if (field.value === fields.email.value) {
              reject({ error: 'Password cannot be the same as the email'});
              return;
            }
            resolve();
          }, 2);
        });
      }
    }
})

