import React, { useEffect, useState } from "react";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { Installer } from "../../Common/RoleType";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllInstaller() {
  const [AllInstaller, setAllInstaller] = useState([]);
  useEffect(() => {
    GetDataWithToken(`superadmin/get-users?type=${Installer}`).then(
      (response) => {
        setAllInstaller(response.data);
      }
    );
  }, [""]);
  return (
    <>
      <SuperAdminHeader />
      <SuperAdminSidebar />
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">All Installer</h4>
                  <a href="Add-new-user.html" className="btn btn-primary">
                    Add New
                  </a>
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
                          <th>Completed Task</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {AllInstaller && AllInstaller.length === 0 ? (
                          <div>
                            <h4 className="text-center d-block w-100 position-absolute">
                              No Data Found
                            </h4>
                          </div>
                        ) : (
                          AllInstaller.map((outletManager, index) => (
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
                                  // onClick={() => {
                                  //   navigate("/customer-detials", {
                                  //     state: { data: customer.id },
                                  //   });
                                  // }}
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
    </>
  );
}

export default AllInstaller;
