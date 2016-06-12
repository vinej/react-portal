import { registerStore } from '../stores/register_store';

export function resolvePageAction(action, next) {
  const store = action.store;
  const idx = action.type.indexOf("_");
  const type = action.type.substring(idx+1);
  var name = null
  if (typeof store === "string") {
    name = store
  } else {
    name = store.name
  }
  const stores = registerStore.getAll(name); 

  switch(type) {
    case 'add':
      // need to update all related stores
      stores.forEach( (tstore) => tstore.add(action.payload) )
      break;
    case 'delete':
      // need to update all related stores
      stores.forEach( (tstore) => tstore.delete(action.payload) )
      break;
    case 'update':
      // need to update all related stores
      stores.forEach( (tstore) => tstore.update(action.payload) )
      break;
    case 'next_page':
      // ONLY CHANGE THE PAGE OF THE CURRENT STORE
      store.nextPage();
      break;
    case 'previous_page':
      // ONLY CHANGE THE PAGE OF THE CURRENT STORE
      store.previousPage();
      break;
    case 'get_all':
      // need to update all related stores
      store.setAll(action.payload)
      break;
  }
}