# react-portal

A portal exemple using React, Mobx and a Flux pattern inspired by Redux

## Installation
* npm install
* npm start

Notes: 
* You need to install 'react-portal-server' to run the application

* This example is built with the help of Stephen Grider course 'Advanced React with Redux' (excellent) and some Internet information about Mobx.  

## Goal

The goal is to experiment using React/Mobx and a Flux pattern like Redux

## Compare  React/Redux with React/Mobx/Dispatch

With React/Mobx/Dispatch

* Stores use mutable data
* Stores are updated through reducers
  * I kept the same name as Redux, but they are not really reducers. I have to find a better term !
* Components are refreshed with Mobx @obserser decorator
* Components use 'dispatch' to dispatch action creator
* Components use stores directly (not need to use MapStateToProps)
* Components use stores in read only mode when the flux pattern is needed
* Components use stores in read/write mode (it's the exception) for input fields. There is no value to go through each reducer for every key stroke during input. If you want to be 100% flux pattern, you could launch an action creator at every change value
* Stores attributes are observables with the @observable decorator
* Stores are singletons or standard classes
* Standard classes stores are passed as parameter to the action creator to keep the independance of the components. In a dashboard, the same component could be used multiple times and each component will have its own store to implement local filtering, sorting, etc...

JYV










