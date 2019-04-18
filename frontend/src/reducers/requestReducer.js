import { GET_REQUESTS, SET_RESPONSE_RATING } from "../actions/types";

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
    case SET_RESPONSE_RATING:
      return {
        ...state,
        requests: state.requests.map(todo =>
          todo.id === action.payload.id
            ? // transform the one with a matching id
              { ...todo, responseRating: action.payload.responseRating }
            : // otherwise return original todo
              todo
        )
      };
    default:
      return state;
  }
}
