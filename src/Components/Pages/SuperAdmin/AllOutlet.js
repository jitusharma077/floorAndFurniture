import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllOutlet() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const [allOutlets, setAllOutlets] = useState([]);
  const toggle = () => setModal(!modal);
  const [CallApi, setCallApi] = useState(true);

  useEffect(() => {
    if (CallApi === true) {
      GetDataWithToken("superadmin/get-outlet").then((response) => {
        if (response.status === true) {
          console.log("outlets", response.data);
          setAllOutlets(response.data);
        } else {
          toast.error(response.data.message, {
            position: "top-right",
          });
        }
        setCallApi(false);
      });
    }
  }, [CallApi]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const CreateNewOutlet = (data) => {
    let formData = new FormData();

    formData.append("name", data.outlet_name);
    formData.append("email", data.outlet_email);
    formData.append("password", data.outlet_password);
    formData.append("phone", data.outlet_mobile_no);
    formData.append("address", data.outlet_address);
    PostDataWithToken("superadmin/add-outlet", formData).then((response) => {
      if (response.status === true) {
        console.log("first", response.message);
        toast.success(response.message, {
          position: "top-right",
        });
        reset({
          outlet_name: "",
          outlet_email: "",
          outlet_password: "",
          password: "",
          outlet_mobile_no: "",
          outlet_address: "",
        });
        toggle();
        setCallApi(true);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });
  };

  return (
    <>
      <SuperAdminHeader />
      <SuperAdminSidebar />
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">All Outlets</h4>
                  <button className="btn btn-primary" onClick={() => toggle()}>
                    Add more outlet
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="example4"
                      className="table card-table display mb-4 shadow-hover table-responsive-lg"
                      style={{ minWidth: "845px" }}
                    >
                      <thead>
                        <tr>
                          <th>Outlet id</th>
                          <th>Outlet Name</th>
                          <th>Outlet Address</th>
                          <th>Outlet Mobile No.</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allOutlets && allOutlets.length < 0 ? (
                          <p>No data found</p>
                        ) : (
                          allOutlets.map((outlet, index) => {
                            return (
                              <tr key={index}>
                                <td>{outlet.id}</td>
                                <td>{outlet.outlet_name}</td>
                                <td>{outlet.address}</td>
                                <td>{outlet.outlet_phone}</td>
                                <td>{outlet.outlet_email}</td>

                                <td>
                                  <button
                                    onClick={() => {
                                      navigate("/OutletDashboard", {
                                        state: { data: outlet.id },
                                      });
                                    }}
                                    className="btn btn-primary"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Outlet</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(CreateNewOutlet)}>
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label" htmlFor="fnf">
                Name
              </label>
              <div className="col-sm-9">
                <input
                  {...register("outlet_name", {
                    required: "please enter outlet name",
                  })}
                  type="text"
                  className="form-control"
                  id="fnf"
                  placeholder="outlet name"
                />
                <span className="text-danger">
                  {errors.outlet_name && errors.outlet_name.message}
                </span>
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label" htmlFor="comment">
                Address
              </label>
              <div className="col-sm-9">
                <textarea
                  {...register("outlet_address", {
                    required: "please enter outlet address",
                  })}
                  className="form-control"
                  rows={4}
                  id="comment"
                  placeholder="outlet address"
                  defaultValue={""}
                />
                <span className="text-danger">
                  {errors.outlet_address && errors.outlet_address.message}
                </span>
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label" htmlFor="fnf1">
                Mobile No.
              </label>
              <div className="col-sm-9">
                <input
                  {...register("outlet_mobile_no", {
                    required: "please enter outlet mobile no.",
                  })}
                  type="number"
                  className="form-control"
                  id="fnf1"
                  placeholder="outlet mobile number"
                />
                <span className="text-danger">
                  {errors.outlet_mobile_no && errors.outlet_mobile_no.message}
                </span>
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label" htmlFor="fnf2">
                Email
              </label>
              <div className="col-sm-9">
                <input
                  {...register("outlet_email", {
                    required: "please enter outlet email",
                  })}
                  type="email"
                  className="form-control"
                  id="fnf2"
                  placeholder="outlet email"
                />
                <span className="text-danger">
                  {errors.outlet_email && errors.outlet_email.message}
                </span>
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label" htmlFor="fnf2">
                Outlet Password
              </label>
              <div className="col-sm-9">
                <input
                  {...register("outlet_password", {
                    required: "please enter outlet password",
                  })}
                  type="password"
                  className="form-control"
                  id="fnf2"
                  placeholder="outlet Password"
                />
                <span className="text-danger">
                  {errors.outlet_password && errors.outlet_password.message}
                </span>
              </div>
            </div>
            <div className="form-buttons text-end">
              <button className="btn btn-secondary me-3">Cancel</button>

              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default AllOutlet;
