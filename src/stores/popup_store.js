import { observable, action } from 'mobx';
import ReactDOM from 'react-dom';

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

  @action
  show(component, dimension) {
    this.current = this.current + 1
    if (this.current > 1) {
      this.popupStores[this.current - 1].display = 'none';
    }
    const store = PopupStore.createStore()
    this.popupStores.push(store)

    store.id = this.current
    store.display = 'block';
    store.width = dimension.width;
    store.height = dimension.height;
    store.left = dimension.left;
    store.top = dimension.top;

    // we need a setTimeout, because without it the
    // render of the component will be done before 
    // the render of the div that will contain the
    // component. 1 millisecond is enough to let the
    // other render to finish
    setTimeout( () => 
      ReactDOM.render( component , 
        document.querySelector(`#popup${this.current}`)),
    1)
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
      @observable height : '250px',
      @observable width : '50%',
      @observable left : '50%',
      @observable top : '100px',
      id : 0,
    }      
  }
}
export let popupStore = new PopupStore()