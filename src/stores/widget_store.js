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

  getLayout() {
    return [
      {i: 'a', x: 0, y: 0, w: 4, h: 21},
      {i: 'b', x: 4, y: 0, w: 3, h: 21}
    ]
  }
}

