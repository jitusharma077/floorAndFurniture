import { data } from "jquery";
import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Spinner } from "reactstrap";

function AddInstalerSchdule() {
  const location = useLocation();
  const [callApi, setCallApi] = useState(true);
  const [callApi2, setCallApi2] = useState(false);
  const [AllTimeSlot, setAllTimeSlot] = useState([]);
  const [EnquiryId, setEnquiryId] = useState(null);
  const [AllUnAssignedUser, setAllUnAssignedUser] = useState([]);
  const [AssignedPerson, setAssignedPerson] = useState("");
  const [InquiryData, setInquiryData] = useState([]);
  const [getDate, setGetDate] = useState("");
  const [customerTimeSlot, setcustomerTimeSlot] = useState("");
  const [CoustomerId, setCoustomerId] = useState("");
  const [AllWhareHouse, setAllWhareHouse] = useState("");
  const [WareHouseId, setWareHouseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  // console.log("loockcasafqw", location?.state?.schedule?.id);

  useEffect(() => {
    if (callApi) {
      location?.state?.schedule?.id && setCallApi2(true);
      setcustomerTimeSlot(location?.state?.schedule?.id ? location?.state?.schedule?.id : "");
      console.log("Idddddd====>>>>>", location.state);
      setEnquiryId(location?.state?.enquiryId);
      setCoustomerId(location.state.customerId);
      GetDataWithToken("superadmin/get-outlet").then((response) => {
        if (response.status === true) {
          setCallApi(false);
          setAllWhareHouse(response.data);
        }
      });
      GetDataWithToken(`superadmin/get-schedule?type=installer`).then((response) => {
        if (response.status === true) {
          setCallApi(false);
          setAllTimeSlot(response.data);
        } else {
          setCallApi(false);
        }
      });
    }

    if (callApi2) {
      GetDataWithToken(
        `installer/get-unassign-installer/${customerTimeSlot}`
      ).then((response) => {
        if (response.status === true) {
          setCallApi2(false);
          setAllUnAssignedUser(response.data);
        } else {
          setCallApi2(false);
        }
      });
    }

  }, [callApi, callApi2]);

  // const getAssignedPerson = (e) => {
  //   setAssignedPerson(e.target.value);
  // };
  // const getSelectedDate = (e) => {
  //   console.log("date", e.target.value);
  //   setGetDate(e.target.value);
  // };

  const getTimeSlot = (timeSlot) => {
    console.log("timeSlot", timeSlot.target.value);
    setcustomerTimeSlot(timeSlot.target.value);
    setCallApi2(true);
  };
  // const getwareHouse = (warehouse) => {
  //   console.log("warehouse", warehouse.target.value);
  //   setWareHouseId(warehouse.target.value);
  // };

  const ConfirmSchduled = (event) => {
    setIsLoading(true);
    console.log("eventttt...",);
    console.log("enquiryid", EnquiryId);
    event.preventDefault();
    let data = {
      scheduleId: event.target?.[2]?.value,
      enquiryId: EnquiryId,
      installerId: event.target?.[3]?.value,
      date: moment(event.target?.[1]?.value).format("YYYY-MM-DD"),
      warehouseId: event.target?.[0]?.value,
      customerId: CoustomerId,
    };
    console.log("submit DAtaaaaa...", data);

    let complaintData = {
      scheduleId: event.target?.[2]?.value,
      enquiryId: EnquiryId,
      installerId: event.target?.[3]?.value,
      date: moment(event.target?.[1]?.value).format("YYYY-MM-DD"),
      warehouseId: event.target?.[0]?.value,
      customerId: CoustomerId,
      complaintId: location?.state?.id,
    };

    location?.state?.complaint_info?.length > 0 ?
      PostDataWithToken(`customer/assign-installer`, complaintData).then((response) => {
        if (response.status === true) {
          setIsLoading(false);
          toast.success(response.message);
        } else {
          setIsLoading(false);
          toast.error(response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      :
      PostDataWithToken(`installer/assign-installer/`, data).then((response) => {
        if (response.status === true) {
          console.log("response", response);
          setIsLoading(false);
          toast.success(response.message);
          // response.success("Schedule Confirmed Successfully", {
          //   position: toast.POSITION.TOP_CENTER,
          // });
        } else {
          setIsLoading(false);
          toast.error(response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
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
        <div className="content-body">
          {/*--- row ---*/}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Schedule A Task</h4>
                  </div>
                  <div className="card-body">
                    <div className="basic-form">
                      <form onSubmit={ConfirmSchduled}>
                        <div className="row align-items-center">
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">Select Warehouse</label>
                            {/* <input
                              type={"date"}
                              min={moment().add(1, "days").format("YYYY-MM-DD")}
                              className="form-control"
                              onChange={getSelectedDate}
                            /> */}
                            <select
                              className="me-sm-2  form-control"
                            // onChange={(e) => {
                            //   getwareHouse(e);
                            // }}
                            >
                              <option selected>Choose...</option>
                              {AllWhareHouse &&
                                AllWhareHouse.map((item, index) => {
                                  return (
                                    <option value={item.id}>
                                      {item.firstName}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Date For installation
                            </label>
                            <input
                              type={"date"}
                              // defaultValue={location?.state?.date}
                              defaultValue={location?.state?.date ? moment(location?.state?.date).format("DD-MM-YYYY") : null}
                              min={moment().add(0, "days").format("YYYY-MM-DD")}
                              className="form-control"
                            // onChange={getSelectedDate}
                            />
                          </div>
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Time Slot For Your installation
                            </label>
                            <select
                              className="me-sm-2  form-control"

                              onChange={(e) => {
                                getTimeSlot(e);
                              }}
                            >
                              <option >Choose...</option>
                              {AllTimeSlot &&
                                AllTimeSlot.map((item, index) => {
                                  return (
                                    <option selected={location?.state?.schedule?.id === item.id} value={item.id} >
                                      {item.start_time} - {item.end_time}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select installer For installation
                            </label>
                            <select
                              className="me-sm-2  form-control"
                            // onChange={(e) => {
                            //   getAssignedPerson(e);
                            // }}
                            >
                              <option selected>Choose...</option>
                              {AllUnAssignedUser &&
                                AllUnAssignedUser.map((item, index) => {
                                  return (
                                    <option value={item.id}>
                                      {item.firstName} {item.lastName}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                        <button disabled={isLoading}
                          className="btn btn-primary">
                          {isLoading ? <Spinner /> : "Submit"}
                        </button>
                      </form>
                    </div>
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

export default AddInstalerSchdule;
