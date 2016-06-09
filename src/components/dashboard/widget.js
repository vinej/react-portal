import React, { Component } from 'react';

class Widget extends Component {
  render() {
    return (
      <div>
        <div className="widgetheader">{ this.props.title }
          <i className="fa fa-refresh icon" onClick={this.props.onRefresh} />
          <i className="fa fa-folder-open icon" onClick={this.props.onOpenInTab } />
          <i className="fa fa-close icon" onClick={this.props.onClose} />
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default Widget;
