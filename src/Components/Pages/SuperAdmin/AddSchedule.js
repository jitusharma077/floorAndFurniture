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
  const [InquiryData, setInquiryData] = useState([]);
  const [getDate, setGetDate] = useState("");
  const [customerTimeSlot, setcustomerTimeSlot] = useState("");

  useEffect(() => {
    console.log("first", location.state);
    setEnquiryId(location.state.data);
    GetDataWithToken("superadmin/get-schedule/").then((response) => {
      if (response.status === true) {
        setAllTimeSlot(response.data);
      }
    });
  }, [location.state]);

  const getAssignedPerson = (e) => {
    setAssignedPerson(e.target.value);
  };
  const getSelectedDate = (e) => {
    console.log("date", e.target.value);
    setGetDate(e.target.value);
  };

  const getTimeSlot = (timeSlot) => {
    console.log("timeSlot", timeSlot.target.value);
    setcustomerTimeSlot(timeSlot.target.value);

    GetDataWithToken(
      `superadmin/get-unassigned-user/${timeSlot.target.value}`
    ).then((response) => {
      if (response.status === true) {
        setAllUnAssignedUser(response.data);
      }
    });
  };

  const ConfirmSchduled = (event) => {
    event.preventDefault();
    let data = {
      schedulePersonId: AssignedPerson,
      enquiryId: EnquiryId,
      ScheduleId: customerTimeSlot,
      date: moment(getDate).format("YYYY-MM-DD"),
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
                              min={moment().add(0, "days").format("YYYY-MM-DD")}
                              className="form-control"
                              onChange={getSelectedDate}
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
                              <option selected>Choose...</option>
                              {AllTimeSlot &&
                                AllTimeSlot.map((item, index) => {
                                  return (
                                    <option value={item.id}>
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
                              onChange={(e) => {
                                getAssignedPerson(e);
                              }}
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
