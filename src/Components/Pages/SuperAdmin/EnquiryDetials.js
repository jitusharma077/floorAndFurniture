import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function EnquiryDetials() {
  const location = useLocation();

  const [enquiryId, setEnquiryId] = useState(null);
  const [EnquiryDetials, setEnquiryDetials] = useState({});

  useEffect(() => {
    console.log("location", location.state.data);
    setEnquiryId(location.state.data);
    GetDataWithToken(`superadmin/get-enquiry/${location.state.data}`).then(
      (response) => {
        if (response.status === true) {
          console.log("response", response.data);
          setEnquiryDetials(response);
        }
      }
    );
  }, [""]);
  return (
    <>
      {console.log("enquiryId", EnquiryDetials)}
      <SuperAdminHeader />
      <SuperAdminSidebar />
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">
                    Enquiry No. {EnquiryDetials?.id}
                  </h4>
                  <a
                    href="edit_enquiry.html"
                    className="btn btn-primary btn-xs sharp me-1"
                  >
                    <i className="fas fa-pencil-alt" />
                  </a>
                </div>
                <div className="card-body">
                  <div
                    className="accordion accordion-solid-bg"
                    id="accordion-eight"
                  >
                    <div className="accordion-item">
                      <div
                        className="accordion-header rounded-lg"
                        id="accord-8One"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8One"
                        aria-controls="collapse8One"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          Customer Detials
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8One"
                        className="collapse accordion__body show"
                        aria-labelledby="accord-8One"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Customer Name :</span>
                              <strong>
                                {EnquiryDetials?.data?.customer?.firstName}{" "}
                                {EnquiryDetials?.data?.customer?.lastName}{" "}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Contact No. :</span>
                              <strong>
                                {EnquiryDetials?.data?.customer?.primary_phone}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">
                                Secondary Contact No. :
                              </span>
                              <strong>
                                {
                                  EnquiryDetials?.data?.customer
                                    ?.secondary_phone
                                }
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Email :</span>
                              <strong>
                                {EnquiryDetials?.data?.customer?.primary_email}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Secondary Email :</span>
                              <strong>
                                {
                                  EnquiryDetials?.data?.customer
                                    ?.secondary_email
                                }
                              </strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8Two"
                        aria-controls="collapse8Two"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          Billing Address
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8Two"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Customer Name :</span>
                              <strong>
                                {EnquiryDetials?.billingAddress?.contactPerson}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Contact No. :</span>
                              <strong>
                                {EnquiryDetials?.billingAddress?.contactNumber}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">State :</span>
                              <strong>
                                {" "}
                                {EnquiryDetials?.billingAddress?.state}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Pincode :</span>
                              <strong>
                                {EnquiryDetials?.billingAddress?.pincode}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Address :</span>
                              <strong>
                                {" "}
                                {EnquiryDetials?.billingAddress?.street}
                              </strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="delivery-address"
                        data-bs-toggle="collapse"
                        data-bs-target="#deliveryAddress"
                        aria-controls="deliveryAddress"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          Delivery Address
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="deliveryAddress"
                        className="collapse accordion__body"
                        aria-labelledby="delivery-address"
                        data-bs-parent="#deliveryAddress"
                      >
                        <div className="accordion-body-text">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Customer Name :</span>
                              <strong>
                                {EnquiryDetials?.deliveryAddress?.contactPerson}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Contact No. :</span>
                              <strong>
                                {EnquiryDetials?.deliveryAddress?.contactNumber}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">State :</span>
                              <strong>
                                {" "}
                                {EnquiryDetials?.deliveryAddress?.state}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Pincode :</span>
                              <strong>
                                {EnquiryDetials?.deliveryAddress?.pincode}
                              </strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white">
                              <span className="mb-0">Address :</span>
                              <strong>
                                {" "}
                                {EnquiryDetials?.deliveryAddress?.street}
                              </strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8three"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8three"
                        aria-controls="collapse8three"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">Rooms</span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8three"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8three"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <div className="col-lg-12">
                            {/* <h4 className="card-title fw-bold text-white">
                              Room's
                            </h4> */}
                            <div className="basic-list-group">
                              <div className="row">
                                <div className="col-lg-12 col-xl-12">
                                  <div
                                    className="list-group mb-4 flex-row"
                                    id="list-tab"
                                    role="tablist"
                                  >
                                    {EnquiryDetials?.data &&
                                      EnquiryDetials?.data?.rooms.map(
                                        (rooms, index) => (
                                          <a
                                            className="list-group-item list-group-item-action text-white"
                                            data-bs-toggle="list"
                                            href={`#list-home-${index}`}
                                            role="tab"
                                          >
                                            {rooms.roomName}
                                          </a>
                                        )
                                      )}
                                  </div>
                                </div>
                                <div className="col-lg-6 col-xl-12">
                                  <div
                                    className="tab-content"
                                    id="nav-tabContent1"
                                  >
                                    {EnquiryDetials?.data &&
                                      EnquiryDetials?.data?.rooms.map(
                                        (room, index) => (
                                          <div
                                            className="tab-pane fade show active"
                                            id={`list-home-${index}`}
                                          >
                                            <div className="room-heading">
                                              {/* <h4 className>
                                                {room.roomDescription}
                                              </h4> */}
                                              <span>
                                                {" "}
                                                {room.roomDescription}
                                              </span>
                                            </div>
                                            <div>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN FABRIC SELECTED :
                                                  </span>
                                                  <strong>Xieriya</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    BRAND. :
                                                  </span>
                                                  <strong>Brands</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    Book. :
                                                  </span>
                                                  <strong>#tredf</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN STYLE :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    LINIING REQUIRED :
                                                  </span>
                                                  <strong>
                                                    Yes (BLACKOUT,DIMOUT,LIGHT
                                                    FILTERING)
                                                  </strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    SHEER REQUIRED :
                                                  </span>
                                                  <strong>YES</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    SHEER FABRIC SELECTED :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    BRAND. :
                                                  </span>
                                                  <strong>Brands</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    Book. :
                                                  </span>
                                                  <strong>#tredf</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    Ceiling Type: :
                                                  </span>
                                                  <strong>POP</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    Wall Type: :
                                                  </span>
                                                  <strong>
                                                    Concrete,Marble,Wood
                                                  </strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    TRACK REQ :
                                                  </span>
                                                  <strong>Manual</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN STYLE :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN STYLE :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN STYLE :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                              </ul>
                                            </div>
                                            <div className="room-heading">
                                              <h4 className>Room 2</h4>
                                              <span>Guest Room</span>
                                            </div>
                                            <div>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN FABRIC SELECTED :
                                                  </span>
                                                  <strong>Xieriya</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    BRAND. :
                                                  </span>
                                                  <strong>Brands</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    Book. :
                                                  </span>
                                                  <strong>#tredf</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN STYLE :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    LINIING REQUIRED :
                                                  </span>
                                                  <strong>
                                                    Yes (BLACKOUT,DIMOUT,LIGHT
                                                    FILTERING)
                                                  </strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    SHEER REQUIRED :
                                                  </span>
                                                  <strong>YES</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    SHEER FABRIC SELECTED :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    BRAND. :
                                                  </span>
                                                  <strong>Brands</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    Book. :
                                                  </span>
                                                  <strong>#tredf</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    Ceiling Type: :
                                                  </span>
                                                  <strong>POP</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    Wall Type: :
                                                  </span>
                                                  <strong>
                                                    Concrete,Marble,Wood
                                                  </strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    TRACK REQ :
                                                  </span>
                                                  <strong>Manual</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN STYLE :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN STYLE :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-white">
                                                  <span className="mb-0">
                                                    CURTAIN STYLE :
                                                  </span>
                                                  <strong>EYELET</strong>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        )
                                      )}

                                    {/* <div
                                      className="tab-pane fade"
                                      id="list-profile"
                                      role="tabpanel"
                                    >
                                      <div className="room-heading">
                                        <h4 className>Room 3</h4>
                                        <span>Father's Room</span>
                                      </div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN FABRIC SELECTED :
                                          </span>
                                          <strong>Xieriya</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN STYLE :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            LINIING REQUIRED :
                                          </span>
                                          <strong>
                                            Yes (BLACKOUT,DIMOUT,LIGHT
                                            FILTERING)
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER REQUIRED :
                                          </span>
                                          <strong>YES</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER FABRIC SELECTED :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Ceiling Type: :
                                          </span>
                                          <strong>POP</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Wall Type: :
                                          </span>
                                          <strong>Concrete,Marble,Wood</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            TRACK REQ :
                                          </span>
                                          <strong>Manual</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN STYLE :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN STYLE :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN STYLE :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                      </ul>
                                    </div>
                                    <div
                                      className="tab-pane fade"
                                      id="list-messages"
                                    >
                                      <h4 className="mb-4 text-white">
                                        Floor Detials
                                      </h4>
                                    </div>
                                    <div
                                      className="tab-pane fade"
                                      id="list-settings"
                                    >
                                      <h4 className="mb-4 text-white">
                                        Mattress Detials
                                      </h4>
                                      <p />
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Tw2o"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8fou2r"
                        aria-controls="collapse8four"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          Order Estimate
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8fou2r"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Tw2o"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <h5 className="text-white">
                            Download Order Estimate
                          </h5>
                          <a href="#" className="d-inline-block mt-4">
                            <img
                              src="./images/pdfimage.webp"
                              style={{
                                width: "80px",
                                border: "2px solid #ffffff",
                                padding: "10px",
                                borderRadius: "8px",
                              }}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8four"
                        aria-controls="collapse8four"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          Dispatch Details
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8four"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <div className="row text-center">
                            <div className="col-lg-3">
                              <p className="text-white">
                                Cloth Dispatching
                                <br />
                                Details
                              </p>
                              <a href="#" className="d-inline-block">
                                <img
                                  src="./images/pdfimage.webp"
                                  style={{
                                    width: "80px",
                                    border: "2px solid #ffffff",
                                    padding: "10px",
                                    borderRadius: "8px",
                                  }}
                                />
                              </a>
                            </div>
                            <div className="col-lg-3">
                              <p className="text-white">
                                Motor Dispatching
                                <br />
                                Details
                              </p>
                              <a href="#" className="d-inline-block">
                                <img
                                  src="./images/pdfimage.webp"
                                  style={{
                                    width: "80px",
                                    border: "2px solid #ffffff",
                                    padding: "10px",
                                    borderRadius: "8px",
                                  }}
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8five"
                        aria-controls="collapse8five"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          {" "}
                          Stitching{" "}
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8five"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <h4 className="ms-4 mb-4 fw-bold text-white">
                            Estimate Date for Complete Order - 2 June 2022
                          </h4>
                          <div className="basic-list-group">
                            <div className="row">
                              <div className="col-lg-12 col-xl-12">
                                <div
                                  className="list-group mb-4 flex-row"
                                  id="list-tab"
                                  role="tablist"
                                >
                                  <a
                                    className="list-group-item list-group-item-action text-white active"
                                    data-bs-toggle="list"
                                    href="#list-home1"
                                    role="tab"
                                  >
                                    curtains
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-profile1"
                                    role="tab"
                                  >
                                    Wallpapers
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-messages1"
                                    role="tab"
                                  >
                                    Floor
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-settings1"
                                    role="tab"
                                  >
                                    Mattress
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-6 col-xl-12">
                                <div
                                  className="tab-content"
                                  id="nav-tabContent1"
                                >
                                  <div
                                    className="tab-pane fade show active"
                                    id="list-home1"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 1</h4>
                                      <span>Daughters Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN FABRIC SELECTED :
                                          </span>
                                          <strong>Xieriya</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN STYLE :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            LINIING REQUIRED :
                                          </span>
                                          <strong>
                                            Yes (BLACKOUT,DIMOUT,LIGHT
                                            FILTERING)
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER REQUIRED :
                                          </span>
                                          <strong>YES</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER FABRIC SELECTED :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Assigned Tailor. :
                                          </span>
                                          <strong>
                                            Chandra Prakash Pandey
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Total windows. :
                                          </span>
                                          <strong>3</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Total Doors. :
                                          </span>
                                          <strong>1</strong>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="room-heading">
                                      <h4 className>Room 2</h4>
                                      <span>Guest Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN FABRIC SELECTED :
                                          </span>
                                          <strong>Xieriya</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN STYLE :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            LINIING REQUIRED :
                                          </span>
                                          <strong>
                                            Yes (BLACKOUT,DIMOUT,LIGHT
                                            FILTERING)
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER REQUIRED :
                                          </span>
                                          <strong>YES</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER FABRIC SELECTED :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Assigned Tailor. :
                                          </span>
                                          <strong>Not Yet Assigned</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Total windows. :
                                          </span>
                                          <strong>3</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Total Doors. :
                                          </span>
                                          <strong>1</strong>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-profile1"
                                    role="tabpanel"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 3</h4>
                                      <span>Father's Room</span>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item d-flex justify-content-between text-white">
                                        Room wallpaper details
                                      </li>
                                    </ul>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-messages1"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 4</h4>
                                      <span>Grand Mother's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Floor Detials
                                    </h4>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-settings1"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 5</h4>
                                      <span>Grand Father's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Mattress Detials
                                    </h4>
                                    <p />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two11"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8five11"
                        aria-controls="collapse8five"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          {" "}
                          QC Details{" "}
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8five11"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <div className="basic-list-group">
                            <div className="row">
                              <div className="col-lg-12 col-xl-12">
                                <div
                                  className="list-group mb-4 flex-row"
                                  id="list-tab"
                                  role="tablist"
                                >
                                  <a
                                    className="list-group-item list-group-item-action text-white active"
                                    data-bs-toggle="list"
                                    href="#list-home12"
                                    role="tab"
                                  >
                                    curtains
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-profile12"
                                    role="tab"
                                  >
                                    Wallpapers
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-messages12"
                                    role="tab"
                                  >
                                    Floor
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-settings12"
                                    role="tab"
                                  >
                                    Mattress
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-6 col-xl-12">
                                <div
                                  className="tab-content"
                                  id="nav-tabContent1"
                                >
                                  <div
                                    className="tab-pane fade show active"
                                    id="list-home12"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 1</h4>
                                      <span>Daughters Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Client Name :
                                          </span>
                                          <strong>Jitu Sharma</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            IC Name :
                                          </span>
                                          <strong>
                                            Chandra prakash padney
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Quality Cheacker Name :
                                          </span>
                                          <strong>Akram </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Inspection date :
                                          </span>
                                          <strong>22-june-2022</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Measurements :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Design/style :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Ironing :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Thread on curtains :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Belts Include :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Channels/Rods Include :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Brackets include for channels :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Weight :</span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Led chain :
                                          </span>
                                          <strong>No</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Tpe of opening :
                                          </span>
                                          <strong>Manual</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Stitching quality :
                                          </span>
                                          <strong>average</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Fall :</span>
                                          <strong>No</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Cut Marks :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="room-heading">
                                      <h4 className>Room 2</h4>
                                      <span>Guest Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Client Name :
                                          </span>
                                          <strong>Jitu Sharma</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            IC Name :
                                          </span>
                                          <strong>
                                            Chandra prakash padney
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Quality Cheacker Name :
                                          </span>
                                          <strong>Akram </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Inspection date :
                                          </span>
                                          <strong>22-june-2022</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Measurements :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Design/style :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Ironing :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Thread on curtains :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Belts Include :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Channels/Rods Include :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Brackets include for channels :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Weight :</span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Led chain :
                                          </span>
                                          <strong>No</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Tpe of opening :
                                          </span>
                                          <strong>Manual</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Stitching quality :
                                          </span>
                                          <strong>average</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Fall :</span>
                                          <strong>No</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Cut Marks :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-profile12"
                                    role="tabpanel"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 3</h4>
                                      <span>Father's Room</span>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item d-flex justify-content-between text-white">
                                        Room wallpaper QC details
                                      </li>
                                    </ul>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-messages12"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 4</h4>
                                      <span>Grand Mother's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Floor QC details
                                    </h4>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-settings12"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 5</h4>
                                      <span>Grand Father's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Mattress QC details
                                    </h4>
                                    <p />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8T22wo"
                        aria-controls="collapse8Two"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          Delivery Details
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8T22wo"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <h4 className="text-success">Delivered</h4>
                          <h4 className="text-danger">Not yet Delivered</h4>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two11"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8five1155"
                        aria-controls="collapse8five"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          {" "}
                          Installation Details{" "}
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8five1155"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <div className="basic-list-group">
                            <div className="row">
                              <div className="col-lg-12 col-xl-12">
                                <div
                                  className="list-group mb-4 flex-row"
                                  id="list-tab"
                                  role="tablist"
                                >
                                  <a
                                    className="list-group-item list-group-item-action text-white active"
                                    data-bs-toggle="list"
                                    href="#list-home125"
                                    role="tab"
                                  >
                                    curtains
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-profile125"
                                    role="tab"
                                  >
                                    Wallpapers
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-messages125"
                                    role="tab"
                                  >
                                    Floor
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-settings125"
                                    role="tab"
                                  >
                                    Mattress
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-6 col-xl-12">
                                <div
                                  className="tab-content"
                                  id="nav-tabContent1"
                                >
                                  <div
                                    className="tab-pane fade show active"
                                    id="list-home125"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 1</h4>
                                      <span>Daughters Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installer Name :
                                          </span>
                                          <strong>Jitu Sharma</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Inataller ID :
                                          </span>
                                          <strong>#45tt555</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installation date :
                                          </span>
                                          <strong>12-jan-2022</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installation time :
                                          </span>
                                          <strong>05:35 PM</strong>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="room-heading">
                                      <h4 className>Room 2</h4>
                                      <span>Guest Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installer Name :
                                          </span>
                                          <strong>Jitu Sharma</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Inataller ID :
                                          </span>
                                          <strong>#45tt555</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installation date :
                                          </span>
                                          <strong>12-jan-2022</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installation time :
                                          </span>
                                          <strong>05:35 PM</strong>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-profile125"
                                    role="tabpanel"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 3</h4>
                                      <span>Father's Room</span>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item d-flex justify-content-between text-white">
                                        Room wallpaper not installed yet
                                      </li>
                                    </ul>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-messages125"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 4</h4>
                                      <span>Grand Mother's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Floor Not installed yet
                                    </h4>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-settings125"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 5</h4>
                                      <span>Grand Father's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Not yet Installed
                                    </h4>
                                    <p />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Tw2o"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8fou2r45"
                        aria-controls="collapse8four"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          Customer Feedback
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8fou2r45"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Tw2o"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <h5 className="text-white">
                            Download Customer Feedback
                          </h5>
                          <a href="#" className="d-inline-block mt-4">
                            <img
                              src="./images/pdfimage.webp"
                              style={{
                                width: "80px",
                                border: "2px solid #ffffff",
                                padding: "10px",
                                borderRadius: "8px",
                              }}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h4 className="card-title">Timeline</h4>
                </div>
                <div className="card-body">
                  <div
                    id="DZ_W_TimeLine"
                    className="widget-timeline dlab-scroll height370"
                  >
                    <ul className="timeline">
                      <li>
                        <div className="timeline-badge primary" />
                        <a className="timeline-panel text-muted" href="#">
                          <span>10 minutes ago</span>
                          <h6 className="mb-0">
                            Youtube, a video-sharing website, goes live
                            <strong className="text-primary">$500</strong>.
                          </h6>
                        </a>
                      </li>
                      <li>
                        <div className="timeline-badge info" />
                        <a className="timeline-panel text-muted" href="#">
                          <span>20 minutes ago</span>
                          <h6 className="mb-0">
                            New order placed
                            <strong className="text-info">#XF-2356.</strong>
                          </h6>
                          <p className="mb-0">
                            Quisque a consequat ante Sit amet magna at
                            volutapt...
                          </p>
                        </a>
                      </li>
                      <li>
                        <div className="timeline-badge danger" />
                        <a className="timeline-panel text-muted" href="#">
                          <span>30 minutes ago</span>
                          <h6 className="mb-0">
                            john just buy your product
                            <strong className="text-warning">Sell $250</strong>
                          </h6>
                        </a>
                      </li>
                      <li>
                        <div className="timeline-badge success" />
                        <a className="timeline-panel text-muted" href="#">
                          <span>15 minutes ago</span>
                          <h6 className="mb-0">
                            StumbleUpon is acquired by eBay.
                          </h6>
                        </a>
                      </li>
                      <li>
                        <div className="timeline-badge warning" />
                        <a className="timeline-panel text-muted" href="#">
                          <span>20 minutes ago</span>
                          <h6 className="mb-0">
                            Mashable, a news website and blog, goes live.
                          </h6>
                        </a>
                      </li>
                      <li>
                        <div className="timeline-badge dark" />
                        <a className="timeline-panel text-muted" href="#">
                          <span>20 minutes ago</span>
                          <h6 className="mb-0">
                            Mashable, a news website and blog, goes live.
                          </h6>
                        </a>
                      </li>
                    </ul>
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

export default EnquiryDetials;
