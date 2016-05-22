import axios from 'axios';
import { ROOT_URL } from './const_service';
import { messageSet, messageError } from '../actions/message_actions';

class MessageService {	
	fetchMessage(dispatch) {
		axios.get(ROOT_URL, {
			headers: { authorization: localStorage.getItem('token') }
		})
		.then(response => {
			dispatch(messageSet(response.data.message));
		})
		.catch((error) => {
			dispatch(messageError(error));
		});
  };
}
export let messageService = new MessageService();
