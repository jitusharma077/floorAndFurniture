import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import store from "./Components/Store";
import store from "./Components/Store/Index";
import { Provider } from "react-redux";
import { ToastContainer } from "material-react-toastify";
import throttle from "lodash/throttle";
import "material-react-toastify/dist/ReactToastify.css";
import { saveState } from "./Components/Utility/LocalStorage";

store.subscribe(
  throttle(() => {
    saveState({
      user: store.getState().user,
    });
  }, 1000)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer autoClose={2000} hideProgressBar closeOnClick rtl={false} />
    {console.log("store")}
    <Provider store={store}>
      <App />
    </Provider>
    {/* <ToastContainer /> */}
  </>
);
reportWebVitals();
