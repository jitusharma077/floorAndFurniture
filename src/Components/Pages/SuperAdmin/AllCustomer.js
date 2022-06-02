import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import DataTableBase from "./Common/DataTablebasic";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllCustomer() {
  const navigate = useNavigate();
  const [allCustomer, setAllCustomer] = useState([]);
  useEffect(() => {
    GetDataWithToken("superadmin/get-customers").then((response) => {
      if (response.status === true) {
        setAllCustomer(response.data);
      }
    });
  }, [""]);

  return (
    <>
      {console.log("all customers", allCustomer)}
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
                          <th>Category Type</th>
                          <th>Mobile Number</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCustomer.map((customer, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {customer.firstName} {customer.lastName}
                              </td>
                              <td>{customer.id}</td>
                              <td>no category</td>
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
    </>
  );
}

export default AllCustomer;
