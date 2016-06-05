import * as t from '../types/tabbar_types'
import { tabbarStore } from '../stores/tabbar_store'

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
      break
    case t.TABBAR_SELECT:
      tabbarStore.select(action.payload)
      break
  }
  return next(null, action)
}
