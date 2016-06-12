import * as t from '../types/tabbar_types';

export function tabbarShow(component, componentId, title, type) {
  return  {
    type: t.TABBAR_SHOW,
    payload: { component, componentId, title, type }
  }
}

export function tabbarClose(idx, componentId) {
  return  {
    type: t.TABBAR_CLOSE,
    payload : { idx, componentId }
  }
}

export function tabbarCloseAll() {
  return  {
    type: t.TABBAR_CLOSE_ALL
  }
}

export function tabbarSelect(idx) {
  return  {
    type: t.TABBAR_SELECT,
    payload: idx
  }
}
