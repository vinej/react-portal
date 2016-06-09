import React, { Component } from 'react';

class Widget extends Component {
  render() {
    return (
      <div>
        <div className="widgetheader">{ this.props.title }
          <i className="fa fa-refresh icon" onClick={this.props.onRefreshWidget} />
          <i className="fa fa-folder-open icon" onClick={this.props.onOpenWidgetInTab } />
          <i className="fa fa-close icon" onClick={this.props.onRemoveWidget} />
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default Widget;
