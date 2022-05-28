import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import DispatchTeamDashboard from "../Pages/DispatchTeam/DispatchTeamDashboard";
import OutletMangerDashboard from "../Pages/OutletManager/OutletMangerDashboard";
import StitchingStoreManagerDashboard from "../Pages/StitchingStoreManager/StitchingStoreManagerDashboard";
import Dashboard from "../Pages/SuperAdmin/Dashboard";
import Cookies from "js-cookie";
import {
  DispatchTeam,
  OutletManager,
  StitchingStoreManager,
  superAdmin,
} from "../Common/RoleType";
import SuperAdminTestPage from "../Pages/SuperAdmin/SuperAdminTestPage";
import AllOutlet from "../Pages/SuperAdmin/AllOutlet";
import EnquiryDetials from "../Pages/SuperAdmin/EnquiryDetials";
import SuperAdminOutletDashboard from "../Pages/SuperAdmin/SuperAdminOutletDashboard";
import AllCustomer from "../Pages/SuperAdmin/AllCustomer";
import CustomerDetials from "../Pages/SuperAdmin/CustomerDetials";
import AllEnquiry from "../Pages/SuperAdmin/AllEnquiry";

const CommonRoutes = () => {
  const [type, setType] = useState({});

  useEffect(() => {
    setType(Cookies.get("userType"));
  }, [type]);
  return (
    <BrowserRouter>
      <Routes>
        {console.log("type", type)}

        <Route path="/" element={<Login />} />
        {type === superAdmin && (
          <>
            <Route path="/SuperAdminDashboard" element={<Dashboard />} />
            <Route
              path="/SuperAdmintestpage"
              element={<SuperAdminTestPage />}
            />
            <Route path="allOutlet" element={<AllOutlet />} />
            <Route path="EnquiryDetials" element={<EnquiryDetials />} />
            <Route
              path="OutletDashboard"
              element={<SuperAdminOutletDashboard />}
            />
            <Route path="all-customer" element={<AllCustomer />} />
            <Route path="customer-detials" element={<CustomerDetials />} />
            <Route path="all-Enquiry" element={<AllEnquiry />} />
          </>
        )}

        {type === DispatchTeam && (
          <>
            <Route
              path="/DispatchTeamDashboard"
              element={<DispatchTeamDashboard />}
            />
          </>
        )}

        {type === OutletManager && (
          <Route
            path="/OutletManagerDashboard"
            element={<OutletMangerDashboard />}
          />
        )}

        {type === StitchingStoreManager && (
          <Route
            path="/StitchingStoreManagerDashboard"
            element={<StitchingStoreManagerDashboard />}
          />
        )}

        <Route path="*" element={<p>No Page Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default CommonRoutes;
