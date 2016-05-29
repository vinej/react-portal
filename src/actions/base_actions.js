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
