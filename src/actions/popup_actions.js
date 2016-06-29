import * as t from '../types/popup_types';

// function return component must be inside an abject
export function popupShow(component) {
  return  {
    type: t.POPUP_SHOW,
    payload: { component }
  }
}

export function popupClose() {
  return  {
    type: t.POPUP_CLOSE
  }
}