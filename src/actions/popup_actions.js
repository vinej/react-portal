import * as t from '../types/popup_types';

export function popupShow(component, dimension) {
  return  {
    type: t.POPUP_SHOW,
    payload: { component, dimension }
  }
}

export function popupClose() {
  return  {
    type: t.POPUP_CLOSE
  }
}