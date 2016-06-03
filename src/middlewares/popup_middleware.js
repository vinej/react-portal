import { popupStore } from '../stores/popup_store';

export function popupMiddleware(action, next) {
  const idx = action.type.indexOf("_")
  const type = action.type.substring(idx+1)

  switch(type) {
    case 'cancel_form' :
      popupStore.close()
      break;
    case 'edit_form' :
      popupStore.show(action.payload.component, action.payload.dimension)
      break;
  }
  return next(null, action);
}
