import * as t from '../types/dashboard_types';

export function removeWidget(dashboardId, widgetId) {
  return {
    type: t.DASHBOARD_REMOVE_WIDGET,
    payload: { dashboardId, widgetId }
  }
}

export function dashboardAddWidget(widgetName) {
  return {
    type: t.DASHBOARD_ADD_WIDGET,
    payload: widgetName
  }
}
