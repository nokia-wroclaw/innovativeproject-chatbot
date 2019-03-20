import { GET_REQUESTS } from "../actions/types";

const initialState = {
  requests: [],
  request: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload
      };
    default:
      return state;
  }
}
