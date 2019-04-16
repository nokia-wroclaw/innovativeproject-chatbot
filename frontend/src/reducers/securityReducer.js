import { SET_CURRENT_USER, GET_USER_AVATAR, GET_IS_ADMIN } from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
  avatar: ""
};

const booleandActionPayload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleandActionPayload(action.payload),
        user: action.payload
      };
    case GET_USER_AVATAR:
      return {
        ...state,
        avatar: action.payload
      }
      case GET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload
      }
    default:
      return state;
  }
}
