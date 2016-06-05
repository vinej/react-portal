import axios from 'axios';
import CrudService from './crud_service';

class WidgetService extends CrudService {
  constructor() {
    super();
    this.service= "widgets";
  }
}
export let widgetService = new WidgetService();
