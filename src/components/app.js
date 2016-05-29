import React, { Component } from 'react';
import Header from './header';
import Dashboard from './dashboard/dashboard';
import DevTools from 'mobx-react-devtools';

class App extends Component {
  render() {
    return (
      <div>
        <Header className="widgetheader"/>
        {this.props.children}
        <DevTools />
      </div>
    );
  }
}
export default App;