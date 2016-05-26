import axios from 'axios';
import { ROOT_URL } from './const_service';
import { messageSet, messageError } from '../actions/message_actions';

class MessageService {  
  fetchMessage(dispatch, next, err) {
    axios.get(ROOT_URL, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch(next(response.data.message));
    })
    .catch((error) => {
      dispatch(err(error));
    });
  };
}
export let messageService = new MessageService();
