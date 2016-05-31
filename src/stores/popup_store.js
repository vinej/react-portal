import { observable } from 'mobx';

class PopupStore {
  constructor() {
    this.current = 0
    this.max = 5;
    this.popupStores = []

    for(var i=0; i < this.max; i++) {
      this.popupStores[i] = PopupStore.createStore()
      this.popupStores[i].id = i
    }
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
    // hide de previous 
    if (this.current > 0) {
      this.popupStores[this.current - 1].visibility = 'hidden';
    }
    this.popupStores[this.current].visibility = 'visible';
    this.current = this.current + 1
  }

  close() {
    this.current = this.current - 1
    this.popupStores[this.current].visibility = 'hidden';
    if (this.current > 0) {
      this.popupStores[this.current-1].visibility = 'visible';
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