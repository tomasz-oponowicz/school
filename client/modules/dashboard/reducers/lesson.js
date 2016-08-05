import {UPDATE_STATUS, UPDATE_LOCAL_LESSON, GET_LESSON} from "../constants";

const DEFAULT = {
  isFetching: true
};

const DEFAULT_ITEM = {
  title: "",
  date: "",
  videoLink: "",
  description: "",
  status: null,
  attendants: []
};

export default function lesson(state = DEFAULT, {type, payload}) {
  switch (type) {
  case UPDATE_STATUS:
    const {isFetching, item} = state;

    if (!item || item.id !== payload.id) {
      return state;
    }

    return {isFetching, item: Object.assign({}, DEFAULT_ITEM, payload)};
  case UPDATE_LOCAL_LESSON:
  case GET_LESSON:
    return {isFetching: !payload, item: Object.assign({}, DEFAULT_ITEM, payload)};
  default:
    return state;
  }
}
