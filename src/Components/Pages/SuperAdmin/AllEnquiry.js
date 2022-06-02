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
                          <th>Category</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {console.log("length", AllEnquiry.length)} */}
                        {AllEnquiry && AllEnquiry.length < 0 ? (
                          <p>No Enquiry Found</p>
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
                                <th>Curtains</th>
                                <td>
                                  <span className="badge light badge-success">
                                    {data?.enquirystatuses.map(
                                      (status) => status.status
                                    )}
                                  </span>
                                </td>
                                <td>{data?.createdAt}</td>
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
    </>
  );
}

export default AllEnquiry;
