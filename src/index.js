import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { authCheckToken } from './actions/auth_actions';

import App from './components/app';
import Dashboard from './components/dashboard';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Users from './components/users';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import { simulateEvent} from './helpers/simulate_event';
import { dispatch } from './helpers/dispatcher';

// launch the web socket service client side
require("./services/wss_service");

require("./helpers/string.js");
require("./styles/style.css");
require("../node_modules/react-grid-layout/css/styles.css")
require("../node_modules/react-resizable/css/styles.css")

// check the current user info : token
dispatch(authCheckToken());

ReactDOM.render(
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
  , document.querySelector('#app'));

//const socket = require('socket.io-client')("http://localhost:3090/socketio");
//socket.withCredentials = false;
// socket.on('connect', function() {
//    socket.on('action', function(data) { console.log(data) } );
//    socket.on('disconnect', function() { console.log('disconnect') } );
//     });
//     