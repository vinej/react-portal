import { pageNext } from '../actions/page_actions';
import { registerStore } from '../stores/register_store';
import { dispatch } from '../helpers/dispatcher';


class SimulateEvent {
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
        dispatch( pageeNext(store)) )
    }, 2000, 5);
  }
}
export let simulateEvent = new SimulateEvent();
