import { observable } from 'mobx';

class TabBarStore {
  @observable tabBarStores = []

  constructor() {
    this.currentTab = -1
    this.current = -1
  }

  getCurrentId() {
    return this.current
  }

  getCurrentStore() {
    return this.tabBarStores[this.current]
  }

  getStores() {
    return this.tabBarStores
  }

  select(id) {
    
  }

  show(title) {
    this.current = this.current + 1
    this.currentTab = this.current
    if (this.current > 1) {
      this.tabBarStores[this.current - 1].visibility = 'hidden';
    }
    this.tabBarStores.push(TabBarStore.createStore())
    this.tabBarStores[this.current].id = this.current
    this.tabBarStores[this.current].title = title
    this.tabBarStores[this.current].visibility = 'visible';
  }

  close(id) {
    this.current = this.current - 1
    this.currentTab = this.current
    this.tabBarStores.splice(id,1)
    this.select(this.current)
  }

  static createStore() {
    return {
      @observable visibility : 'hidden',
      @observable title : '',
      id : 0,
    }      
  }
}
export let tabBarStore = new TabBarStore()