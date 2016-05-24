import { storeNextPage } from '../actions/base_actions';
import { registerStore } from '../stores/register_store';

class SimulateEvent {
  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {
       callback();
       if (++x === repetitions) {
          window.clearInterval(intervalID);
       }
    }, delay);
  }

  simulateNextPage() {
    this.setIntervalX( () => {
      // do it for all 'user' stores
      const stores = registerStore.getAll('user');
      stores.forEach( (store) => 
        this.dispatch( storeNextPage(store)) )
    }, 2000, 5);
  }
}
export let simulateEvent = new SimulateEvent();
