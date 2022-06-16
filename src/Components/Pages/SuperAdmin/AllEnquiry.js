import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllEnquiry() {
  const navigate = useNavigate();
  const [AllEnquiry, setAllEnquiry] = useState([]);
  useEffect(() => {
    GetDataWithToken("superadmin/get-enquiries").then((response) => {
      if (response.status === true) {
        setAllEnquiry(response.data);
      }
    });
  }, [""]);

  return (
    <>
      {console.log("allenquiry", AllEnquiry)}
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
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All Enquiry</h4>
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
                            <th>Enquiry number</th>
                            <th>Customer Name</th>
                            <th>Mobile No.</th>

                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {console.log("length", AllEnquiry.length)} */}
                          {AllEnquiry && AllEnquiry.length === 0 ? (
                            <h3
                              style={{
                                position: "absolute",
                                left: "40%",
                                padding: "10px",
                              }}
                            >
                              No data found
                            </h3>
                          ) : (
                            AllEnquiry.map((data, index) => (
                              <tr>
                                <>
                                  {" "}
                                  <th>{data.id}</th>
                                  <th>
                                    {data?.customer?.firstName}{" "}
                                    {data?.customer?.lastName}
                                  </th>
                                  <th>{data?.customer?.primary_phone}</th>
                                  <td>
                                    <span
                                      className={
                                        data?.status === "inprogress"
                                          ? "badge  badge-primary"
                                          : "badge badge-dark"
                                      }
                                    >
                                      {data?.status}
                                    </span>
                                  </td>
                                  <td>
                                    {" "}
                                    {moment(data?.createdAt).format("ll")}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => {
                                        navigate("/EnquiryDetials", {
                                          state: { data: data.id },
                                        });
                                      }}
                                      className="btn btn-primary btn-sm"
                                    >
                                      View More
                                    </button>
                                    {/* <a
                                    href="Schedule.html"
                                    className="btn btn-primary btn-sm"
                                  >
                                    Enquiry Assignment
                                  </a> */}
                                  </td>
                                </>
                              </tr>
                            ))
                          )}
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
    </>
  );
}

export default AllEnquiry;
