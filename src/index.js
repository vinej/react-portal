import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { authCheckToken } from './actions/auth_actions';
import { logger } from './middleware';
import reducers from './reducers';

import App from './components/app';
import Dashboard from './components/dashboard';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Users from './components/users';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';

require("./helpers/string.js");
require("./styles/style.css");
require("../node_modules/react-grid-layout/css/styles.css")
require("../node_modules/react-resizable/css/styles.css")

// if you want a logger for all action
//const createStoreWithMiddleware = applyMiddleware(logger, reduxThunk)(createStore);
 
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// the redux store is not really use in the application
// we only use redux to have a flux implementation with
// middleware, actions, reducers. stores are really managed
// by mobx
const store = createStoreWithMiddleware(reducers);
// check the current user info
store.dispatch(authCheckToken());

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Welcome} />
				<Route path="signin" component={Signin} />
				<Route path="signout" component={Signout} />
				<Route path="signup" component={Signup} />
				<Route path="dashboard" component={RequireAuth(Dashboard)} />
				<Route path="feature" component={RequireAuth(Feature)} />
			</Route>
		</Router>
	</Provider>
	, document.querySelector('#app'));
