import React, { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { useLocation, useNavigate } from "react-router-dom";

function ComplaintDetials() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location.state.data);
  const [CustomerDetials, setCustomerDetials] = useState({});

  useEffect(() => {
    setCustomerDetials(location.state?.data?.enquiry?.customer);
  }, []);
  return (
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
      {console.log("CustomerDetials", CustomerDetials)}
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
                          <img src="./images/user.png" alt="" />
                          <div>
                            <h2 className="font-w600 ">
                              {CustomerDetials?.firstName}
                              {CustomerDetials?.lastName}
                            </h2>
                            <span className="text-secondary">
                              ID #{CustomerDetials?.id}
                            </span>
                          </div>
                        </div>
                        <div>
                          {/* <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate("/addRooms", {
                            state: { data: CustomerDetials?.id },
                          });
                        }}
                      >
                        Add New Enquiry
                      </button> */}
                        </div>
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="mt-4 check-status">
                              <span className="d-block mb-2">
                                Primary Email
                              </span>
                              <span className="font-w500 fs-16">
                                {CustomerDetials?.primary_email}
                              </span>
                            </div>
                            <div className="mt-4 check-status">
                              <span className="d-block mb-2">
                                Secondary Email
                              </span>
                              <span className="font-w500 fs-16">
                                {CustomerDetials?.secondary_email}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mt-4">
                              <span className="d-block mb-2">Phone Number</span>
                              <span className="font-w500 fs-16">
                                {CustomerDetials?.primary_phone}
                              </span>
                            </div>
                            <div className="mt-4">
                              <span className="d-block mb-2">
                                Secondary Phone Number
                              </span>
                              <span className="font-w500 fs-16">
                                {CustomerDetials?.secondary_phone}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="mt-4">
                              <span className="d-block mb-2">Address</span>
                              <span className="font-w500 fs-16">
                                {location.state?.data?.enquiry?.address}
                              </span>
                            </div>
                            <div className="mt-4">
                              <span className="d-block mb-2">
                                Company name and GST
                              </span>
                              <span className="font-w500 fs-16">
                                {CustomerDetials?.companyName} :{" "}
                                {CustomerDetials?.GST}
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
                  <h4 className="fs-20">Complation Detials</h4>
                </div>
                <div className="row">
                  <div className="col-lg-6 ps-5">
                    <div className="mt-4 check-status">
                      <span className="mb-2">Enquirie Detials:</span>
                      <span className="font-w500 fs-16 ms-5">
                        {location.state?.data?.enquiry?.id}
                      </span>
                    </div>
                    <div className="mt-4 check-status">
                      <span className="mb-2">Enquirie Detials:</span>
                      <span className="font-w500 fs-16 ms-5">
                        {location.state?.data?.enquiry?.id}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6 ps-5">
                    <div className="mt-4 check-status">
                      <span className="mb-2">Enquirie Detials:</span>
                      <span className="font-w500 fs-16 ms-5">
                        {location.state?.data?.enquiry?.id}
                      </span>
                    </div>
                    <div className="mt-4 check-status">
                      <span className="mb-2">Enquirie Detials:</span>
                      <span className="font-w500 fs-16 ms-5">
                        {location.state?.data?.enquiry?.id}
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
  );
}

export default ComplaintDetials;
