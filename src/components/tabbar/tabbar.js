import React, { Component } from 'react';
import { observer } from "mobx-react";;
import { Link } from 'react-router';
import { tabBarStore } from '../../stores/tabbar_store';
import { dispatch } from '../../helpers/dispatcher';
import { tabbarClose, tabbarSelect } from '../../actions/tabbar_actions';

@observer
class TabBar extends Component {

  constructor() {
    super()
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClick(event) {
    if (event.target.value == null) { return }
    dispatch(tabbarSelect(event.target.value))
  }

  handleOnClose(idx) {
    dispatch(tabbarClose(idx))
  }

  render() {
    return (
      <div className='tabbarcontent'>
        <ul className="tabbar">
          { tabBarStore.getStores().map( (store, idx) => 
            <li onClick={ this.handleOnClick}
                _id={idx} key={idx} value={idx}>{store.title}
              <sup><a className='fa fa-close fa-sm' onClick={() => this.handleOnClose(idx)} 
              style={{ 'color': 'lightgray'}}></a></sup>
            </li>
            )
          } 
        </ul>
    </div>
    )
  }
}
export default TabBar;
