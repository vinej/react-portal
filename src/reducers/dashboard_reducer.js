import * as t from '../types/dashboard_types'
import { reduceCrudAction } from './crud_reducer'

export default function(action, next) {
  if (!action.type.startsWith("dashboard_")) { 
    return next(null, action);
  }

  reduceCrudAction(action);
  return next(null, action);
}