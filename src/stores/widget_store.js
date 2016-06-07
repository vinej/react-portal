import CrudStore from './crud_store';
import { widgetService } from '../services/widget_service';
import { registerStore } from './register_store';

export default class WidgetStore extends CrudStore {
  constructor() {
    super()
    this.service = widgetService
    this.name = 'widget'
  }

  static mount(name) {
    return registerStore.add( new WidgetStore() );
  }

  static unmount(store) {
    registerStore.remove( store );
    store = null;
  }

}

