import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function OutletMangerDashboard() {
  const navigate = useNavigate();
  const Logout = () => {
    Cookies.remove("userType");
    navigate("/");
  };
  return (
    <div>
      OutletMangerDashboard
      <button onClick={() => Logout()}> Logout</button>
    </div>
  );
}

export default OutletMangerDashboard;
