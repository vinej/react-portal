import React from 'react'
import ReactDOM from 'react-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { authCheckToken, authSetActions } from './actions/auth_actions'
import App from './components/app'
import Dashboard from './components/dashboard/dashboard'
import Main from './components/main'
import Signin from './components/auth/signin'
import Signout from './components/auth/signout'
import Signup from './components/auth/signup'
import Feature from './components/feature'
import Users from './components/user/users'
import RequireAuth from './components/auth/require_auth'
import Welcome from './components/welcome'
import { simulateEvent} from './helpers/simulate_event'
import { dispatch } from './helpers/dispatcher'

import { authStore } from './stores/auth_store'
import { signinForm } from './forms/signin_form'
import { signupForm } from './forms/signup_form'

import { qs } from './helpers/intl'

require("./helpers/translation.js")
const locale = qs["locale"] || 'en-US';
const localePrefix = locale.slice(0, locale.indexOf('-'));
const defaultApp = window.app['en'];
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr'
addLocaleData([...en, ...fr]);

//addLocaleData(window.ReactIntlLocaleData[localePrefix]);

// launch the web socket service client side
//require("./services/wss_service");
require("./helpers/string.js")
require("./styles/knacss.scss")
require("../node_modules/react-grid-layout/css/styles.css")
require("../node_modules/react-resizable/css/styles.css")
require("../node_modules/ag-grid/dist/styles/ag-grid.css")
require("../node_modules/ag-grid/dist/styles/theme-bootstrap.css")

var mainComponentsToRender = function() { 
  ReactDOM.render(
    <IntlProvider locale={locale} messages={window.app[localePrefix] || defaultApp}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Route path="signin" 
                component={ ({children}) =>
                  <Signin store={authStore} form={signinForm}>{children}</Signin> } />
          <Route path="signout" component={Signout} />
          <Route path="signup" 
                component={ ({children}) =>
                  <Signup store={authStore} form={signupForm}>{children}</Signup> } />
          <Route path="main" component={RequireAuth(Main)} />
          <Route path="dashboard" component={RequireAuth(Dashboard)} />
          <Route path="feature" component={RequireAuth(Feature)} />
        </Route>
      </Router>
    </IntlProvider>
    , document.querySelector('#app'));
}

// check the token of current user 
// we must fetch the user autorizations before rendering
// the main. It's for this reason that we pass the function
// to render to the authCheckToken
dispatch(authCheckToken(mainComponentsToRender))
  