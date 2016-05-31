import React, { Component } from 'react'
import Popup from './popup'
import Header from './header'
import Dashboard from './dashboard/dashboard'
import DevTools from 'mobx-react-devtools'
import { popupStore } from '../stores/popup_store'
import { observer } from "mobx-react";

@observer
class App extends Component {
  render() {
    return (
      <div>
        <div>
          { popupStore.getStores().map( store => 
            <Popup _id={store.id} key={store.id} store={store} /> )
          }
        </div>
        <Header className="widgetheader"/>
        {this.props.children}
        <DevTools />
      </div>
    )
  }
}
export default App;