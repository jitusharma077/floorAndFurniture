import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function SuperAdminSidebar() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "js/custom.min.js";
    script.async = true;
    setTimeout(() => {
      script.onload = () => scriptLoaded();
    }, 1500);

    document.body.appendChild(script);
  }, []);
  const scriptLoaded = () => {
    window.Travl();
  };

  return (
    <>
      {/*----- Side bar start ----*/}
      <div className="dlabnav">
        <div className="dlabnav-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <Link to={"/SuperAdminDashboard"} aria-expanded="false">
                <i className="flaticon-025-dashboard" />
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/allOutlet"} className aria-expanded="false">
                <i className="fa fa-ship fw-bold" aria-hidden="true" />
                <span className="nav-text">Outlet</span>
              </Link>
            </li>
            <li>
              <Link to={"/all-customer"} className aria-expanded="false">
                <i className="icon-people icons" />
                <span className="nav-text">Customers</span>
              </Link>
            </li>
            <li>
              <Link to={"/all-Enquiry"} className aria-expanded="false">
                <i className="fa fa-info-circle fw-bold" aria-hidden="true" />
                <span className="nav-text">Enquiry</span>
              </Link>
            </li>
            <li>
              <a href="Invoice.html" className aria-expanded="false">
                <i className="flaticon-022-copy" />
                <span className="nav-text">Invoice</span>
              </a>
            </li>
            <li>
              <a
                className="has-arrow"
                href="javascript:void()"
                aria-expanded="false"
              >
                <i className="fa fa-calendar" aria-hidden="true" />
                <span className="nav-text">Schedule</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <a href="All-Schedule.html">All Schedules</a>
                </li>
                <li>
                  <a href="Schedule.html">Schedule Enquiry</a>
                </li>
                {/* <li><a href="Schedule.html">Schedule a Installer</a></li>
                      <li><a href="Schedule.html">Schedule a Tailer</a></li> */}
              </ul>
            </li>
            <li>
              <a
                className="has-arrow"
                href="javascript:void()"
                aria-expanded="false"
              >
                <i className="fa fa-address-card" aria-hidden="true" />
                <span className="nav-text">Users</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <a href="All-Outlet-manager.html">All Outlet Manager</a>
                </li>
                <li>
                  <a href="all-sales-person.html">All Sales Person </a>
                </li>
                <li>
                  <a href="all-dispatch.html"> All Dispatch Person</a>
                </li>
                <li>
                  <a href="All-stiching.html"> All Stitching Manager</a>
                </li>
                <li>
                  <a href="All-measurer.html"> All Measurer</a>
                </li>
                <li>
                  <a href="all-Tailor.html"> All Tailor</a>
                </li>
                <li>
                  <a href="All-Qc.html"> All QC</a>
                </li>
                <li>
                  <a href="All-Installer.html"> All Installer</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="Stitching_Manager_dashboard.html"
                className
                aria-expanded="false"
              >
                <i className="icon-shuffle icons fw-bold" />
                <span className="nav-text">Stiching Manager</span>
              </a>
            </li>
            <li>
              <a
                href="Dispatch_Department_dashboard.html"
                className
                aria-expanded="false"
              >
                <i className="icon-social-dropbox icons fw-bold" />
                <span className="nav-text">Dispatch Manager</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/*----- Side bar End ----*/}
      <div className="modal fade" id="modal1">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Outlet</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label" htmlFor="fnf">
                    Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="fnf"
                      placeholder="outlet name"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label" htmlFor="comment">
                    Address
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      rows={4}
                      id="comment"
                      placeholder="outlet address"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label" htmlFor="fnf1">
                    Mobile No.
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      id="fnf1"
                      placeholder="outlet mobile number"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label" htmlFor="fnf2">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      id="fnf2"
                      placeholder="outlet email"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label" htmlFor="fnf2">
                    Outlet id
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="fnf2"
                      placeholder="outlet id"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label" htmlFor="fnf2">
                    Outlet Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="fnf2"
                      placeholder="outlet Password"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Add outlet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminSidebar;
