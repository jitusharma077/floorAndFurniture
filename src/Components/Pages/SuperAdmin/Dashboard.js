import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetDataWithToken, serverUrl } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import OverdueModal from "../../Common/OverDueModal";
import OverdueDetails from "../../Common/OverDueDetailModal";
import OrdersModal from "../../Common/OrdersModal";
import moment from "moment";
import DashboardFilterModal from "../../Common/DashboardFilterModal";
import {
  Nav,
  NavItem,
  NavLink,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import EnquiryDetailModal from "../../Common/EnquiryDetailModal";
import ReactApexChart from "react-apexcharts";

function Dashboard() {
  const [dashboarChart1, setdashboarChart1] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "series-2",
        data: [20, 30, 40, 50, 43, 50, 20, 80],
      },
      {
        name: "series-3",
        data: [20, 30, 40, 50, 43, 50, 20, 80],
      },
    ],
  });
  const [enquiryStates, setEnquiryStates] = useState({
    openEnquiryModal: false,
    enquiryData: [],
    enquiryDownloadLink: null,
  });
  const [dashboardTab, setDashboardTab] = useState(1);
  const [AllDashboardData, setAllDashboardData] = useState(1);
  // const [AllDashboardData, setAllDashboardData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const DashboardTabs = [
    {
      title: "All",
      tabId: 1,
    },
    {
      title: "New",
      tabId: 2,
    },
    {
      title: "Pending",
      tabId: 3,
    },
    {
      title: "Completed",
      tabId: 4,
    },
    {
      title: "Cancelled",
      tabId: 5,
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const toggle = () => setOpenModal(!openModal);

  // const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const Enquirytoggle = () =>
    setEnquiryStates((prev) => ({
      ...prev,
      openEnquiryModal: !prev?.openEnquiryModal,
    }));

  const [openModal2, setOpenModal2] = useState(false);
  const toggle2 = () => setOpenModal2(!openModal2);

  const [rowName, setRowName] = useState();
  const [columnName, setColumnName] = useState();
  const [callApi, setCallApi] = useState(false);
  const [callApi1, setCallApi1] = useState(false);
  const [callApi2, setCallApi2] = useState(false);
  const [callApi3, setCallApi3] = useState(false);
  const [modalCallApi, setModalCallApi] = useState(false);
  const [mainDashboardCallApi, setMainDashboardCallApi] = useState(true);
  const [openDateModal, setOpenDateModal] = useState(false);
  const modalDateToggle = () => {
    setOpenDateModal(!openDateModal);
  };
  const [salesPersonId, setSalesPersonId] = useState("");
  const [salesPerson, setSalesPerson] = useState();
  const [storeName, setStoreName] = useState();
  const [storeId, setStoreId] = useState("");

  // main dashboard states start here
  const [openMainEnquirySummaryModal, setOpenMainEnquirySummaryModal] =
    useState(false);
  const toggleMainEnquirySummary = () =>
    setOpenMainEnquirySummaryModal(!openMainEnquirySummaryModal);

  const [openMainEnquirySummaryModal2, setOpenMainEnquirySummaryModal2] =
    useState(false);
  const toggleMainEnquirySummary2 = () =>
    setOpenMainEnquirySummaryModal2(!openMainEnquirySummaryModal2);

  const [openDashboardDateModal, setOpenDashboardDateModal] = useState(false);
  const modalDashboardDateToggle = () => {
    setOpenDashboardDateModal(!openDashboardDateModal);
  };

  const [dashboardSalesPersonId, setDashboardSalesPersonId] = useState("");
  const [dashboardSalesPerson, setDashboardSalesPerson] = useState();
  const [dashboardStoreName, setDashboardStoreName] = useState();
  const [dashboardStoreId, setDashboardStoreId] = useState("");

  const [mainDashboardCallApi2, setMainDashboardCallApi2] = useState(true);

  const [mainDashboarddate, setMainDashboardDate] = useState({
    fromDate: "",
    toDate: "",
  });

  // ends here

  const [LoadingData, setLoadingData] = useState(false);
  const [enquirySummaryData, setEnquirySummaryData] = useState([]);
  const [enquirySummaryMainData, setEnquirySummaryMainData] = useState([]);
  const [storeList, setStoreList] = useState([]);

  let todayDate = moment(new Date()).format("YYYY-MM-DD");
  let yesterdayDate = moment().subtract(1, "day").format("YYYY-MM-DD");
  let tomorrowDate = moment().add(1, "day").format("YYYY-MM-DD");

  const [date, setDate] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const columnHandler = (row, value, column) => {
    // console.log("rooowww...... valuee........ ", row, value, column)
    if (value > 0) {
      // if (column == "Estimate") {
      //   setCallApi(true);
      //   toggle2();
      //   setColumnName("Measurements");
      //   setRowName(row);
      // } else {
      setCallApi(true);
      toggle2();
      setColumnName(column);
      setRowName(row);
      // }
    }
  };

  const columnHandler2 = (name) => {
    if (name === "pendingComplaint") {
      setCallApi1(true);
      toggle2();
    } else if (name === "feedback") {
      setCallApi2(true);
      toggle2();
    } else if (name === "wcr") {
      setCallApi3(true);
      toggle2();
    }

    // setColumnName(column);
    // setRowName(row);
  };

  useEffect(() => {
    let fromDate = mainDashboarddate?.fromDate
      ? `${moment(mainDashboarddate?.fromDate)?.format("YYYY-MM-DD")} 00:00:00`
      : ``;
    let toDate = mainDashboarddate?.toDate
      ? `${moment(mainDashboarddate?.toDate)?.format("YYYY-MM-DD")} 00:00:00`
      : ``;

    GetDataWithToken(
      `superadmin/dashboard?fromDate=${fromDate}&toDate=${toDate}&salesId=${dashboardSalesPersonId}&storeId=${dashboardStoreId}`
    ).then((response) => {
      if (response.status === true) {
        setAllDashboardData(response.data);
        setMainDashboardCallApi2(false);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    GetDataWithToken(
      `superadmin/get-enquiry-summary?fromDate=${mainDashboarddate?.fromDate}&toDate=${mainDashboarddate?.toDate}&salesId=${dashboardSalesPersonId}&storeId=${dashboardStoreId}`
    ).then((response) => {
      if (response.status === true) {
        setEnquirySummaryMainData(response.data);
        setMainDashboardCallApi2(false);
      }
    });
  }, [mainDashboardCallApi2]);

  useEffect(() => {
    // GetDataWithToken(`superadmin/get-enquiry-summary?date=${todayDate}`).then((response) => {
    //   if (response.status === true) {
    //     // setEnquirySummaryData(response.data);

    //   }
    // })

    GetDataWithToken(`superadmin/get-outlet`).then((response) => {
      if (response.status === true) {
        setStoreList(response.data);
        // console.log(response.data);
      }
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let apiLink;
    let fromDate = date?.fromDate
      ? `${moment(date?.fromDate)?.format("YYYY-MM-DD")} 00:00:00`
      : ``;
    let toDate = date?.toDate
      ? `${moment(date?.toDate)?.format("YYYY-MM-DD")} 00:00:00`
      : ``;
    if (
      todayDate === moment(date?.fromDate).format("YYYY-MM-DD") &&
      todayDate === moment(date?.fromDate).format("YYYY-MM-DD")
    ) {
      apiLink = `superadmin/new-dashboard?date=${todayDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${storeId}`;

      // `superadmin/new-dashboard?today=${todayDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${Cookies.get("userID")}`;
    } else if (
      yesterdayDate === moment(date?.fromDate).format("YYYY-MM-DD") &&
      yesterdayDate === moment(date?.fromDate).format("YYYY-MM-DD")
    ) {
      apiLink = `superadmin/new-dashboard?date=${yesterdayDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${storeId}`;
    } else if (
      tomorrowDate === moment(date?.fromDate).format("YYYY-MM-DD") &&
      tomorrowDate === moment(date?.fromDate).format("YYYY-MM-DD")
    ) {
      apiLink = `superadmin/new-dashboard?date=${tomorrowDate}&fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${storeId}`;
    } else {
      apiLink = `superadmin/new-dashboard?fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${storeId}`;
    }
    // let fromDate = date?.fromDate ? `${moment(date?.fromDate)?.format("YYYY-MM-DD")} 0:00:00` : ``;
    // let toDate = date?.toDate ? `${moment(date?.toDate)?.format("YYYY-MM-DD")} 23:56` : ``;
    GetDataWithToken(apiLink).then((response) => {
      if (response?.status === true) {
        setEnquirySummaryData(response?.data);
        setIsLoading(false);
        setMainDashboardCallApi(false);
        // console.log("Ddatatatatata", enquirySummaryData);
      } else {
        setIsLoading(false);
      }
    });
  }, [mainDashboardCallApi]);

  const GetStorwiseAllEnquiryDetail = (url, dwnUrl, wcr) => {
    setLoadingData(true);
    Enquirytoggle();
    axios({
      url: url,
      method: "GET",
      // responseType: "blob", // important
    }).then((response) => {
      console.log(response?.data?.data);
      setEnquiryStates((prev) => ({
        ...prev,
        enquiryData: response?.data?.data,
        enquiryDownloadLink: dwnUrl,
      }));

      // setEnquiryData(response?.data?.data);
      // console.log
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "file.xls"); //or any other extension
      // document.body.appendChild(link);
      // link.click();
      setLoadingData(false);
    });
  };

  const DownloadReportHandler = (url) => {
    setLoadingData(true);
    axios({
      url: url,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xls"); //or any other extension
      document.body.appendChild(link);
      link.click();
      setLoadingData(false);
    });
  };

  return (
    <>
      <div
        data-typography="poppins"
        data-theme-version="light"
        data-layout="vertical"
        data-nav-headerbg="color_1"
        data-headerbg="color_1"
        data-sidebar-style="full"
        data-sibebarbg="color_1"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-container="wide"
        direction="ltr"
        data-primary="color_1"
        id="main-wrapper"
        className="show"
      >
        <SuperAdminHeader />
        <SuperAdminSidebar />
        <div className="content-body">
          {/*--- row ---*/}
          <div className="container-fluid">
            {LoadingData ? (
              <div className="text-center">
                <Spinner />
                <p>Downloading Please Wait...</p>
              </div>
            ) : (
              <div className="dashboard">
                <div className="dash-head mb-4">
                  <span>Welcome to</span>
                  <h3 className="">Super admin Dashboard</h3>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-sm-6">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.totalEnquiry?.view_url,
                          AllDashboardData?.totalEnquiry?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-start">
                          <span>
                            <img alt="" src="./images/share_astimate.svg" />
                          </span>
                          <div className="ms-4">
                            <p className="mb-0 text-wrap">Total Enquiry</p>
                            <h2 className="mb-0 font-w600">
                              {/* {AllDashboardData?.totalEnquiry?.open_enquiry}/ */}
                              {AllDashboardData?.totalEnquiry?.enquiry}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.measurementPending?.view_url,
                          AllDashboardData?.measurementPending?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-start">
                          <span>
                            <img alt="" src="./images/order_conformation.svg" />
                          </span>
                          <div className="ms-4">
                            <p className="mb-0 text-wrap">Pending Enquiry</p>
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData.measurementPending?.enquiry}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.completedEnquiry?.view_url,
                          AllDashboardData?.completedEnquiry?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-start">
                          <span>
                            <img alt="" src="./images/qFollowup.svg" />
                          </span>
                          <div className="ms-4">
                            <p className="mb-0">Closed Enquiries</p>
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.completedEnquiry?.enquiry}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.orderConfirmed?.view_url,
                          AllDashboardData?.orderConfirmed?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-start">
                          <span>
                            <img alt="" src="./images/purchase_order.svg" />
                          </span>
                          <div className="ms-4">
                            <p className="mb-0">Cancel Enquiry</p>
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.orderConfirmed?.enquiry}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------- */}
                  <div className="col-xl-3 col-sm-6 d-none">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.feedback?.view_url,
                          AllDashboardData?.feedback?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-start">
                          <span>
                            <img alt="" src="./images/qFollowup.svg" />
                          </span>
                          <div className="ms-4">
                            <p className="mb-0">Customer Feedback</p>
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.feedback?.enquiry}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 d-none">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.estimateShared?.view_url,
                          AllDashboardData?.estimateShared?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-center">
                          <span>
                            <img alt="" src="./images/delivery.svg" />
                          </span>
                          <div className="ms-4">
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.estimateShared?.enquiry}
                            </h2>
                            <p className="mb-0">Pending Share Estimates</p>
                            {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.estimateShared?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                            {/* <button
                                    onClick={() => columnHandler("MEASUREMENT", AllDashboardData.estimateShared?.enquiry, "Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 d-none">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.QC1_Complete?.view_url,
                          AllDashboardData?.QC1_Complete?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-center">
                          <span>
                            <img alt="" src="./images/purchase_order.svg" />
                          </span>
                          <div className="ms-4">
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.QC1_Complete?.enquiry}
                            </h2>
                            <p className="mb-0">Material in Production</p>
                            {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.QC1_Complete?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}

                            {/* <button
                                    onClick={() => columnHandler("ORDER", AllDashboardData.QC1_Complete?.enquiry, "QC1")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 d-none">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.QC2_Complete?.view_url,
                          AllDashboardData?.QC2_Complete?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-center">
                          <span>
                            <img alt="" src="./images/purchase_order.svg" />
                          </span>
                          <div className="ms-4">
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.QC2_Complete?.enquiry}
                            </h2>
                            <p className="mb-0">QC Done</p>
                            {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.QC2_Complete?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                            {/* <button
                                    onClick={() => columnHandler("ORDER", AllDashboardData.QC2_Complete?.enquiry, "QC2")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 d-none">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.qcComplete?.view_url,
                          AllDashboardData?.qcComplete?.url
                        )
                      }
                    >
                      <div className="card-body text-align-center">
                        <div className="booking-status d-flex align-items-center">
                          <span>
                            <img alt="" src="./images/measurement.svg" />
                          </span>
                          <div className="ms-4">
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.qcComplete?.enquiry}
                            </h2>
                            <p className="mb-0">Ready to Delivery</p>
                            {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.qcComplete?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}

                            {/* <button
                                    onClick={() => columnHandler("ORDER", AllDashboardData.qcComplete?.enquiry, "Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-xl-3 col-sm-6">
                        <div className="card booking">
                          <div className="card-body">
                            <div className="booking-status d-flex align-items-center">
                              <span>
                                <img alt="" src="./images/qFollowup.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">
                                  {AllDashboardData?.cancelledEnquiry?.enquiry}
                                </h2>
                                <p className="mb-0">Cancelled Enquiry</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                  <div className="col-xl-3 col-sm-6 d-none">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.totalComplaints?.view_url,
                          AllDashboardData?.totalComplaints?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-center">
                          <span>
                            <img alt="" src="./images/qFollowup.svg" />
                          </span>
                          <div className="ms-4">
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.totalComplaints?.enquiry}
                            </h2>
                            <p className="mb-0">Pending Complaints</p>
                            {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.totalComplaints?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                            {/* <button
                                    onClick={() => columnHandler2("pendingComplaint")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 d-none">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.wcr?.view_url,
                          AllDashboardData?.wcr?.url,
                          true
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-center">
                          <span>
                            <img alt="" src="./images/qFollowup.svg" />
                          </span>
                          <div className="ms-4">
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.wcr?.enquiry}
                            </h2>
                            <p className="mb-0">WCR</p>
                            {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.wcr?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                            {/* <button
                                    onClick={() => columnHandler2("wcr")}
                                    // onClick={() => columnHandler("INSTALLATION",AllDashboardData.measurementPending?.enquiry,"Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 d-none">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card booking"
                      onClick={() =>
                        GetStorwiseAllEnquiryDetail(
                          AllDashboardData?.cancelledEnquiry?.view_url,
                          AllDashboardData?.cancelledEnquiry?.url
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="booking-status d-flex align-items-center">
                          <span>
                            <img alt="" src="./images/qFollowup.svg" />
                          </span>
                          <div className="ms-4">
                            <h2 className="mb-0 font-w600">
                              {AllDashboardData?.cancelledEnquiry?.enquiry}
                            </h2>
                            <p className="mb-0">Cancelled Enquiries</p>
                            {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.cancelledEnquiry?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                            {/* <button
                                    onClick={() => columnHandler2("wcr")}
                                    // onClick={() => columnHandler("INSTALLATION",AllDashboardData.measurementPending?.enquiry,"Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* tabs start  */}

                <Nav activeTab={dashboardTab} pills className={"mb-3"}>
                  {DashboardTabs?.map((item) => (
                    <NavItem tabId={item?.tabId}>
                      <NavLink
                        role="button"
                        className={item?.tabId == dashboardTab ? "active" : ""}
                        onClick={() => setDashboardTab(item?.tabId)}
                      >
                        {item?.title}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>

                <TabContent activeTab={dashboardTab}>
                  <TabPane tabId={1}>
                    <div className="card">
                      <div className="card-body">
                        <ReactApexChart
                          className="mb-4"
                          options={dashboarChart1?.options}
                          series={dashboarChart1?.series}
                          type="bar"
                          width="100%"
                          height={350}
                        />

                        <div className="scroll-table">
                          <table className="table table-border">
                            <thead>
                              <tr>
                                <th>Enq. No.</th>
                                <th>Enq Date</th>
                                <th>Customer Name</th>
                                <th>Mobile No.</th>
                                <th>
                                  <div className="d-flex align-items-center justify-content-end">
                                    product
                                    <div className="ms-auto">
                                      <button
                                        className="btn border-0 p-0"
                                        type="button"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="6"
                                          height="8"
                                          viewBox="0 0 6 8"
                                          fill="none"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.26105 4.6683C5.11235 4.5241 4.87495 4.52775 4.7308 4.67645L3.375 6.0746V1C3.375 0.792895 3.20711 0.625 3 0.625C2.7929 0.625 2.625 0.792895 2.625 1V6.0746L1.26922 4.67645C1.12504 4.52775 0.887625 4.5241 0.738945 4.6683C0.590265 4.81245 0.58661 5.04985 0.730785 5.19855L2.73079 7.26105C2.80142 7.3339 2.89855 7.375 3 7.375C3.10146 7.375 3.19859 7.3339 3.26921 7.26105L5.2692 5.19855C5.4134 5.04985 5.40975 4.81245 5.26105 4.6683Z"
                                            fill="#111111"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        className="btn border-0 p-0"
                                        type="button"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="6"
                                          height="8"
                                          viewBox="0 0 6 8"
                                          fill="none"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.26106 3.3317C5.11236 3.4759 4.87496 3.47225 4.73081 3.32355L3.37501 1.9254V7C3.37501 7.2071 3.20711 7.375 3.00001 7.375C2.79291 7.375 2.62501 7.2071 2.62501 7V1.9254L1.26921 3.32355C1.12506 3.47225 0.887657 3.4759 0.738957 3.3317C0.590257 3.18755 0.586607 2.95012 0.730807 2.80145L2.73081 0.738945C2.80141 0.66611 2.89856 0.625 3.00001 0.625C3.10146 0.625 3.19861 0.66611 3.26921 0.738945L5.26921 2.80145C5.41341 2.95013 5.40976 3.18755 5.26106 3.3317Z"
                                            fill="#AAAAAA"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </th>
                                <th>Status</th>
                                <th>IC</th>
                                <th>Overdue</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>EN-001</td>
                                <td>23|08|2024</td>
                                <td>Jeet Singh</td>
                                <td>+91-1234567890</td>
                                <td>Curton</td>
                                <td>
                                  <span className="badge bg-primary">
                                    Pending Request
                                  </span>
                                </td>
                                <td>Raghvendra Singh</td>
                                <td>N/A</td>
                                <td>
                                  <button
                                    className="btn btn-more"
                                    type="button"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M10 16C10.4142 16 10.75 15.6642 10.75 15.25C10.75 14.8358 10.4142 14.5 10 14.5C9.58579 14.5 9.25 14.8358 9.25 15.25C9.25 15.6642 9.58579 16 10 16Z"
                                        stroke="#666D80"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M10 10.75C10.4142 10.75 10.75 10.4142 10.75 10C10.75 9.58579 10.4142 9.25 10 9.25C9.58579 9.25 9.25 9.58579 9.25 10C9.25 10.4142 9.58579 10.75 10 10.75Z"
                                        stroke="#666D80"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M10 5.5C10.4142 5.5 10.75 5.16421 10.75 4.75C10.75 4.33579 10.4142 4 10 4C9.58579 4 9.25 4.33579 9.25 4.75C9.25 5.16421 9.58579 5.5 10 5.5Z"
                                        stroke="#666D80"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId={2}>tab 2</TabPane>
                  <TabPane tabId={3}>tab 3</TabPane>
                  <TabPane tabId={4}>tab 4</TabPane>
                  <TabPane tabId={5}>tab 4</TabPane>
                </TabContent>

                {/* tabs end  */}

                <div className="row">
                  <div className="card">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="col-lg-4 my-4">
                        <label>Select Store</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            setStoreId(e.target.value);
                            setMainDashboardCallApi(true);
                          }}
                        >
                          <option value={""}>All Store</option>
                          {storeList?.map((data) => (
                            <option value={data?.id}>
                              {data?.firstName} {data?.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-2">
                        <button
                          className="btn btn-primary mx-5"
                          onClick={modalDateToggle}
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      {isLoading ? (
                        <div className="d-flex justify-content-center py-4">
                          <Spinner />
                        </div>
                      ) : (
                        <table class="table table-bordered">
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
                            {Object.keys(enquirySummaryData).map(
                              (category, index) => (
                                <tr key={index}>
                                  <td>
                                    {category === "total_enquiry"
                                      ? "Total Enquiry"
                                      : category}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Schedule",
                                        enquirySummaryData[category].scheduled,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].scheduled}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Completed",
                                        enquirySummaryData[category].completed,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].completed}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Pending",
                                        enquirySummaryData[category].pending,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].pending}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Cancelled",
                                        enquirySummaryData[category].cancelled,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].cancelled}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Overdue",
                                        enquirySummaryData[category].overdue,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].overdue}
                                  </td>
                                </tr>
                              )
                            )}

                            {/* {enquirySummaryData?.map((data) =>
                            <tr>
                              <td>{data?.name}</td>
                              <td onClick={() => columnHandler('Overdue', data?.Overdue, data?.name)}>{data?.Overdue}</td>
                              <td onClick={() => columnHandler('Pending', data?.Pending, data?.name)}>{data?.Pending}</td>
                              <td onClick={() => columnHandler('Today', data?.Today, data?.name)}>{data?.Today}</td>
                              <td onClick={() => columnHandler('Closed', data?.Closed, data?.name)}>{data?.Closed}</td>
                              <td onClick={() => columnHandler('Cancelled', data?.Cancelled, data?.name)}>{data?.Cancelled}</td>
                              <td onClick={() => columnHandler('Varient', data?.Varient, data?.name)}>{data?.Varient}</td>
                            </tr>
                          )} */}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="card">
                    <div className="row">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="col-lg-4 my-4">
                          <label>Select Store</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setDashboardStoreId(e.target.value);
                              setMainDashboardCallApi2(true);
                            }}
                          >
                            <option value={""}>All Store</option>
                            {storeList?.map((data) => (
                              <option value={data?.id}>
                                {data?.firstName} {data?.lastName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-xl-2">
                          <button
                            className="btn btn-primary mx-5"
                            onClick={modalDashboardDateToggle}
                          >
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="card">
                    <div className="col-xl-12">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="card">
                                <div className="card-header border-0 flex-wrap">
                                  <h4 className="fs-20">
                                    Purchase and selling
                                  </h4>
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
                                          fill="#B39355"
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
                                          fill="#B39355"
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
                                      <div
                                        id="chartBar1"
                                        className="chartBar"
                                      />
                                    </div>
                                    <div
                                      className="tab-pane fade"
                                      id="monthly1"
                                    >
                                      <div
                                        id="chartBar2"
                                        className="chartBar"
                                      />
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* modal for main dashboard starts here */}

      <OverdueModal
        openModal={openMainEnquirySummaryModal}
        date={mainDashboarddate}
        toggle={toggleMainEnquirySummary}
        // toggle2={toggle2}
        // setColumnName={setColumnName}
        // setRowName={setRowName}
        mainSetCallApi={setCallApi}
        storeId={dashboardStoreId}
        salesPersonId={dashboardSalesPersonId}
        setModalCallApi={setModalCallApi}
        modalCallApi={modalCallApi}
      />

      <OverdueDetails
        openModal={openMainEnquirySummaryModal2}
        toggle={toggleMainEnquirySummary2}
        storeId={dashboardStoreId}
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
        date={mainDashboarddate}
        salesPersonId={dashboardSalesPersonId}
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

      {/* modal for main dashboard ends here */}

      <OverdueModal
        openModal={openModal}
        date={date}
        toggle={toggle}
        toggle2={toggle2}
        setColumnName={setColumnName}
        setRowName={setRowName}
        mainSetCallApi={setCallApi}
        storeId={storeId}
        salesPersonId={salesPersonId}
        setModalCallApi={setModalCallApi}
        modalCallApi={modalCallApi}
      />

      <OverdueDetails
        openModal={openModal2}
        toggle={toggle2}
        storeId={storeId}
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
        setStoreName={setStoreName}
        setStoreId={setStoreId}
        storeName={storeName}
        setModalCallApi={setModalCallApi}
        // enquiryFilter="enquiryFilter"
        setSalesPersonId={setSalesPersonId}
        salesPerson={salesPerson}
        setSalesPerson={setSalesPerson}
        setMainData={setAllDashboardData}
        // setIsLoading={setisLoading}
        setMainCallApi={setMainDashboardCallApi}
        // setCurrentPage={setCurrentPage}
      />
      <EnquiryDetailModal
        toggle={Enquirytoggle}
        openModal={enquiryStates?.openEnquiryModal}
        enquiryData={enquiryStates?.enquiryData}
        setEnquiryData={setEnquiryStates}
        isLoading={LoadingData}
        DownloadReportHandler={DownloadReportHandler}
        downloadLink={enquiryStates?.enquiryDownloadLink}
      />
    </>
  );
}

export default Dashboard;
