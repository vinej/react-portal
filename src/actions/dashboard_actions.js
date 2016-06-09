import { messageService } from '../services/message_service';
import * as t from '../types/dashboard_types';

export function removeWidget(store, widget) {
  return {
    type: t.DASHBOARD_REMOVE_WIDGET,
    store: store,
    payload: widget
  }
}
