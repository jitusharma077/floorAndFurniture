import React, { useEffect } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function Dashboard() {
  // useEffect(() => {
  //   let resp = (123456).toString();
  //   console.log("resp", resp);
  // }, [""]);

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
              <div className="col-xl-12">
                <div className="alert bg-secondary mb-5">
                  <h3 className="text-white ">Super Admin Dashboard</h3>
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
                                <h2 className="mb-0 font-w600">8,461</h2>
                                <p className="mb-0 text-nowrap">
                                  Share Estimate
                                </p>
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
                                <h2 className="mb-0 font-w600">8,461</h2>
                                <p className="mb-0 text-nowrap">
                                  Order Confirmation
                                </p>
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
                                <h2 className="mb-0 font-w600">753</h2>
                                <p className="mb-0">Delivery</p>
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
                                <h2 className="mb-0 font-w600">516</h2>
                                <p className="mb-0">Purchase Orders</p>
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
                                <img alt="" src="./images/measurement.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">516</h2>
                                <p className="mb-0">MEASUREMENT</p>
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
                                <img alt="" src="./images/grn_NOte.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">516</h2>
                                <p className="mb-0">GRN</p>
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
                                <img alt="" src="./images/installation.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">516</h2>
                                <p className="mb-0">Installation</p>
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
                                <img alt="" src="./images/followUP.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">516</h2>
                                <p className="mb-0">Follow up Delivery</p>
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
                                <h2 className="mb-0 font-w600">516</h2>
                                <p className="mb-0">Follow up</p>
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
                                <img alt="" src="./images/sta.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">516</h2>
                                <p className="mb-0">STA</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
