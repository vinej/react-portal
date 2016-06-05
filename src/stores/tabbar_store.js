import ReactDOM from 'react-dom';
import { observable, action } from 'mobx';

class TabBarStore {
  @observable tabBarStores = []
  @observable current = -1

  getCurrentId() {
    return this.current
  }

  getCurrentStore() {
    return this.tabBarStores[this.current]
  }

  getStores() {
    return this.tabBarStores
  }

  @action
  closeAll() {
    this.tabBarStores = []
    this.current = -1
  }

  @action
  select(idx) {
    this.tabBarStores[this.current].display = 'none'
    this.tabBarStores[idx].display = 'block'
    this.current = Number(idx)
  }

  @action
  show(component, title) {
    if (this.current > -1) {
      this.tabBarStores[this.current].display = 'none'
    }
    this.tabBarStores.push(TabBarStore.createStore())
    this.current = this.tabBarStores.length - 1
    this.tabBarStores[this.current].id = this.current
    this.tabBarStores[this.current].title = title ? title : 'na'
    this.tabBarStores[this.current].display = 'block'

    // need a set timeout, because the current action must terminate
    // to re-render of the tabbar. After that it's possible
    // to render the component into the div
    setTimeout( () => ReactDOM.render( component , 
      document.querySelector(`#tab${this.current}`)),1)
  }

  @action
  close(idx) {
    this.tabBarStores.splice(idx,1)
    this.current = idx - 1
    if (this.current == -1 && this.tabBarStores.length > 0) {
      this.current = 0  
    }
    // change the ID of the other tab
    if (this.current > -1) {
      this.tabBarStores[this.current].display = 'block'
    }
  }

  static createStore() {
    return {
      display : 'none',
      title : '',
      id : 0
    }      
  }
}
export let tabBarStore = new TabBarStore()