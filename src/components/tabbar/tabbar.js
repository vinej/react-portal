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
    dispatch(storeSelectTab(tabBarStore.getCurrentStore(), event.target.value))
  }

  handleOnClose(event) {
    dispatch(storeCancelTab(tabBarStore.getCurrentStore()))
  }

  render() {
    return (
      <span className='nav-item tabbar'>
        <a onClick={ this.handleOnClose }> Close this tab -> </a>
        <select onChange={ this.handleOnChange } value={tabBarStore.current}>
          <option _id="-1" key="-1" disabled="true">Choose a tab</option>
          { tabBarStore.getStores().map( (store, idx) => 
            <option _id={idx} key={idx} value={idx}>{store.title}</option>
            )
          } 
        </select>
      </span>
    )
  }
}
export default TabBar;
