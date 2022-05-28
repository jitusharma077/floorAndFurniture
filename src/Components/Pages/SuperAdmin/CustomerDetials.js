import React from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function CustomerDetials() {
  return (
    <>
      <SuperAdminHeader />
      <SuperAdminSidebar />
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card overflow-hidden">
                <div className="row m-0">
                  <div className="col-xl-12 p-0">
                    <div className="card-body">
                      <div className="guest-profile">
                        <div className="d-flex">
                          <img src="images/profile/pic1.jpg" />
                          <div>
                            <h2 className="font-w600">Jitu Sharma</h2>
                            <span className="text-secondary">
                              ID 1234124512551
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="mt-4 check-status">
                              <span className="d-block mb-2">Email</span>
                              <span className="font-w500 fs-16">
                                Jitusharma@gmail.com
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="mt-4">
                              <span className="d-block mb-2">Phone Number</span>
                              <span className="font-w500 fs-16">
                                9876543210
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="mt-4">
                              <span className="d-block mb-2">Address</span>
                              <span className="font-w500 fs-16">
                                B-48 Hariyana bhawan road in front of malaviya
                                public school patel nagar bikaner
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header border-0">
                  <h4 className="fs-20">Purchase History</h4>
                  <div className="newest ms-3">
                    <select className="default-select">
                      <option>Newest</option>
                      <option>Oldest</option>
                    </select>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table card-table display mb-4 shadow-hover table-responsive-lg"
                    id="guestTable-all"
                  >
                    <thead>
                      <tr>
                        <th>Enquiry no.</th>
                        <th>Date of Enquiry</th>
                        <th>Category's</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#ED34DF5</td>
                        <td>
                          <p className="mb-0">12 May 2021</p>
                        </td>
                        <td>
                          <div>
                            <h5 className="text-nowrap">
                              Curtains, Wallpapers
                            </h5>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span className="font-w600 text-nowrap">
                              <i className="fas fa-phone-alt me-2" />
                              012 334 55512
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="font-w600 text-success">
                            Completed
                          </span>
                        </td>
                        <td>
                          <a
                            href="Enquiry-detials.html"
                            className="btn btn-primary"
                          >
                            View Enquiry
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
    </>
  );
}

export default CustomerDetials;
