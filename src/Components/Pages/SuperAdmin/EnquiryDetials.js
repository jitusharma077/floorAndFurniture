import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import { confirm } from "../../Common/ConfirmModal";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import EnquiryCustom from "./Common/EnquiryCustom";
import ReAssignmesurer from "../../Common/ReAssignmesurer";
import WcrModal from "../../Common/WcrModal";
import AdminRemarkModal from "../../Common/AdminRemarkModal";
import Swal from "sweetalert2";

function EnquiryDetials() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRoomData, setIsRoomData] = useState(false);
  const [CustomerId, setCustomerId] = useState("");
  const [modal, setModal] = useState(false);
  const [remarkModal, setRemarkModal] = useState(false);

  const remarkToggle = () => { setRemarkModal(!remarkModal) };
  const toggle = () => setModal(!modal);
  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);

  const [enquiryId, setEnquiryId] = useState(null);
  const [EnquiryDetials, setEnquiryDetials] = useState({});
  const [btnIndex, setBtnIndex] = useState(0);
  const [sofaBtnIndex, setSofaBtnIndex] = useState(0);
  const [wallBtnIndex, setWallBtnIndex] = useState(0);
  const [windowBtnIndex, setWindowBtnIndex] = useState(0);
  const [blindBtnIndex, setBlindBtnIndex] = useState(4);
  const [Category, setCategory] = useState([]);
  const [IcName, setIcName] = useState("");
  const [SelectedValue, setSelectedValue] = useState("");
  const [wcrModal, setWcrModal] = useState(false);
  const wcrModalToggle = () => setWcrModal(!wcrModal);
  const [wcrData, setWcrData] = useState();

  const customMessageHandler = () => {
    Swal.fire({
      title: 'Do you want to send feedback message?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Send',
      // denyButtonText: `Don't dont send`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        GetDataWithToken(`customer/send-message?enquiryId=${enquiryId}`).then(response => {
          if (response.status === true) {
            console.log(response);
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        })
        // Swal.fire('Saved!', '', 'success')
      }
    })

  }

  useEffect(() => {
    console.log("location", location);
    setEnquiryId(location.state.data);
    setCategory(location.state.category);
    setIcName(location.state.icPerson);

    GetDataWithToken(`installer/get-wcr/${location?.state?.data}`).then((response) => {
      if (response.status === true) {
        setWcrData(response.data);
      }
    });

    GetDataWithToken(`sales/get-enquiry/${location?.state?.data}`).then(
      (response) => {
        if (response.status === true) {
          setEnquiryDetials(response);
          setCustomerId(response?.data?.customer?.id);
          if (response.data.rooms.length > 0) {
            setIsRoomData(true);
            setIcName(
              `${response?.data?.user?.firstName} ${response?.data?.user?.lastName}`
            );
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
          } else {
            toast.error(response.data.message);
          }
        }
      );
    }
  };

  const cancelEnquiry = async () => {
    GetDataWithToken(
      `superadmin/cancel-enquiry/${EnquiryDetials?.data?.id}?remark=${SelectedValue}`
    ).then((response) => {
      if (response.status === true) {
        console.log("response", response);
        toast.success("Enquiry Canceled Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        window.location.reload(true);
      }
    });
  };

  const PostponeInstaller = async () => {
    const data = {
      id: EnquiryDetials?.data?.installer_tasks[
        EnquiryDetials?.data?.installer_tasks.length - 1
      ]?.id,
      status: "postponed",
      remark: SelectedValue,
    };
    PostDataWithToken(`installer/update-schedule/`, data).then((response) => {
      if (response.status === true) {
        console.log("response", response);
        toast.success("Installer Postpone Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        window.location.reload(true);
      } else {
        toast.error(response.data.message);
      }
    });
  };

  const printPageArea = (areaID) => {
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <>
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
        <div className="Buttons">
          <div className="d-flex">
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModalCenter"
              className="btn btn-mybutton"
            >
              View Status
            </button>
            <button
              className="btn btn-mybutton"
              onClick={() => printPageArea("printableArea")}
            >
              Print page
            </button>
            <button
              // onClick={() => setModal1(!modal1)}
              className="btn btn-mybutton"
              data-bs-toggle="modal"
              data-bs-target=".bd-example-modal-lg-2"
            >
              Cancel Enquiry
            </button>

            {isRoomData === true ? (
              <>
                {EnquiryDetials?.data?.status !== "fresh" &&
                  EnquiryDetials?.data?.status !== "inprogess" && (
                    <button
                      className="btn btn-mybutton"
                      data-bs-toggle="modal"
                      data-bs-target=".bd-example-modal-lg"
                    >
                      View Measurements
                    </button>
                  )}

                <button
                  onClick={() => sendEmail()}
                  className="btn btn-mybutton"
                >
                  Send Email
                </button>

                {EnquiryDetials?.data?.enquiryschedules[0]?.status &&
                  EnquiryDetials?.data?.enquiryschedules[
                    EnquiryDetials?.data?.enquiryschedules.length - 1
                  ]?.status === "pending" && (
                    <>
                      <button
                        className="btn btn-mybutton"
                        onClick={() => setModal(!modal)}
                      >
                        Postpone Measurement
                      </button>
                    </>
                  )}
                <button
                  onClick={() => {
                    navigate("/add-schedule", {
                      state: { enquiryId: enquiryId },
                    });
                  }}
                  className="btn btn-mybutton"
                >
                  Assign Measurer
                </button>

                {EnquiryDetials?.data?.installer_tasks[0]?.status &&
                  EnquiryDetials?.data?.installer_tasks[
                    EnquiryDetials?.data?.installer_tasks.length - 1
                  ]?.status === "pending" ? (
                  <>
                    <button
                      className="btn btn-mybutton"
                      // onClick={() => setModal(!modal)}
                      data-bs-toggle="modal"
                      data-bs-target=".bd-example-modal-lg-3"
                    >
                      Postpone Installer
                    </button>
                  </>
                ) : (
                  EnquiryDetials?.data?.status !== "inprogess" &&
                  EnquiryDetials?.data?.status !== "fresh" && (
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
                  )
                )}
                {console.log(
                  "first, enquirryyy statussss",
                  EnquiryDetials?.data?.status
                )}

                {EnquiryDetials?.data?.status !== "inprogess" &&
                  EnquiryDetials?.data?.status !== "fresh" &&
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

                {EnquiryDetials?.data?.status !== "fresh" && (
                  <button
                    onClick={() => {
                      navigate("/ViewEstimate", {
                        state: {
                          EnquiryDetials: EnquiryDetials.data,
                        },
                      });
                    }}
                    className="btn btn-mybutton"
                  >
                    View Estimate
                  </button>
                )}
                {wcrData?.id && <button
                  onClick={wcrModalToggle}
                  className="btn btn-mybutton"
                >
                  WCR Report
                </button>}
                <>
                  <button
                    className="btn btn-mybutton"
                    onClick={remarkToggle}

                  >
                    Admin Remarks
                  </button>
                  <button
                    className="btn btn-mybutton"
                    onClick={customMessageHandler}

                  >
                    Custom message
                  </button>
                </>
              </>
            ) : null}
          </div>
        </div>
        <div className="content-body" id="printableArea">
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-11">
                <div className="card">
                  <div
                    className={
                      EnquiryDetials?.data?.status === "cancelled"
                        ? "card-header bg-danger"
                        : "card-header"
                    }
                  >
                    <h4 className="card-title">
                      Enquiry No: {EnquiryDetials?.data?.id}
                    </h4>
                    <p><strong >Remark :</strong> {EnquiryDetials?.data?.remark} </p>
                    <p>
                      <strong>Admin Remarks : </strong>
                      {EnquiryDetials?.data?.admin_remark}
                    </p>
                    {/* <h3></h3> */}
                    <div style={{ display: "flex" }}>
                      <p>Selected Category: </p>
                      {Category?.map((i, index) => {
                        return (
                          <p
                            style={{
                              padding: 0,
                              marginBottom: 2,
                            }}
                          >{`${i},`}</p>
                        );
                      })}
                    </div>
                    {/* {let measurerName=`${EnquiryDetials?.data?.enquiryschedules[EnquiryDetials?.data.enquiryschedules.length - 1]?EnquiryDetials?.data?.enquiryschedules[EnquiryDetials?.data.enquiryschedules.length - 1].user.firstName:'' EnquiryDetials?.data?.enquiryschedules[EnquiryDetials?.data.enquiryschedules.length - 1]?.user.lastName?EnquiryDetials?.data?.enquiryschedules[EnquiryDetials?.data.enquiryschedules.length - 1]?.user.lastName:''}` */}
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="heading">
                          <h3 className="">Customer Details</h3>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Customer Name :</span>
                            <strong>
                              {EnquiryDetials?.data?.customer?.firstName}
                              {EnquiryDetials?.data?.customer?.lastName}
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
                              {EnquiryDetials?.data?.customer?.secondary_phone
                                ? EnquiryDetials?.data?.customer
                                  ?.secondary_phone
                                : `${EnquiryDetials?.data?.contactNumber} (Delivery)`}
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
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">IC name :</span>
                            <strong>{IcName}</strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Measurer name :</span>
                            <strong>
                              {`${EnquiryDetials?.data?.enquiryschedules?.length >
                                0
                                ? EnquiryDetials?.data?.enquiryschedules[
                                  EnquiryDetials?.data?.enquiryschedules
                                    ?.length - 1
                                ]?.user?.firstName
                                : "Not assigned"
                                } ${EnquiryDetials?.data?.enquiryschedules?.length >
                                  0
                                  ? EnquiryDetials?.data?.enquiryschedules[
                                    EnquiryDetials?.data?.enquiryschedules
                                      ?.length - 1
                                  ]?.user?.lastName
                                  : ""
                                }`}
                            </strong>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
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
                      <div className="col-lg-4">
                        <div className="heading">
                          <h3 className="">Delivery Address</h3>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">contact Person Name :</span>
                            <strong>
                              {EnquiryDetials?.data?.contactPerson}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Contact No. :</span>
                            <strong>
                              {EnquiryDetials?.data?.contactNumber === null
                                ? "nil"
                                : EnquiryDetials?.data?.contactNumber}
                            </strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">city :</span>
                            <strong> {EnquiryDetials?.data?.city}</strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">State :</span>
                            <strong> {EnquiryDetials?.data?.state}</strong>
                          </li>

                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Pincode :</span>
                            <strong> {EnquiryDetials?.data?.pincode}</strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between ">
                            <span className="mb-0">Address :</span>
                            <strong> {EnquiryDetials?.data?.address}</strong>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/*---- Tabs -----*/}
                    <div
                      className="list-group roomtab mb-4 mt-5 flex-row overflow-auto"
                      id="list-tab"
                      role="tablist"
                    >
                      {EnquiryDetials?.data &&
                        EnquiryDetials?.data?.rooms?.map((rooms, index) => (
                          <a
                            className={`list-group-item list-group-item-action text-white ${index === 0 ? "active" : ""
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
                        EnquiryDetials?.data?.rooms?.map((room, index) => {
                          console.log("fabric", room?.selectedcurtain);
                          return (
                            <>
                              <div
                                className={`tab-pane fade show ${index === 0 ? "active" : ""
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
                                            ?.screw_size_required
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
                                            ?.extra_bracket_required
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
                                          room?.selectedRod?.extra_ring_required
                                        }
                                        rodRingQuantity={
                                          room?.selectedRod?.extra_ring_quantity
                                        }
                                        tieKnobRequired={
                                          room?.selectedRod
                                            ?.rod_tie_knobs_required
                                        }
                                        tieKnobQuantity={
                                          room?.selectedRod
                                            ?.rod_number_of_tie_knobs_pair
                                        }
                                        finalQuantity={
                                          room?.selectedRod?.finial_quantity
                                        }
                                        endCapRequired={
                                          room?.selectedRod?.end_cap_required
                                        }
                                        endCapQuantity={
                                          room?.selectedRod?.end_cap_quantity
                                        }
                                        endCapWallSupportRequired={
                                          room?.selectedRod
                                            ?.end_cap_wall_support_required
                                        }
                                        endCapWallSupportQuantity={
                                          room?.selectedRod
                                            ?.end_cap_wall_support_quantity
                                        }
                                        trackStickRequired={
                                          room?.selectedRod
                                            ?.curatin_stick_required
                                        }
                                        stickQuantity={
                                          room?.selectedRod
                                            ?.number_of_curatin_stick_pair
                                        }
                                        material1={
                                          room?.selectedRod?.primary_rod_image
                                        }
                                      />
                                      <div className="row">
                                        <div className="col-lg-9">
                                          {room?.selectedRod
                                            ?.secondary_rod_length && (
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                                  <span className="mb-0">
                                                    Secondary Rod Length :
                                                  </span>
                                                  <strong>
                                                    {" "}
                                                    {
                                                      room?.selectedRod
                                                        ?.secondary_rod_length
                                                    }
                                                  </strong>
                                                </li>
                                              </ul>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {room?.numberOfWindow > 0 && (
                                  <>
                                    <h5>Blind Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      {room?.room_assets.length > 0 &&
                                        room?.room_assets?.map((arr, index) => {
                                          return (
                                            <button
                                              class="rounded-pill  px-4 py-2 me-2 border active bg-primary text-white"
                                              onClick={() => {
                                                setBtnIndex(index);
                                                console.log(btnIndex);
                                              }}
                                            >
                                              window {index + 1}
                                            </button>
                                            // <button
                                            //   type="button"
                                            //   className="btn-success btn-secondary btn-warning btn-primary btn-danger btn-info"
                                            //   onClick={() => {
                                            //     setBtnIndex(index);
                                            //     console.log(btnIndex);
                                            //   }}
                                            // >
                                            //   window {index + 1}
                                            // </button>
                                          );
                                        })}
                                      <div className="row">
                                        <div className="col-lg-9">
                                          <ul className="list-group list-group-flush">
                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind?.blindStyle
                                              ?.style && (
                                                <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                                  <span className="mb-0">
                                                    blind style :
                                                  </span>
                                                  <strong>
                                                    {console.log(btnIndex)}
                                                    {
                                                      room?.room_assets[btnIndex]
                                                        ?.selectedBlind
                                                        ?.blindStyle?.style
                                                    }
                                                  </strong>
                                                  <img
                                                    src={
                                                      room?.room_assets[btnIndex]
                                                        ?.selectedBlind
                                                        ?.blindStyle?.image
                                                    }
                                                    alt="Belt Fabric"
                                                    className="newimg"
                                                  />
                                                </li>
                                              )}

                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind?.blind_subtype
                                              ?.type && (
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
                                                  {room?.room_assets[btnIndex]
                                                    ?.selectedBlind?.blind_subtype
                                                    ?.image && (
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
                                                    )}
                                                </li>
                                              )}
                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind?.blindWindow_type
                                              ?.type && (
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
                                                  {room?.room_assets[btnIndex]
                                                    ?.selectedBlind
                                                    ?.blindWindow_type?.image && (
                                                      <div className="col-lg-3">
                                                        <img
                                                          src={
                                                            room?.room_assets[
                                                              btnIndex
                                                            ]?.selectedBlind
                                                              ?.blindWindow_type
                                                              ?.image
                                                          }
                                                          alt="Belt Fabric"
                                                          className="newimg"
                                                        />
                                                      </div>
                                                    )}
                                                </li>
                                              )}
                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind?.blindFitting_type
                                              ?.type && (
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
                                                  {room?.room_assets[btnIndex]
                                                    ?.selectedBlind
                                                    ?.blindFitting_type
                                                    ?.image && (
                                                      <div className="col-lg-3">
                                                        <img
                                                          src={
                                                            room?.room_assets[
                                                              btnIndex
                                                            ]?.selectedBlind
                                                              ?.blindFitting_type
                                                              ?.image
                                                          }
                                                          alt="Belt Fabric"
                                                          className="newimg"
                                                        />
                                                      </div>
                                                    )}
                                                </li>
                                              )}
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
                                              {room?.room_assets[btnIndex]
                                                ?.selectedBlind?.blindTrack_type
                                                ?.image && (
                                                  <div>
                                                    <img
                                                      src={
                                                        room?.room_assets[
                                                          btnIndex
                                                        ]?.selectedBlind
                                                          ?.blindTrack_type?.image
                                                      }
                                                      alt="fabric"
                                                      className="newimg"
                                                    />
                                                  </div>
                                                )}
                                              {room?.room_assets[btnIndex]
                                                ?.selectedBlind
                                                ?.blindMotor_track_type
                                                ?.image && (
                                                  <div>
                                                    <img
                                                      src={
                                                        room?.room_assets[
                                                          btnIndex
                                                        ]?.selectedBlind
                                                          ?.blindMotor_track_type
                                                          ?.image
                                                      }
                                                      alt="fabric"
                                                      className="newimg"
                                                    />
                                                  </div>
                                                )}
                                            </li>
                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind?.blindTrack_type
                                              ?.type && (
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
                                              )}
                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind
                                              ?.blindMotor_track_type?.type && (
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
                                              )}
                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind?.blindTrack
                                              ?.fabric && (
                                                <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                                  <span className="mb-0">
                                                    blind track :
                                                  </span>
                                                  <strong>
                                                    {
                                                      room?.room_assets[btnIndex]
                                                        ?.selectedBlind
                                                        ?.blindTrack?.fabric
                                                    }
                                                  </strong>
                                                </li>
                                              )}
                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind
                                              ?.blind_screw_required &&
                                              room?.room_assets[
                                                btnIndex
                                              ]?.selectedBlind?.blind_screw_required.toLowerCase() ===
                                              "yes" && (
                                                <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                                  <span className="mb-0">
                                                    blind screw required
                                                  </span>
                                                  <strong>
                                                    {
                                                      room?.room_assets[
                                                        btnIndex
                                                      ]?.selectedBlind
                                                        ?.blind_screw_required
                                                    }
                                                  </strong>
                                                </li>
                                              )}

                                            {room?.room_assets[btnIndex]
                                              ?.selectedBlind
                                              ?.blind_extra_bracket_support_required &&
                                              room?.room_assets[
                                                btnIndex
                                              ]?.selectedBlind?.blind_extra_bracket_support_required.toLowerCase() ===
                                              "yes" && (
                                                <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                                  <span className="mb-0">
                                                    blind extra bracket support
                                                    required :
                                                  </span>
                                                  <strong>
                                                    {
                                                      room?.room_assets[
                                                        btnIndex
                                                      ]?.selectedBlind
                                                        ?.blind_extra_bracket_support_required
                                                    }
                                                  </strong>
                                                </li>
                                              )}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {console.log("sofa", room?.selectedsofa)}
                                {room?.selectedsofa.length > 0 && (
                                  <>
                                    <h5>Sofa Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      {room?.selectedsofa?.map((arr, index) => {
                                        return (
                                          <button
                                            type="button"
                                            class="rounded-pill  px-4 py-2 me-2 border active bg-primary text-white"
                                            onClick={() => {
                                              setSofaBtnIndex(index);
                                            }}
                                          >
                                            Sofa {index + 1}
                                          </button>

                                          // <button
                                          //   type="button"
                                          //   className="btn-success btn-secondary btn-warning btn-primary btn-danger btn-info mx-1"
                                          //   onClick={() => {
                                          //     setSofaBtnIndex(index);
                                          //     // console.log(btnIndex);
                                          //   }}
                                          // >
                                          //   Sofa {index + 1}
                                          // </button>
                                        );
                                      })}
                                      <div className="row">
                                        <EnquiryCustom
                                          type={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.type
                                          }
                                          subType={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.sofa_type?.type
                                          }
                                          bedBack={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.bedback_required
                                          }
                                          quilted={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.is_quillted
                                          }
                                          wallPanel={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.wallpanel_required
                                          }
                                          pouffe={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.pouffee_required
                                          }
                                          capacity={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.seating_capacity
                                          }
                                          fabricName={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.sofa_primary_fabric_?.fabric
                                          }
                                          brandName={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.sofa_primary_fabric_?.brand_name
                                          }
                                          repeatHorizontal={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.sofa_primary_fabric_
                                              ?.repeat_horizontal
                                          }
                                          repeatVertical={
                                            room?.selectedsofa[sofaBtnIndex]
                                              ?.sofa_primary_fabric_
                                              ?.repeat_vertical
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}{" "}
                                {room?.selectedWallpaper.length > 0 && (
                                  <>
                                    <h5>Wallpaper Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      {room?.selectedWallpaper?.map(
                                        (arr, index) => {
                                          return (
                                            <button
                                              type="button"
                                              class="rounded-pill  px-4 py-2 me-2 border active bg-primary text-white"
                                              onClick={() => {
                                                setWallBtnIndex(index);
                                                console.log(btnIndex);
                                              }}
                                            >
                                              Wall {index + 1}
                                            </button>
                                          );
                                        }
                                      )}
                                      <div className="row">
                                        <EnquiryCustom
                                          type={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.type
                                          }
                                          fabricName={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.curtainfabric?.fabric
                                          }
                                          primer={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.premier_required === null
                                              ? "no"
                                              : "yes"
                                          }
                                          discount={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.wallpaper_discount
                                          }
                                          repeatHorizontal={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.curtainfabric?.repeat_horizontal
                                          }
                                          repeatVertical={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.curtainfabric?.repeat_vertical
                                          }
                                          width={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.curtainfabric?.width
                                          }
                                          brandName={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.curtainfabric?.brand_name
                                          }
                                          book={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.curtainfabric?.book_name
                                          }
                                          price={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.curtainfabric?.price
                                          }
                                          walls={
                                            room?.selectedWallpaper[
                                              wallBtnIndex
                                            ]?.selectedwallpaper?.number_of_wall
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}
                                {room?.selectedFlooring && (
                                  <>
                                    <h5>Flooring Description</h5>
                                    <div className="border border-1 p-3 rounded-2 mb-3">
                                      <div className="row">
                                        <EnquiryCustom
                                          type={room?.selectedFlooring?.type}
                                          fabricName={
                                            room?.selectedFlooring?.flooring
                                              ?.fabric
                                          }
                                          discount={
                                            room?.selectedFlooring?.discount
                                          }
                                          brandName={
                                            room?.selectedFlooring?.flooring
                                              ?.brand_name
                                          }
                                          book={
                                            room?.selectedFlooring?.flooring
                                              ?.book_name
                                          }
                                          repeatHorizontal={
                                            room?.selectedFlooring?.flooring
                                              ?.repeat_horizontal
                                          }
                                          repeatVertical={
                                            room?.selectedFlooring?.flooring
                                              ?.repeat_vertical
                                          }
                                          width={
                                            room?.selectedFlooring?.flooring
                                              ?.width
                                          }
                                          floorType={
                                            room?.selectedFlooring
                                              ?.flooring_type
                                          }
                                          boxQuantity={
                                            room?.selectedFlooring
                                              ?.room_flooring_box_quantity
                                          }
                                          price={
                                            room?.selectedFlooring
                                              ?.room_flooring_price
                                          }
                                          sqm={
                                            room?.selectedFlooring
                                              ?.room_total_sqm
                                          }
                                          foamCost={
                                            room?.selectedFlooring
                                              ?.total_foam_cost
                                          }
                                          polytheneCost={
                                            room?.selectedFlooring
                                              ?.total_polythene_cost
                                          }
                                        />
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
                        EnquiryDetials?.data?.enquirystatuses?.map(
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
              <span>Measurer Name: {EnquiryDetials?.data?.contactPerson}</span>
              <ul className="nav nav-pills justify-content-start mb-4">
                {EnquiryDetials?.data &&
                  EnquiryDetials?.data?.rooms?.map((rooms, index) => (
                    <li className=" nav-item">
                      <a
                        className={`"nav-link list-group-item ${index === 0 ? "active" : ""
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
                  EnquiryDetials?.data?.rooms?.map((rooms, index) => (
                    <>
                      <div
                        id={`navpills${index}`}
                        className={`tab-pane  ${index === 0 ? "active" : ""}`}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="text-center">
                              <span>
                                {rooms?.room_assets[windowBtnIndex]?.width}
                              </span>
                            </div>
                            <img
                              src="./images/images.png"
                              className="col-lg-6 mx-4"
                            />
                            {rooms?.room_assets[windowBtnIndex]?.height}
                            {/* <div>
                              <span></span>
                            </div> */}
                          </div>
                          <div className="col-lg-12">
                            <ul className="nav nav-pills justify-content-start mb-4">
                              {rooms?.room_assets &&
                                rooms?.room_assets?.map((window, index) => (
                                  <li className=" nav-item">
                                    <a
                                      className={` "nav-link rounded-pill  px-4 py-2 me-2 border ${index == windowBtnIndex
                                        ? "active bg-primary text-white"
                                        : ""
                                        }`}
                                      data-bs-toggle="tab"
                                      href={`#navpillschild${index}`}
                                      aria-expanded="false"
                                      onClick={() => {
                                        setWindowBtnIndex(index);
                                        setBlindBtnIndex(10);
                                      }}
                                    >
                                      {`window-${index + 1}`}
                                    </a>
                                  </li>
                                ))}
                              {rooms?.room_assets &&
                                rooms?.room_assets?.map((window, index) => (
                                  <li className=" nav-item">
                                    <a
                                      className={` "nav-link rounded-pill  px-4 py-2 me-2 border ${index == blindBtnIndex
                                        ? "active bg-primary text-white"
                                        : ""
                                        }`}
                                      data-bs-toggle="tab"
                                      href={`#navpillschild${index}`}
                                      aria-expanded="false"
                                      onClick={() => {
                                        setBlindBtnIndex(index);
                                        setWindowBtnIndex(10);
                                      }}
                                    >
                                      {`Blind-${index + 1}`}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="col-lg-12">
                            <div className="tab-content">
                              <div
                                id={`navpillschild${index}`}
                                className={`tab-pane ${index === 0 ? "active" : ""
                                  }`}
                              >
                                {rooms?.room_assets[windowBtnIndex] && (
                                  <ul className="list-group list-group-flush">
                                    {rooms?.selectedcurtain?.fabric1
                                      ?.fabric && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">Fabric :</span>
                                          <strong>
                                            {
                                              rooms?.selectedcurtain?.fabric1
                                                ?.fabric
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.selectedcurtain?.fabric1?.width && (
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
                                    )}
                                    {rooms?.selectedcurtain?.fabric1
                                      ?.repeat_horizontal && (
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
                                      )}
                                    {rooms?.selectedcurtain?.fabric1
                                      ?.repeat_vertical && (
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
                                      )}
                                    {rooms?.selectedcurtain?.fabric1
                                      ?.brand_name && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">Brand :</span>
                                          <strong>
                                            {" "}
                                            {
                                              rooms?.selectedcurtain?.fabric1
                                                ?.brand_name
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.selectedcurtain?.fabric1
                                      ?.book_name && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">Book :</span>
                                          <strong>
                                            {
                                              rooms?.selectedcurtain?.fabric1
                                                ?.book_name
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.number_of_panel_fabric1 && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            No of Panel :
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.number_of_panel_fabric1
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.total_fabric1_required && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Total Fabric :
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.total_fabric1_required
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.media && (
                                        <div className="col-lg-4">
                                          {rooms?.room_assets[
                                            windowBtnIndex
                                          ]?.media?.map((data) => (
                                            <img src={data?.file} alt="imageof" />
                                          ))}
                                        </div>
                                      )}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>

                          {rooms?.room_assets[blindBtnIndex] && (
                            <>
                              <h5>Blind measurement Information</h5>
                              <div className="border border-1 p-3 rounded-2 mb-3">
                                <ul className="list-group list-group-flush">
                                  <>
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.blind_mount_type && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Mount type:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.blind_mount_type
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.wall_type?.type && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Wall type :
                                          </span>
                                          <strong>
                                            {" "}
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.wall_type?.type
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.wall_type?.note && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0"></span>
                                          <strong>
                                            note:-
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.wall_type?.note
                                            }
                                          </strong>
                                        </li>
                                      )}

                                    {rooms?.room_assets[blindBtnIndex]?.ladder
                                      ?.ladder && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Ladder type:
                                          </span>
                                          <strong>
                                            {" "}
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.ladder?.ladder
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.blind_width_top && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind width top:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.blind_width_top
                                            }
                                          </strong>
                                        </li>
                                      )}

                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.blind_width_bottom && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind width bottom:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.blind_width_bottom
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.blind_width_middle && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind width middle:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.blind_width_middle
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blind_default_width && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind default width :
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.selectedBlind
                                                ?.blind_default_width
                                            }
                                          </strong>
                                        </li>
                                      )}

                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.blind_drop_left && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind drop left:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.blind_drop_left
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.blind_drop_middle && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind drop middle:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.blind_drop_middle
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.blind_drop_right && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind drop right:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.blind_drop_right
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.blind_chain_length && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind chain length:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.blind_chain_length
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.curtain_operation
                                      ?.operationType && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind operation:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.curtain_operation
                                                ?.operationType
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.blind_asset?.blind_remark && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind remark:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.blind_asset?.blind_remark
                                            }
                                          </strong>
                                        </li>
                                      )}
                                  </>
                                </ul>
                              </div>
                            </>
                          )}

                          {rooms?.room_assets[blindBtnIndex] && (
                            <>
                              <h5>Blind measurement Information</h5>
                              <div className="border border-1 p-3 rounded-2 mb-3">
                                <ul className="list-group list-group-flush">
                                  {rooms?.room_assets[blindBtnIndex]
                                    ?.selectedBlind?.blindStyle?.style && (
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">
                                          blind style :
                                        </span>
                                        <strong>
                                          {console.log(blindBtnIndex)}
                                          {
                                            rooms?.room_assets[blindBtnIndex]
                                              ?.selectedBlind?.blindStyle?.style
                                          }
                                        </strong>
                                        <img
                                          src={
                                            rooms?.room_assets[blindBtnIndex]
                                              ?.selectedBlind?.blindStyle?.image
                                          }
                                          alt="Belt Fabric"
                                          className="newimg"
                                        />
                                      </li>
                                    )}

                                  {rooms?.room_assets[blindBtnIndex]
                                    ?.selectedBlind?.blind_subtype?.type && (
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">blind type:</span>
                                        <strong>
                                          {
                                            rooms?.room_assets[blindBtnIndex]
                                              ?.selectedBlind?.blind_subtype?.type
                                          }
                                        </strong>
                                        {rooms?.room_assets[blindBtnIndex]
                                          ?.selectedBlind?.blind_subtype
                                          ?.image && (
                                            <img
                                              src={
                                                rooms?.room_assets[blindBtnIndex]
                                                  ?.selectedBlind?.blind_subtype
                                                  ?.image
                                              }
                                              alt="Belt Fabric"
                                              className="newimg"
                                            />
                                          )}
                                      </li>
                                    )}
                                  {rooms?.room_assets[blindBtnIndex]
                                    ?.selectedBlind?.blindWindow_type?.type && (
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">
                                          Blind window Type :
                                        </span>
                                        <strong>
                                          {
                                            rooms?.room_assets[blindBtnIndex]
                                              ?.selectedBlind?.blindWindow_type
                                              ?.type
                                          }
                                        </strong>
                                        {rooms?.room_assets[blindBtnIndex]
                                          ?.selectedBlind?.blindWindow_type
                                          ?.image && (
                                            <img
                                              src={
                                                rooms?.room_assets[blindBtnIndex]
                                                  ?.selectedBlind?.blindWindow_type
                                                  ?.image
                                              }
                                              alt="Belt Fabric"
                                              className="newimg"
                                            />
                                          )}
                                      </li>
                                    )}
                                  {rooms?.room_assets[blindBtnIndex]
                                    ?.selectedBlind?.blindFitting_type
                                    ?.type && (
                                      <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                        <span className="mb-0">
                                          blind fitting type :
                                        </span>
                                        <strong>
                                          {
                                            rooms?.room_assets[blindBtnIndex]
                                              ?.selectedBlind?.blindFitting_type
                                              ?.type
                                          }
                                        </strong>
                                        {rooms?.room_assets[blindBtnIndex]
                                          ?.selectedBlind?.blindFitting_type
                                          ?.image && (
                                            <img
                                              src={
                                                rooms?.room_assets[blindBtnIndex]
                                                  ?.selectedBlind?.blindFitting_type
                                                  ?.image
                                              }
                                              alt="Belt Fabric"
                                              className="newimg"
                                            />
                                          )}
                                      </li>
                                    )}
                                </ul>
                              </div>
                            </>
                          )}

                          {rooms?.room_assets[blindBtnIndex] && (
                            <div>
                              <h5>Blind fabric Description</h5>
                              <div className="border border-1 p-3 rounded-2 mb-3">
                                <EnquiryCustom
                                  fabricName={
                                    rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blindFabric?.fabric
                                  }
                                  width={
                                    rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blindFabric?.width
                                  }
                                  repeatHorizontal={
                                    rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blindFabric
                                      ?.repeat_horizontal
                                  }
                                  repeatVertical={
                                    rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blindFabric
                                      ?.repeat_vertical
                                  }
                                  book={
                                    rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blindFabric?.book_name
                                  }
                                  brandName={
                                    rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blindFabric?.brand_name
                                  }
                                  panel={
                                    rooms?.room_assets[blindBtnIndex]
                                      ?.number_of_panel_blind_fabric
                                  }
                                  totalFabric={
                                    rooms?.room_assets[blindBtnIndex]
                                      ?.total_blind_fabric_required
                                  }
                                  material1={
                                    rooms?.room_assets[blindBtnIndex]?.media[0]
                                      ?.file
                                  }
                                />
                              </div>
                            </div>
                          )}
                          {rooms?.room_assets[blindBtnIndex] && (
                            <div>
                              <h5>Blind border Information</h5>
                              <div className="border border-1 p-3 rounded-2 mb-3">
                                <EnquiryCustom
                                  fabricName={
                                    rooms?.room_assets[btnIndex]?.selectedBlind
                                      ?.blindBorderFabric?.fabric
                                  }
                                  width={
                                    rooms?.room_assets[btnIndex]?.selectedBlind
                                      ?.blindBorderFabric?.width
                                  }
                                  repeatHorizontal={
                                    rooms?.room_assets[btnIndex]?.selectedBlind
                                      ?.blindBorderFabric?.repeat_horizontal
                                  }
                                  repeatVertical={
                                    rooms?.room_assets[btnIndex]?.selectedBlind
                                      ?.blindBorderFabric?.repeat_vertical
                                  }
                                  book={
                                    rooms?.room_assets[btnIndex]?.selectedBlind
                                      ?.blindBorderFabric?.book_name
                                  }
                                  brandName={
                                    rooms?.room_assets[btnIndex]?.selectedBlind
                                      ?.blindBorderFabric?.brand_name
                                  }
                                  totalFabric={
                                    rooms?.room_assets[btnIndex]
                                      ?.total_blind_border_fabric_required
                                  }
                                  material1={
                                    rooms?.room_assets[btnIndex]?.media[1]?.file
                                  }
                                />
                              </div>
                            </div>
                          )}

                          {rooms?.room_assets[blindBtnIndex] && (
                            <>
                              <h5>Blind hardware Description</h5>
                              <div className="border border-1 p-3 rounded-2 mb-3">
                                <div className="col-lg-9">
                                  <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                      {rooms?.room_assets[blindBtnIndex]
                                        ?.selectedBlind?.blindTrack_type
                                        ?.image && (
                                          <div>
                                            <img
                                              src={
                                                rooms?.room_assets[blindBtnIndex]
                                                  ?.selectedBlind?.blindTrack_type
                                                  ?.image
                                              }
                                              alt="fabric"
                                              className="newimg"
                                            />
                                          </div>
                                        )}
                                      {rooms?.room_assets[blindBtnIndex]
                                        ?.selectedBlind?.blindMotor_track_type
                                        ?.image && (
                                          <div>
                                            <img
                                              src={
                                                rooms?.room_assets[blindBtnIndex]
                                                  ?.selectedBlind
                                                  ?.blindMotor_track_type?.image
                                              }
                                              alt="fabric"
                                              className="newimg"
                                            />
                                          </div>
                                        )}
                                    </li>
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blindTrack_type
                                      ?.type && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            blind track type:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.selectedBlind?.blindTrack_type
                                                ?.type
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blindMotor_track_type
                                      ?.type && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Blind Motor Track type :
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.selectedBlind
                                                ?.blindMotor_track_type?.type
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blindTrack?.fabric && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            blind track :
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.selectedBlind?.blindTrack
                                                ?.fabric
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind?.blind_screw_required &&
                                      rooms?.room_assets[
                                        blindBtnIndex
                                      ]?.selectedBlind?.blind_screw_required.toLowerCase() ===
                                      "yes" && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            blind screw required
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.selectedBlind
                                                ?.blind_screw_required
                                            }
                                          </strong>
                                        </li>
                                      )}

                                    {rooms?.room_assets[blindBtnIndex]
                                      ?.selectedBlind
                                      ?.blind_extra_bracket_support_required &&
                                      rooms?.room_assets[
                                        blindBtnIndex
                                      ]?.selectedBlind?.blind_extra_bracket_support_required.toLowerCase() ===
                                      "yes" && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            blind extra bracket support required
                                            :
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[blindBtnIndex]
                                                ?.selectedBlind
                                                ?.blind_extra_bracket_support_required
                                            }
                                          </strong>
                                        </li>
                                      )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                          {rooms?.room_assets[windowBtnIndex] && (
                            <>
                              <h5>Window measurement Information</h5>
                              <div className="border border-1 p-3 rounded-2 mb-3">
                                <ul className="list-group list-group-flush">
                                  <>
                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.width && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Window width:
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.width
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.height && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            window height :
                                          </span>
                                          <strong>
                                            {" "}
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.height
                                            }
                                          </strong>
                                        </li>
                                      )}

                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.mount_type && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Mount type:
                                          </span>
                                          <strong>
                                            {" "}
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.mount_type
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.ceiling_type?.type && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">Wall type:</span>
                                          <strong>
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.ceiling_type?.type
                                            }
                                          </strong>
                                        </li>
                                      )}

                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.ceiling_type?.note && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0"></span>
                                          <strong>
                                            note:-
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.ceiling_type?.note
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[windowBtnIndex]?.ladder
                                      ?.ladder && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Ladder type :
                                          </span>
                                          <strong>
                                            {" "}
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.ladder?.ladder
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.widhtOfCove && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Width of cove :
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.widhtOfCove
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    {rooms?.room_assets[windowBtnIndex]
                                      ?.curtain_operation?.operationType && (
                                        <li className="list-group-item d-flex justify-content-between border-0 py-1">
                                          <span className="mb-0">
                                            Curtain operation :
                                          </span>
                                          <strong>
                                            {
                                              rooms?.room_assets[windowBtnIndex]
                                                ?.curtain_operation?.operationType
                                            }
                                          </strong>
                                        </li>
                                      )}
                                  </>
                                </ul>
                              </div>
                            </>
                          )}
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

      <div
        class="modal fade bd-example-modal-lg-2"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Why you want to cancel inquiry</h5>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mb-3 row align-items-center">
                <div className="col-lg-12 my-1">
                  <label className="me-sm-2">
                    Select Reason for cancel Enquiry
                  </label>
                  <select
                    className="me-sm-2 form-control"
                    onChange={(e) => setSelectedValue(e.target.value)}
                  >
                    <option selected>Choose...</option>

                    <option value={"Testing Enquiry"}>Testing Enquiry</option>
                    <option value={"Cancel from client End"}>
                      Cancel from client End
                    </option>
                    <option value={"Duplicate Enquiry"}>
                      Duplicate Enquiry
                    </option>
                    <option value={" Incomplete Details"}>
                      Incomplete Details
                    </option>
                  </select>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-12 col-form-label" htmlFor="fnf2">
                    ID
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      id="fnf2"
                      placeholder="outlet Password"
                      readOnly="true"
                      value={EnquiryDetials?.data?.id}
                    />
                  </div>
                </div>
              </div>
              <div className="form-buttons text-end">
                <button
                  onClick={() => toggle1()}
                  className="btn btn-secondary me-3"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => cancelEnquiry()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade bd-example-modal-lg-3"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Why you want to postpone Installation</h5>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mb-3 row align-items-center">
                <div className="col-lg-12 my-1">
                  <label className="me-sm-2">
                    Select Reason for cancel Enquiry
                  </label>
                  <select
                    className="me-sm-2 form-control"
                    onChange={(e) => setSelectedValue(e.target.value)}
                  >
                    <option selected>Choose...</option>

                    <option value={"Manpower Shortage"}>
                      Manpower Shortage
                    </option>
                    <option value={" Material not ready"}>
                      Material not ready
                    </option>
                    <option value={"Material delay from warehouse"}>
                      Material delay from warehouse
                    </option>
                    <option value={"Site not ready"}>Site not ready</option>
                    <option value={"Client not available "}>
                      Client not available
                    </option>
                    <option value={"Payment outstanding "}>
                      Payment outstanding
                    </option>
                    <option value={"Wooden plank not installed"}>
                      Wooden plank not installed
                    </option>
                  </select>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-12 col-form-label" htmlFor="fnf2">
                    ID
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      id="fnf2"
                      placeholder="outlet Password"
                      readOnly="true"
                      value={EnquiryDetials?.data?.id}
                    />
                  </div>
                </div>
              </div>
              <div className="form-buttons text-end">
                <button
                  // onClick={() => toggle1()}
                  className="btn btn-secondary me-3"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => PostponeInstaller()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminRemarkModal
        enquiryId={enquiryId}
        remarkModal={remarkModal}
        toggle={remarkToggle}

      />

      <ReAssignmesurer
        modal={modal}
        toggle={(val) => toggle(val)}
        id={EnquiryDetials?.data?.enquiryschedules}
      />
      <WcrModal modalToggle={wcrModalToggle} isOpen={wcrModal}
        data={wcrData}
      />
    </>
  );
}

export default EnquiryDetials;
