import {SHOW_FLASH} from "../constants";

export function showNotice(message, transitions = 1) {
  return {
    type: SHOW_FLASH,
    payload: {
      isError: false,
      transitions,
      message
    }
  };
}

export function showAlert(message, transitions = 0) {
  return {
    type: SHOW_FLASH,
    payload: {
      isError: true,
      transitions,
      message
    }
  };
}
