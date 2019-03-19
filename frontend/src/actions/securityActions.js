import axios from "axios";
import { GET_ERRORS } from "./types";
import { baseUrl } from "../config";

export const createNewUser = (newUser, history) => async dispatch => {
    console.log(baseUrl + "/api/users/register");
    try {
    await axios.post(baseUrl + "/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: "error.reponse.data"
    });
  }
};
