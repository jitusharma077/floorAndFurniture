import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { confirm } from "../../Common/ConfirmModal";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import EnquiryCustom from "./Common/EnquiryCustom";

function EnquiryDetials() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRoomData, setIsRoomData] = useState(false);
  const [CustomerId, setCustomerId] = useState("");

  const [enquiryId, setEnquiryId] = useState(null);
  const [EnquiryDetials, setEnquiryDetials] = useState({});
  const [btnIndex, setBtnIndex] = useState(0);

  useEffect(() => {
    console.log("location", location);
    setEnquiryId(location.state.data);

    GetDataWithToken(`sales/get-enquiry/${location.state.data}`).then(
      (response) => {
        if (response.status === true) {
          console.log("response", response.data);
          setEnquiryDetials(response);
          setCustomerId(response?.data?.customer?.id);
          if (response.data.rooms.length > 0) {
            setIsRoomData(true);
          }
        }
      }
    );
  }, []);
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
      {console.log("lenghtcustomerrrrrr", CustomerId)}
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
              <div className="col-xl-11">
                <div className="Buttons">
                  <div className="d-flex flex-column">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalCenter"
                      className="btn btn-mybutton"
                    >
                      View Status
                    </button>
                    {isRoomData === true ? (
                      <>
                        <button
                          className="btn btn-mybutton"
                          data-bs-toggle="modal"
                          data-bs-target=".bd-example-modal-lg"
                        >
                          View Measurements
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
                          Assign Measurer
                        </button>
                        <button
                          onClick={() => {
                            navigate("/AddInstalerSchdule", {
                              state: {
                                enquiryId: enquiryId,
                                customerId: CustomerId,
                              },
                            });
                          }}
                          className="btn btn-mybutton"
                        >
                          Assign Installer
                        </button>

                        {EnquiryDetials?.data?.status ===
                          "measurement-complete" &&
                          EnquiryDetials?.data?.orders?.length === 0 && (
                            <button
                              onClick={() => {
                                navigate("/CreateOrder", {
                                  state: {
                                    enquiryId: enquiryId,
                                    customerId: CustomerId,
                                  },
                                });
                              }}
                              className="btn btn-mybutton"
                            >
                              Create Order
                            </button>
                          )}
                      </>
                    ) : null}
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
                              {
                                EnquiryDetials?.data?.customer?.addresses[0]
                                  ?.contactPerson
                              }
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Contact No. :</span>
                            <strong>
                              {EnquiryDetials?.data?.customer?.addresses[0]
                                ?.contactNumber === null
                                ? "nil"
                                : EnquiryDetials?.data?.customer?.addresses[0]
                                    ?.contactNumber}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">city :</span>
                            <strong>
                              {" "}
                              {
                                EnquiryDetials?.data?.customer?.addresses[0]
                                  ?.city
                              }
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">State :</span>
                            <strong>
                              {" "}
                              {
                                EnquiryDetials?.data?.customer?.addresses[0]
                                  ?.state
                              }
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">type :</span>
                            <strong>
                              {" "}
                              {
                                EnquiryDetials?.data?.customer?.addresses[0]
                                  ?.type
                              }
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">customerId :</span>
                            <strong>
                              {" "}
                              {
                                EnquiryDetials?.data?.customer?.addresses[0]
                                  ?.customerId
                              }
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Pincode :</span>
                            <strong>
                              {
                                EnquiryDetials?.data?.customer?.addresses[0]
                                  ?.pincode
                              }
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Address :</span>
                            <strong>
                              {
                                EnquiryDetials?.data?.customer?.addresses[0]
                                  ?.street
                              }
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
                            <div>Room Name: {rooms?.roomName}</div>
                            <div>
                              {" "}
                              Room Description:{rooms?.roomDescription}
                            </div>
                            <hr />
                            enquiry Id : {rooms?.enquiryId},Floor :{" "}
                            {rooms?.floor}, No. of windows :{" "}
                            {rooms?.numberOfWindow} ,extra Hardware :{" "}
                            {rooms?.extra_hardware} ,extra hardware required :
                            {rooms?.extra_hardware_required === null
                              ? "no"
                              : "yes"}
                            , curtain Fabric:
                            {rooms?.curtainFabric === null
                              ? "nil"
                              : rooms?.curtainFabric}
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
                                  <EnquiryCustom
                                    image={
                                      room?.selectedsheer?.sheerStyle?.image ===
                                      null
                                        ? ""
                                        : room?.selectedsheer?.sheerStyle?.image
                                    }
                                    fabricName={
                                      room?.selectedcurtain?.fabric1?.fabric
                                    }
                                    width={
                                      room?.selectedcurtain?.fabric1?.width
                                    }
                                    brandName={
                                      room?.selectedcurtain?.fabric1?.brand_name
                                    }
                                    repeatHorizontal={
                                      room?.selectedcurtain?.fabric1
                                        ?.repeat_horizontal
                                    }
                                    repeatVertical={
                                      room?.selectedcurtain?.fabric1
                                        ?.repeat_vertical
                                    }
                                    book={
                                      room?.selectedcurtain?.fabric1?.book_name
                                    }
                                    material1={room?.material_images[0]?.image}
                                    material2={room?.material_images[1]?.image}
                                    style={
                                      room?.selectedcurtain
                                        ?.curtain_fabric_style?.curtainStyle
                                    }
                                    gathering={
                                      room?.selectedcurtain?.gathering?.type
                                    }
                                    weight={
                                      room?.selectedcurtain?.weight_required
                                    }
                                    handHammering={
                                      room?.selectedcurtain
                                        ?.hand_hammering_required
                                    }
                                    customType={
                                      room?.selectedcurtain?.curtainpattern
                                        ?.pattern
                                    }
                                    customImage={
                                      room?.selectedcurtain?.curtainpattern
                                        ?.image
                                    }
                                  />
                                </div>
                                {room?.selectedcurtain?.fabric2 === null ? (
                                  ""
                                ) : (
                                  <>
                                    <h5>Main Curtain Fabric 2 Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <EnquiryCustom
                                        image={
                                          room?.selectedsheer?.sheerStyle?.image
                                        }
                                        fabricName={
                                          room?.selectedcurtain?.fabric2?.fabric
                                        }
                                        brandName={
                                          room?.selectedcurtain?.fabric2
                                            ?.brand_name
                                        }
                                        width={
                                          room?.selectedcurtain?.fabric2?.width
                                        }
                                        repeatHorizontal={
                                          room?.selectedcurtain?.fabric2
                                            ?.repeat_horizontal
                                        }
                                        repeatVertical={
                                          room?.selectedcurtain?.fabric2
                                            ?.repeat_vertical
                                        }
                                        book={
                                          room?.selectedcurtain?.fabric2
                                            ?.book_name
                                        }
                                        material1={
                                          room?.material_images[0]?.image
                                        }
                                        material2={
                                          room?.material_images[1]?.image
                                        }
                                      />
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
                                      <EnquiryCustom
                                        image={
                                          room?.selectedsheer?.sheerStyle?.image
                                        }
                                        fabricName={
                                          room?.selectedcurtain?.mock_fabric
                                            ?.fabric
                                        }
                                        width={
                                          room?.selectedcurtain?.mock_fabric
                                            ?.width
                                        }
                                        repeatHorizontal={
                                          room?.selectedcurtain?.mock_fabric
                                            ?.repeat_horizontal
                                        }
                                        repeatVertical={
                                          room?.selectedcurtain?.mock_fabric
                                            ?.repeat_vertical
                                        }
                                        style={
                                          room?.selectedcurtain?.mock_style
                                            ?.curtainStyle
                                        }
                                        book={
                                          room?.selectedcurtain?.mock_fabric
                                            ?.book_name
                                        }
                                        brandName={
                                          room?.selectedcurtain?.mock_fabric
                                            ?.brand_name
                                        }
                                        handHammering={
                                          room?.selectedcurtain
                                            ?.mock_hand_hammering_required
                                        }
                                        material1={
                                          room?.material_images[0]?.image
                                        }
                                        material2={
                                          room?.material_images[1]?.image
                                        }
                                      />
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
                                      <EnquiryCustom
                                        image={
                                          room?.selectedcurtain?.lining?.image
                                        }
                                        style={
                                          room?.selectedcurtain?.lining?.type
                                        }
                                        note={
                                          room?.selectedcurtain?.lining?.note
                                        }
                                        fabricName={
                                          room?.selectedcurtain?.Lining_Fabric
                                            ?.fabric
                                        }
                                        width={
                                          room?.selectedcurtain?.Lining_Fabric
                                            ?.width
                                        }
                                      />
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
                                      <EnquiryCustom
                                        image={
                                          room?.selectedcurtain?.border_type
                                            ?.image
                                        }
                                        type={
                                          room?.selectedcurtain?.border_type
                                            ?.type
                                        }
                                        fabricName={
                                          room?.selectedcurtain?.p_border
                                            ?.fabric
                                        }
                                        width={
                                          room?.selectedcurtain?.p_border?.width
                                        }
                                        book={
                                          room?.selectedcurtain?.p_border
                                            ?.book_name
                                        }
                                        brandName={
                                          room?.selectedcurtain?.p_border
                                            ?.brand_name
                                        }
                                        repeatHorizontal={
                                          room?.selectedcurtain?.p_border
                                            ?.repeat_horizontal
                                        }
                                        repeatVertical={
                                          room?.selectedcurtain?.p_border
                                            ?.repeat_vertical
                                        }
                                        material1={
                                          room?.material_images[6]?.image
                                        }
                                        material2={
                                          room?.material_images[7]?.image
                                        }
                                      />
                                      <div className="row">
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <p className="text-white rounded-pill bg-primary px-3 py-1 mt-3">
                                              Border Fabric 2 Description
                                            </p>
                                            <EnquiryCustom
                                              fabricName={
                                                room?.selectedcurtain?.s_border
                                                  ?.fabric
                                              }
                                              width={
                                                room?.selectedcurtain?.s_border
                                                  ?.width
                                              }
                                              repeatHorizontal={
                                                room?.selectedcurtain?.s_border
                                                  ?.repeat_horizontal
                                              }
                                              repeatVertical={
                                                room?.selectedcurtain?.s_border
                                                  ?.repeat_vertical
                                              }
                                              book={
                                                room?.selectedcurtain?.s_border
                                                  ?.book_name
                                              }
                                              brandName={
                                                room?.selectedcurtain?.s_border
                                                  ?.brand_name
                                              }
                                              material1={
                                                room?.material_images[15]?.image
                                              }
                                              material2={
                                                room?.material_images[16]?.image
                                              }
                                            />
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
                                      <EnquiryCustom
                                        image={
                                          room?.selectedsheer?.sheerStyle?.image
                                        }
                                        style={
                                          room?.selectedsheer?.sheerStyle
                                            ?.curtainStyle
                                        }
                                        fabricName={
                                          room?.selectedsheer?.curtainfabric
                                            ?.fabric
                                        }
                                        width={
                                          room?.selectedsheer?.curtainfabric
                                            ?.width
                                        }
                                        repeatHorizontal={
                                          room?.selectedsheer?.curtainfabric
                                            ?.repeat_horizontal
                                        }
                                        repeatVertical={
                                          room?.selectedsheer?.curtainfabric
                                            ?.repeat_vertical
                                        }
                                        book={
                                          room?.selectedsheer?.curtainfabric
                                            ?.book_name
                                        }
                                        brandName={
                                          room?.selectedsheer?.curtainfabric
                                            ?.brand_name
                                        }
                                        handHammering={
                                          room?.selectedsheer?.handHammering
                                        }
                                        leadChain={
                                          room?.selectedsheer?.leadChain
                                        }
                                        gathering={
                                          room?.selectedsheer?.GatheredSheer
                                            ?.type
                                        }
                                        material1={
                                          room?.material_images[3]?.image
                                        }
                                        material2={
                                          room?.material_images[12]?.image
                                        }
                                      />
                                    </div>
                                  </>
                                )}

                                {room?.selectedcurtain?.beltType === null ? (
                                  ""
                                ) : (
                                  <>
                                    <h5>Belt Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <EnquiryCustom
                                        image={
                                          room?.selectedcurtain?.belt_type
                                            ?.image
                                        }
                                        customType={
                                          room?.selectedcurtain?.belt_type?.type
                                        }
                                        fabricName={
                                          room?.selectedcurtain?.belt?.fabric
                                        }
                                        width={
                                          room?.selectedcurtain?.belt?.width
                                        }
                                        repeatHorizontal={
                                          room?.selectedcurtain?.belt
                                            ?.repeat_horizontal
                                        }
                                        repeatVertical={
                                          room?.selectedcurtain?.belt
                                            ?.repeat_vertical
                                        }
                                        book={
                                          room?.selectedcurtain?.belt?.book_name
                                        }
                                        brandName={
                                          room?.selectedcurtain?.belt
                                            ?.brand_name
                                        }
                                        material1={
                                          room?.material_images[4]?.image
                                        }
                                        material2={
                                          room?.material_images[13]?.image
                                        }
                                      />
                                    </div>
                                    <h5>belt piping Fabric Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <EnquiryCustom
                                        fabricName={
                                          room?.selectedcurtain?.beltPiping
                                            ?.fabric
                                        }
                                        width={
                                          room?.selectedcurtain?.beltPiping
                                            ?.width
                                        }
                                        repeatHorizontal={
                                          room?.selectedcurtain?.beltPiping
                                            ?.repeat_horizontal
                                        }
                                        repeatVertical={
                                          room?.selectedcurtain?.beltPiping
                                            ?.repeat_vertical
                                        }
                                        book={
                                          room?.selectedcurtain?.beltPiping
                                            ?.book_name
                                        }
                                        brandName={
                                          room?.selectedcurtain?.beltPiping
                                            ?.brand_name
                                        }
                                        material1={
                                          room?.material_images[14]?.image
                                        }
                                      />
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
                                      <EnquiryCustom
                                        image={
                                          room?.selectedcurtain?.pelmet_type
                                            ?.image
                                        }
                                        type={
                                          room?.selectedcurtain?.pelmet_type
                                            ?.type
                                        }
                                        fabricName={
                                          room?.selectedcurtain?.pelmet?.fabric
                                        }
                                        width={
                                          room?.selectedcurtain?.pelmet?.width
                                        }
                                        repeatHorizontal={
                                          room?.selectedcurtain?.pelmet
                                            ?.repeat_horizontal
                                        }
                                        repeatVertical={
                                          room?.selectedcurtain?.pelmet
                                            ?.repeat_vertical
                                        }
                                        height={
                                          room?.selectedcurtain?.pelmet_drop
                                        }
                                        turning={
                                          room?.selectedcurtain?.pelmet_turning
                                        }
                                        lBracketsRequired={
                                          room?.selectedcurtain
                                            ?.pelmet_LBracket_required
                                        }
                                        lbracketsQuantity={
                                          room?.selectedcurtain
                                            ?.pelmet_LBracket_quantity
                                        }
                                      />
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
                                      <EnquiryCustom
                                        image={
                                          room?.selectedMaterial[2]?.material
                                            ?.image
                                        }
                                        required={
                                          room?.selectedTrack?.track_required
                                        }
                                        type={
                                          room?.selectedTrack?.primaryTrackType
                                            ?.type
                                        }
                                        note={
                                          room?.selectedTrack?.primaryTrackType
                                            ?.notes
                                        }
                                        length={
                                          room?.selectedTrack
                                            ?.primary_track_length
                                        }
                                        screwSizeRequired={
                                          room?.selectedTrack
                                            ?.screw_size_required === null
                                            ? "no"
                                            : "yes"
                                        }
                                        material1={
                                          room?.selectedTrack
                                            ?.primary_track_image
                                        }
                                        track={
                                          room?.selectedTrack
                                            ?.primary_track_data?.fabric
                                        }
                                        motorOperation={
                                          room?.selectedTrack
                                            ?.primaryMotorOperation?.type
                                        }
                                        extraBracketRequired={
                                          room?.selectedTrack
                                            ?.primary_extra_track_bracket_required ===
                                          null
                                            ? "no"
                                            : "yes"
                                        }
                                        motorType={
                                          room?.selectedTrack?.primaryTrack
                                            ?.moter
                                        }
                                        extraBracketQuantity={
                                          room?.selectedTrack
                                            ?.primary_extra_track_bracket_quantity
                                        }
                                        overlapperRequired={
                                          room?.selectedTrack
                                            ?.primary_overlappper_required ===
                                          null
                                            ? "no"
                                            : "yes"
                                        }
                                        overlapperQuantity={
                                          room?.selectedTrack
                                            ?.primary_number_of_overlappper_pair ===
                                          null
                                            ? "No"
                                            : room?.selectedTrack
                                                ?.primary_number_of_overlappper_pair
                                        }
                                        trackStickRequired={
                                          room?.selectedTrack
                                            ?.primary_track_curatin_stick_required ===
                                          null
                                            ? "No"
                                            : "Yes"
                                        }
                                        tieKnobRequired={
                                          room?.selectedTrack
                                            ?.primary_tie_knobs_required ===
                                          null
                                            ? "No"
                                            : "Yes"
                                        }
                                        lBracketsRequired={
                                          room?.selectedTrack
                                            ?.l_bracket_required === null
                                            ? "No"
                                            : "Yes"
                                        }
                                      />
                                      <p class="text-white rounded-pill bg-primary px-3 py-1">
                                        Mock Curtain track Description
                                      </p>
                                      <EnquiryCustom
                                        type={
                                          room?.selectedTrack?.mockTrackType
                                            ?.type
                                        }
                                        note={
                                          room?.selectedTrack?.mockTrackType
                                            ?.notes
                                        }
                                        track={
                                          room?.selectedTrack?.mock_track_data
                                            ?.fabric
                                        }
                                        extraBracketRequired={
                                          room?.selectedTrack
                                            ?.mock_extra_track_bracket_required ===
                                          null
                                            ? "No"
                                            : "Yes"
                                        }
                                        trackStickRequired={
                                          room?.selectedTrack
                                            ?.mock_track_curatin_stick_required ===
                                          null
                                            ? "No"
                                            : "Yes"
                                        }
                                        tieKnobRequired={
                                          room?.selectedTrack
                                            ?.mock_tie_knobs_required === null
                                            ? "No"
                                            : "Yes"
                                        }
                                      />
                                    </div>
                                  </>
                                )}
                                {room?.selectedRod === null ? (
                                  ""
                                ) : (
                                  <>
                                    {" "}
                                    <h5>Rods Information</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <EnquiryCustom
                                        image={
                                          room?.selectedRod?.primaryRod?.image
                                        }
                                        channelType={
                                          room?.selectedRod?.rod_selection
                                        }
                                        type={
                                          room?.selectedRod?.primary_rod_data
                                            ?.fabric
                                        }
                                        curtainRoadType={
                                          room?.selectedRod?.primaryRod?.type
                                        }
                                        length={
                                          room?.selectedRod?.primary_rod_length
                                        }
                                        extraBracketRequired={
                                          room?.selectedRod
                                            ?.extra_bracket_required === null
                                            ? "no"
                                            : "yes"
                                        }
                                        extraBracketQuantity={
                                          room?.selectedRod
                                            ?.extra_bracket_quantity
                                        }
                                        extraBracketSupportRequired={
                                          room?.selectedRod
                                            ?.extra_bracket_support_required
                                        }
                                        extraBracketSupportQuantity={
                                          room?.selectedRod
                                            ?.extra_bracket_support_quantity
                                        }
                                        rodRingRequired={
                                          room?.selectedRod
                                            ?.extra_ring_required === null
                                            ? "no"
                                            : "yes"
                                        }
                                        rodRingQuantity={
                                          room?.selectedRod?.extra_ring_quantity
                                        }
                                        tieKnobRequired={
                                          room?.selectedRod
                                            ?.rod_tie_knobs_required === null
                                            ? "No"
                                            : "Yes"
                                        }
                                        tieKnobQuantity={
                                          room?.selectedRod
                                            ?.rod_number_of_tie_knobs_pair
                                        }
                                        finalQuantity={
                                          room?.selectedRod?.finial_quantity ===
                                          null
                                            ? "N/A"
                                            : room?.selectedRod?.finial_quantity
                                        }
                                        endCapRequired={
                                          room?.selectedRod
                                            ?.end_cap_required === null
                                            ? "No"
                                            : "Yes"
                                        }
                                        endCapQuantity={
                                          room?.selectedRod
                                            ?.end_cap_quantity === null
                                            ? "N/A"
                                            : room?.selectedRod
                                                ?.end_cap_quantity
                                        }
                                        endCapWallSupportRequired={
                                          room?.selectedRod
                                            ?.end_cap_wall_support_required ===
                                          null
                                            ? "No"
                                            : "Yes"
                                        }
                                        endCapWallSupportQuantity={
                                          room?.selectedRod
                                            ?.end_cap_wall_support_quantity ===
                                          null
                                            ? "NIL"
                                            : room?.selectedRod
                                                ?.end_cap_wall_support_quantity
                                        }
                                        trackStickRequired={
                                          room?.selectedRod
                                            ?.curatin_stick_required === null
                                            ? "No"
                                            : "Yes"
                                        }
                                        stickQuantity={
                                          room?.selectedRod
                                            ?.number_of_curatin_stick_pair ===
                                          null
                                            ? "No"
                                            : room?.selectedRod
                                                ?.number_of_curatin_stick_pair
                                        }
                                        material1={
                                          room?.selectedRod?.primary_rod_image
                                        }
                                      />
                                      <div className="row">
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Secondary Rod Length :
                                              </span>
                                              <strong>
                                                {" "}
                                                {room?.selectedRod
                                                  ?.secondary_rod_length ===
                                                null
                                                  ? "NIL"
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
                                {room?.numberOfWindow > 0 && (
                                  <>
                                    <h5>Blind Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      {room?.room_assets.map((arr, index) => {
                                        return (
                                          <button
                                            type="button"
                                            className="btn-success btn-secondary btn-warning btn-primary btn-danger btn-info"
                                            onClick={() => {
                                              setBtnIndex(index);
                                              console.log(btnIndex);
                                            }}
                                          >
                                            window {index + 1}
                                          </button>
                                        );
                                      })}
                                      <div className="row">
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                blind style :
                                              </span>
                                              <strong>
                                                {console.log(btnIndex)}
                                                {
                                                  room?.room_assets[btnIndex]
                                                    ?.selectedBlind?.blindStyle
                                                    ?.style
                                                }
                                              </strong>
                                              <img
                                                src={
                                                  room?.room_assets[btnIndex]
                                                    ?.selectedBlind?.blindStyle
                                                    ?.image
                                                }
                                                alt="Belt Fabric"
                                                className="newimg"
                                              />
                                            </li>

                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind?.blind_subtype !==
                                              null && (
                                              <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                                <span className="mb-0">
                                                  blind type:
                                                </span>
                                                <strong>
                                                  {
                                                    room?.room_assets[btnIndex]
                                                      ?.selectedBlind
                                                      ?.blind_subtype?.type
                                                  }
                                                </strong>
                                                <div className="col-lg-3">
                                                  <img
                                                    src={
                                                      room?.room_assets[
                                                        btnIndex
                                                      ]?.selectedBlind
                                                        ?.blind_subtype?.image
                                                    }
                                                    alt="Belt Fabric"
                                                    className="newimg"
                                                  />
                                                </div>
                                              </li>
                                            )}
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Blind window Type :
                                              </span>
                                              <strong>
                                                {
                                                  room?.room_assets[btnIndex]
                                                    ?.selectedBlind
                                                    ?.blindWindow_type?.type
                                                }
                                              </strong>
                                              <div className="col-lg-3">
                                                <img
                                                  src={
                                                    room?.room_assets[btnIndex]
                                                      ?.selectedBlind
                                                      ?.blindWindow_type?.image
                                                  }
                                                  alt="Belt Fabric"
                                                  className="newimg"
                                                />
                                              </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                blind fitting type :
                                              </span>
                                              <strong>
                                                {
                                                  room?.room_assets[btnIndex]
                                                    ?.selectedBlind
                                                    ?.blindFitting_type?.type
                                                }
                                              </strong>
                                              <div className="col-lg-3">
                                                <img
                                                  src={
                                                    room?.room_assets[btnIndex]
                                                      ?.selectedBlind
                                                      ?.blindFitting_type?.image
                                                  }
                                                  alt="Belt Fabric"
                                                  className="newimg"
                                                />
                                              </div>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      {room?.room_assets[btnIndex]
                                        ?.selectedBlind?.blindFabric !==
                                        null && (
                                        <div>
                                          <h5>Blind fabric Description</h5>
                                          <div className="border border-1 p-3 rounded-2 mb-3">
                                            <EnquiryCustom
                                              fabricName={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.blindFabric
                                                  ?.fabric
                                              }
                                              width={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.blindFabric
                                                  ?.width
                                              }
                                              repeatHorizontal={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.blindFabric
                                                  ?.repeat_horizontal
                                              }
                                              repeatVertical={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.blindFabric
                                                  ?.repeat_vertical
                                              }
                                              book={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.blindFabric
                                                  ?.book_name
                                              }
                                              brandName={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.blindFabric
                                                  ?.brand_name
                                              }
                                              panel={
                                                room?.room_assets[btnIndex]
                                                  ?.number_of_panel_blind_fabric
                                              }
                                              totalFabric={
                                                room?.room_assets[btnIndex]
                                                  ?.total_blind_fabric_required
                                              }
                                              material1={
                                                room?.room_assets[btnIndex]
                                                  ?.media[0]?.file
                                              }
                                            />
                                          </div>
                                        </div>
                                      )}
                                      {room?.room_assets[btnIndex]
                                        ?.selectedBlind?.blind_lining !==
                                        null && (
                                        <div>
                                          <h5>Blind lining Description</h5>
                                          <div className="border border-1 p-3 rounded-2 mb-3">
                                            <EnquiryCustom
                                              image={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.blind_lining
                                                  ?.image
                                              }
                                              style={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.blind_lining
                                                  ?.type
                                              }
                                              note={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.blind_lining
                                                  ?.note
                                              }
                                              width={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind
                                                  ?.blind_lining_width
                                              }
                                              fabricName={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind?.BLINDLINING
                                                  ?.fabric
                                              }
                                              panel={
                                                room?.room_assets[btnIndex]
                                                  ?.number_of_panel_blind_lining_fabric
                                              }
                                              totalFabric={
                                                room?.room_assets[btnIndex]
                                                  ?.total_blind_lining_fabric_required
                                              }
                                            />
                                          </div>
                                        </div>
                                      )}
                                      {room?.room_assets[btnIndex]
                                        ?.selectedBlind?.blindBorder_type !==
                                        null && (
                                        <div>
                                          <h5>Blind border Description</h5>
                                          <div className="border border-1 p-3 rounded-2 mb-3">
                                            <EnquiryCustom
                                              image={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind
                                                  ?.blindBorder_type?.image
                                              }
                                              borderType={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind
                                                  ?.blindBorder_type?.type
                                              }
                                            />
                                          </div>
                                        </div>
                                      )}

                                      {room?.room_assets[btnIndex]
                                        ?.selectedBlind?.blindBorderFabric !==
                                        null && (
                                        <div>
                                          <h5>ready made border</h5>
                                          <div className="border border-1 p-3 rounded-2 mb-3">
                                            <EnquiryCustom
                                              fabricName={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind
                                                  ?.blindBorderFabric?.fabric
                                              }
                                              width={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind
                                                  ?.blindBorderFabric?.width
                                              }
                                              repeatHorizontal={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind
                                                  ?.blindBorderFabric
                                                  ?.repeat_horizontal
                                              }
                                              repeatVertical={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind
                                                  ?.blindBorderFabric
                                                  ?.repeat_vertical
                                              }
                                              book={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind
                                                  ?.blindBorderFabric.book_name
                                              }
                                              brandName={
                                                room?.room_assets[btnIndex]
                                                  ?.selectedBlind
                                                  ?.blindBorderFabric.brand_name
                                              }
                                              totalFabric={
                                                room?.room_assets[btnIndex]
                                                  ?.total_blind_border_fabric_required
                                              }
                                              material1={
                                                room?.room_assets[btnIndex]
                                                  ?.media[1]?.file
                                              }
                                            />
                                          </div>
                                        </div>
                                      )}

                                      <h5>Blind hardware Description</h5>
                                      <div className="border border-1 p-3 rounded-2 mb-3">
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <div>
                                                <img
                                                  src={
                                                    room?.room_assets[btnIndex]
                                                      ?.selectedBlind
                                                      ?.blindTrack_type?.image
                                                  }
                                                  alt="fabric"
                                                  className="newimg"
                                                />
                                              </div>
                                              <div>
                                                <img
                                                  src={
                                                    room?.room_assets[btnIndex]
                                                      ?.selectedBlind
                                                      ?.blindMotor_track_type
                                                      ?.image
                                                  }
                                                  alt="fabric"
                                                  className="newimg"
                                                />
                                              </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                blind track type:
                                              </span>
                                              <strong>
                                                {
                                                  room?.room_assets[btnIndex]
                                                    ?.selectedBlind
                                                    ?.blindTrack_type?.type
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                Blind Motor Track type :
                                              </span>
                                              <strong>
                                                {
                                                  room?.room_assets[btnIndex]
                                                    ?.selectedBlind
                                                    ?.blindMotor_track_type
                                                    ?.type
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                blind track :
                                              </span>
                                              <strong>
                                                {
                                                  room?.room_assets[btnIndex]
                                                    ?.selectedBlind?.blindTrack
                                                    ?.fabric
                                                }
                                              </strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                blind screw required
                                              </span>
                                              <strong>
                                                {
                                                  room?.room_assets[btnIndex]
                                                    ?.selectedBlind
                                                    ?.blind_screw_required
                                                }
                                              </strong>
                                            </li>

                                            <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                              <span className="mb-0">
                                                blind extra bracket support
                                                required :
                                              </span>
                                              <strong>
                                                {
                                                  room?.room_assets[btnIndex]
                                                    ?.selectedBlind
                                                    ?.blind_extra_bracket_support_required
                                                }
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
