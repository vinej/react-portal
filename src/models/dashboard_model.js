import React from 'react'

export default class DashboardModel {

  static shape() {
    return {
      _id : React.PropTypes.string,
      title  : React.PropTypes.string,
      isHidden : React.PropTypes.bool,
      widgets : React.PropTypes.array
    }
  }

  static create(title) {
    return {
      _id : null,
      title  : title,
      isHidden : false,
      widgets : []
    }
  }
}
