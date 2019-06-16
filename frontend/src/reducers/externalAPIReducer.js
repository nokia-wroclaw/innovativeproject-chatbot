import { GET_DATA_FROM_EXTERNAL_API } from "../actions/types";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_FROM_EXTERNAL_API:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    default:
      return state;
  }
}
