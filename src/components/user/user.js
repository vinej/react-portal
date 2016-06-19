import React, { Component } from 'react'
import { observer } from "mobx-react"
import * as actions from '../../actions/user_actions'
import { dispatch } from '../../helpers/dispatcher'
import UserStore from '../../stores/user_store'
import UserModel from '../../models/user_model'

@observer // need observer to update a row when a note is modified
export default class User extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  static propTypes = {
    store:  React.PropTypes.instanceOf(UserStore),  
    user:  React.PropTypes.shape(UserModel.shape())  
  }

  handleDelete(user) {
    dispatch(actions.userDelete(this.props.store, user))
  } 

  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user._id}</td>
        <td><i onClick={ () => this.handleDelete(user)} className="fa fa-trash"/></td>
      </tr>
    )
  }
}
