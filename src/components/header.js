import React, { Component } from 'react';
import { observer } from "mobx-react";;
import { Link } from 'react-router';
import { authStore } from '../stores/auth_store';
import TabBar from './tabbar/tabbar'
import WidgetTool from './dashboard/widget_tool'
import SearchTool from './dashboard/search_tool'

@observer
class Header extends Component {
  renderLinks() {
    if ( authStore.authenticated ) {
      // show a link to sign out
      return [
        <li className="nav-item" key={1} style={{ float: 'right'}}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ];
    } else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={2} style={{ float: 'right'}}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>,
        <li className="nav-item" key={1} style={{ float: 'right'}}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>
      ];
    }
  }

  renderTools() {
    if ( authStore.authenticated ) {
      return [
        <li className="nav-item" key={3} style={{ float: 'right'}}>
          <WidgetTool />
        </li>
      ];
    }
  }

  renderSearchTools() {
    if ( authStore.authenticated ) {
      return [
        <li className="nav-item" key={4} style={{ float: 'right'}}>
          <SearchTool />
        </li>
      ]
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light nav-portal">
          <Link to="/" className="navbar-brand">React Portal: Welcome {authStore.name}</Link>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
            {this.renderTools()}
            {this.renderSearchTools()}
          </ul>
        </nav>
        <TabBar />
      </div>
    );
  }
}
export default Header;
