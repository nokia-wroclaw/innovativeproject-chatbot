import { combineReducers } from "redux";
import errorsReducer from "./errorReducer";
import securityReducer from "./securityReducer"
import requestReducer from "./requestReducer";

export default combineReducers({
    errors: errorsReducer,
    security: securityReducer,
    request: requestReducer
})