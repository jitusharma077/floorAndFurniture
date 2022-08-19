import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import Loader from "../../Common/Loader";
import useFetch from "../../Hooks/CallBack";
import DataTableBase from "./Common/DataTablebasic";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllCustomer() {
  const navigate = useNavigate();
  const { data, Error, isLoading } = useFetch("superadmin/get-customers");

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
          {/*-- row --*/}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All Customers</h4>
                    {/* <button className=""></button> */}
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        id="example4"
                        className=" table card-table display mb-4 shadow-hover table-responsive-lg"
                      >
                        <thead>
                          <tr>
                            <th>Customer Name</th>
                            <th>Enquiry number</th>
                            <th>Primary Email</th>
                            <th>Mobile Number</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isLoading && <Loader />}
                          {Error && <div>Error</div>}

                          {data && data.length === 0 && (
                            <h3
                              style={{
                                position: "absolute",
                                left: "40%",
                                padding: "10px",
                              }}
                            >
                              No data found
                            </h3>
                          )}
                          {data.map((customer, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {customer.firstName} {customer.lastName}
                                </td>
                                <td>{customer.id}</td>
                                <td>{customer.primary_email}</td>
                                <td>{customer.primary_phone}</td>

                                <td>
                                  <button
                                    onClick={() => {
                                      navigate("/customer-detials", {
                                        state: { data: customer.id },
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
      </div>
    </>
  );
}

export default AllCustomer;
