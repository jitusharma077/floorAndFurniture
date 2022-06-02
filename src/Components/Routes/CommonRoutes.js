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
import AllInvoice from "../Pages/SuperAdmin/AllInvoice";
import AllSchedule from "../Pages/SuperAdmin/AllSchedule";
import AddSchedule from "../Pages/SuperAdmin/AddSchedule";
import AllOutletManager from "../Pages/SuperAdmin/AllOutletManager";
import AllSalesPerson from "../Pages/SuperAdmin/AllSalesPerson";
import AllDispatch from "../Pages/SuperAdmin/AllDispatch";
import AllStiching from "../Pages/SuperAdmin/AllStiching";
import AllMeasurer from "../Pages/SuperAdmin/AllMeasurer";
import AllTailor from "../Pages/SuperAdmin/AllTailor";
import AllQc from "../Pages/SuperAdmin/AllQc";
import AllInstaller from "../Pages/SuperAdmin/AllInstaller";
import AddNewUser from "../Pages/SuperAdmin/AddNewUser";
import DataTablebasic from "../Pages/SuperAdmin/Common/DataTablebasic";
import Error from "../Common/Error";
import { useSelector } from "react-redux";

const CommonRoutes = () => {
  const [type, setType] = useState({});
  const userDetails = useSelector((store) => store?.user?.userDetails?.type);

  useEffect(() => {
    setType(userDetails);
  }, [userDetails]);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
            <Route path="all-invoice" element={<AllInvoice />} />
            <Route path="add-schedule" element={<AddSchedule />} />
            <Route path="all-outlet-manager" element={<AllOutletManager />} />
            <Route path="all-sales-person" element={<AllSalesPerson />} />
            <Route path="all-dispatch" element={<AllDispatch />} />
            <Route path="All-stitching" element={<AllStiching />} />
            <Route path="All-measurer" element={<AllMeasurer />} />
            <Route path="all-Tailor" element={<AllTailor />} />
            <Route path="All-Qc" element={<AllQc />} />
            <Route path="All-Installer" element={<AllInstaller />} />
            <Route path="Add-new-user" element={<AddNewUser />} />
            <Route path="datatable" element={<DataTablebasic />} />
            <Route path="all-schedule" element={<AllSchedule />} />
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

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CommonRoutes;
