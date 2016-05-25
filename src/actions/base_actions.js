export function storeNextPage(store) {
  return {
    type: `${store.name}_next_page`,
    store: store
  };
}

export function storePreviousPage(store) {
  return {
    type: `${store.name}_previous_page`,
    store: store
  };
}

export function storeDelete(store, record) {
  return function(dispatch) {
    store.service.delete(dispatch, store, record, storeDeleteIt, storeError);
  };
}

export function storeDeleteIt(store, record) {
  return {
    type: `${store.name}_delete`,
    store: store,
    payload: record
  };
}

export function storeUpdate(store, record) {
  return function(dispatch) {
    store.service.update(dispatch, store, record, storeUpdateIt, storeError);
  };
}

export function storeUpdateIt(store, record) {
  return {
    type: `${store.name}_update`,
    store: store,
    payload: record
  };
}

export function storeAdd(store, record) {
  return function(dispatch) {
    store.service.add(dispatch, store, record, storeAddIt, storeError);
  };
}

export function storeAddIt(store, record) {
  return {
    type: `${store.name}_add`,
    store: store,
    payload: record
  };
}

export function storeGetAll(store) {
  return function(dispatch) {
    store.service.getAll(dispatch, store, storeSetAll, storeError);
  };
} 

export function storeSetAll(store, data) {
  return {
    type: `${store.name}_set_all`,
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