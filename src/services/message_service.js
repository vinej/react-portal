import axios from 'axios';
import { ROOT_URL, HEADERS, PARAMETERS } from './const_service';
import { messageSet, messageError } from '../actions/message_actions';
import { dispatch } from '../helpers/dispatcher';


class MessageService {  
  fetchMessage(next, err) {
    axios.get(`${ROOT_URL}?${PARAMETERS}`, HEADERS())
    .then(response => {
      dispatch(next(response.data.message));
    })
    .catch((error) => {
      dispatch(err(error));
    });
  };
}
export let messageService = new MessageService();
