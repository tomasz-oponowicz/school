import {SIGN_IN, SIGN_OUT, GET_PROFILE} from "../constants";

const DEFAULT = {
  uid: null,
  email: "",
  name: "",
  role: "student"
};

export default function profile(state = DEFAULT, {type, error, payload}) {
  switch (type) {
  case SIGN_IN:
  case GET_PROFILE:
    return !error ? Object.assign({}, DEFAULT, payload) : DEFAULT;
  case SIGN_OUT:
    return DEFAULT;
  default:
    return state;
  }
}
