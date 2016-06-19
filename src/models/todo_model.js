import React from 'react'

export default class TodoModel {
  static shape() {
    return {
      _id : React.PropTypes.string,
      description : React.PropTypes.string,
      status : React.PropTypes.oneOf(['waiting', 'freeze','completed','suspend']),
      done : React.PropTypes.bool
    }
  }

  static create() {
    return {
      _id : null,
      description : "",
      status : "waiting",
      done : false
    }
  }

  static setFormFields(todo, editTodo) {
    editTodo.description.init(todo.description)
    editTodo.status.init(todo.status)
  }


  static setTodoModel(editTodo, todo ) {
    todo.description = editTodo.description.value
    todo.status = editTodo.status.value
  }
}


