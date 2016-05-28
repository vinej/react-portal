import { WSS_URL } from './const_service'
import { registerStore } from '../stores/register_store'
import { dispatch } from '../helpers/dispatcher'
import * as actions from '../actions/base_actions'

// use the browser websocket service.
var ws = new WebSocket(WSS_URL);

function f(type, store, payload) {
  return { type, store, payload };   
}

ws.onmessage = function (event) {
  const data = eval("("+event.data+")");

  if (data.function) {
     const stores = registerStore.getAll(data.store);
     stores.forEach( (store) => 
         dispatch( eval(`${data.function}`) ) )
  } else if (data.store) {
     const stores = registerStore.getAll(data.store);
     stores.forEach( (store) => 
         dispatch( f(data.type, store, data.payload) )
     );
  } else {
    dispatch( f(data.type, store, data.payload) )
  }
}

