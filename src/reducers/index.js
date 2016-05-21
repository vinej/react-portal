import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import messageReducer from './message_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  message: messageReducer
});
export default rootReducer;
