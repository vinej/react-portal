import CrudService from './crud_service';

export default class TodoService extends CrudService {
  constructor() {
    super();
    this.service= "todos";
    this.instanceService = null
  }

  static setInstance(instanceService) {
    this.instanceService = instanceService
  }

  static getInstance() {
    if (!this.instanceService) {
      this.instanceService = new TodoService()
    }
    return this.instanceService
  }  
}


