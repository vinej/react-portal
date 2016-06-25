import CrudService from './crud_service';

export default class WidgetService extends CrudService {
  constructor() {
    super();
    this.service= "widgets";
    this.instanceService = null
  }

  static setInstance(instanceService) {
    this.instanceService = instanceService
  }

  static getInstance() {
    if (!this.instanceService) {
      this.instanceService = new WidgetService()
    }
    return this.instanceService
  }  
}

