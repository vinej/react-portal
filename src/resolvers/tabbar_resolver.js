import * as t from '../types/tabbar_types'
import * as d from '../types/dashboard_types'
import { tabbarStore } from '../stores/tabbar_store'

export function tabbarResolver(action, next) {
  if ( !action.type.startsWith("tabbar_") && !action.type.startsWith("dashboard_") ) {
    return next(null, action)
  }

  switch(action.type) {
    case d.DASHBOARD_RENAME_DASHBOARD:
      tabbarStore.rename(action.payload)
      break
    case t.TABBAR_CLOSE:
      tabbarStore.close(action.payload.idx)
      break
    case t.TABBAR_CLOSE_ALL:
      tabbarStore.closeAll()
      break
    case t.TABBAR_SHOW:
        tabbarStore.show(action.payload.component, action.payload.componentId, action.payload.title, action.payload.type)
      break
    case t.TABBAR_SELECT:
      tabbarStore.select(action.payload)
      break
  }
  return next(null, action)
}
