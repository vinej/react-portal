import ReactDOM from 'react-dom';
import { tabBarStore } from '../stores/tabbar_store';
import { transaction } from 'mobx';

export function tabBarMiddleware(action, next) {
  const idx = action.type.indexOf("_")
  const type = action.type.substring(idx+1)

  if (type === 'cancel_tab') {
    setTimeout( () => tabBarStore.close(), 1)
  } else if (type === 'edit_tab') {
    tabBarStore.show(action.payload.title)
    setTimeout( () => 
      ReactDOM.render( 
        action.payload.component , 
        document.querySelector(`#tab${tabBarStore.getCurrentId()}`)),
    1)
  } else if (type === 'select_tab') {
    tabBarStore.select(action.payload)
  } else {
    return next(null, action);
  }
}
