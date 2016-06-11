import { observable, action } from 'mobx';

class TabbarStore {
  @observable tabbarStores = []
  @observable current = -1

  getCurrentId() {
    return this.current
  }

  getCurrentComponentId() {
    return this.tabbarStores[this.current].componentId
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
  show(componentId, title, type) {
    if (this.current > -1) {
      this.tabbarStores[this.current].display = 'none'
    }
    this.tabbarStores.push(TabbarStore.createStore())
    this.current = this.tabbarStores.length - 1
    this.tabbarStores[this.current].id = this.current
    this.tabbarStores[this.current].title = title ? title : 'na'
    this.tabbarStores[this.current].type = type ? type : 'dashboard'
    this.tabbarStores[this.current].componentId = componentId ? componentId : '0'
    this.tabbarStores[this.current].display = 'block'
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
      type: '',         // dashboard , page
      id : 0,
      componentId : ''
    }      
  }
}
export let tabbarStore = new TabbarStore()