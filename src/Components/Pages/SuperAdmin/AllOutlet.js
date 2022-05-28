import React from "react";
import { Link } from "react-router-dom";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllOutlet() {
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
                  <h4 className="card-title">All Outlets</h4>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modal1"
                  >
                    Add more outlet
                  </button>
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
                          <th>Outlet Name</th>
                          <th>Outlet Address</th>
                          <th>Outlet Mobile No.</th>
                          <th>Email</th>
                          <th>Outlet id</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Outlet 1</td>
                          <td>Outlet Address 1</td>
                          <td>9876543210</td>
                          <td>outlet@gmail.com</td>
                          <td>#54605</td>
                          <td>
                            <Link
                              to={"/OutletDashboard"}
                              className="btn btn-primary"
                            >
                              View outlet
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Outlet 2</td>
                          <td>Outlet Address 2</td>
                          <td>9876543210</td>
                          <td>outlet@gmail.com</td>
                          <td>#54605</td>
                          <td>
                            <Link
                              to={"/OutletDashboard"}
                              className="btn btn-primary"
                            >
                              View outlet
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Outlet 3</td>
                          <td>Outlet Address 3</td>
                          <td>9876543210</td>
                          <td>outlet@gmail.com</td>
                          <td>#54605</td>
                          <td>
                            <Link
                              to={"/OutletDashboard"}
                              className="btn btn-primary"
                            >
                              View outlet
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Outlet 4</td>
                          <td>Outlet Address 4</td>
                          <td>9876543210</td>
                          <td>outlet@gmail.com</td>
                          <td>#54605</td>
                          <td>
                            <Link
                              to={"/OutletDashboard"}
                              className="btn btn-primary"
                            >
                              View outlet
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Outlet 5</td>
                          <td>Outlet Address 5</td>
                          <td>9876543210</td>
                          <td>outlet@gmail.com</td>
                          <td>#54605</td>
                          <td>
                            <Link
                              to={"/OutletDashboard"}
                              className="btn btn-primary"
                            >
                              View outlet
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Outlet 6</td>
                          <td>Outlet Address 6</td>
                          <td>9876543210</td>
                          <td>outlet@gmail.com</td>
                          <td>#54605</td>
                          <td>
                            <a
                              href="Outlet_dashboard.html"
                              className="btn btn-primary"
                            >
                              View outlet
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Outlet 7</td>
                          <td>Outlet Address 7</td>
                          <td>9876543210</td>
                          <td>outlet@gmail.com</td>
                          <td>#54605</td>
                          <td>
                            <a
                              href="Outlet_dashboard.html"
                              className="btn btn-primary"
                            >
                              View outlet
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

export default AllOutlet;
