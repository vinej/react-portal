import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { authCheckToken, authSetActions } from './actions/auth_actions';

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
//require("./services/wss_service");

require("./helpers/string.js");
require("./styles/style.css");
require("../node_modules/react-grid-layout/css/styles.css")
require("../node_modules/react-resizable/css/styles.css")

var render = function() { 
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
}

// check the current user info : token
// we must fetch the user actions before rendering
// the DASHBOARD. Then we pass the render function
// to the set actions
dispatch(authCheckToken(render));
  