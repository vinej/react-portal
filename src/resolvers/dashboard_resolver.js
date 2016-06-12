import * as t from '../types/dashboard_types'
import { resolveCrudAction } from './crud_resolver'
import { dashboardStore } from '../stores/dashboard_store'

export default function(action, next) {
  if (!action.type.startsWith("dashboard_")) { 
    return next(null, action);
  }

  resolveCrudAction(action);

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
    case t.DASHBOARD_ADD_DASHBOARD:
      dashboardStore.addDashboard(action.payload)
      break
    case t.DASHBOARD_RENAME_DASHBOARD:
      dashboardStore.renameDashboard(action.payload)
      break
    case t.DASHBOARD_ADD:
      dashboardStore.showLastDashboard()
      break
  }

  return next(null, action);
}