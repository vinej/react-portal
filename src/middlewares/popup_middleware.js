import ReactDOM from 'react-dom';
import { popupStore } from '../stores/popup_store';
import { transaction } from 'mobx';

export function popupMiddleware(action, next) {
  const idx = action.type.indexOf("_")
  const type = action.type.substring(idx+1)

  if (type === 'cancel_form') {
    popupStore.close()
  } else if (type === 'edit_form') {
    // show the popup
    popupStore.show()
    // fill the div with the component
    const store = popupStore.getCurrentStore()
    transaction( () => {
      store.width = action.payload.dimension.width;
      store.height = action.payload.dimension.height;
      store.left = action.payload.dimension.left;
      store.top = action.payload.dimension.top;
    });
    // we need a setTimeout, because without it the
    // render of the component will be done before 
    // the render of the div that will contain the
    // component. 1 millisecond is enough to let the
    // other render to finish
    setTimeout( () => 
      ReactDOM.render( 
        action.payload.component , 
        document.querySelector(`#popup${popupStore.getCurrentId()}`)),
    1)
  } else {
    return next(null, action);
  }
}
