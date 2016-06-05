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

export function baseNextPage(store) {
  store = findStore(store)
  return {
    type: `${store.name}_next_page`,
    store: store
  };
}

export function basePreviousPage(store) {
  store = findStore(store)
  return {
    type: `${store.name}_previous_page`,
    store: store
  };
}

export function baseDelete(store, record) {
  store = findStore(store)
  return {
    type: `${store.name}_delete_`,
    payload: function() {
      store.service.delete(store, record, baseDeleteIt, baseError);
    }
  }
}

export function baseDeleteIt(store, record) {
  return {
    type: `${store.name}_delete`,
    store: store,
    payload: record
  };
}

export function baseUpdate(store, record) {
  store = findStore(store)
  return {
    type: `${store.name}_update_`,
    payload: function() {
      store.service.update(store, record, baseUpdateIt, baseError);
    }
  }
}

export function baseUpdateIt(store, record) {
  return {
    type: `${store.name}_update`,
    store: store,
    payload: record
  };
}

export function baseAdd(store, record) {
  store = findStore(store)
  return {
    type: `${store.name}_add_`,
    payload: function() {
      store.service.add(store, record, baseAddIt, baseError);
    }
  }
}

export function baseAddIt(store, record) {
  return {
    type: `${store.name}_add`,
    store: store,
    payload: record
  };
}

export function baseGetAll(store) {
  store = findStore(store)
  return {
    type: `${store.name}_get_all_`,
    payload: function() {
      store.service.getAll(store, baseGetAllIt, baseError);
    }
  }
} 

export function baseGetAllIt(store, data) {
  return {
    type: `${store.name}_get_all`,
    store : store,
    payload: data 
  }
}

export function baseError(store, error) {
  return {
    type: `${store.name}_error`,
    store : store,
    payload : error 
  }
}
