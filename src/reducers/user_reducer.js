import * as t from '../types/user_types';
import { reduceBaseAction } from './base_reducer';

export default function(state = {}, action) {

  if (!action.type.startsWith("user_")) { return state; }

  // do the specific actions first, this way
  // you can easily override the base action
  const store = action.store;
  switch(action.type) {
    case t.USER_VALIDATE:
      // do something special with this one
      return state;
  }
  
  reduceBaseAction(action);

  return state;
}