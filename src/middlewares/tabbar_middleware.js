import * as t from '../types/tabbar_types'
import { tabBarStore } from '../stores/tabbar_store'

export function tabbarMiddleware(action, next) {
  if (!action.type.startsWith("tabbar_")) { 
    return next(null, action)
  }

  switch(action.type) {
    case t.TABBAR_CLOSE:
      tabBarStore.close(action.payload)
      break
    case t.TABBAR_CLOSE_ALL:
      tabBarStore.closeAll()
      break
    case t.TABBAR_SHOW:
      tabBarStore.show(action.payload.component , action.payload.title)
      break
    case t.TABBAR_SELECT:
      tabBarStore.select(action.payload)
      break
  }
  return next(null, action)
}
