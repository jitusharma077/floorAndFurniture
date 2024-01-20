import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loadState } from "../Utility/LocalStorage";
// import reducer from "./Reducers/reducer";
import reducer from "./Reducers/Reducer";

const persistedState = loadState();
const rootReducer = {
  user: reducer,
};
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: [thunk],
});
export default store;
