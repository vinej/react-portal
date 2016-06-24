import * as t from '../types/popup_types';
import { popupStore } from '../stores/popup_store';

export function popupResolver(action, next) {
  switch(action.type) {
    case t.POPUP_CLOSE :
      popupStore.close()
      break;
    case t.POPUP_SHOW :
      popupStore.show(action.payload)
      break;
  }
  return next(null, action);
}
