import React, { Component } from 'react';
import { observer } from "mobx-react";
import  UserStore from '../stores/user_store';
import * as actions from '../actions/user_actions';
import { connect } from 'react-redux';
import User from './user';

@observer  // need observer when we add, delete rows
class Users extends Component {

	constructor() {
		super();
		this.store = UserStore.create();
	}

	componentWillMount() {
		this.props.userGetAll(this.store);
	}

	render() {
		return ( 
			<div>
				<table className='table table-hoover' style={{ height: 400}}>
					<thead >
						<tr><th>Name</th><th>Desc</th><th>Id</th><th>DEL</th></tr>
					</thead>
					{/* note: always need a key */} 
					<tbody>
						{ this.store.page.map( user => 
							<User key={user._id} user={user} mstore={this.store} />
							)
						}
					</tbody>
				</table>
				<button onClick={ () => this.props.userPreviousPage(this.store) }>prev</button>
				<button onClick={ () => this.props.userNextPage(this.store) }>next</button>
			</div>
		)
	}
};
export default connect(null, actions)(Users);

