import { CHECK_USER_LOGGED_IN, FETCH_USER_REQUEST, USER_LOGGED_IN_DETAILS } from "../Types";

const initialState = {
  loading: false,
  isLoggedIn: false,
  userDetails: {}
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case USER_LOGGED_IN_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      };
    case CHECK_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.paylaod
      };
    default:
      return state;
  };
};

export default Reducer;
