import React, { Component } from 'react';
import { observer } from "mobx-react";
import { tabBarStore } from '../stores/tabbar_store'
import Tab from './tabbar/tab'

@observer
class Main extends Component {
  render() {
    return (
      <div>
        { tabBarStore.getStores().map( store => 
          <Tab key={store.id} _id={store.id} store={store}/> )
        }
      </div>
    )
  }
}
export default Main;