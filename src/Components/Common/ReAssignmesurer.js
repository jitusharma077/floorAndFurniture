import { toast } from "material-react-toastify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { PostDataWithToken } from "../ApiHelper/ApiHelper";

function ReAssignmesurer({ modal, toggle, id }) {
  console.log("idddd", id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);
  const [SelectedValue, setSelectedValue] = useState("");
  const [CallApi, setCallApi] = useState(true);

  const lastId = id && id[id?.length - 1]?.id;

  const CreateNewOutlet = (data) => {
    const val = {
      id: lastId,
      status: "accepted",
      remark: SelectedValue.target.value,
    };

    PostDataWithToken("measurer/update-schedule", val).then((response) => {
      if (response.status === true) {
        console.log("first", response.message);
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        toggle();
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Outlet</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(CreateNewOutlet)}>
          <div className="mb-3 row align-items-center">
            <div className="col-lg-12 my-1">
              <label className="me-sm-2">
                Select Reason for cancel Measurements
              </label>
              <select
                className="me-sm-2  form-control"
                onChange={(e) => {
                  setSelectedValue(e);
                }}
              >
                <option selected>Choose...</option>

                <option value={"Manpower Shortage"}>Manpower Shortage</option>
                <option value={"Client not available "}>
                  Client not available
                </option>
                <option value={"Site not ready"}>Site not ready</option>
                <option value={"Selection Pending"}>Selection Pending</option>
              </select>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-sm-12 col-form-label" htmlFor="fnf2">
                ID
              </label>
              <div className="col-sm-12">
                <input
                  {...register("outlet_password", {
                    required: "please enter outlet password",
                  })}
                  type="text"
                  className="form-control"
                  id="fnf2"
                  placeholder="outlet Password"
                  readOnly="true"
                  value={lastId}
                />
                <span className="text-danger">
                  {errors.outlet_password && errors.outlet_password.message}
                </span>
              </div>
            </div>
          </div>
          <div className="form-buttons text-end">
            <button onClick={() => toggle()} className="btn btn-secondary me-3">
              Cancel
            </button>

            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default ReAssignmesurer;
