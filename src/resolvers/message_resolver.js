import * as t from '../types/message_types';
import { messageStore } from '../stores/message_store';

export default function(action, next) {
  switch(action.type) {
    case t.MESSAGE_FETCH:
      messageStore.message = action.payload;
      break;
    case t.MESSAGE_ERROR:
      messageStore.error = action.payload;
      break;
  }
  return next(null, action);
}
