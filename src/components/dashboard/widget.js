import React, { Component } from 'react';

class Widget extends Component {
  render() {
    return (
      <div>
        <div className="rp-widget-header">{ this.props.title }
          <i className="fa fa-refresh rp-widget-icon" onClick={this.props.onRefreshWidget} />
          <i className="fa fa-folder-open rp-widget-icon" onClick={this.props.onOpenWidgetInTab } />
          <i className="fa fa-close rp-widget-icon" onClick={this.props.onRemoveWidget} />
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default Widget;
