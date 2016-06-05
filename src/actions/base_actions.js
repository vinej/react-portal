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

export function storeNextPage(store) {
  store = findStore(store)
  return {
    type: `${store.name}_next_page`,
    store: store
  };
}

export function storePreviousPage(store) {
  store = findStore(store)
  return {
    type: `${store.name}_previous_page`,
    store: store
  };
}

export function storeDelete(store, record) {
  store = findStore(store)
  return {
    type: `${store.name}_delete_`,
    payload: function() {
      store.service.delete(store, record, storeDeleteIt, storeError);
    }
  }
}

export function storeDeleteIt(store, record) {
  return {
    type: `${store.name}_delete`,
    store: store,
    payload: record
  };
}

export function storeUpdate(store, record) {
  store = findStore(store)
  return {
    type: `${store.name}_update_`,
    payload: function() {
      store.service.update(store, record, storeUpdateIt, storeError);
    }
  }
}

export function storeUpdateIt(store, record) {
  return {
    type: `${store.name}_update`,
    store: store,
    payload: record
  };
}

export function storeAdd(store, record) {
  store = findStore(store)
  return {
    type: `${store.name}_add_`,
    payload: function() {
      store.service.add(store, record, storeAddIt, storeError);
    }
  }
}

export function storeAddIt(store, record) {
  return {
    type: `${store.name}_add`,
    store: store,
    payload: record
  };
}

export function storeGetAll(store) {
  store = findStore(store)
  return {
    type: `${store.name}_get_all_`,
    payload: function() {
      store.service.getAll(store, storeGetAllIt, storeError);
    }
  }
} 

export function storeGetAllIt(store, data) {
  return {
    type: `${store.name}_get_all`,
    store : store,
    payload: data 
  }
}

export function storeError(store, error) {
  return {
    type: `${store.name}_error`,
    store : store,
    payload : error 
  }
}
