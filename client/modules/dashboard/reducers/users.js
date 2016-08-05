import {GET_USERS} from "../constants";

const DEFAULT_ITEM = {
  id: "",
  email: "",
  name: "",
  role: "student"
};

const DEFAULT = {
  isFetching: true,
  items: []
};

export default function users(state = DEFAULT, {type, payload: items}) {
  switch (type) {
  case GET_USERS:
    return {
      isFetching: !items,
      items: (items || []).map((item) => Object.assign({}, DEFAULT_ITEM, item))
    };
  default:
    return state;
  }
}
