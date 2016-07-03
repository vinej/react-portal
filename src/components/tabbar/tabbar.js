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
    dispatch(tabbarSelect(this.props.componentId))
  }

  handleOnClose() {
    dispatch(tabbarClose(this.props.componentId))
  }

  renderClose(visible){
    if (visible === true ){
      return (
          <sup><span style={{ 'marginLeft' : '5px' }} /><a className='fa fa-close fa-sm' onClick={ this.handleOnClose } 
          style={{ 'color': 'red'}}></a></sup>
      )
    }
  }

  render() {
    return (
      <li onClick={ this.handleOnClick } key={this.props.componentId} value={this.props.componentId} >
        {this.props.title}
        { this.renderClose(this.props.visible) }
      </li>
    )
  }
}

@observer
class TabBar extends Component {
  render() {
    const stores = tabbarStore.getStores()
    const count = stores.length - 1
    return (
      <div className='rp-tabbar-content'>
        <ul className="rp-tabbar">
          { stores.map( (store, idx) => 
            <TabBarItem key={store.componentId} componentId={store.componentId} title={store.title} visible={ store.display === 'block'} />
            )
          } 
        </ul>
    </div>
    )
  }
}
export default TabBar;
