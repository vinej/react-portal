import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from "mobx-react";
import { tabbarStore } from '../stores/tabbar_store'
import Tab from './tabbar/tab'
import Dashboard from '../components/dashboard/dashboard'

@observer
class Main extends Component {
  render() {
    return (
      <div>
        { tabbarStore.getStores().map( store => 
          <Tab key={store.componentId} _id={store.componentId} store={store}>
              { store.component() }
          </Tab>
          )
        }
      </div>
    )
  }
}

export default Main;