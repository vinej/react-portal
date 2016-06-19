import Form from './form'

export let todoForm = new Form(
  { 
    description: '', 
    status: 'waiting'
  }
  ,
  {
    description: {
      errorMessage: 'Required!',
      fn: (field, fields) => {
        return (field.value || '').length > 0;
      }
    },
    status: {
      errorMessage: 'Required!',
      fn: (field, fields) => {
        return (field.value || '').length > 0;
      }
    }
  }
)
