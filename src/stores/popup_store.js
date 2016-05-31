import { observable } from 'mobx';

class PopupStore {

  @observable popupStores = []

  constructor() {
    this.current = -1
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

  show() {
    this.current = this.current + 1
    if (this.current > 1) {
      this.popupStores[this.current - 1].visibility = 'hidden';
    }
    this.popupStores.push(PopupStore.createStore())
    this.popupStores[this.current].id = this.current
    this.popupStores[this.current].visibility = 'visible';
  }

  close() {
    this.current = this.current - 1
    this.popupStores.pop()
    if (this.current > -1) {
      this.popupStores[this.current].visibility = 'visible';
    }
  }

  static createStore() {
    return {
      @observable visibility : 'hidden',
      @observable height : '250px',
      @observable width : '50%',
      @observable left : '50%',
      @observable top : '100px',
      id : 0,
    }      
  }
}
export let popupStore = new PopupStore()