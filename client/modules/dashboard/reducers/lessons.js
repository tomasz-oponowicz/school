import {UPDATE_STATUS, GET_LESSONS} from "../constants";

export default function lessons(state = {isFetching: true}, {type, payload}) {
  switch (type) {
  case UPDATE_STATUS:
    const items = state.items;

    if (!items) {
      return state;
    }

    const index = items.findIndex((item) => {
      return item.id === payload.id;
    });

    if (index === -1) {
      return state;
    }

    return Object.assign({}, state, {
      items: [
        ...items.slice(0, index),
        payload,
        ...items.slice(index + 1)
      ]
    });
  case GET_LESSONS:
    return {isFetching: !payload, items: payload};
  default:
    return state;
  }
}
