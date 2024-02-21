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
import { Spinner } from "reactstrap";

function Dashboard() {
  const [AllDashboardData, setAllDashboardData] = useState("");
  // const [AllDashboardData, setAllDashboardData] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const toggle = () => setOpenModal(!openModal);
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
  const modalDateToggle = () => { setOpenDateModal(!openDateModal) };
  const [salesPersonId, setSalesPersonId] = useState("");
  const [salesPerson, setSalesPerson] = useState();
  const [storeName, setStoreName] = useState();
  const [storeId, setStoreId] = useState("");
  const [LoadingData, setLoadingData] = useState(false);

  const [date, setDate] = useState({
    fromDate: '',
    toDate: '',
  });

  let fromDate = date?.fromDate ? moment(date?.fromDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD") : '';
  let toDate = date?.toDate ? moment(date?.toDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD") : '';

  const columnHandler = (row, value, column) => {
    if (value > 0) {
      setCallApi(true);
      toggle2();
      setColumnName(column);
      setRowName(row);
    }
  }

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

  }

  useEffect(() => {
    GetDataWithToken(`superadmin/dashboard?fromDate=${fromDate}&toDate=${toDate}&salesId=${salesPersonId}&storeId=${storeId}`).then((response) => {
      if (response.status === true) {
        setAllDashboardData(response.data);
        setMainDashboardCallApi(false);
      }
    });


  }, [mainDashboardCallApi]);

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
            <div className="row">
              {LoadingData ?
                <div className="text-center">
                  <Spinner />
                  <p>Downloading Please Wait...</p>
                </div>
                : <div className="col-xl-12">
                  <div className="alert bg-secondary mb-5">
                    <div className="row">
                      <div className="col-xl-10">
                        <h3 className="text-white ">Super Admin Dashboard</h3>
                      </div>
                      <div className="col-xl-2">
                        <button className="btn btn-primary mx-5" onClick={modalDateToggle}>Filter</button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row">
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center">
                                <span>
                                  <img alt="" src="./images/share_astimate.svg" />
                                </span>
                                <div className="ms-4">
                                  <h2 className="mb-0 font-w600">
                                    {AllDashboardData?.totalEnquiry?.enquiry}
                                  </h2>
                                  <p className="mb-0 text-nowrap">
                                    Total Enquiry
                                  </p>
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.totalEnquiry?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => setOpenModal(true)}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center">
                                <span>
                                  <img
                                    alt=""
                                    src="./images/order_conformation.svg"
                                  />
                                </span>
                                <div className="ms-4">
                                  <h2 className="mb-0 font-w600">
                                    {AllDashboardData.measurementPending?.enquiry}
                                  </h2>
                                  <p className="mb-0 text-wrap">
                                    Pending Measurements
                                  </p>
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.measurementPending?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler("MEASUREMENT", AllDashboardData.measurementPending?.enquiry, "Overdue")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
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
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.estimateShared?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler("MEASUREMENT", AllDashboardData.estimateShared?.enquiry, "Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center">
                                <span>
                                  <img alt="" src="./images/purchase_order.svg" />
                                </span>
                                <div className="ms-4">
                                  <h2 className="mb-0 font-w600">
                                    {AllDashboardData?.orderConfirmed?.enquiry}
                                  </h2>
                                  <p className="mb-0">
                                    Order Created
                                  </p>
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.orderConfirmed?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler("ORDER", AllDashboardData.orderConfirmed?.enquiry, "Pending")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center">
                                <span>
                                  <img alt="" src="./images/purchase_order.svg" />
                                </span>
                                <div className="ms-4">
                                  <h2 className="mb-0 font-w600">
                                    {AllDashboardData?.QC1_Complete?.enquiry}
                                  </h2>
                                  <p className="mb-0">
                                    Material in Production
                                  </p>
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.QC1_Complete?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler("ORDER", AllDashboardData.QC1_Complete?.enquiry, "QC1")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center">
                                <span>
                                  <img alt="" src="./images/purchase_order.svg" />
                                </span>
                                <div className="ms-4">
                                  <h2 className="mb-0 font-w600">
                                    {AllDashboardData?.QC2_Complete?.enquiry}
                                  </h2>
                                  <p className="mb-0">
                                    QC Pending
                                  </p>
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.QC2_Complete?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler("ORDER", AllDashboardData.QC2_Complete?.enquiry, "QC2")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
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
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.qcComplete?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler("ORDER", AllDashboardData.qcComplete?.enquiry, "Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        {/* <div className="col-xl-3 col-sm-6">
                        <div className="card booking">
                          <div className="card-body text-align-center">
                            <div className="booking-status d-flex align-items-center">
                              <span>
                                <img alt="" src="./images/measurement.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">
                                  {AllDashboardData?.estimateShared?.enquiry}
                                </h2>
                                <p className="mb-0">Estimate Shared</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        {/* <div className="col-xl-3 col-sm-6">
                        <div className="card booking">
                          <div className="card-body">
                            <div className="booking-status d-flex align-items-center">
                              <span>
                                <img alt="" src="./images/grn_NOte.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">
                                  {AllDashboardData?.orderConfirmed?.enquiry}
                                </h2>
                                <p className="mb-0">Order Confirmed</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        {/* <div className="col-xl-3 col-sm-6">
                        <div className="card booking">
                          <div className="card-body">
                            <div className="booking-status d-flex align-items-center">
                              <span>
                                <img alt="" src="./images/installation.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">
                                  {AllDashboardData?.installerAssigned?.enquiry}
                                </h2>
                                <p className="mb-0">Work Done/Feedback’s</p>
                                <button
                                  onClick={() => DownloadReportHandler(AllDashboardData?.installerAssigned?.url)}
                                  className="btn btn-primary"
                                >
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center">
                                <span>
                                  <img alt="" src="./images/installation.svg" />
                                </span>
                                <div className="ms-4">
                                  <h2 className="mb-0 font-w600">
                                    {AllDashboardData?.installerAssigned?.enquiry}
                                  </h2>
                                  <p className="mb-0">Pending Delivery/installation</p>
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.installerAssigned?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler("INSTALLATION", AllDashboardData.installerAssigned?.enquiry, "Overdue")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
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
                                <img alt="" src="./images/installation.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">
                                  {
                                    AllDashboardData?.installationStarted
                                      ?.enquiry
                                  }
                                </h2>
                                <p className="mb-0">Installation Started</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center">
                                <span>
                                  <img alt="" src="./images/qFollowup.svg" />
                                </span>
                                <div className="ms-4">
                                  <h2 className="mb-0 font-w600">
                                    {AllDashboardData?.completedEnquiry?.enquiry}
                                  </h2>
                                  <p className="mb-0">Closed Enquiry</p>
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.completedEnquiry?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler("INSTALLATION", AllDashboardData.measurementPending?.enquiry, "Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
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
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
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
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.totalComplaints?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler2("pendingComplaint")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
                            <div className="card-body">
                              <div className="booking-status d-flex align-items-center">
                                <span>
                                  <img alt="" src="./images/qFollowup.svg" />
                                </span>
                                <div className="ms-4">
                                  <h2 className="mb-0 font-w600">
                                    {AllDashboardData?.feedback?.enquiry}
                                  </h2>
                                  <p className="mb-0"> Feedback</p>
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.feedback?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler2("feedback")}
                                    // onClick={() => columnHandler("INSTALLATION",AllDashboardData.measurementPending?.enquiry,"Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card booking">
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
                                  <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.wcr?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => columnHandler2("wcr")}
                                    // onClick={() => columnHandler("INSTALLATION",AllDashboardData.measurementPending?.enquiry,"Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button>
                                </div>

                              </div>
                            </div>
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
                                  <h4 className="fs-20">Purchase and selling</h4>
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
                </div>}
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}

export default Dashboard;
