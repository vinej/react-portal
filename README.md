# reactboard
An exemple DashBoard application using React / Redux and Mobx

## Installation
* npm install
* npm start

Notes: 
* You need to install 'reactboardserver' to run the application

* This example is built with the help of Stephen Grider course 'Advanced React with Redux' (excellent) and some Internet information about Mobx.  

## Goal

The goal is to experiment using React/Redux/Mobx in the same application
* Redux manages the flux pattern
* Mobx manages the stores with the observable pattern

I'm sure there is a better way to have a flux pattern with Mobx to use mutable data!, but I like Redux and Mobx. 
Why not use both ?

## Compare  React/Redux with React/Redux/Mobx

With React/Redux/Mobx

* Stores use mutable data
* Stores are update through reducers
* Components are refreshed with Mobx @obserser decorator
* Components use stores directly (not need to use MapStateToProps)
* Components use stores in read only mode when the flux pattern is needed
* Components use stores in read/write mode (it's the exception) for input fields. There is no plus value to go through each reducers for every key stroke during input. Il you want to be 100% flux pattern, you could launch an action creator at every change value
* Stores attributes are observables with the @observable decorator
* Redux 'connect' uses only actions, stores are manage by Mobx
* Stores are singletons or standards classes
* Standards classes stores are passed as parameter to the action creator to keep the independance of the components. In a DashBoard, the same component could be use many times with theirs own store to implement local filtering, sorting, etc...

JYV










