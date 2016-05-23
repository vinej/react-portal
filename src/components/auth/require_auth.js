import React, { Component } from 'react';
import { observer } from "mobx-react";
import { authStore } from '../../stores/auth_store';


@observer
export default function(ComposedComponent) {
	class Authentication extends Component {

		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if (!authStore.authenticated) {
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if (!authStore.authenticated) {
				this.context.router.push('/');
			}
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	return Authentication;
}
