import * as t from '../types/message_types';
import { messageStore } from '../stores/message_store';

export default function(action, next) {
  switch(action.type) {
    case t.MESSAGE_SET:
      messageStore.message = action.payload;
      return next(null, action);
    case t.MESSAGE_ERROR:
      messageStore.error = action.payload;
      return next(null, action);
  }
  return next(null, action);
}
