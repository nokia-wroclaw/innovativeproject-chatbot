import axios from "axios";
import { GET_ERRORS, GET_REQUESTS, SET_RESPONSE_RATING, APPEND_TEMP_REQUEST } from "./types";
import { baseUrl } from "../config";

export const createRequest = (request, history) => async dispatch => {
  try {
    await axios.post(baseUrl + "/api/request", request);
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

export const getRequests = pages => async dispatch => {
  try {
    const res = await axios.post(
      baseUrl + "/api/request/userRequestsPagination",
      pages
    );

    dispatch({
      type: GET_REQUESTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const addTempRequest = question => async dispatch => {
  // get date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var curHour = today.getHours();
	var curMinute = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  var exactTime = dd + "-" + mm + "-" + yyyy + " " + curHour + ":" + curMinute;

  // create temp request
  let tempRequest = {
    id: 9999,
    question: question,
    questionIntent: "",
    questionConfidence: 0,
    date: exactTime,
    requestOwner: "",
    responseText: "",
    responseType: "",
    responseRating: "0"
  };

  dispatch({
    type: APPEND_TEMP_REQUEST,
    payload: tempRequest
  });
};

export const rateResponse = rating => async dispatch => {
  try {
    const res = await axios.post(baseUrl + "/api/request/rateAnswer", rating);
    console.log(res.data)
    dispatch({
      type: SET_RESPONSE_RATING,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
