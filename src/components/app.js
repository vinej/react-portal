import React, { Component } from 'react';
import Header from './header';
import Dashboard from './dashboard';
// ACTIVATE this tools to see the refreeh of components
//import DevTools from 'mobx-react-devtools';

class App extends Component {
  render() {
    return (
      <div>
        <Header className="widgetheader"/>
        {this.props.children}
        { /* ACTIVATE this tools to see the refreeh of components */ }
        { /* <DevTools /> */ }
      </div>
    );
  }
}
export default App;