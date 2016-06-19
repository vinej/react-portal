import React from 'react'

export default class UserModel {
  static shape() {
    return {
      _id : React.PropTypes.string,
      name : React.PropTypes.string,
      email : React.PropTypes.string
    }
  }

  static create() {
    return {
      _id : null,
      name : "",
      email : ""
    }
  }

  static setFormFields(user, editUser) {
    editUser.name.init(user.name)
    editUser.email.init(user.email)
  }


  static setUserModel(editUser, user ) {
    user.name = editUser.name.value
    user.email = editUser.email.value
  }
}


