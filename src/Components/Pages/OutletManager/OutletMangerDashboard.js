import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
function OutletMangerDashboard() {
  const navigate = useNavigate();
  const Logout = () => {
    Cookies.remove("userType");
    navigate("/");
  };

  const [outletData, setOutletData] = useState([]);
  const [IcList, setIcList] = useState([]);
  useEffect(() => {
    GetDataWithToken(`outlet/dashboard/${Cookies.get("userID")}`).then(
      (response) => {
        console.log(response.data);
        setOutletData(response.data);
        // setIcList(response.data.ic);
      }
    );
    GetDataWithToken(`superadmin/get-outlet-ic/${Cookies.get("userID")}`).then(
      (response) => {
        console.log(response?.data);
        // setOutletData(response.data);
        setIcList(response.data);
      }
    );
  }, []);
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
                    <div className="alert bg-secondary mb-5">
                      <h3 className="text-white ">Outlet Manager Dashboard</h3>
                    </div>
                    <div className="row">
                      <div className="col-xl-2 col-md-6 col-6">
                        <a href="#" className="card booking">
                          <div className="card-body">
                            <div className="booking-status d-flex align-items-center justify-content-between">
                              <div className="ms-3">
                                <h2 className="mb-0 font-w600">
                                  {" "}
                                  {outletData?.totalEnquiry?.enquiry}
                                </h2>
                                <p className="mb-0">Total Enquiry</p>
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
    </>
  );
}

export default OutletMangerDashboard;
