import {NAVIGATE_TO} from "../constants";

export default function location(state = {}, {type, payload}) {
  switch (type) {
  case NAVIGATE_TO:
    return {previous: state.current, current: payload.to};
  default:
    return state;
  }
}
