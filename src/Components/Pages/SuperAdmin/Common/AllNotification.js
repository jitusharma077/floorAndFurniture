import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./SuperAdminHeader";
import SuperAdminSidebar from "./SuperAdminSidebar";

function AllNotification() {
  const navigate = useNavigate();
  const [AllNotification, setAllNotification] = useState([]);
  const [callApi, setCallApi] = useState(true);
  useEffect(() => {
    if (callApi === true) {
      GetDataWithToken("superadmin/get-notification/", "").then((response) => {
        if (response.status === true) {
          setAllNotification(response.data);
          console.log("first", response.data);
        }
      });
      console.log("i fire once");
      setCallApi(false);
    }
  }, [callApi]);
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
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All Notification</h4>
                  </div>
                  <div className="card-body">
                    {AllNotification && AllNotification.length === 0
                      ? "No Notification Found"
                      : AllNotification.map((item, index) => {
                          return (
                            <a
                              onClick={() => {
                                navigate("/EnquiryDetials", {
                                  state: { data: item?.enquiry?.id },
                                });
                              }}
                            >
                              <div className="media border-bottom pb-2 m-3">
                                <div className="media-img">
                                  <img
                                    src="./images/logo.png"
                                    alt="user"
                                    className="img-fluid"
                                    style={{
                                      height: "50px",
                                      width: "50px",
                                      borderRadius: "10px",
                                    }}
                                  />
                                </div>
                                <div className="media-body ps-3 pt-2 ">
                                  <h5>{item.message}</h5>
                                  <span>
                                    {moment(item.createdAt).format("LLL")}
                                  </span>
                                </div>
                              </div>
                            </a>
                          );
                        })}
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

export default AllNotification;
