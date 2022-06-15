import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";
import { Link, useNavigate } from "react-router-dom";

function OutletCustomers() {
  const navigate = useNavigate();
  const [AllOutlerCustomers, setAllOutletCustomers] = useState([]);
  useEffect(() => {
    GetDataWithToken(
      `superadmin/get-outlet-customer/${Cookies.get("userID")}`
    ).then((response) => {
      if (response.status === true) {
        setAllOutletCustomers(response.data);
      }
    });
  }, []);
  return (
    <>
      <div
        data-typography="poppins"
        data-theme-version="light"
        data-layout="horizontal"
        data-nav-headerbg="color_1"
        data-headerbg="color_1"
        data-sidebar-style="full"
        data-sibebarbg="color_1"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-container="wide"
        direction="ltr"
        data-primary="color_1"
        className="outlet_style"
      >
        <OutletManagerHeader />
        <OutletManagerSidebar />
        <div className="content-body">
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All Customers</h4>
                  </div>
                  <div className="card-body">
                    <div className="table card-table display mb-4 shadow-hover table-responsive-lg">
                      <table
                        id="example4"
                        className="display"
                        style={{ minWidth: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Customer Name</th>
                            <th>Customer id</th>
                            <th>Mobile No.</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {console.log("first,", AllOutlerCustomers)}
                        <tbody>
                          {AllOutlerCustomers &&
                            AllOutlerCustomers.length > 0 &&
                            AllOutlerCustomers.map((item, index) => {
                              return (
                                <tr>
                                  <td>
                                    {item.firstName} {item.lastName}
                                  </td>
                                  <td>{item.id}</td>
                                  <td>{item.primary_phone}</td>
                                  <td>{item.primary_email}</td>
                                  <td>
                                    <button
                                      onClick={() => {
                                        navigate("/OutletCustomerDetials", {
                                          state: { data: item.id },
                                        });
                                      }}
                                      className="btn btn-primary"
                                    >
                                      View More
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
      </div>
    </>
  );
}

export default OutletCustomers;
