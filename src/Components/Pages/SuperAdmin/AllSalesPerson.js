import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { SalesPerson } from "../../Common/RoleType";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllSalesPerson() {
  const navigate = useNavigate();
  const [Allsalesperson, setAllsalesperson] = useState([]);
  useEffect(() => {
    GetDataWithToken(`superadmin/get-users?type=${SalesPerson}`).then(
      (response) => {
        console.log("all outlet manager", response);
        setAllsalesperson(response.data);
      }
    );
  }, [""]);
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
                    <h4 className="card-title">All Sales Person</h4>
                    <Link to={"/Add-new-user"} className="btn btn-primary">
                      Add New
                    </Link>
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
                            <th>User Name</th>
                            <th>User Id</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Allsalesperson && Allsalesperson.length === 0 ? (
                            <div>
                              <h4 className="text-center d-block w-100 position-absolute">
                                No Data Found
                              </h4>
                            </div>
                          ) : (
                            Allsalesperson.map((outletManager, index) => (
                              <tr key={index}>
                                <td>
                                  {outletManager.firstName}{" "}
                                  {outletManager.lastName}
                                </td>
                                <td>{outletManager.id}</td>
                                <td>{outletManager.phone}</td>
                                <td>{outletManager.email}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      navigate("/staff-detials", {
                                        state: { data: outletManager.id },
                                      });
                                    }}
                                    className="btn btn-primary"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))
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
      </div>
    </>
  );
}

export default AllSalesPerson;
