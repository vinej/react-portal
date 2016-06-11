import React, { Component } from 'react';
import { observer } from "mobx-react";;
import { Link } from 'react-router';
import { authStore } from '../stores/auth_store';
import TabBar from './tabbar/tabbar'
import WidgetTool from './dashboard/widget_tool'

@observer
class Header extends Component {
  renderLinks() {
    if ( authStore.authenticated ) {
      // show a link to sign out
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>,
      ];
    } else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  renderTools() {
      return [
        <li className="nav-item" key={1}>
          <WidgetTool />
        </li>,
      ];
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">React Portal: Welcome {authStore.name}</Link>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
            {this.renderTools()}
          </ul>
        </nav>
        <TabBar />
      </div>
    );
  }
}
export default Header;
