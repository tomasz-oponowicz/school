import {GET_USER} from "../constants";

const DEFAULT_ITEM = {
  id: "",
  email: "",
  name: "",
  role: "student"
};

const DEFAULT = {
  isFetching: true,
  item: DEFAULT_ITEM
};

export default function user(state = DEFAULT, {type, payload}) {
  switch (type) {
  case GET_USER:
    return {isFetching: !payload, item: Object.assign({}, DEFAULT_ITEM, payload)};
  default:
    return state;
  }
}
