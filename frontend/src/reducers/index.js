import { combineReducers } from "redux";
import errorsReducer from "./errorReducer";

export default combineReducers({
    errors: errorsReducer,
})