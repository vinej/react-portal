import { registerStore } from '../stores/register_store';

export function reduceCrudAction(action, next) {

  let store = action.store
  const idx = action.type.indexOf("_")
  const type = action.type.substring(idx+1)

  if (typeof store === "string") {
    // get the real store. it's supposed to have only on of this kind
    store = registerStore.getAll(store)[0]; 
  }
  switch(type) {
    case 'add':
      // need to update all related stores
      store.add(action.payload)
      break;
    case 'delete':
      // need to update all related stores
      store.delete(action.payload)
      break;
    case 'update':
      // need to update all related stores
      store.update(action.payload)
      break;
    case 'get_all':
      // need to update all related stores
      store.setAll(action.payload)
      break;
  }
}