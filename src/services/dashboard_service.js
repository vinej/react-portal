import CrudService from './crud_service'

class DashboardService extends CrudService {
  constructor() {
    super();
    this.service= "dashboards";
  }
}
export let dashboardService = new DashboardService();
