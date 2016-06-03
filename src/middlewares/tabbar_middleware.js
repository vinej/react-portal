import { tabBarStore } from '../stores/tabbar_store';

export function tabBarMiddleware(action, next) {
  const idx = action.type.indexOf("_")
  const type = action.type.substring(idx+1)

  switch(type) {
    case 'cancel_tab':
      tabBarStore.close()
      break;
    case 'edit_tab':
      tabBarStore.show(action.payload.title, action.payload.component)
      break;
    case 'select_tab':
      tabBarStore.select(action.payload)
      break;
  }
   
  return next(null, action);
}
