import axios from "axios";

// Api Url's
const serverUrl = '';
const middleUrl = '';

// Api's Function
export const PostData = (url, data) => {
  let headers = {
    "Content-Type": "application/json",
    "X-localization": "en",
  };
  return axios.post(serverUrl + middleUrl, url, data, { headers: headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      return errorStatus;
    });
};