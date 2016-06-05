import { registerStore } from '../stores/register_store';

/* base action for store crud actions */

/**
 * The store could be a string or an object
 * A string means that we must find the first store of that type
 * A objet means that it's already a store objet
 */
function findStore(store) {
  if (typeof store !== 'string') {
    return store
  } else {
    const stores = registerStore.getAll(store);
    if (stores.length > 0) {
      return stores[0]
    } else {
      return store;
    }
  }
}

export function crudDelete(store, record) {
  store = findStore(store)
  return {
    type: `${store.name}_delete_`,
    payload: function() {
      store.service.delete(store, record, crudDeleteIt, pageError);
    }
  }
}

export function crudDeleteIt(store, record) {
  return {
    type: `${store.name}_delete`,
    store: store,
    payload: record
  };
}

export function crudUpdate(store, record) {
  store = findStore(store)
  return {
    type: `${store.name}_update_`,
    payload: function() {
      store.service.update(store, record, crudUpdateIt, pageError);
    }
  }
}

export function crudUpdateIt(store, record) {
  return {
    type: `${store.name}_update`,
    store: store,
    payload: record
  };
}

export function crudAdd(store, record) {
  store = findStore(store)
  return {
    type: `${store.name}_add_`,
    payload: function() {
      store.service.add(store, record, crudAddIt, pageError);
    }
  }
}

export function crudAddIt(store, record) {
  return {
    type: `${store.name}_add`,
    store: store,
    payload: record
  };
}

export function crudGetAll(store) {
  store = findStore(store)
  return {
    type: `${store.name}_get_all_`,
    payload: function() {
      store.service.getAll(store, crudGetAllIt, pageError);
    }
  }
} 

export function crudGetAllIt(store, data) {
  return {
    type: `${store.name}_get_all`,
    store : store,
    payload: data 
  }
}

export function pageError(store, error) {
  return {
    type: `${store.name}_error`,
    store : store,
    payload : error 
  }
}
