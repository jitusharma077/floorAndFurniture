import {
  checkUserLoggedIn,
  setLoggedInUserDetails,
} from "./Components/Store/Actions/userAction";
import store from "./Components/Store";
import { useEffect } from "react";
import CommonRoutes from "./Components/Routes/CommonRoutes";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    if (Cookies.get("isLoggedIn") === "true") {
      store.dispatch(checkUserLoggedIn(true));
    }
    if (Cookies.get("userDetails")) {
      store.dispatch(setLoggedInUserDetails(Cookies.get("userDetails")));
    }
  }, []);

  return (
    <>
      <CommonRoutes />
    </>
  );
}

export default App;
