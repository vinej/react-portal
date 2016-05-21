import * as t from '../types/user_types';

export default function(state = {}, action) {
  
  // user use one store by widget
  const store = action.store;

  switch(action.type) {
    case t.USER_DELETE:
      const idx = store.users.findIndex( (user) => user._id === action.payload._id );
      store.users.splice(idx,1);
      // only page is observable, don't need a transaction
      store.page = store.users.slice(store.pageStart,store.pageEnd);
      break;
    case t.USER_PREVIOUS_PAGE:
      store.pageStart = Math.max(store.pageStart - store.pageSize,0);
      store.pageEnd = Math.max(store.pageEnd - store.pageSize, store.pageStart + store.pageSize);
      // only page is observable, don't need a transaction
      store.page = store.users.slice(store.pageStart,store.pageEnd);
      break;
    case t.USER_NEXT_PAGE:
      store.pageStart = store.pageStart + store.pageSize;
      store.pageEnd = store.pageEnd + store.pageSize;
      // only page is observable, don't need a transaction
      store.page = store.users.slice(store.pageStart,store.pageEnd);
      break;
    case t.USER_SET_ALL:
      store.users = action.payload;
      // only page is observable, don't need a transaction
      store.page = action.payload.slice(store.pageStart,store.pageEnd);
      break;    
    case t.USER_ERROR:
      store.error = action.payload;
      break;    
  }
  return state;
}
