import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AddSchedule() {
  const location = useLocation();
  const [AllTimeSlot, setAllTimeSlot] = useState([]);
  const [EnquiryId, setEnquiryId] = useState(null);
  const [AllUnAssignedUser, setAllUnAssignedUser] = useState([]);
  const [AssignedPerson, setAssignedPerson] = useState("");
  const [callApi, setCallApi] = useState(true);
  const [callApi2, setCallApi2] = useState(false);
  const [customerTimeSlot, setcustomerTimeSlot] = useState("");


  // const [InquiryData, setInquiryData] = useState([]);
  // const [getDate, setGetDate] = useState("");


  useEffect(() => {
    if (callApi) {
      location?.state?.schedule?.id && setCallApi2(true);
      setcustomerTimeSlot(location?.state?.schedule?.id ? location?.state?.schedule?.id : "");
      console.log("first", location.state);
      setEnquiryId(location.state.enquiryId ? location.state.enquiryId : location.state.data);
      GetDataWithToken("superadmin/get-schedule?type=measurer").then((response) => {
        if (response.status === true) {
          setAllTimeSlot(response.data);
          setCallApi(false);
        } else {
          setCallApi(false);
        }
      });
    }
    if (callApi2) {
      GetDataWithToken(
        `superadmin/get-unassigned-user/${customerTimeSlot}`
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


  const getTimeSlot = (timeSlot) => {
    // console.log("timeSlot", timeSlot.target.value);
    setcustomerTimeSlot(timeSlot.target.value);
    setCallApi2(true);
  };

  const ConfirmSchduled = (event) => {
    event.preventDefault();
    let data = {
      schedulePersonId: event.target?.[2].value,
      enquiryId: EnquiryId,
      ScheduleId: event?.target?.[1].value,
      date: moment(event?.target?.[0].value).format("YYYY-MM-DD"),
    };

    PostDataWithToken(`auth/assign-schedule-enquiry`, data).then((response) => {
      if (response.status === true) {
        console.log("response", response);
        toast.success(response.message);
        // response.success("Schedule Confirmed Successfully", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      } else {
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
                            <label className="me-sm-2">
                              Select Date For Measurements
                            </label>
                            <input
                              type={"date"}
                              defaultValue={location?.state?.date ? moment(location?.state?.date).format("YYYY-MM-DD") : null}
                              min={moment().add(0, "days").format("YYYY-MM-DD")}
                              className="form-control"
                            // onChange={getSelectedDate}
                            />
                          </div>
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Time Slot For Your Measurements
                            </label>
                            <select
                              className="me-sm-2  form-control"
                              onChange={(e) => {
                                getTimeSlot(e);
                              }}
                            >
                              <option>Choose...</option>
                              {AllTimeSlot &&
                                AllTimeSlot.map((item, index) => {
                                  return (
                                    <option selected={location?.state?.schedule?.id === item.id} value={item.id}>
                                      {item.start_time} - {item.end_time}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Measurer For Your Measurements
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
                        <button className="btn btn-primary">Submit </button>
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

export default AddSchedule;
