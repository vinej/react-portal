import React, { Component } from 'react';
import { observer } from "mobx-react";;

@observer
class Tab extends Component {
  render() {
    return (
      <div className="tab" 
            style={{ display : this.props.store.display }} >
        {this.props.children}
      </div>
    )
  }
}
export default Tab;
