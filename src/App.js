import {
  checkUserLoggedIn,
  setLoggedInUserDetails,
} from "./Components/Store/Actions/UserAction";
import { store } from "./Components/Store/Index";
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
