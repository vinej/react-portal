import React, { Component } from 'react';
import { observer } from "mobx-react";;
import { Link } from 'react-router';
import { tabbarStore } from '../../stores/tabbar_store';
import { dispatch } from '../../helpers/dispatcher';
import { tabbarClose, tabbarSelect } from '../../actions/tabbar_actions';

@observer
class TabBarItem extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
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
    console.log('render tab bar item')
    return (
      <li onClick={ this.handleOnClick }
          _id={this.props.idx} key={this.props.idx} value={this.props.idx}>{this.props.title}
        <sup><a className='fa fa-close fa-sm' onClick={() => this.handleOnClose(this.props.idx)} 
        style={{ 'color': 'lightgray'}}></a></sup>
      </li>
    )
  }
}

@observer
class TabBar extends Component {
  render() {
    return (
      <div className='tabbarcontent'>
        <ul className="tabbar">
          { tabbarStore.getStores().map( (store, idx) => 
            <TabBarItem key={idx} idx={idx} title={store.title} />
            )
          } 
        </ul>
    </div>
    )
  }
}
export default TabBar;
