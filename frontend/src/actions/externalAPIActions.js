import axios from "axios";
import { GET_DATA_FROM_EXTERNAL_API } from "./types";
import { baseUrl } from "../config";

export const getDataFromExternalAPI = params => async dispatch => {
  const res = await axios.post(baseUrl + "/api/services/weather", params);
  dispatch({
    type: GET_DATA_FROM_EXTERNAL_API,
    payload: res.data
  });
};

export const getQRFromExternalAPI = params => async dispatch => {
  const res = await axios.post(baseUrl + "/api/services/qrcode", params);
  dispatch({
    type: GET_DATA_FROM_EXTERNAL_API,
    payload: res.data
  });
};

export const getBtcFromExternalAPI = params => async dispatch => {
  const res = await axios.post(baseUrl + "/api/services/btcPrice", params);
  dispatch({
    type: GET_DATA_FROM_EXTERNAL_API,
    payload: res.data
  });
};
