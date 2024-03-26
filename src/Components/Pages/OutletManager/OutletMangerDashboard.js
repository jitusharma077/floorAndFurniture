import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { Spinner } from "reactstrap";
import moment from "moment";
import OverdueDetails from "../../Common/OverDueDetailModal";
import DashboardFilterModal from "../../Common/DashboardFilterModal";

function OutletMangerDashboard() {

  // const [AllDashboardData, setAllDashboardData] = useState("");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [callApi, setCallApi] = useState(false);

  const [mainDashboardCallApi, setMainDashboardCallApi] = useState(true);

  const [openDashboardDateModal, setOpenDashboardDateModal] = useState(false);
  const modalDashboardDateToggle = () => { setOpenDashboardDateModal(!openDashboardDateModal) };

  const [dashboardSalesPersonId, setDashboardSalesPersonId] = useState("");
  const [dashboardSalesPerson, setDashboardSalesPerson] = useState();
  const [dashboardStoreName, setDashboardStoreName] = useState();
  const [dashboardStoreId, setDashboardStoreId] = useState("");
  const [mainDashboardCallApi2, setMainDashboardCallApi2] = useState(true);
  const [AllDashboardData, setAllDashboardData] = useState("");

  const [callApi1, setCallApi1] = useState(false);
  const [callApi2, setCallApi2] = useState(false);
  const [callApi3, setCallApi3] = useState(false);

  const [openDateModal, setOpenDateModal] = useState(false);
  const modalDateToggle = () => { setOpenDateModal(!openDateModal) };

  const [modalCallApi, setModalCallApi] = useState(false);
  const [salesPerson, setSalesPerson] = useState();

  const [enquirySummaryData, setEnquirySummaryData] = useState([]);
  const [columnName, setColumnName] = useState();

  const toggle2 = () => setOpenModal2(!openModal2);
  const [openModal2, setOpenModal2] = useState(false);
  const [rowName, setRowName] = useState();
  const [salesPersonId, setSalesPersonId] = useState("");

  const Logout = () => {
    Cookies.remove("userType");
    navigate("/");
  };

  const [outletData, setOutletData] = useState([]);
  const [IcList, setIcList] = useState([]);

  const [date, setDate] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });

  let todayDate = moment(new Date()).format('YYYY-MM-DD');
  let yesterdayDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
  let tomorrowDate = moment().add(1, 'day').format('YYYY-MM-DD');

  const [mainDashboarddate, setMainDashboardDate] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });

  useEffect(() => {
    let apiLink;
    let fromDate = date?.fromDate ? `${moment(date?.fromDate)?.format("YYYY-MM-DD")} 00:00:00` : ``;
    let toDate = date?.toDate ? `${moment(date?.toDate)?.format("YYYY-MM-DD")} 00:00:00` : ``;
    if (todayDate === moment(date?.fromDate).format('YYYY-MM-DD') && todayDate === moment(date?.fromDate).format('YYYY-MM-DD')) {
      apiLink = `superadmin/new-dashboard?date=${todayDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${Cookies.get("userID")}`;
    } else if (yesterdayDate === moment(date?.fromDate).format('YYYY-MM-DD') && yesterdayDate === moment(date?.fromDate).format('YYYY-MM-DD')) {
      apiLink = `superadmin/new-dashboard?date=${yesterdayDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${Cookies.get("userID")}`;
    } else if (tomorrowDate === moment(date?.fromDate).format('YYYY-MM-DD') && tomorrowDate === moment(date?.fromDate).format('YYYY-MM-DD')) {
      apiLink = `superadmin/new-dashboard?date=${tomorrowDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${Cookies.get("userID")}`;
    }
    else {
      apiLink = `superadmin/new-dashboard?fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${Cookies.get("userID")}`;
    }

    GetDataWithToken(apiLink).then((response) => {
      if (response?.status === true) {
        setEnquirySummaryData(response?.data);
        setIsLoading(false);
        // console.log("Ddatatatatata", enquirySummaryData);
        setMainDashboardCallApi(false);
      } else {
        setIsLoading(false)
      }
    })
  }, [mainDashboardCallApi]);

  useEffect(() => {

    let apiLink;
    let fromDate = date?.fromDate ? `${moment(date?.fromDate)?.format("YYYY-MM-DD")} 00:00:00` : ``;
    let toDate = date?.toDate ? `${moment(date?.toDate)?.format("YYYY-MM-DD")} 00:00:00` : ``;
    if (todayDate === moment(date?.fromDate).format('YYYY-MM-DD') && todayDate === moment(date?.fromDate).format('YYYY-MM-DD')) {
      apiLink = `outlet/dashboard/${Cookies.get("userID")}?date=${todayDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}`;
      // `superadmin/new-dashboard?today=${todayDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${Cookies.get("userID")}`;
    } else if (yesterdayDate === moment(date?.fromDate).format('YYYY-MM-DD') && yesterdayDate === moment(date?.fromDate).format('YYYY-MM-DD')) {
      apiLink = `outlet/dashboard/${Cookies.get("userID")}?date=${yesterdayDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}`;
    } else if (tomorrowDate === moment(date?.fromDate).format('YYYY-MM-DD') && tomorrowDate === moment(date?.fromDate).format('YYYY-MM-DD')) {
      apiLink = `outlet/dashboard/${Cookies.get("userID")}?date=${tomorrowDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}`;
    }
    else {
      apiLink = `outlet/dashboard/${Cookies.get("userID")}?fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}`;
    }

    // let fromDate = mainDashboarddate?.fromDate ? `${moment(mainDashboarddate?.fromDate)?.format("YYYY-MM-DD")} 0:00:00` : ``;
    // let toDate = mainDashboarddate?.toDate ? `${moment(mainDashboarddate?.toDate)?.format("YYYY-MM-DD")} 23:56` : ``;

    GetDataWithToken(apiLink).then(
      (response) => {
        console.log(response.data);
        setOutletData(response.data);
        // setIcList(response.data.ic);
        setMainDashboardCallApi2(false);
      }
    );
    GetDataWithToken(`superadmin/get-outlet-ic/${Cookies.get("userID")}?fromDate=${mainDashboarddate?.fromDate}&toDate=${mainDashboarddate?.toDate}&salesId=${salesPersonId}`).then(
      (response) => {
        console.log(response?.data);
        // setOutletData(response.data);
        setIcList(response.data);
        setMainDashboardCallApi2(false);
      }
    );
  }, [mainDashboardCallApi2])


  const columnHandler = (row, value, column) => {
    console.log("rooowww...... valuee........ ", row, value, column)
    if (value > 0) {

      setCallApi(true);
      toggle2();
      setColumnName(column);
      setRowName(row);

    }
  }

  return (
    <>
      <div
        data-typography="poppins"
        data-theme-version="light"
        data-layout="horizontal"
        data-nav-headerbg="color_1"
        data-headerbg="color_1"
        data-sidebar-style="full"
        data-sibebarbg="color_1"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-container="wide"
        direction="ltr"
        data-primary="color_1"
        className="outlet_style"
      >
        <OutletManagerHeader />
        <OutletManagerSidebar />
        <div className="content-body">
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="row">

                  <div className="col-xl-12">
                    <div className="alert bg-secondary mb-5 d-flex justify-content-between align-items-center">
                      <h3 className="text-white ">Outlet Manager Dashboard</h3>

                    </div>
                    <div className="row px-3 ">
                      <div className="card">
                        <div className="d-flex justify-content-end mt-1">
                          <button className="btn btn-primary mx-5" onClick={modalDateToggle}>Filter</button>
                        </div>
                        {isLoading ?
                          <div className="d-flex justify-content-center py-4">
                            <Spinner />
                          </div>
                          : <table class="table table-bordered my-3">
                            <thead>
                              <tr>
                                <th>Stages</th>
                                <th>Scheduled</th>
                                <th>Completed</th>
                                <th>Pending</th>
                                <th>Cancelled</th>
                                <th>Overdue</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.keys(enquirySummaryData).map((category, index) => (
                                <tr key={index}>
                                  <td>{category === "total_enquiry" ? "Total Enquiry" : category}</td>
                                  <td>{enquirySummaryData[category].scheduled}</td>
                                  <td>{enquirySummaryData[category].completed}</td>
                                  <td style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={() => columnHandler('Pending', enquirySummaryData[category].pending, category)}>{enquirySummaryData[category].pending}</td>
                                  <td style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={() => columnHandler('Cancelled', enquirySummaryData[category].cancelled, category)}>{enquirySummaryData[category].cancelled}</td>
                                  <td style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={() => columnHandler('Overdue', enquirySummaryData[category].overdue, category)}>{enquirySummaryData[category].overdue}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>}
                      </div>
                    </div>

                    <div className="card">
                      <div className="row">
                        <div className="d-flex justify-content-end mt-2">
                          <button className="btn btn-primary mx-5" onClick={modalDashboardDateToggle}>Filter</button>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="#" className="card booking">
                            <div className="card-body" >
                              <div className="booking-status d-flex align-items-center justify-content-between" >
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {outletData?.totalEnquiry?.open_enquiry}/{outletData?.totalEnquiry?.enquiry}
                                  </h2>
                                  <p className="mb-0">Open Enquiry/Total Enquiry</p>
                                </div>
                                <span>
                                  <svg
                                    id="_009-log-out"
                                    data-name="009-log-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15px"
                                    height="15px"
                                    viewBox="0 0 28 28"
                                  >
                                    <path
                                      data-name="Path 1957"
                                      d="M151.435,178.842v2.8a5.6,5.6,0,0,1-5.6,5.6h-14a5.6,5.6,0,0,1-5.6-5.6v-16.8a5.6,5.6,0,0,1,5.6-5.6h14a5.6,5.6,0,0,1,5.6,5.6v2.8a1.4,1.4,0,0,1-2.8,0v-2.8a2.8,2.8,0,0,0-2.8-2.8h-14a2.8,2.8,0,0,0-2.8,2.8v16.8a2.8,2.8,0,0,0,2.8,2.8h14a2.8,2.8,0,0,0,2.8-2.8v-2.8a1.4,1.4,0,0,1,2.8,0Zm-10.62-7,1.81-1.809a1.4,1.4,0,1,0-1.98-1.981l-4.2,4.2a1.4,1.4,0,0,0,0,1.981l4.2,4.2a1.4,1.4,0,1,0,1.98-1.981l-1.81-1.81h12.02a1.4,1.4,0,1,0,0-2.8Z"
                                      transform="translate(-126.235 -159.242)"
                                      fill="#ffffff"
                                      fillRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="#" className="card booking">
                            <div className="card-body px-3">
                              <div className="booking-status d-flex align-items-center justify-content-between">
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {outletData?.estimateShared?.enquiry}
                                  </h2>
                                  <p className="mb-0 text-nowrap">
                                    Share Estimate
                                  </p>
                                </div>
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 28 20"
                                  >
                                    <path
                                      d="M27,14V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v7a3,3,0,0,0-3,3v8a1,1,0,0,0,2,0V24H28v1a1,1,0,0,0,2,0V17A3,3,0,0,0,27,14ZM7,8H25v6H24V12a2,2,0,0,0-2-2H19a2,2,0,0,0-2,2v2H15V12a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v2H7Zm12,6V12h3v2Zm-9,0V12h3v2ZM4,17a1,1,0,0,1,1-1H27a1,1,0,0,1,1,1v5H4Z"
                                      transform="translate(-2 -6)"
                                      fill="#ffffff"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="" className="card booking">
                            <div className="card-body px-3">
                              <div className="booking-status d-flex align-items-center justify-content-between">
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {outletData?.orderConfirmed?.enquiry}
                                  </h2>
                                  <p className="mb-0 text-nowrap">
                                    Order Confirmation
                                  </p>
                                </div>
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 28 20"
                                  >
                                    <path
                                      d="M27,14V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v7a3,3,0,0,0-3,3v8a1,1,0,0,0,2,0V24H28v1a1,1,0,0,0,2,0V17A3,3,0,0,0,27,14ZM7,8H25v6H24V12a2,2,0,0,0-2-2H19a2,2,0,0,0-2,2v2H15V12a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v2H7Zm12,6V12h3v2Zm-9,0V12h3v2ZM4,17a1,1,0,0,1,1-1H27a1,1,0,0,1,1,1v5H4Z"
                                      transform="translate(-2 -6)"
                                      fill="#ffffff"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="#" className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center justify-content-between">
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {" "}
                                    {outletData?.measurementPending?.enquiry}
                                  </h2>
                                  <p className="mb-0">Measurement Pending</p>
                                </div>
                                <span>
                                  <svg
                                    id="_009-log-out"
                                    data-name="009-log-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15px"
                                    height="15px"
                                    viewBox="0 0 28 28"
                                  >
                                    <path
                                      data-name="Path 1957"
                                      d="M151.435,178.842v2.8a5.6,5.6,0,0,1-5.6,5.6h-14a5.6,5.6,0,0,1-5.6-5.6v-16.8a5.6,5.6,0,0,1,5.6-5.6h14a5.6,5.6,0,0,1,5.6,5.6v2.8a1.4,1.4,0,0,1-2.8,0v-2.8a2.8,2.8,0,0,0-2.8-2.8h-14a2.8,2.8,0,0,0-2.8,2.8v16.8a2.8,2.8,0,0,0,2.8,2.8h14a2.8,2.8,0,0,0,2.8-2.8v-2.8a1.4,1.4,0,0,1,2.8,0Zm-10.62-7,1.81-1.809a1.4,1.4,0,1,0-1.98-1.981l-4.2,4.2a1.4,1.4,0,0,0,0,1.981l4.2,4.2a1.4,1.4,0,1,0,1.98-1.981l-1.81-1.81h12.02a1.4,1.4,0,1,0,0-2.8Z"
                                      transform="translate(-126.235 -159.242)"
                                      fill="#ffffff"
                                      fillRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="#" className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center justify-content-between">
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {" "}
                                    {outletData?.installerAssigned?.enquiry}
                                  </h2>
                                  <p className="mb-0">Installer Assigned</p>
                                </div>
                                <span>
                                  <svg
                                    id="_009-log-out"
                                    data-name="009-log-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15px"
                                    height="15px"
                                    viewBox="0 0 28 28"
                                  >
                                    <path
                                      data-name="Path 1957"
                                      d="M151.435,178.842v2.8a5.6,5.6,0,0,1-5.6,5.6h-14a5.6,5.6,0,0,1-5.6-5.6v-16.8a5.6,5.6,0,0,1,5.6-5.6h14a5.6,5.6,0,0,1,5.6,5.6v2.8a1.4,1.4,0,0,1-2.8,0v-2.8a2.8,2.8,0,0,0-2.8-2.8h-14a2.8,2.8,0,0,0-2.8,2.8v16.8a2.8,2.8,0,0,0,2.8,2.8h14a2.8,2.8,0,0,0,2.8-2.8v-2.8a1.4,1.4,0,0,1,2.8,0Zm-10.62-7,1.81-1.809a1.4,1.4,0,1,0-1.98-1.981l-4.2,4.2a1.4,1.4,0,0,0,0,1.981l4.2,4.2a1.4,1.4,0,1,0,1.98-1.981l-1.81-1.81h12.02a1.4,1.4,0,1,0,0-2.8Z"
                                      transform="translate(-126.235 -159.242)"
                                      fill="#ffffff"
                                      fillRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="#" className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center justify-content-between">
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {" "}
                                    {outletData?.installationStarted?.enquiry}
                                  </h2>

                                  <p className="mb-0">Installation Started</p>
                                </div>
                                <span>
                                  <svg
                                    id="_009-log-out"
                                    data-name="009-log-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15px"
                                    height="15px"
                                    viewBox="0 0 28 28"
                                  >
                                    <path
                                      data-name="Path 1957"
                                      d="M151.435,178.842v2.8a5.6,5.6,0,0,1-5.6,5.6h-14a5.6,5.6,0,0,1-5.6-5.6v-16.8a5.6,5.6,0,0,1,5.6-5.6h14a5.6,5.6,0,0,1,5.6,5.6v2.8a1.4,1.4,0,0,1-2.8,0v-2.8a2.8,2.8,0,0,0-2.8-2.8h-14a2.8,2.8,0,0,0-2.8,2.8v16.8a2.8,2.8,0,0,0,2.8,2.8h14a2.8,2.8,0,0,0,2.8-2.8v-2.8a1.4,1.4,0,0,1,2.8,0Zm-10.62-7,1.81-1.809a1.4,1.4,0,1,0-1.98-1.981l-4.2,4.2a1.4,1.4,0,0,0,0,1.981l4.2,4.2a1.4,1.4,0,1,0,1.98-1.981l-1.81-1.81h12.02a1.4,1.4,0,1,0,0-2.8Z"
                                      transform="translate(-126.235 -159.242)"
                                      fill="#ffffff"
                                      fillRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="#" className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center justify-content-between">
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {" "}
                                    {outletData?.estimateShared?.enquiry}
                                  </h2>
                                  <p className="mb-0">Estimate Shared</p>
                                </div>
                                <span>
                                  <svg
                                    id="_009-log-out"
                                    data-name="009-log-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15px"
                                    height="15px"
                                    viewBox="0 0 28 28"
                                  >
                                    <path
                                      data-name="Path 1957"
                                      d="M151.435,178.842v2.8a5.6,5.6,0,0,1-5.6,5.6h-14a5.6,5.6,0,0,1-5.6-5.6v-16.8a5.6,5.6,0,0,1,5.6-5.6h14a5.6,5.6,0,0,1,5.6,5.6v2.8a1.4,1.4,0,0,1-2.8,0v-2.8a2.8,2.8,0,0,0-2.8-2.8h-14a2.8,2.8,0,0,0-2.8,2.8v16.8a2.8,2.8,0,0,0,2.8,2.8h14a2.8,2.8,0,0,0,2.8-2.8v-2.8a1.4,1.4,0,0,1,2.8,0Zm-10.62-7,1.81-1.809a1.4,1.4,0,1,0-1.98-1.981l-4.2,4.2a1.4,1.4,0,0,0,0,1.981l4.2,4.2a1.4,1.4,0,1,0,1.98-1.981l-1.81-1.81h12.02a1.4,1.4,0,1,0,0-2.8Z"
                                      transform="translate(-126.235 -159.242)"
                                      fill="#ffffff"
                                      fillRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="#" className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center justify-content-between">
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {" "}
                                    {outletData?.qcComplete?.enquiry}
                                  </h2>
                                  <p className="mb-0">QC Complete</p>
                                </div>
                                <span>
                                  <svg
                                    id="_009-log-out"
                                    data-name="009-log-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15px"
                                    height="15px"
                                    viewBox="0 0 28 28"
                                  >
                                    <path
                                      data-name="Path 1957"
                                      d="M151.435,178.842v2.8a5.6,5.6,0,0,1-5.6,5.6h-14a5.6,5.6,0,0,1-5.6-5.6v-16.8a5.6,5.6,0,0,1,5.6-5.6h14a5.6,5.6,0,0,1,5.6,5.6v2.8a1.4,1.4,0,0,1-2.8,0v-2.8a2.8,2.8,0,0,0-2.8-2.8h-14a2.8,2.8,0,0,0-2.8,2.8v16.8a2.8,2.8,0,0,0,2.8,2.8h14a2.8,2.8,0,0,0,2.8-2.8v-2.8a1.4,1.4,0,0,1,2.8,0Zm-10.62-7,1.81-1.809a1.4,1.4,0,1,0-1.98-1.981l-4.2,4.2a1.4,1.4,0,0,0,0,1.981l4.2,4.2a1.4,1.4,0,1,0,1.98-1.981l-1.81-1.81h12.02a1.4,1.4,0,1,0,0-2.8Z"
                                      transform="translate(-126.235 -159.242)"
                                      fill="#ffffff"
                                      fillRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="#" className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center justify-content-between">
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {" "}
                                    {outletData?.completedEnquiry?.enquiry}
                                  </h2>
                                  <p className="mb-0">Completed Enquiry</p>
                                </div>
                                <span>
                                  <svg
                                    id="_009-log-out"
                                    data-name="009-log-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15px"
                                    height="15px"
                                    viewBox="0 0 28 28"
                                  >
                                    <path
                                      data-name="Path 1957"
                                      d="M151.435,178.842v2.8a5.6,5.6,0,0,1-5.6,5.6h-14a5.6,5.6,0,0,1-5.6-5.6v-16.8a5.6,5.6,0,0,1,5.6-5.6h14a5.6,5.6,0,0,1,5.6,5.6v2.8a1.4,1.4,0,0,1-2.8,0v-2.8a2.8,2.8,0,0,0-2.8-2.8h-14a2.8,2.8,0,0,0-2.8,2.8v16.8a2.8,2.8,0,0,0,2.8,2.8h14a2.8,2.8,0,0,0,2.8-2.8v-2.8a1.4,1.4,0,0,1,2.8,0Zm-10.62-7,1.81-1.809a1.4,1.4,0,1,0-1.98-1.981l-4.2,4.2a1.4,1.4,0,0,0,0,1.981l4.2,4.2a1.4,1.4,0,1,0,1.98-1.981l-1.81-1.81h12.02a1.4,1.4,0,1,0,0-2.8Z"
                                      transform="translate(-126.235 -159.242)"
                                      fill="#ffffff"
                                      fillRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-2 col-md-6 col-6">
                          <a href="#" className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center justify-content-between">
                                <div className="ms-3">
                                  <h2 className="mb-0 font-w600">
                                    {" "}
                                    {outletData?.cancelledEnquiry?.enquiry}
                                  </h2>
                                  <p className="mb-0">Cancelled Enquiry</p>
                                </div>
                                <span>
                                  <svg
                                    id="_009-log-out"
                                    data-name="009-log-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15px"
                                    height="15px"
                                    viewBox="0 0 28 28"
                                  >
                                    <path
                                      data-name="Path 1957"
                                      d="M151.435,178.842v2.8a5.6,5.6,0,0,1-5.6,5.6h-14a5.6,5.6,0,0,1-5.6-5.6v-16.8a5.6,5.6,0,0,1,5.6-5.6h14a5.6,5.6,0,0,1,5.6,5.6v2.8a1.4,1.4,0,0,1-2.8,0v-2.8a2.8,2.8,0,0,0-2.8-2.8h-14a2.8,2.8,0,0,0-2.8,2.8v16.8a2.8,2.8,0,0,0,2.8,2.8h14a2.8,2.8,0,0,0,2.8-2.8v-2.8a1.4,1.4,0,0,1,2.8,0Zm-10.62-7,1.81-1.809a1.4,1.4,0,1,0-1.98-1.981l-4.2,4.2a1.4,1.4,0,0,0,0,1.981l4.2,4.2a1.4,1.4,0,1,0,1.98-1.981l-1.81-1.81h12.02a1.4,1.4,0,1,0,0-2.8Z"
                                      transform="translate(-126.235 -159.242)"
                                      fill="#ffffff"
                                      fillRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="card">
                              <div className="card-header border-0 flex-wrap">
                                <h4 className="fs-20">Outlet Sales</h4>
                                <div className="card-action coin-tabs">
                                  <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        href="#Daily1"
                                        role="tab"
                                      >
                                        Daily
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        href="#weekly1"
                                        role="tab"
                                      >
                                        Weekly
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link active"
                                        data-bs-toggle="tab"
                                        href="#monthly1"
                                        role="tab"
                                      >
                                        Monthly
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="card-body pb-0">
                                <div className="d-flex flex-wrap">
                                  <span className="me-sm-5 me-0 font-w500">
                                    <svg
                                      className="me-1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={13}
                                      height={13}
                                      viewBox="0 0 13 13"
                                    >
                                      <rect
                                        width={13}
                                        height={13}
                                        fill="#312E2E"
                                      ></rect>
                                    </svg>
                                    Purchase
                                  </span>
                                  <span className="fs-16 font-w600 me-4">
                                    23,451
                                    <small className="text-success fs-12 font-w400">
                                      +0.4%
                                    </small>
                                  </span>
                                  <span className="me-sm-5 ms-0 font-w500">
                                    <svg
                                      className="me-1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={13}
                                      height={13}
                                      viewBox="0 0 13 13"
                                    >
                                      <rect
                                        width={13}
                                        height={13}
                                        fill="#5B6058"
                                      ></rect>
                                    </svg>
                                    Sales
                                  </span>
                                  <span className="fs-16 font-w600">
                                    20,441
                                  </span>
                                </div>
                                <div className="tab-content">
                                  <div
                                    className="tab-pane fade show active"
                                    id="Daily1"
                                  >
                                    <div id="chartBar" className="chartBar" />
                                  </div>
                                  <div className="tab-pane fade" id="weekly1">
                                    <div id="chartBar1" className="chartBar" />
                                  </div>
                                  <div className="tab-pane fade" id="monthly1">
                                    <div id="chartBar2" className="chartBar" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-sm-6">
                    <div className="card bg-secondary">
                      <div className="card-body">
                        <div className="d-flex align-items-center  justify-content-between">
                          <p className=" text-white d-inline m-0 ">
                            Total Enquries :{" "}
                            <span className="font-w600"> 20,441</span>
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary  btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modal2"
                          >
                            Add Enquiry
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-sm-6">
                    <div className="card bg-secondary">
                      <div className="card-body">
                        <div className="d-flex align-items-center  justify-content-between">
                          <p className=" text-white d-inline m-0">
                            Total Task :{" "}
                            <span className="font-w600"> 20,441</span>
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary  btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modal3"
                          >
                            Assign Task
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">All IC</h4>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            id="example4"
                            className="table card-table display mb-4 shadow-hover table-responsive-lg"
                            style={{ minWidth: "845px" }}
                          >
                            <thead>
                              <tr>
                                <th>IC Name</th>
                                <th>IC ID</th>
                                <th>IC Mobile No.</th>
                                <th>Email</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {console.log("icList", IcList)}
                              {IcList.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      {item?.firstName} {item?.lastName}
                                    </td>
                                    <td>{item?.id}</td>
                                    <td>{item?.phone}</td>
                                    <td>{item?.email}</td>
                                    <td>
                                      <button
                                        onClick={() => {
                                          navigate("/OutletStaffDetials", {
                                            state: { data: item.id },
                                          });
                                        }}
                                        href="IcDetails.html"
                                        className="btn btn-primary"
                                      >
                                        View details
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OverdueDetails
        openModal={openModal2}
        toggle={toggle2}
        storeId={Cookies.get("userID")}
        columnName={columnName}
        rowName={rowName}
        mainCallApi={callApi}
        mainSetCallApi={setCallApi}
        callApi1={callApi1}
        setCallApi1={setCallApi1}
        callApi2={callApi2}
        setCallApi2={setCallApi2}
        callApi3={callApi3}
        setCallApi3={setCallApi3}
        date={date}
        salesPersonId={salesPersonId}
      />
      <DashboardFilterModal
        openModal={openDateModal}
        modalToggle={modalDateToggle}
        date={date}
        setDate={setDate}
        // setStoreName={setStoreName}
        // setStoreId={setStoreId}
        // storeName={storeName}
        setModalCallApi={setModalCallApi}
        // enquiryFilter="enquiryFilter"
        setSalesPersonId={setSalesPersonId}
        salesPerson={salesPerson}
        setSalesPerson={setSalesPerson}
        setMainData={setOutletData}
        // setIsLoading={setisLoading}
        setMainCallApi={setMainDashboardCallApi}
      // setCurrentPage={setCurrentPage}
      />
      <DashboardFilterModal
        openModal={openDashboardDateModal}
        modalToggle={modalDashboardDateToggle}
        date={mainDashboarddate}
        setDate={setMainDashboardDate}
        setStoreName={setDashboardStoreName}
        setStoreId={setDashboardStoreId}
        storeName={dashboardStoreName}
        setModalCallApi={setModalCallApi}
        // enquiryFilter="enquiryFilter"
        setSalesPersonId={setDashboardSalesPersonId}
        salesPerson={dashboardSalesPerson}
        setSalesPerson={setDashboardSalesPerson}
        setMainData={setAllDashboardData}
        // setIsLoading={setisLoading}
        setMainCallApi={setMainDashboardCallApi2}
      // setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default OutletMangerDashboard;
