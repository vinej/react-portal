import React, { Component } from 'react';
import { observer } from "mobx-react";;

@observer
class Tab extends Component {
  render() {
    return (
      <div className="tab" id={`tab${this.props._id}`} 
            style={{ visibility : this.props.store.visibility }} /> 
    )
  }
}
export default Tab;
