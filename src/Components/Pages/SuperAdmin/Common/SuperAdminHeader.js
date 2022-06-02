import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLoggedInUserDetails } from "../../../Store/Actions/userAction";
import Cookies from "js-cookie";

function SuperAdminHeader() {
  // const dispatch = useDispatch();
  // const logout = () => {
  //   Cookies.remove("FandFToken");
  //   Cookies.remove("userType");
  //   dispatch(setLoggedInUserDetails({}));
  // };
  return (
    <div>
      {/*--- Main wrapper start -----*/}
      <div id="main-wrapper">
        {/*---- Nav Header Start -----*/}
        <div className="nav-header">
          <a href="index.html" className="brand-logo">
            <img
              alt="tesr"
              src="./images/f&f-logo.png"
              className="d-xl-block d-none"
              id="img_lg"
              style={{ width: "140px", padding: "11px", margin: "auto" }}
            />
            <img
              alt="test"
              src="./images/f&_smLogo.png"
              className="d-xl-none d-block"
              style={{ padding: "11px", margin: "auto", width: "70px" }}
            />
            <img
              alt="test"
              src="./images/f&_smLogo.png"
              className="d-none"
              id="img_sm"
              style={{ padding: "11px", margin: "auto", width: "85px" }}
            />
          </a>
          {/*--- Navbar toggler ---*/}
          <div className="nav-control">
            <div className="hamburger" id="ToggleLogo">
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </div>
          </div>
        </div>
        {/*----- Nav header End -----*/}
        {/*----- Header Start ----*/}
        <div className="header">
          <div className="header-content">
            <nav className="navbar navbar-expand">
              <div className="collapse navbar-collapse justify-content-between">
                <div className="nav-item d-flex align-items-center">
                  <div className="input-group search-area">
                    <input type="text" className="form-control" placeholder />
                    <span className="input-group-text">
                      <a href="javascript:void(0)">
                        <i className="flaticon-381-search-2" />
                      </a>
                    </span>
                  </div>
                </div>
                <ul className="navbar-nav header-right">
                  <li className="nav-item dropdown notification_dropdown">
                    <a
                      className="nav-link"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19.375"
                        height={24}
                        viewBox="0 0 19.375 24"
                      >
                        <g
                          id="_006-notification"
                          data-name="006-notification"
                          transform="translate(-341.252 -61.547)"
                        >
                          <path
                            id="Path_1954"
                            data-name="Path 1954"
                            d="M349.741,65.233V62.747a1.2,1.2,0,1,1,2.4,0v2.486a8.4,8.4,0,0,1,7.2,8.314v4.517l.971,1.942a3,3,0,0,1-2.683,4.342h-5.488a1.2,1.2,0,1,1-2.4,0h-5.488a3,3,0,0,1-2.683-4.342l.971-1.942V73.547a8.4,8.4,0,0,1,7.2-8.314Zm1.2,2.314a6,6,0,0,0-6,6v4.8a1.208,1.208,0,0,1-.127.536l-1.1,2.195a.6.6,0,0,0,.538.869h13.375a.6.6,0,0,0,.536-.869l-1.1-2.195a1.206,1.206,0,0,1-.126-.536v-4.8a6,6,0,0,0-6-6Z"
                            transform="translate(0 0)"
                            fill="#ffffff"
                            fillRule="evenodd"
                          />
                        </g>
                      </svg>
                      <span className="badge light text-white bg-primary rounded-circle">
                        4
                      </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <div
                        id="DZ_W_Notification1"
                        className="widget-media dlab-scroll p-3 ps"
                        style={{ height: "380px" }}
                      >
                        <ul className="timeline">
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img
                                  alt="test"
                                  width={50}
                                  src="images/avatar/1.jpg"
                                />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Dr sultads Submits an Enquiry
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-info">KG</div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Resport created successfully
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-success">
                                <i className="fa fa-home" />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Reminder : Followup Time!
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div
                          className="ps__rail-x"
                          style={{ left: "0px", bottom: "0px" }}
                        >
                          <div
                            className="ps__thumb-x"
                            tabIndex={0}
                            style={{ left: "0px", width: "0px" }}
                          />
                        </div>
                        <div
                          className="ps__rail-y"
                          style={{ top: "0px", right: "0px" }}
                        >
                          <div
                            className="ps__thumb-y"
                            tabIndex={0}
                            style={{ top: "0px", height: "0px" }}
                          />
                        </div>
                      </div>
                      <a
                        className="all-notification"
                        href="all-notification.html"
                      >
                        See all notifications <i className="ti-arrow-end" />
                      </a>
                    </div>
                  </li>
                  <li className="nav-item dropdown header-profile">
                    <a
                      className="nav-link"
                      href="javascript:void(0);"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      <img src="images/profile/pic1.jpg" width={20} />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <Link to={"/"} className="dropdown-item ai-icon">
                        <i className="icon-logout icons" />
                        <span className="ms-2">Logout </span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        {/*----- Header End ----*/}
      </div>
    </div>
  );
}

export default SuperAdminHeader;
