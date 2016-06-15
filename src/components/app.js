import React, { Component } from 'react'
import Popup from './popup'
import Header from './header'
import Footer from './footer'
import Dashboard from './dashboard/dashboard'
import DevTools from 'mobx-react-devtools'
import { popupStore } from '../stores/popup_store'
import { observer } from "mobx-react";

@observer
class App extends Component {
  render() {
    return (
      <div>
        { popupStore.getStores().map( store => 
          <Popup _id={store.id} key={store.id} store={store}>
            { store.component }
          </Popup>
          )
        }
        <Header className="widgetheader"/>
        <main class="Site-content">
          {this.props.children}

        </main>
        {/* <DevTools /> } */}
        <Footer />
      </div>
    )
  }
}
export default App;