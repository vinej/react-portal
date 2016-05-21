import { messageService } from '../services/message_service';
import * as t from '../types/message_types';

export function messageFetch() {
	return function(dispatch) {
		messageService.fetchMessage(dispatch);
	};
}

export function messageSet(message) {
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
