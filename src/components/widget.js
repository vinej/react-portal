import React, { Component } from 'react';
import { connect } from 'react-redux';

class Widget extends Component {
	render() {
		return (
			<div>
				<div className="widgetheader">{ this.props.title }
					<i className="fa fa-refresh icon" onClick={this.props.onRefresh} />
					<i className="fa fa-bell icon" onClick={this.props.onNotification }/>
					<i className="fa fa-gear icon" onClick={this.props.onTools}/>       
				</div>
				{this.props.children}
			</div> 
		);
	}
}
export default connect()(Widget);
