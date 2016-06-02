import { observable, action, transaction } from 'mobx';

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
  select(id) {
    console.log('select',id)
    this.tabBarStores[this.current].display = 'none';
    this.tabBarStores[id].display = 'block';
    this.current = Number(id)
  }

  @action
  show(title) {
    if (this.current > -1) {
      this.tabBarStores[this.current].display = 'none';
    }
    this.tabBarStores.push(TabBarStore.createStore())
    this.current = this.tabBarStores.length - 1
    this.tabBarStores[this.current].id = this.current
    this.tabBarStores[this.current].title = title ? title : 'na'
    this.tabBarStores[this.current].display = 'block';
  }

  @action
  close() {
    this.tabBarStores.splice(this.current,1)
    this.current = this.tabBarStores.length - 1
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
      @observable display : 'none',
      @observable title : '',
      id : 0
    }      
  }
}
export let tabBarStore = new TabBarStore()