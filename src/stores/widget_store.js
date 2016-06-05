import CrudStore from './crud_store';
import { widgetService } from '../services/widget_service';

class WidgetStore extends CrudStore {
  constructor() {
    super();
    this.service = widgetService;
    this.name = 'widget';
  }
}
export let widgetStore = new WidgetStore()
