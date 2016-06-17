import * as d from '../types/dashboard_types'
import * as t from '../types/tabbar_types'

import { resolveCrudAction } from './crud_resolver'
import { dashboardStore } from '../stores/dashboard_store'

export default function(action, next) {
  resolveCrudAction(action);

  switch(action.type) {
    case t.TABBAR_CLOSE:
      dashboardStore.hideDashboard(action.payload)
      break
    case d.DASHBOARD_GET_ALL:
      dashboardStore.showAllUserDashboard()
      break
    case d.DASHBOARD_REMOVE_WIDGET:
      dashboardStore.removeWidget(action.payload.dashboardId, action.payload.widgetId)
      break
    case d.DASHBOARD_ADD_WIDGET:
      dashboardStore.addWidget(action.payload)
      break
    case d.DASHBOARD_ADD_DASHBOARD:
      dashboardStore.addDashboard(action.payload)
      break
    case d.DASHBOARD_RENAME_DASHBOARD:
      dashboardStore.renameDashboard(action.payload)
      break
    case d.DASHBOARD_ADD:
      dashboardStore.showLastDashboard()
      break
    case d.DASHBOARD_SHOW:
      dashboardStore.showDashboard(action.payload)
      break
    case d.DASHBOARD_HIDE:
      dashboardStore.hideDashboard(action.payload)
      break
  }

  return next(null, action);
}