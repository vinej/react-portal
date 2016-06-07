import CrudStore from './crud_store';
import { dashboardService } from '../services/dashboard_service';
import { registerStore } from './register_store';

export default class DashboardStore extends CrudStore {
  constructor() {
    super();
    this.service = dashboardService;
    this.name = 'dashboard';
  }

  static mount(name) {
    return registerStore.add( new DashboardStore() );
  }

  static unmount(store) {
    registerStore.remove( store );
    store = null;
  }


  getWidgets(idx) {
    return this.records[idx].widgets
  }

  getWidgetsLayout(idx) {
    var layout = []
    return layout
  }
}

