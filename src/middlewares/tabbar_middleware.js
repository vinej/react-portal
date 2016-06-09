import * as t from '../types/tabbar_types'
import { tabbarStore } from '../stores/tabbar_store'
import ReactDOM from 'react-dom';

export function tabbarMiddleware(action, next) {
  if (!action.type.startsWith("tabbar_")) { 
    return next(null, action)
  }

  switch(action.type) {
    case t.TABBAR_CLOSE:
      tabbarStore.close(action.payload)
      break
    case t.TABBAR_CLOSE_ALL:
      tabbarStore.closeAll()
      break
    case t.TABBAR_SHOW:
      tabbarStore.show(action.payload.component , action.payload.title)
      if (!document.querySelector(`#tab${tabbarStore.getCurrentId()}`)) { 
        // we need a timeout, because the refresh from mobx is not done yet. The setTimeout let the time to the function
        // to finish to give the chance to the component to refresh. After that we can render the component into the widget
        // 
        setTimeout( () => ReactDOM.render( action.payload.component , document.querySelector(`#tab${tabbarStore.getCurrentId()}`)),1) 
      }
      else {
        // we don't need a setTimeout, because the tabs are created by the code before the user get access
        // and there is not refresh to complete.
        ReactDOM.render( action.payload.component , document.querySelector(`#tab${tabbarStore.getCurrentId()}`)) 
      }
      break
    case t.TABBAR_SELECT:
      tabbarStore.select(action.payload)
      break
  }
  return next(null, action)
}
