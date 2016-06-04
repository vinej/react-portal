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
    if (event.target.value == null) { return }
    dispatch(storeSelectTab(tabBarStore.getCurrentStore(), event.target.value))
  }

  handleOnClose(event) {
    dispatch(storeCancelTab(tabBarStore.getCurrentStore()))
  }

  render() {
    return (
      <div className='tabbarcontent'>
        <ul className="tabbar">
          { tabBarStore.getStores().map( (store, idx) => 
            <li onClick={this.handleOnChange}
                _id={idx} key={idx} value={idx}>{store.title}
              <sup><a className='fa fa-close fa-sm' onClick={this.handleOnClose} 
              style={{ 

                'color': 'lightgray'}}></a></sup>
            </li>
            )
          } 
        </ul>
    </div>
    )
  }
}
export default TabBar;
