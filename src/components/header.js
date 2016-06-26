import React, { Component } from 'react';
import { observer } from "mobx-react";;
import { Link } from 'react-router';
import { authStore } from '../stores/auth_store';
import TabBar from './tabbar/tabbar'
import WidgetTool from './dashboard/widget_tool'
import SearchTool from './dashboard/search_tool'
import { FormattedMessage } from 'react-intl'

@observer
class Header extends Component {

  renderLinks() {
    if ( authStore.authenticated ) {
      // show a link to sign out
      return [
        <span className='rp-rbar-item' key={1} >
          <Link to={"/signout"+window.location.search}><FormattedMessage id='app.signout'/></Link>
        </span>
      ];
    } else {
      // show a link to sign in or sign up
      return [
        <span className='rp-rbar-item' key={2} >
          <Link to={"/signup"+window.location.search}><FormattedMessage id='app.signup'/></Link>
        </span>,
        <span  className='rp-rbar-item' key={1} >
          <Link to={"/signin"+window.location.search}><FormattedMessage id='app.signin'/></Link>
        </span>
      ];
    }
  }

  renderTools() {
    if ( authStore.authenticated ) {
      return [
        <span  className='rp-rbar-item' key={3} >
          <WidgetTool />
        </span>
      ];
    }
  }

  renderSearchTools() {
    if ( authStore.authenticated ) {
      return [
        <span  className='rp-rbar-item' key={4} >
          <SearchTool />
        </span>
      ]
    }
  }

  render() {
    return (
      <div>
        <div className='rp-appbar kna-grid-2'>
          <div className='rp-lbar-item'> 
            <div>React Portal:&nbsp; 
              <FormattedMessage id="app.welcome"/>&nbsp;
              {authStore.name}
            </div>
          </div>
          <div>
            {this.renderLinks()}
            {this.renderTools()}
          </div>
        </div>
        <TabBar />
      </div>
    );
  }
}
export default Header;
