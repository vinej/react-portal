export function reduceBaseAction(action) {
  const store = action.store;
  const idx = action.type.indexOf("_");
  const type = action.type.substring(idx+1);

  switch(type) {
    case 'add':
      store.add(action.payload);
      break;
    case 'delete':
      store.delete(action.payload);
      break;
    case 'update':
      store.update(action.payload);
      break;
    case 'next_page':
      store.nextPage();
      break;
    case 'previous_page':
      store.previousPage();
      break;
    case 'set_all':
      store.setAll(action.payload);
      break;
  }
}