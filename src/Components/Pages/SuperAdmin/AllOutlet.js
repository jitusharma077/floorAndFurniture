import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import CreateOutletModal from "../../Common/CreateOutletModal";
import Loader from "../../Common/Loader";
import useFetch from "../../Hooks/CallBack";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllOutlet(props) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [allOutlets, setAllOutlets] = useState([]);
  const [CallApi, setCallApi] = useState(true);
  const { data, isLoading, error } = useFetch("superadmin/get-outlet");

  // useEffect(() => {
  //   if (CallApi === true) {
  //     // GetDataWithToken("superadmin/get-outlet").then((response) => {
  //     //   if (response.status === true) {
  //     //     console.log("outlets", response.data);
  //     //     setAllOutlets(response.data);
  //     //   } else {
  //     //     toast.error(response.data.message, {
  //     //       position: "top-right",
  //     //     });
  //     //   }
  //     //   setCallApi(false);
  //     // });

  //   }
  // }, [CallApi]);

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
                          {isLoading && <Loader />}
                          {error && <div>Error</div>}
                          {/* {console.log("data", data)} */}

                          {data.map((outlet, index) => {
                            return (
                              <tr key={index}>
                                <td>{outlet.id}</td>
                                <td>{outlet.firstName}</td>
                                <td>
                                  {outlet.outletAddress?.street}{" "}
                                  {outlet.outletAddress?.city}{" "}
                                  {outlet.outletAddress?.state}
                                </td>
                                <td>{outlet.phone}</td>
                                <td>{outlet.email}</td>

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
                          })}
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
