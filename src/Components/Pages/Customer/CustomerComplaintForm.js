import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken, PostData } from "../../ApiHelper/ApiHelper";
import { useForm } from "react-hook-form";
import { toast } from "material-react-toastify";

const CustomerComplaintForm = () => {
  const navigate = useNavigate(-1);
  const [selectedComplaint, setSelectedComplaint] = useState([]);
  const [timeSlotList, setTimeSlotList] = useState([]);
  const [timeSlotValue, setTimeSlotValue] = useState("");
  // const [warehouseList, setWarehouseList] = useState([]);
  const location = useLocation();
  console.log("locaattee", location);
  const [callApi, setCallApi] = useState(true);
  const [installerCallApi, setInstallerCallApi] = useState(false);
  const [installerList, setInstallerList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("submit dataaaa...", data);
    const submitData = {
      complaint_details: selectedComplaint,
      scheduleId: timeSlotValue,
      enquiryId: location?.state?.enquiry?.id,
      status: location?.state?.enquiry?.status,
      installerId: data?.installer,
      date: data?.date,
      complaintId: selectedComplaint,
      warehouseId: data?.warehouse
    };

    PostData(`customer/make-a-complaint`, submitData).then((response) => {
      if (response.status === true) {
        toast.success("complaint filed successfully we will get back to you as soon as possible");
        navigate(-1);
      } else {
        // console.log(response);
        toast.error(response.data.message);
      }
    });


  }

  const timeSlotChangeHandler = (event) => {
    setTimeSlotValue(event.target.value);
    setInstallerCallApi(true);
  }

  useEffect(() => {
    // if (callApi) {
    //   GetDataWithToken(`customer/get-all-warehouse`).then(response => {
    //     if (response.status === true) {
    //       setWarehouseList(response.data);
    //     }
    //   })
    // }
    if (callApi) {
      GetDataWithToken(`superadmin/get-schedule?type=installer`).then(response => {
        if (response.status === true) {
          setCallApi(false);
          setTimeSlotList(response.data);
        }
      })
    }
    if (installerCallApi) {
      GetDataWithToken(`installer/get-unassign-installer/${timeSlotValue}`).then(response => {
        if (response.status === true) {
          setInstallerList(response.data);
          setInstallerCallApi(false);
        }
      })
    }
  }, [callApi, installerCallApi])

  return (
    <div className="authincation h-100">
      <div className="container h-100vh">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-xl-12">

            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12 px-4 py-2">
                  <div className="card-header">
                    <h4>Complaint form</h4>
                    <span onClick={() => { navigate(-1) }} style={{ cursor: "pointer" }}><i className="fas fa-arrow-left" style={{ fontSize: "20px" }}></i></span>
                  </div>
                  <div className="basic-form p-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="row align-items-center">
                        {location.state.data.map((data, index) =>
                          < div class="col-lg-12 my-1">
                            <label class="me-sm-2">Select Complaint for {data?.name}</label>
                            <select class="me-sm-2  form-control"
                              onChange={(e) => {
                                setSelectedComplaint((prevValue) => {

                                  const updatedValues = [...prevValue];
                                  updatedValues[index] = {
                                    type: e.target.value?.split("/?#/?")?.[1],
                                    description: e.target.value?.split("/?#/?")?.[2],
                                    complaintId: e.target.value?.split("/?#/?")?.[0]
                                  }; // Use index to store values in the correct position
                                  console.log("selected..", updatedValues);
                                  return updatedValues;
                                });
                              }}
                            >
                              <option>Choose...</option>
                              {data?.complaints?.map((data) => <option value={`${data?.id}/?#/?${data?.type}/?#/?${data?.description}`}>{data?.type}</option>)}
                            </select>
                            <div>
                              {data?.complaints?.map((data, index2) => data?.id == selectedComplaint[index]?.complaintId && <p>{data?.description}</p>)}
                            </div>
                          </div>
                        )}

                        {/* <div class="col-lg-12 my-1">
                          <label class="me-sm-2">Select Warehouse</label>
                          <select class="me-sm-2  form-control"  {...register(`warehouse`, {
                            required: true,
                            maxLength: 80,
                          })} >
                            <option>Choose...</option>
                            {warehouseList.map((data) => <option value={data?.id}>{data?.firstName}</option>)}
                          </select>
                        </div> */}
                        <div class="col-lg-12 my-1">
                          <label class="me-sm-2">Select Date For installer</label>
                          <input type="date"
                            min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                            class="form-control"
                            {...register(`date`, {
                              required: true,
                              maxLength: 80,
                            })} /></div>
                        <div class="col-lg-12 my-1">
                          <label class="me-sm-2">Select Time Slot For Your Installer</label>
                          <select class="me-sm-2  form-control" onChange={timeSlotChangeHandler}>
                            <option>Choose...</option>
                            {timeSlotList?.map((data) => <option value={data?.id}>{data?.start_time}-{data?.end_time}</option>)}
                          </select></div>
                        <div class="col-lg-12 my-1">
                          <label class="me-sm-2">Select installer For Your Installation</label>
                          <select class="me-sm-2  form-control"  {...register(`installer`, {
                            required: true,
                            maxLength: 80,
                          })}>
                            <option>Choose...</option>
                            {installerList?.map((data) => <option value={data?.id}>{data?.firstName} {data?.lastName}</option>)}
                          </select>
                        </div>
                      </div>
                      <button className="btn btn-primary">submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default CustomerComplaintForm;