import CrudService from './crud_service';

class TodoService extends CrudService {
  constructor() {
    super();
    this.service= "todos";
  }
}
export let todoService = new TodoService();

