import * as t from '../types/popup_types';
import { popupStore } from '../stores/popup_store';

export function popupResolver(action, next) {

  if (!action.type.startsWith("popup_")) { 
    return next(null, action);
  }

  switch(action.type) {
    case t.POPUP_CLOSE :
      popupStore.close()
      break;
    case t.POPUP_SHOW :
      popupStore.show(action.payload.component, action.payload.dimension)
      break;
  }
  return next(null, action);
}
