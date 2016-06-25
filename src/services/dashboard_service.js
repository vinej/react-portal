import CrudService from './crud_service'

export default class DashboardService extends CrudService {
  constructor() {
    super();
    this.service= "dashboards";
    this.instanceService = null
  }

  static setInstance(instanceService) {
    this.instanceService = instanceService
  }

  static getInstance() {
    if (!this.instanceService) {
      this.instanceService = new DashboardService()
    }
    return this.instanceService
  }  
}

