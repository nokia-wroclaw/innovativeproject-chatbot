import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, GET_USER_AVATAR } from "./types";
import { baseUrl } from "../config";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
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
      payload: error.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    // post -> login request
    const res = await axios.post(baseUrl + "/api/users/login", LoginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header (!)
    setJWTToken(token);
    // decode token on react
    const decoded = jwt_decode(token);
    // ditpatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};

export const getAvatar = () => async dispatch => {
  const res = await axios.get(baseUrl + "/api/users/getAvatar");
  dispatch({
    type: GET_USER_AVATAR,
    payload: res.data
  });
};

export const setAvatar = base64img => async dispatch => {
  try {
    // set new avatar and save it to store
    const res = await axios.post(baseUrl + "/api/users/setAvatar", base64img);
    dispatch({
      type: GET_USER_AVATAR,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
