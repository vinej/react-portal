import * as t from '../types/dashboard_types';

export function removeWidget(dashboardId, widgetId) {
  return {
    type: t.DASHBOARD_REMOVE_WIDGET,
    payload: { dashboardId, widgetId }
  }
}
