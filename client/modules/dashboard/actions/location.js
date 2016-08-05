import {NAVIGATE_TO} from "../constants";

export function navigateTo(to) {
  return {type: NAVIGATE_TO, payload: {to}};
}
