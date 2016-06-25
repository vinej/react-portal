import CrudService from './crud_service';

export default class UserService extends CrudService {
  constructor() {
    super();
    this.service= "users";
    this.instanceService = null
  }

  static setInstance(instanceService) {
    this.instanceService = instanceService
  }

  static getInstance() {
    if (!this.instanceService) {
      this.instanceService = new UserService()
    }
    return this.instanceService
  }  
}

