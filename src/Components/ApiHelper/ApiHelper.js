import axios from "axios";
import Cookies from "js-cookie";

// Api Url's
const serverUrl = "https://fapi.zidni.academy/api/v1/";

// Api's Function
export function PostData(url, data) {
  // body..
  //
  var headers = {
    "Content-Type": "application/json",
    "X-localization": "en",
  };
  return axios
    .post(serverUrl + url, data, { headers: headers })
    .then((response) => {
      //console.log(res);
      //console.log(res.data);
      return response.data;
    })
    .catch((error) => {
      //return error.data;
      //console.log(error.response);
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      //console.log(errorStatus.data);
      return errorStatus;
    });
}

export const PostDataWithToken = (url, data) => {
  let tokens = "";
  if (Cookies.get("FandFToken")) {
    tokens = Cookies.get("FandFToken");
  }
  var headers = {
    Authorization: "Bearer " + tokens,
    "Accept-Language": "en",
  };
  return axios
    .post(serverUrl + url, data, { headers: headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      return errorStatus;
    });
};

export const GetDataWithToken = (url) => {
  let tokens = "";
  if (Cookies.get("FandFToken")) {
    tokens = Cookies.get("FandFToken");
  }
  let config = {
    headers: {
      Authorization: "Bearer " + tokens,
      "Accept-Language": "en",
    },
    params: {},
  };
  return axios
    .get(serverUrl + url, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      return errorStatus;
    });
};

export function PutDataWithToken(url, data) {
  // body..
  //
  let tokens = "";
  if (Cookies.get("FandFToken")) {
    tokens = Cookies.get("FandFToken");
  }
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + tokens,
    Accept: "application/json",
  };
  return axios
    .put(serverUrl + url, data, { headers: headers })
    .then((response) => {
      //console.log(res);
      //console.log(res.data);
      return response.data;
    })
    .catch((error) => {
      //return error.data;
      //console.log(error.response);
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      //console.log(errorStatus.data);
      return errorStatus;
    });
}
