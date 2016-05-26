import { messageService } from '../services/message_service';
import * as t from '../types/message_types';

export function messageFetch() {
  return {
    type: t.MESSAGE_FETCH,
    payload: function(dispatch) {
      messageService.fetchMessage(dispatch, messageFetchIt, messageError);
    }
  }
}

export function messageFetchIt(message) {
  return {
    type: t.MESSAGE_SET,
    payload: message
  }
}

export function messageError(error) {
  return {
    type: t.MESSAGE_ERROR,
    payload: error
  }
}
