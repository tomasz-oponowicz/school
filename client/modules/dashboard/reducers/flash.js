import {NAVIGATE_TO, SHOW_FLASH} from "../constants";

export default function flash(state = {}, {type, payload}) {
  switch (type) {
  case SHOW_FLASH:
    return payload;
  case NAVIGATE_TO:
    if (state.transitions > 0) {
      return Object.assign({}, state, {
        transitions: state.transitions - 1
      });
    } else {
      return {};
    }
  default:
    return state;
  }
}
