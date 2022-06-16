import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import Cookies from "js-cookie";
import { setLoggedInUserDetails } from "../../Store/Actions/userAction";
import { toast } from "material-react-toastify";

function OutletManagerHeader() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logout = () => {
    GetDataWithToken("auth/logout/outletLogout").then((response) => {
      if (response.status === true) {
        Cookies.remove("FandFToken");
        Cookies.remove("userType");
        Cookies.remove("userID");
        dispatch(setLoggedInUserDetails({}));
        navigate("/");
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };
  return (
    <>
      {/*--- Main wrapper start -----*/}

      {/*---- Nav Header Start -----*/}
      <div className="nav-header">
        <Link to={"/OutletManagerDashboard"} className="brand-logo">
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
        </Link>
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
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav header-right">
                <li className="nav-item">
                  <Link to={"/OutletSearch"} className="btn btn-primary">
                    Search
                  </Link>
                </li>
                <li className="nav-item dropdown notification_dropdown">
                  <a
                    className="nav-link"
                    href="javascript:void(0);"
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
                        ></path>
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
                      style={{ height: 380 }}
                    >
                      <ul className="timeline">
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              <img
                                alt="image"
                                width={50}
                                src="./images/avatar/1.jpg"
                              />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Syntahis coaching submits an Enqiry
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-success">MM</div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Dr. Manoj Meena Submits an Enquiry
                              </h6>
                              <small className="d-block">
                                28 July 2020 - 10:26 AM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-danger">SS</div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Sardul Singh G submits an Enquiry
                              </h6>
                              <small className="d-block">
                                26 July 2020 - 12:00 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-info">OI</div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Order item is dispached successfully
                              </h6>
                              <small className="d-block">
                                30 July 2020 - 1L00 AM
                              </small>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div
                        className="ps__rail-x"
                        style={{ left: 0, bottom: 0 }}
                      >
                        <div
                          className="ps__thumb-x"
                          tabIndex={0}
                          style={{ left: 0, width: 0 }}
                        ></div>
                      </div>
                      <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                        <div
                          className="ps__thumb-y"
                          tabIndex={0}
                          style={{ top: 0, height: 0 }}
                        ></div>
                      </div>
                    </div>
                    <a
                      className="all-notification"
                      href="all-notification.html"
                    >
                      See all notifications
                      <i className="ti-arrow-end" />
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
                    <img src="./images/logo.png" width={20} />
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <button
                      onClick={() => {
                        logout();
                      }}
                      className=" btn dropdown-item ai-icon"
                    >
                      <i className="icon-logout icons" />
                      <span className="ms-2">Logout </span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/*----- Header End ----*/}
    </>
  );
}

export default OutletManagerHeader;
