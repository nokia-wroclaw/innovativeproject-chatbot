import { combineReducers } from "redux";
import errorsReducer from "./errorReducer";
import securityReducer from "./securityReducer"
import requestReducer from "./requestReducer";
import externalAPIReducer from "./externalAPIReducer"

export default combineReducers({
    errors: errorsReducer,
    security: securityReducer,
    request: requestReducer,
    externalData: externalAPIReducer
})