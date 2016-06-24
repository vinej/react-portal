import { observable, action } from 'mobx';
import ReactDOM from 'react-dom';

export default class PopupStore {

  @observable popupStores = []

  constructor() {
    this.current = -1
  }

  static getStandardDimension() {
    return { width: '50%', height: '200px', left: '50%', top: '100px' }
  }

  static getSmallDimension() {
    return { width: '30%', height: '200px', left: '60%', top: '100px' }
  }

  getCurrentId() {
    return this.current
  }

  getCurrentStore() {
    return this.popupStores[this.current]
  }

  getStores() {
    return this.popupStores
  }

  @action
  show(component) {
    this.current = this.current + 1
    if (this.current > 1) {
      this.popupStores[this.current - 1].display = 'none';
    }
    const store = PopupStore.createStore()
    this.popupStores.push(store)

    store.id = this.current
    store.display = 'block';
    store.component = component;
  }

  @action
  close() {
    this.current = this.current - 1
    this.popupStores.pop()
    if (this.current > -1) {
      this.popupStores[this.current].display = 'block';
    }
  }

  static createStore() {
    return {
      @observable display : 'none',
      height : '250px',
      width : '50%',
      left : '50%',
      top : '100px',
      component : null,
      id : 0,
    }      
  }
}
export let popupStore = new PopupStore()