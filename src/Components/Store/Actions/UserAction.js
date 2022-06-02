import {
  CHECK_USER_LOGGED_IN,
  FETCH_USER_REQUEST,
  USER_LOGGED_IN_DETAILS,
} from "../types";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const checkUserLoggedIn = (payload) => {
  return {
    type: CHECK_USER_LOGGED_IN,
    payload,
  };
};

export const setLoggedInUserDetails = (payload) => {
  return {
    type: USER_LOGGED_IN_DETAILS,
    payload,
  };
};
