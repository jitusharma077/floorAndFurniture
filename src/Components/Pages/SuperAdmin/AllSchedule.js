import React from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllSchedule() {
  return (
    <>
      <SuperAdminHeader />
      <SuperAdminSidebar />
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">All Schedules</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="example2"
                      className="table card-table display mb-4 shadow-hover table-responsive-lg"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Customer name</th>
                          <th>Schedules</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>John doe</td>
                          <td>Measurer</td>
                          <td>
                            <a href>Mr. Sharma</a>{" "}
                          </td>
                          <td>13 may 2021 (10:00 - 12:00)</td>
                          <td>
                            <span className="badge light badge-success">
                              Pending
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-primary">
                              view more
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>John doe</td>
                          <td>Measurer</td>
                          <td>
                            <a href>Mr. Sharma</a>{" "}
                          </td>
                          <td>13 may 2021 (10:00 - 12:00)</td>
                          <td>
                            <span className="badge light badge-success">
                              Pending
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-primary">
                              view more
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>John doe</td>
                          <td>Measurer</td>
                          <td>
                            <a href>Mr. Sharma</a>{" "}
                          </td>
                          <td>13 may 2021 (10:00 - 12:00)</td>
                          <td>
                            <span className="badge light badge-success">
                              Pending
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-primary">
                              view more
                            </button>
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

export default AllSchedule;
