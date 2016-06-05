import * as t from '../types/widget_types';
import { reduceCrudAction } from './crud_reducer';

export default function(action, next) {

  if (!action.type.startsWith("widget_")) { 
    return next(null, action);
  }

  reduceCrudAction(action);
  return next(null, action);
}