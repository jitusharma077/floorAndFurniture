import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import CreateOutletModal from "../../Common/CreateOutletModal";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllOutlet(props) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [allOutlets, setAllOutlets] = useState([]);

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
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All Outlets</h4>
                    {console.log("modal", modal)}
                    <button
                      className="btn btn-primary"
                      onClick={() => setModal(!modal)}
                    >
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
                          {allOutlets && allOutlets.length === 0 ? (
                            <h3
                              style={{
                                position: "absolute",
                                left: "40%",
                                padding: "10px",
                              }}
                            >
                              No data found
                            </h3>
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
        <CreateOutletModal modal={modal} toggle={(val) => toggle(val)} />
      </div>
    </>
  );
}

export default AllOutlet;
