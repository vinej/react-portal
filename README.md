# react-portal

A full cycle example of a Dashboard using React, Mobx and ReMux, a Flux pattern inspired by Redux

ReMux stand for **Re**act **M**obx Fl**ux** pattern and it's inspired by Redux. The react-portal don't use the ReMux pattern exacly as defined here : https://github.com/vinej/react-remux, because the pattern was improved after developing react-portal

History: 

* 0.6.14 - First stable beta version
* 0.6.15 - Dispatcher optimization, react-grid-layout resize bug

For a simple starter see : https://github.com/vinej/react-remux

## Features

* A boilerplate for React/Mobx and a REST server
  * npm start       => development mode
  * npm run build   => production mode
  * npm run test    => run mocha test
  * npm run dist    => create distribution files
* A full CRUD TODO example : view -> action -> middleware -> service(ajax call) ->  reducer -> store -> view
* Authentification with a JWT token
* Authorization (which actions the user can do)
* A scalable dispatcher 
* Resolvers (logger, thunk, autorization, ...) like reducers/middlewares
  * 3 types of resolver (pre , std, post)
* Form validation and abstraction (from Michel Weststrate)
* Movable Popup modal form 
* Tab Bar 
* Dynamic widgets and dashboards with auto save profile
* Unit test with mocha,chai,chai-jquery and enzyme  (only some tests for now)
  * test_helper from Stephen Grider
  * test_resolver to test action content and dispatch calls
  * test promise to test asychrone calls
  * MockxxxxService to mock the service layer
* Normalize CSS with knacss (normalize with steoride)
* React-Intl setup for international support (en, fr by default)
* ChartJS, AgGrid integration

## Installation
* install nodejs
* npm install -g mocha
* npm install
* npm start
* use the portal
 * signup for the first time : after that use 'signin'
 * use the option : Create a new Dashboard
 * use the option : Add Widgets into the current Dashboard
 * use the option : Rename the current Dashboard as needed
 * use the option : Show/Hide Dashboards to show or hide dashboards
 * move widgets by dragging them around with the green header
 * you can remove widgets from a Dashboard with the "X" icon
 * you can open a widget into its own tab with the "folder" icon
 * you can close a Dashboard with the red small "X"

Notes: 
* You need to install 'react-portal-server' to run the application

* There are 2 servers 
  * the REST server on port 3090        npm run dev
  * the WebSocket server on port 5000   npm run wss

* This example is built with the help of Stephen Grider course 'Advanced React with Redux' (excellent) and some Internet information about Mobx.  

## Goals

The first goal is to experiment using React/Mobx and a Flux pattern like Redux. The second goal is to implement enough features to have a base Framework to start a real project. After one month of testing and implementing real features with the flux pattern I can say that Mobx fulfills my expectations. 

## Why use a Flux pattern with Mobx

There is no obligation to use a Flux pattern with Mobx if your application is simple. During the last year, I worked on a Dashboard implementation and the customer asked me to audit all actions from the users. If you have a Flux pattern, it's very easy to do : you just add a resolver (middleware). Without it, it could become complexe to implement it. So, you must use a Flux pattern when you know that you will deal with this kind of feature.

## Compare  React/Redux with React/ReMux

With React/ReMux

* Stores use mutable data
* Stores contain actions with Mobx @action decorator
* Stores actions are called through resolvers to update the data 
  * Resolvers are something like reducers from Redux and middlewares. The goal of a resolver is to decide what to do with an action
* Stores are passed as props to Components (must of the time)
* Stores attributes are observables with the @observable decorator
* Stores are singletons or intance classes as needed

* Components are refreshed with Mobx @obserser decorator
* Components props are validated with 'propTypes'
* Components use model shape to validate entity with React.PropTypes.shape
* Components use 'dispatch' function to dispatch actions creator
* Components must use stores' data in read only mode

## Dashboard example

![db](https://cloud.githubusercontent.com/assets/3254214/16365417/a86e9fe4-3bcd-11e6-8d1b-4084ef151d41.png)

JYV










