import React, { Component } from 'react';
import { observer } from "mobx-react";;
import { Link } from 'react-router';
import { tabBarStore } from '../../stores/tabbar_store';
import { dispatch } from '../../helpers/dispatcher';
import { storeCancelTab, storeSelectTab } from '../../actions/base_actions';

@observer
class TabBar extends Component {

  constructor() {
    super()
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnChange(event) {
    console.log('onchange', event)
    tabBarStore.currentTab = event.target.value
    dispatch(storeSelectTab(null, event.target.value))
  }

  handleOnClose(event) {
    dispatch(storeCancelTab(tabBarStore.currentTab))
  }

  render() {
    return (
      <span className='nav-item tabbar'>
        <a onClick={ this.handleOnClose }> Close tab -> </a>
        <select onChange={ this.handleOnChange } >
        { tabBarStore.getStores().map( store => 
          <option _id={store.id} key={store.id} value={store.id}>{store.title}</option> )
        }
        </select>
      </span>
    )
  }
}
export default TabBar;
