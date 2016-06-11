import * as t from '../types/dashboard_types'
import { reduceCrudAction } from './crud_reducer'
import { dashboardStore } from '../stores/dashboard_store'

export default function(action, next) {
  if (!action.type.startsWith("dashboard_")) { 
    return next(null, action);
  }

  // switch(action.type) {
  //   case t.DASHBOARD_REMOVE_WIDGET:
  //     store.removeWidget(action.payload)

  //     break;
  //   }
  // }

  reduceCrudAction(action);

  switch(action.type) {
    case t.DASHBOARD_GET_ALL:
      dashboardStore.showAllUserDashboard()
      break
    case t.DASHBOARD_REMOVE_WIDGET:
      dashboardStore.removeWidget(action.payload.dashboardId, action.payload.widgetId)
      break
    case t.DASHBOARD_ADD_WIDGET:
      dashboardStore.addWidget(action.payload)
      break
  }

  return next(null, action);
}