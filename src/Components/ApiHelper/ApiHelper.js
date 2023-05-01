import axios from "axios";
import Cookies from "js-cookie";

// Api Url's for the API's
export const serverUrl = "http://203.115.102.6:6696/api/v1/";

// main url :"https://a6a2-2401-4900-1c7b-b773-3400-1b5f-6411-9d4a.ngrok.io"

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
  const cancelToken = axios.CancelToken.source();
  let tokens = "";
  if (Cookies.get("FandFToken")) {
    tokens = Cookies.get("FandFToken");
  }
  var headers = {
    Authorization: "Bearer " + tokens,
    "Accept-Language": "en",
  };
  return axios
    .post(
      serverUrl + url,
      data,
      { headers: headers },
      { cancelToken: cancelToken.token }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        let errorStatus = JSON.parse(JSON.stringify(error.response));
        return errorStatus;
      }
    });
};

export const GetDataWithToken = (url) => {
  const cancelToken = axios.CancelToken.source();
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
    .get(serverUrl + url, config, { cancelToken: cancelToken.token })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        let errorStatus = JSON.parse(JSON.stringify(error.response));
        return errorStatus;
      }
    });
};

export function PutDataWithToken(url, data) {
  const cancelToken = axios.CancelToken.source();
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
    .put(
      serverUrl + url,
      data,
      { headers: headers },
      { cancelToken: cancelToken.token }
    )
    .then((response) => {
      //console.log(res);
      //console.log(res.data);
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        let errorStatus = JSON.parse(JSON.stringify(error.response));
        return errorStatus;
      }
    });
}
