import ReactDOM from 'react-dom';
import { observable, action } from 'mobx';

class TabbarStore {
  @observable tabbarStores = []
  @observable current = -1

  getCurrentId() {
    return this.current
  }

  getCurrentStore() {
    return this.tabbarStores[this.current]
  }

  getStores() {
    return this.tabbarStores
  }

  @action
  closeAll() {
    this.tabbarStores = []
    this.current = -1
  }

  @action
  select(idx) {
    this.tabbarStores[this.current].display = 'none'
    this.tabbarStores[idx].display = 'block'
    this.current = Number(idx)
  }

  @action
  show(component, title) {
    if (this.current > -1) {
      this.tabbarStores[this.current].display = 'none'
    }
    this.tabbarStores.push(TabbarStore.createStore())
    this.current = this.tabbarStores.length - 1
    this.tabbarStores[this.current].id = this.current
    this.tabbarStores[this.current].title = title ? title : 'na'
    this.tabbarStores[this.current].display = 'block'

    // need a set timeout, because the current action must terminate
    // to re-render of the tabbar. After that it's possible
    // to render the component into the div
    setTimeout( () => ReactDOM.render( component , 
      document.querySelector(`#tab${this.current}`)),1)
  }

  @action
  close(idx) {
    this.tabbarStores.splice(idx,1)
    this.current = idx - 1
    if (this.current == -1 && this.tabbarStores.length > 0) {
      this.current = 0  
    }
    // change the ID of the other tab
    if (this.current > -1) {
      this.tabbarStores[this.current].display = 'block'
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
export let tabbarStore = new TabbarStore()