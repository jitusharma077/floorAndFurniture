import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import DispatchTeamDashboard from "../Pages/DispatchTeam/DispatchTeamDashboard";
import OutletMangerDashboard from "../Pages/OutletManager/OutletMangerDashboard";
import StitchingStoreManagerDashboard from "../Pages/StitchingStoreManager/StitchingStoreManagerDashboard";
import Dashboard from "../Pages/SuperAdmin/Dashboard";

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
import Search from "../Pages/SuperAdmin/Search";
import StaffDetials from "../Pages/SuperAdmin/StaffDetials";
import CreateTimeSlot from "../Pages/SuperAdmin/CreateTimeSlot";
import CustomerRequestedTimeSlot from "../Pages/SuperAdmin/CustomerRequestedTimeSlot";
import CustomerSchedule from "../Pages/Customer/CustomerSchedule";
import EditEnquiry from "../Pages/SuperAdmin/EditEnquiry";
import OutletCustomers from "../Pages/OutletManager/OutletCustomers";
import OutletEnquiry from "../Pages/OutletManager/OutletEnquiry";
import OutletIcs from "../Pages/OutletManager/OutletIcs";
import AddNewIc from "../Pages/OutletManager/AddNewIc";
import OutletEnquiryDetials from "../Pages/OutletManager/OutletEnquiryDetials";
import OutletCustomerDetials from "../Pages/OutletManager/OutletCustomerDetials";
import OutletStaffDetials from "../Pages/OutletManager/OutletStaffDetials";
import AllNotification from "../Pages/SuperAdmin/Common/AllNotification";
import OutletSearch from "../Pages/OutletManager/OutletSearch";
import DispatchTeamProductDesc from "../Pages/DispatchTeam/DispatchTeamProductDesc";
import DispatchTeamProductConfirmation from "../Pages/DispatchTeam/DispatchTeamProductConfirmation";
import DispatchTeamAllOrders from "../Pages/DispatchTeam/DispatchTeamAllOrders";

import CreateNewQcCheck from "../Pages/SuperAdmin/CreateNewQcCheck";
import AllQcChecks from "../Pages/SuperAdmin/AllQcChecks";
import AddNewEnquiry from "../Pages/SuperAdmin/AddNewEnquiry";
import AddRooms from "../Pages/SuperAdmin/AddRooms";
import MesurerDetials from "../Pages/SuperAdmin/MesurerDetials";

const CommonRoutes = () => {
  // const [type, setType] = useState({});
  const userDetails = useSelector((store) => store?.user?.userDetails?.type);

  // useEffect(() => {
  //   setType(userDetails);
  // }, [userDetails]);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />} />
        {userDetails === superAdmin && (
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
            <Route path="Search" element={<Search />} />
            <Route path="Staff-detials" element={<StaffDetials />} />
            <Route path="Measurer-detials" element={<MesurerDetials />} />
            <Route path="create-time-slot" element={<CreateTimeSlot />} />
            <Route
              path="Customer-requested-time-slot"
              element={<CustomerRequestedTimeSlot />}
            />
            <Route path="edit-enquiry" element={<EditEnquiry />} />
            <Route path="Notification" element={<AllNotification />} />
            <Route path="CreateQcCheck" element={<CreateNewQcCheck />} />
            <Route path="AllQcChecks" element={<AllQcChecks />} />
            <Route path="addNewEnquiry" element={<AddNewEnquiry />} />
            <Route path="AddRooms" element={<AddRooms />} />
          </>
        )}

        {userDetails === DispatchTeam && (
          <>
            <Route
              path="/DispatchTeamDashboard"
              element={<DispatchTeamDashboard />}
            />
            <Route
              path="/DispatchTeamProductDescription"
              element={<DispatchTeamProductDesc />}
            />
            <Route
              path="DispatchTeam-product-confirmation"
              element={<DispatchTeamProductConfirmation />}
            />
            <Route
              path="dispatch-team-all-order"
              element={<DispatchTeamAllOrders />}
            />
          </>
        )}

        {userDetails === OutletManager && (
          <>
            <Route
              path="/OutletManagerDashboard"
              element={<OutletMangerDashboard />}
            />
            <Route path="outletCustomers" element={<OutletCustomers />} />
            <Route path="outletEnquiry" element={<OutletEnquiry />} />
            <Route path="outletIcs" element={<OutletIcs />} />
            <Route path="addNewIcs" element={<AddNewIc />} />
            <Route
              path="OutletEnquiryDetials"
              element={<OutletEnquiryDetials />}
            />
            <Route
              path="OutletCustomerDetials"
              element={<OutletCustomerDetials />}
            />
            <Route path="OutletStaffDetials" element={<OutletStaffDetials />} />
            <Route path="OutletSearch" element={<OutletSearch />} />
          </>
        )}

        {userDetails === StitchingStoreManager && (
          <>
            <Route
              path="/StitchingStoreManagerDashboard"
              element={<StitchingStoreManagerDashboard />}
            />
          </>
        )}

        <Route path="*" element={<Error />} />
        <Route path="customer-schedule/:url" element={<CustomerSchedule />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CommonRoutes;
