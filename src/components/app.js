import React, { Component } from 'react';
import Popup from './popup';
import Header from './header';
import Dashboard from './dashboard/dashboard';
import DevTools from 'mobx-react-devtools';

class App extends Component {
  render() {
    return (
      <div>
        <Popup />
        <Header className="widgetheader"/>
        {this.props.children}
      </div>
    );
  }
}
export default App;