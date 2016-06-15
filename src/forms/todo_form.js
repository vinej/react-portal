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

export function todoFormSet(todo, editTodo) {
  editTodo.description.init(todo.description)
  editTodo.status.init(todo.status)
}

export function todoFormGet(todo, editTodo) {
  todo.description = editTodo.description.value
  todo.status = editTodo.status.value
}
