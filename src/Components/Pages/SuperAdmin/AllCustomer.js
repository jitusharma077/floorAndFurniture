import React from "react";
import { Link } from "react-router-dom";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllCustomer() {
  return (
    <>
      <SuperAdminHeader />
      <SuperAdminSidebar />
      <div className="content-body">
        {/*-- row --*/}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">All Customers</h4>
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
                          <th>Customer Name</th>
                          <th>Enquiry number</th>
                          <th>Category Type</th>
                          <th>Payment Status</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>shubham pandey</td>
                          <td>#54605</td>
                          <td>Library</td>
                          <td>Cash</td>
                          <td>
                            <span className="badge light badge-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <Link
                              to={"/customer-detials"}
                              className="btn btn-primary"
                            >
                              View More
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Garrett Winters</td>
                          <td>#54687</td>
                          <td>Library</td>
                          <td>Credit Card</td>
                          <td>
                            <span className="badge light badge-warning">
                              Panding
                            </span>
                          </td>
                          <td>
                            <Link
                              to={"/customer-detials"}
                              className="btn btn-primary"
                            >
                              View More
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Ashton Cox</td>
                          <td>#35672</td>
                          <td>Tuition</td>
                          <td>Cash</td>
                          <td>
                            <span className="badge light badge-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <Link
                              to={"/customer-detials"}
                              className="btn btn-primary"
                            >
                              View More
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Cedric Kelly</td>
                          <td>#57984</td>
                          <td>Annual</td>
                          <td>Credit Card</td>
                          <td>
                            <span className="badge light badge-warning">
                              Panding
                            </span>
                          </td>
                          <td>
                            <Link
                              to={"/customer-detials"}
                              className="btn btn-primary"
                            >
                              View More
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Airi Satou</td>
                          <td>#12453</td>
                          <td>Library</td>
                          <td>Cheque</td>
                          <td>
                            <span className="badge light badge-warning">
                              Panding
                            </span>
                          </td>
                          <td>
                            <Link
                              to={"/customer-detials"}
                              className="btn btn-primary"
                            >
                              View More
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Brielle Williamson</td>
                          <td>#59723</td>
                          <td>Tuition</td>
                          <td>Cash</td>
                          <td>
                            <span className="badge light badge-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <a
                              href="Custome-detials.html"
                              className="btn btn-primary"
                            >
                              View More
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

export default AllCustomer;
