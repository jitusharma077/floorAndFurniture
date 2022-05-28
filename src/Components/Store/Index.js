import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadState } from "../Utility/LocalStorage";
import Reducer from "./Reducers/Reducer";
import thunk from "redux-thunk";

const persistedState = loadState();

const rootReducer = combineReducers({
  user: Reducer,
});

export const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);
