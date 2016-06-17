# react-portal

A full cycle example of a Dashboard using React, Mobx and a Flux pattern inspired by Redux

## Features

* A boilerplate for React/Mobx and a REST server
* A full CRUD TODO example : view -> action -> middleware -> service(ajax call) ->  reducer -> store -> view
* Authentification with a JWT token
* Authorization (which actions the user can do)
* A scalable dispatcher 
* Resolvers (logger, thunk, autorization, ...) like reducers/middlewares
  * 3 types of resolver (pre , std, post)
* Form validation and abstraction (from Michel Weststrate)
* Popup modal form 
* Tab Bar 
* Dynamic widgets and dashboards

## Installation
* install nodejs
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

## Compare  React/Redux with React/Mobx/Dispatch

With React/Mobx/Dispatch

* Stores use mutable data
* Stores contain actions with Mobx @action decorator
* Stores actions are called through resolvers to update the data 
  * Resolvers are something like reducers from Redux and middlewares. The goal of a resolver is to decide what to do with an action
* Components are refreshed with Mobx @obserser decorator
* Components use 'dispatch' function to dispatch actions creator
* Components use stores' data directly (not need to use MapStateToProps)
 * like that you know the difference between stores' data and props
* Components must use stores' data in read only mode
* Components use stores' data in read/write mode (it's the exception) for input fields. There is no value to go through each reducer for every key stroke during input. If you want to follow at 100% the flux pattern, you could dispatch an action creator at every change value
* Stores attributes are observables with the @observable decorator
* Stores are singletons or standard classes
* Standard classes stores are passed as parameter to the action creator to keep the independance of the components. In a dashboard, the same component could be used multiple times and each component will have its own store to implement local filtering, sorting, etc...

## Dashboard example

![db](https://cloud.githubusercontent.com/assets/3254214/16101409/619ab15e-3333-11e6-8133-c9dd5eb27fd2.png)

JYV










