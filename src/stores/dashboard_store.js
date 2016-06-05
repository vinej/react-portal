import CrudStore from './crud_store';
import { dashboardService } from '../services/dashboard_service';
import { registerStore } from './register_store';

class DashboardStore extends CrudStore {
  constructor() {
    super();
    this.service = dashboardService;
    this.name = 'dashboard';
  }
}
export let dashboardStore = new DashboardStore()
