import { userService } from '../services/user_service';
import * as t from '../types/user_types';

export function userDelete(store,user) {
  return  {
    type: t.USER_DELETE,
    store: store,
    payload: user
  };
}
