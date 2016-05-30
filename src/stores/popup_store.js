import { observable } from 'mobx';

export var popupStore = {
  @observable visibility : 'hidden',
  @observable height : '250',
  @observable width : '50%',
  @observable left : '50%',
  @observable top : '100',

  setVisible : function(visible) {
    if (visible === true) {
      this.visibility = "visible"
    } else {
      this.visibility = "hidden"
    }
  }
}