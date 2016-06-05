import * as t from '../types/tabbar_types';

export function tabbarShow(component, title) {
  return  {
    type: t.TABBAR_SHOW,
    payload: { component, title }
  }
}

export function tabbarClose(idx) {
  return  {
    type: t.TABBAR_CLOSE,
    payload : idx
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
