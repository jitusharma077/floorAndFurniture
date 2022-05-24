import { checkUserLoggedIn, setLoggedInUserDetails } from './Components/Store/Actions/UserAction';
import { store } from './Components/Store/Index';
import { useEffect } from 'react';
import CommonRoutes from './Components/Routes/CommonRoutes';
import cookie from 'react-cookies';

function App() {

  useEffect(() => {
    if (cookie.load('isLoggedIn') === 'true') {
      store.dispatch(checkUserLoggedIn(true));
    };
    if (cookie.load('userDetails')) {
      store.dispatch(setLoggedInUserDetails(cookie.load(('userDetails'))));
    }
  }, []);

  return (
    <>
      <CommonRoutes />
    </>
  );
}

export default App;
