import React from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllEnquiry() {
  return (
    <>
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
                      className="display"
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
                        <tr>
                          <td>#54605</td>
                          <td>shubham pandey</td>
                          <td>9057100757</td>
                          <td>Curtains</td>
                          <td>
                            <span className="badge light badge-success">
                              Fresh
                            </span>
                          </td>
                          <td>2011/04/25</td>
                          <td>
                            <a
                              href="Enquiry-detials.html"
                              className="btn btn-primary btn-sm"
                            >
                              View More
                            </a>
                            <a
                              href="Schedule.html"
                              className="btn btn-primary btn-sm"
                            >
                              Enquiry Assignment
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>#54605</td>
                          <td>shubham pandey</td>
                          <td>9057100757</td>
                          <td>Curtains</td>
                          <td>
                            <span className="badge light badge-success">
                              Fresh
                            </span>
                          </td>
                          <td>2011/04/25</td>
                          <td>
                            <a
                              href="Enquiry-detials.html"
                              className="btn btn-primary btn-sm"
                            >
                              View More
                            </a>
                            <a
                              href="Schedule.html"
                              className="btn btn-primary btn-sm"
                            >
                              Enquiry Assignment
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>#54605</td>
                          <td>shubham pandey</td>
                          <td>9057100757</td>
                          <td>Curtains</td>
                          <td>
                            <span className="badge light badge-success">
                              Fresh
                            </span>
                          </td>
                          <td>2011/04/25</td>
                          <td>
                            <a
                              href="Enquiry-detials.html"
                              className="btn btn-primary btn-sm"
                            >
                              View More
                            </a>
                            <a
                              href="Schedule.html"
                              className="btn btn-primary btn-sm"
                            >
                              Enquiry Assignment
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>#54605</td>
                          <td>shubham pandey</td>
                          <td>9057100757</td>
                          <td>Curtains</td>
                          <td>
                            <span className="badge light badge-success">
                              Fresh
                            </span>
                          </td>
                          <td>2011/04/25</td>
                          <td>
                            <a
                              href="Enquiry-detials.html"
                              className="btn btn-primary btn-sm"
                            >
                              View More
                            </a>
                            <a
                              href="Schedule.html"
                              className="btn btn-primary btn-sm"
                            >
                              Enquiry Assignment
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>#54605</td>
                          <td>shubham pandey</td>
                          <td>9057100757</td>
                          <td>Curtains</td>
                          <td>
                            <span className="badge light badge-success">
                              Fresh
                            </span>
                          </td>
                          <td>2011/04/25</td>
                          <td>
                            <a
                              href="Enquiry-detials.html"
                              className="btn btn-primary btn-sm"
                            >
                              View More
                            </a>
                            <a
                              href="Schedule.html"
                              className="btn btn-primary btn-sm"
                            >
                              Enquiry Assignment
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>#54605</td>
                          <td>shubham pandey</td>
                          <td>9057100757</td>
                          <td>Curtains</td>
                          <td>
                            <span className="badge light badge-success">
                              Fresh
                            </span>
                          </td>
                          <td>2011/04/25</td>
                          <td>
                            <a
                              href="Enquiry-detials.html"
                              className="btn btn-primary btn-sm"
                            >
                              View More
                            </a>
                            <a
                              href="Schedule.html"
                              className="btn btn-primary btn-sm"
                            >
                              Enquiry Assignment
                            </a>
                          </td>
                        </tr>
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
