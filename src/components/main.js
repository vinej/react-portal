import React, { Component } from 'react';
import { observer } from "mobx-react";
import { tabbarStore } from '../stores/tabbar_store'
import Tab from './tabbar/tab'

@observer
class Main extends Component {
  render() {
    return (
      <div>
        { tabbarStore.getStores().map( store => 
          <Tab key={store.id} _id={store.id} store={store}>
              { store.component }
          </Tab>
          )
        }
      </div>
    )
  }
}

export default Main;