import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { confirm } from "../../Common/ConfirmModal";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function EnquiryDetials() {
  const location = useLocation();
  const navigate = useNavigate();

  const [enquiryId, setEnquiryId] = useState(null);
  const [EnquiryDetials, setEnquiryDetials] = useState({});

  useEffect(() => {
    console.log("location", location);
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
  const sendEmail = async () => {
    if (
      await confirm("Are you sure you want to Send Notification To Customer")
    ) {
      GetDataWithToken(`superadmin/send-mail-customer/${enquiryId}`).then(
        (response) => {
          if (response.status === true) {
            console.log("response", response);
            toast.success("Mail Sent Successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        }
      );
    }
  };

  return (
    <>
      {console.log("enquiryId", EnquiryDetials)}
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
                <div className="Buttons">
                  <div className="d-flex flex-column">
                    <button
                      className="btn btn-mybutton"
                      data-bs-toggle="modal"
                      data-bs-target=".bd-example-modal-lg"
                    >
                      View Mesurement
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalCenter"
                      className="btn btn-mybutton"
                    >
                      View Stauts
                    </button>
                    <button
                      onClick={() => sendEmail()}
                      className="btn btn-mybutton"
                    >
                      Send Email
                    </button>
                    <button
                      onClick={() => {
                        navigate("/add-schedule", {
                          state: { data: enquiryId },
                        });
                      }}
                      className="btn btn-mybutton"
                    >
                      asign Mesurer
                    </button>
                    <button className="btn btn-mybutton">asign Instaler</button>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">
                      Enquiry No: {EnquiryDetials?.data?.id}
                    </h4>

                    <a
                      href="edit_enquiry.html"
                      className="btn btn-primary btn-xs sharp me-1"
                    >
                      <i className="fas fa-pencil-alt" />
                    </a>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="heading">
                          <h3 className="">Customer Detials</h3>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Customer Name :</span>
                            <strong>
                              {EnquiryDetials?.data?.customer?.firstName}{" "}
                              {EnquiryDetials?.data?.customer?.lastName}{" "}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span className="mb-0">Contact No. :</span>
                            <strong>
                              {EnquiryDetials?.data?.customer?.primary_phone}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span className="mb-0">
                              Secondary Contact No. :
                            </span>
                            <strong>
                              {EnquiryDetials?.data?.customer?.secondary_phone}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span className="mb-0">Email :</span>
                            <strong>
                              {EnquiryDetials?.data?.customer?.primary_email}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Secondary Email :</span>
                            <strong>
                              {EnquiryDetials?.data?.customer?.secondary_email}
                            </strong>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <div className="heading">
                          <h3 className="">Billing Address</h3>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Customer Name :</span>
                            <strong>
                              {EnquiryDetials?.billingAddress?.contactPerson}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Contact No. :</span>
                            <strong>
                              {EnquiryDetials?.billingAddress?.contactNumber}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">State :</span>
                            <strong>
                              {" "}
                              {EnquiryDetials?.billingAddress?.state}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Pincode :</span>
                            <strong>
                              {EnquiryDetials?.billingAddress?.pincode}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Address :</span>
                            <strong>
                              {" "}
                              {EnquiryDetials?.billingAddress?.street}
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/*---- Tabs -----*/}
                    <div
                      className="list-group roomtab mb-4 mt-5 flex-row"
                      id="list-tab"
                      role="tablist"
                    >
                      {EnquiryDetials?.data &&
                        EnquiryDetials?.data?.rooms.map((rooms, index) => (
                          <a
                            className={`list-group-item list-group-item-action text-white ${
                              index === 0 ? "active" : ""
                            }`}
                            data-bs-toggle="list"
                            href={`#list-home-${index}`}
                            role="tab"
                          >
                            Room Name: {rooms.roomName}
                            <hr />
                            Floor : {rooms.floor}, No. of windows :{" "}
                            {rooms.numberOfWindow}
                          </a>
                        ))}
                    </div>
                    <div className="tab-content" id="nav-tabContent1">
                      {EnquiryDetials?.data &&
                        EnquiryDetials?.data?.rooms.map((room, index) => {
                          console.log("fabric", room?.selectedcurtain);
                          return (
                            <>
                              <div
                                className={`tab-pane fade show ${
                                  index === 0 ? "active" : ""
                                }`}
                                id={`list-home-${index}`}
                              >
                                <h5>Main Curtain Fabric Description</h5>
                                <div className="border border-1 p-3 rounded-2 mb-3">
                                  <div className="row">
                                    <div className="col-lg-3">
                                      <img
                                        src={
                                          room?.selectedcurtain
                                            ?.curtain_fabric_style?.image
                                        }
                                        alt="fabric"
                                        className="newimg"
                                      />
                                    </div>
                                    <div className="col-lg-9">
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Fabric Name :
                                          </span>
                                          <strong>
                                            {" "}
                                            {
                                              room?.selectedcurtain?.fabric1
                                                ?.fabric
                                            }
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">Width. :</span>
                                          <strong>
                                            {" "}
                                            {
                                              room?.selectedcurtain?.fabric1
                                                ?.width
                                            }
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Repeat Horizontal :
                                          </span>
                                          <strong>
                                            {" "}
                                            {
                                              room?.selectedcurtain?.fabric1
                                                ?.repeat_horizontal
                                            }
                                          </strong>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">Weight :</span>
                                          <strong>
                                            {" "}
                                            {
                                              room?.selectedcurtain
                                                ?.weight_required
                                            }
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Hand Hamming :
                                          </span>
                                          <strong>
                                            {" "}
                                            {
                                              room?.selectedcurtain
                                                ?.hand_hammering_required
                                            }
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Curtain Style :
                                          </span>
                                          <strong>
                                            {
                                              room?.selectedcurtain
                                                ?.curtain_fabric_style
                                                ?.curtainStyle
                                            }
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Curtain gathering:
                                          </span>
                                          <strong>
                                            {
                                              room?.selectedcurtain
                                                ?.fabricGathering?.type
                                            }
                                          </strong>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                {room?.selectedcurtain?.fabric2 === null ? (
                                  ""
                                ) : (
                                  <>
                                    <h5>Main Curtain Fabric 2 Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <img
                                            src={
                                              room?.selectedcurtain
                                                ?.curtain_fabric_style?.image
                                            }
                                            alt="fabric"
                                            className="newimg"
                                          />
                                        </div>
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Fabric Name :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain?.fabric2
                                                    ?.fabric
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Width. :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain?.fabric2
                                                    ?.width
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Horizontal :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain?.fabric2
                                                    ?.repeat_horizontal
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat vertical :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain?.fabric2
                                                    ?.repeat_vertical
                                                }
                                              </strong>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                                {room?.selectedcurtain?.mock_fabric_required ===
                                "No" ? (
                                  ""
                                ) : (
                                  <>
                                    <h5>Mock Curtain Fabric Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <div className="row">
                                        <div className="col-lg-8">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Fabric Name :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.mock_fabric?.fabric
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Width. :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.mock_fabric?.width
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Horizontal :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.mock_fabric
                                                    ?.repeat_horizontal
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat vertical :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.mock_fabric
                                                    ?.repeat_vertical
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat vertical :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.mockFabric_gathering?.type
                                                }
                                              </strong>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-4">
                                          <img
                                            src={
                                              room?.selectedcurtain?.mock_fabric
                                                ?.image === null
                                                ? ""
                                                : room?.selectedcurtain
                                                    ?.mock_fabric?.image
                                            }
                                            alt="fabric"
                                            className="newimg"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {room?.selectedcurtain?.LiningType === null ? (
                                  ""
                                ) : (
                                  <>
                                    {" "}
                                    <h5>Lining Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <img
                                            src={
                                              room?.selectedcurtain?.lining
                                                ?.image === null
                                                ? ""
                                                : room?.selectedcurtain?.lining
                                                    ?.image
                                            }
                                            alt="Lining Fabric"
                                            className="newimg"
                                          />
                                        </div>
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lining Type :
                                              </span>
                                              <div>
                                                <strong>
                                                  {
                                                    room?.selectedcurtain
                                                      ?.lining?.type
                                                  }
                                                </strong>
                                                <span className="d-block">
                                                  Note:{" "}
                                                  {
                                                    room?.selectedcurtain
                                                      ?.lining?.note
                                                  }
                                                </span>
                                              </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lining Fabric Name :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain
                                                    ?.lining_fabric?.fabric
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lining Width. :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.lining_fabric?.width
                                                }
                                              </strong>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {console.log(
                                  "first`111111",
                                  room?.selectedcurtain?.border_required
                                )}
                                {room?.selectedcurtain?.border_required ===
                                "No" ? (
                                  ""
                                ) : (
                                  <>
                                    <h5>Border Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <p className="text-white rounded-pill bg-primary px-3 py-1">
                                        Border Fabric 1 Description
                                      </p>
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <img
                                            src={
                                              room?.selectedcurtain?.border_type
                                                ?.image === null
                                                ? ""
                                                : room?.selectedcurtain
                                                    ?.border_type?.image
                                            }
                                            alt="borderimage"
                                            className="newimg"
                                          />
                                        </div>
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Border Type :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.border_type?.type
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Fabric Name :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain
                                                    ?.p_border?.fabric
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Width. :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.p_border?.width
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Horizontal :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.p_border
                                                    ?.repeat_horizontal
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Vertical :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.p_border?.repeat_vertical
                                                }
                                              </strong>
                                            </li>
                                            <p className="text-white rounded-pill bg-primary px-3 py-1 mt-3">
                                              Border Fabric 2 Description
                                            </p>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Fabric Name :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain
                                                    ?.s_border?.fabric
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Width. :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.s_border?.width
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Horizontal :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.s_border
                                                    ?.repeat_horizontal
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Vertical :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.s_border?.repeat_vertical
                                                }
                                              </strong>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                                {room?.selectedsheer === null ? (
                                  ""
                                ) : (
                                  <>
                                    {" "}
                                    <h5>Sheer Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <img
                                            src={
                                              room?.selectedsheer?.sheerStyle
                                                ?.image === null
                                                ? ""
                                                : room?.selectedsheer
                                                    ?.sheerStyle?.image
                                            }
                                            alt="Lining Fabric"
                                            className="newimg"
                                          />
                                        </div>
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Sheer Curtain Style :
                                              </span>
                                              <div>
                                                <strong>
                                                  {
                                                    room?.selectedsheer
                                                      ?.sheerStyle?.curtainStyle
                                                  }
                                                </strong>
                                              </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lining Fabric Name :
                                              </span>
                                              <div>
                                                <strong>
                                                  {
                                                    room?.selectedsheer
                                                      ?.sheerfabric?.fabric
                                                  }
                                                </strong>
                                              </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lining Fabric Width :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedsheer
                                                    ?.sheerfabric?.width
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lining Fabric Repeat Horizontal.
                                                :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedsheer
                                                    ?.sheerfabric
                                                    ?.repeat_horizontal
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lining Fabric Repeat Vertical. :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedsheer
                                                    ?.sheerfabric
                                                    ?.repeat_vertical
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lining Fabric Book :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedsheer
                                                    ?.sheerfabric?.book?.book
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lining Fabric Brand :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedsheer
                                                    ?.sheerfabric?.book?.brand
                                                    ?.brand
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Hand Hamming :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedsheer
                                                    ?.handHammering
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Lead Chain :
                                              </span>
                                              <strong>
                                                {" "}
                                                {room?.selectedsheer?.leadChain}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Gathering :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedsheer
                                                    ?.GatheredSheer?.type
                                                }
                                              </strong>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                                {room?.selectedcurtain?.beltType === null ? (
                                  ""
                                ) : (
                                  <>
                                    <h5>Belt Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <img
                                            src={
                                              room?.selectedcurtain?.belt_type
                                                ?.image === null
                                                ? ""
                                                : room?.selectedcurtain
                                                    ?.belt_type?.image
                                            }
                                            alt="Belt Fabric"
                                            className="newimg"
                                          />
                                        </div>
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Belt Type:
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain
                                                    ?.belt_type?.type
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Belt Fabric Name :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain?.belt
                                                    ?.fabric
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Width. :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain?.belt
                                                    ?.width
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Horizontal :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain?.belt
                                                    ?.repeat_horizontal
                                                }{" "}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Vertical :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain?.belt
                                                    ?.repeat_vertical
                                                }{" "}
                                              </strong>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                                {room?.selectedcurtain?.pelmetTypeId ===
                                null ? (
                                  ""
                                ) : (
                                  <>
                                    {" "}
                                    <h5>Pelmet Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <img
                                            src={
                                              room?.selectedcurtain?.pelmet_type
                                                ?.image === null
                                                ? ""
                                                : room?.selectedcurtain
                                                    ?.pelmet_type?.image
                                            }
                                            alt="Belt Fabric"
                                            className="newimg"
                                          />
                                        </div>

                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Pelmet Type :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain
                                                    ?.pelmet_type?.type
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Pelmet Fabric Name :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain?.pelmet
                                                    ?.fabric
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Width. :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain?.pelmet
                                                    ?.width
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Horizontal :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain?.pelmet
                                                    ?.repeat_horizontal
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Repeat Vertical :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain?.pelmet
                                                    ?.repeat_vertical
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Pelmet Width :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain
                                                    ?.pelmet_width
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Pelmet drop/Height :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain
                                                    ?.pelmet_drop
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Pelmet Turning :
                                              </span>
                                              <strong>
                                                {" "}
                                                {
                                                  room?.selectedcurtain
                                                    ?.pelmet_turning
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                L Brackets :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain
                                                    ?.pelmet_LBracket_required
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Number of L Brackets :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedcurtain
                                                    ?.pelmet_LBracket_quantity
                                                }
                                              </strong>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                                {room?.selectedTrack === null ? (
                                  ""
                                ) : (
                                  <>
                                    <h5>Track Information</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <p class="text-white rounded-pill bg-primary px-3 py-1">
                                        Main Curtain track Description
                                      </p>
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <img
                                            src={
                                              room?.selectedTrack
                                                ?.primaryTrackType?.image ===
                                              null
                                                ? ""
                                                : room?.selectedTrack
                                                    ?.primaryTrackType?.image
                                            }
                                            alt="Belt Fabric"
                                            className="newimg"
                                          />
                                        </div>
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <strong className="mb-0">
                                                Main Curtain track type :
                                              </strong>
                                              <span>
                                                {
                                                  room?.selectedTrack
                                                    ?.primaryTrackType?.type
                                                }
                                              </span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <strong className="mb-0">
                                                Curtain track length. :
                                              </strong>
                                              <span>
                                                {
                                                  room?.selectedTrack
                                                    ?.primary_track_length
                                                }
                                              </span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <strong className="mb-0">
                                                Main Curtain Track Moter
                                                operation :
                                              </strong>
                                              <span>
                                                {
                                                  room?.selectedTrack
                                                    ?.primary_motor_operation
                                                }
                                              </span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <strong className="mb-0">
                                                Main Curtain track extra bracket
                                                Required :
                                              </strong>
                                              <span>
                                                {" "}
                                                {
                                                  room?.selectedTrack
                                                    ?.primary_extra_track_bracket_required
                                                }
                                              </span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <strong className="mb-0">
                                                Main Curtain track extra bracket
                                                Quantity :
                                              </strong>
                                              <span>
                                                {" "}
                                                {
                                                  room?.selectedTrack
                                                    ?.primary_extra_track_bracket_quantity
                                                }
                                              </span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <strong className="mb-0">
                                                Main Curtain track over lapper
                                                required :
                                              </strong>
                                              <span>
                                                {
                                                  room?.selectedTrack
                                                    ?.primary_overlappper_required
                                                }
                                              </span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <strong className="mb-0">
                                                Main curtain track over lapper :
                                              </strong>
                                              <span>
                                                {
                                                  room?.selectedTrack
                                                    ?.primary_number_of_overlappper_pair
                                                }
                                              </span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <strong className="mb-0">
                                                Main curatin Track Stick
                                                Required :
                                              </strong>
                                              <span>
                                                {room?.selectedTrack
                                                  ?.primary_track_curatin_stick_required ===
                                                null
                                                  ? "No"
                                                  : "Yes"}
                                              </span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <strong className="mb-0">
                                                Main curatin tie Knobs Required
                                                :
                                              </strong>
                                              <span>
                                                {room?.selectedTrack
                                                  ?.primary_tie_knobs_required ===
                                                null
                                                  ? "No"
                                                  : "Yes"}
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {room?.selectedRod === null ? (
                                  ""
                                ) : (
                                  <>
                                    {" "}
                                    <h5>Roads Information</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <img
                                            src={
                                              room?.selectedRod?.primaryRod
                                                ?.image === null
                                                ? ""
                                                : room?.selectedRod?.primaryRod
                                                    ?.image
                                            }
                                            alt="Belt Fabric"
                                            className="newimg"
                                          />
                                        </div>
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Rod channel type :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedRod
                                                    ?.rod_selection
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod Type :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedRod?.primaryRod
                                                    ?.type
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod length. :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedRod
                                                    ?.primary_rod_length
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod extra bracket
                                                required :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedRod
                                                    ?.extra_bracket_required
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                No of curtain rod extra bracket
                                                :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedRod
                                                    ?.extra_bracket_quantity
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                extra bracket support required :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedRod
                                                    ?.extra_bracket_support_required
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                extra bracket support quantity :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedRod
                                                    ?.extra_bracket_support_required
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod ring required :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedRod
                                                    ?.extra_ring_required
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                no of curtain rod ring :
                                              </span>
                                              <strong>
                                                {
                                                  room?.selectedRod
                                                    ?.extra_ring_quantity
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod tie knob required :
                                              </span>
                                              <strong>
                                                {room?.selectedRod
                                                  ?.rod_tie_knobs_required ===
                                                null
                                                  ? "No"
                                                  : "Yes"}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod tie knobs pair :
                                              </span>
                                              <strong>
                                                {room?.selectedRod
                                                  ?.rod_number_of_tie_knobs_pair ===
                                                null
                                                  ? "No"
                                                  : "Yes"}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod finial quantity :
                                              </span>
                                              <strong>
                                                {room?.selectedRod
                                                  ?.finial_quantity === null
                                                  ? "N/A"
                                                  : room?.selectedRod
                                                      ?.finial_quantity}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod end cap required :
                                              </span>
                                              <strong>
                                                {room?.selectedRod
                                                  ?.end_cap_required === null
                                                  ? "No"
                                                  : "Yes"}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                No of curtain rod end cap :
                                              </span>
                                              <strong>
                                                {room?.selectedRod
                                                  ?.end_cap_quantity === null
                                                  ? "N/A"
                                                  : room?.selectedRod
                                                      ?.end_cap_quantity}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod end cap wall support
                                                required :
                                              </span>
                                              <strong>
                                                {room?.selectedRod
                                                  ?.end_cap_wall_support_required ===
                                                null
                                                  ? "No"
                                                  : "Yes"}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                No of curtain rod end cap wall
                                                support :
                                              </span>
                                              <strong>
                                                {room?.selectedRod
                                                  ?.end_cap_wall_support_required ===
                                                null
                                                  ? "No"
                                                  : room?.selectedRod
                                                      ?.end_cap_wall_support_required}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Curtain rod stick required :
                                              </span>
                                              <strong>
                                                {room?.selectedRod
                                                  ?.curatin_stick_required ===
                                                null
                                                  ? "No"
                                                  : "Yes"}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                No of curtain rod stick Pair :
                                              </span>
                                              <strong>
                                                {" "}
                                                {room?.selectedRod
                                                  ?.number_of_curatin_stick_pair ===
                                                null
                                                  ? "No"
                                                  : room?.selectedRod
                                                      ?.number_of_curatin_stick_pair}
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Secondary Rod Length :
                                              </span>
                                              <strong>
                                                {" "}
                                                {room?.selectedRod
                                                  ?.secondary_rod_length ===
                                                null
                                                  ? "No"
                                                  : room?.selectedRod
                                                      ?.secondary_rod_length}
                                              </strong>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modals  */}
      <div class="modal fade" id="exampleModalCenter">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Enquiry Status</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-intro-title">Enquiry No.</h4>
                  <div
                    id="DZ_W_TimeLine"
                    className="widget-timeline dlab-scroll"
                  >
                    <ul className="timeline">
                      {EnquiryDetials?.data?.enquirystatuses &&
                        EnquiryDetials?.data?.enquirystatuses.map(
                          (item, index) => {
                            return (
                              <li>
                                <div className="timeline-badge primary" />
                                <a
                                  className="timeline-panel text-muted"
                                  href="#"
                                >
                                  <span className="text-white">
                                    {moment(item.createdAt).format("LLL")}
                                  </span>
                                  <h6 className="mb-0 text-white">
                                    {item.remark} #{item.enquiryId}
                                    {/* <strong className="text-primary"></strong>. */}
                                  </h6>
                                </a>
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Room Detials</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">
              <ul className="nav nav-pills justify-content-start mb-4">
                {EnquiryDetials?.data &&
                  EnquiryDetials?.data?.rooms.map((rooms, index) => (
                    <li className=" nav-item">
                      <a
                        className={`"nav-link list-group-item ${
                          index === 0 ? "active" : ""
                        }`}
                        data-bs-toggle="tab"
                        href={`#navpills${index}`}
                        aria-expanded="false"
                      >
                        Room Name: {rooms.roomName}
                      </a>
                    </li>
                  ))}
              </ul>
              <div className="tab-content">
                {EnquiryDetials?.data &&
                  EnquiryDetials?.data?.rooms.map((rooms, index) => (
                    <>
                      <div
                        id={`navpills${index}`}
                        className={`tab-pane  ${index === 0 ? "active" : ""}`}
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <ul className="nav nav-pills justify-content-start mb-4">
                              {rooms?.room_assets &&
                                rooms?.room_assets.map((window, index) => (
                                  <li className=" nav-item">
                                    <a
                                      className={` "nav-link rounded-pill  px-4 py-2 me-2 border ${
                                        index === 0
                                          ? "active bg-primary text-white"
                                          : ""
                                      }`}
                                      data-bs-toggle="tab"
                                      href={`#navpillschild${index}`}
                                      aria-expanded="false"
                                    >
                                      {`window-${index + 1}`}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="col-lg-12">
                            <div className="tab-content">
                              {rooms?.room_assets &&
                                rooms?.room_assets.map((window, index) => (
                                  <div
                                    id={`navpillschild${index}`}
                                    className={`tab-pane ${
                                      index === 0 ? "active" : ""
                                    }`}
                                  >
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">Fabric :</span>
                                        <strong>
                                          {
                                            rooms?.selectedcurtain?.fabric1
                                              ?.fabric
                                          }
                                        </strong>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">Width :</span>
                                        <strong>
                                          {" "}
                                          {
                                            rooms?.selectedcurtain?.fabric1
                                              ?.width
                                          }
                                        </strong>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">Repeat H :</span>
                                        <strong>
                                          {" "}
                                          {
                                            rooms?.selectedcurtain?.fabric1
                                              ?.repeat_horizontal
                                          }
                                        </strong>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">Repeat V :</span>
                                        <strong>
                                          {" "}
                                          {
                                            rooms?.selectedcurtain?.fabric1
                                              ?.repeat_vertical
                                          }
                                        </strong>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">Brand :</span>
                                        <strong>
                                          {" "}
                                          {
                                            rooms?.selectedcurtain?.fabric1
                                              ?.book?.book
                                          }
                                        </strong>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">Book :</span>
                                        <strong>
                                          {" "}
                                          {
                                            rooms?.selectedcurtain?.fabric1
                                              ?.book?.brand?.brand
                                          }
                                        </strong>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">
                                          No of Panel :
                                        </span>
                                        <strong>
                                          {window?.number_of_panel}
                                        </strong>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">
                                          Total Fabric :
                                        </span>
                                        <strong>
                                          {window?.total_fabric_required}
                                        </strong>
                                      </li>
                                    </ul>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <img src={""} alt="imageof" />
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnquiryDetials;
