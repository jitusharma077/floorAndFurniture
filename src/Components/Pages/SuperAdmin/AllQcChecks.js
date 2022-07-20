import moment from "moment";
import React, { useEffect, useState } from "react";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import { AllQcCheck } from "../../Common/Helper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

// {
//     "message": "All Quality Checks Fetched Successfully",
//     "qualityChecks": [
//         {
//             "id": 3,
//             "checks": "Mesurements test",
//             "description": "fabric dimensons are as per sales order only tsess",
//             "quality_check_type": "qc3",
//             "product_type": "curtains",
//             "createdAt": "2022-07-19T06:51:30.000Z",
//             "updatedAt": "2022-07-19T06:51:30.000Z"
//         }
//     ],
//     "status": true
// }
function AllQcChecks() {
  const [firstQcCheck, setfirstQcCheck] = useState([]);
  const [SecQcCheck, setSecQcCheck] = useState([]);
  const [thirdQcCheck, setthirdQcCheck] = useState([]);
  const [AllQcCheckData, setAllQcCheckData] = useState([]);
  useEffect(() => {
    GetDataWithToken("quality/get-qc/1").then((response) => {
      console.log("response", response.data);
      setfirstQcCheck(response.data);
      //   const ApiData = response.data;
      //   const AllQcCheck = [
      //     {
      //       name: "Qc1",
      //       id: "1",
      //       ...ApiData,
      //     },
      //   ];
      //   console.log("newData", AllQcCheck);
    });
    GetDataWithToken("quality/get-qc/2").then((response) => {
      setSecQcCheck(response.data);
    });
    GetDataWithToken("quality/get-qc/3").then((response) => {
      setthirdQcCheck(response.data);
    });
    // setAllQcCheckData([...firstQcCheck, ...SecQcCheck, ...thirdQcCheck]);
  }, []);
  const BlockQc = (e) => {
    console.log("block", e);
    GetDataWithToken(`quality/block/${e}`).then((response) => {
      alert("QC Check Blocked Successfully");
      window.location.reload();
    });
  };

  return (
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
      {console.log("AllQcCheckData", AllQcCheckData)}
      <SuperAdminHeader />
      <SuperAdminSidebar />
      <div className="content-body">
        {/*--- row ---*/}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">All Qc Checks</h4>
                </div>

                <div class="card-body">
                  <div
                    class="accordion accordion-start-indicator"
                    id="accordion-five"
                  >
                    <div class="accordion-item">
                      <div
                        class="accordion-header  rounded-lg"
                        id="accord-5One"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse5One"
                        aria-controls="collapse5One"
                        aria-expanded="true"
                        role="button"
                      >
                        <h4>Fist Qc</h4>

                        <span class="accordion-header-indicator text-dark"></span>
                      </div>
                      <div
                        id="collapse5One"
                        class="collapse accordion__body show"
                        aria-labelledby="accord-5One"
                        data-bs-parent="#accordion-five"
                      >
                        <div class="accordion-body-text">
                          {firstQcCheck &&
                            firstQcCheck.map((item, index) => {
                              return (
                                <div class="card">
                                  <div class="card-header">
                                    <h4 class="card-title">{item.name}</h4>
                                  </div>
                                  <div class="card-body">
                                    <div class="table-responsive">
                                      <table class="table table-bordered table-responsive-sm">
                                        <thead>
                                          <tr>
                                            <th>#</th>
                                            <th>Checks</th>
                                            <th>Descriptions</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                          </tr>
                                        </thead>
                                        {item.quality_check_details &&
                                          item.quality_check_details.map(
                                            (response, index) => {
                                              return (
                                                <tr>
                                                  <td>{index + 1}</td>
                                                  <td>{response.checks}</td>
                                                  <td>
                                                    {response.description}
                                                  </td>
                                                  <td>
                                                    {response.status ===
                                                    true ? (
                                                      <span className="badge bg-success ">
                                                        Active
                                                      </span>
                                                    ) : (
                                                      <span className="badge bg-danger ">
                                                        Blocked
                                                      </span>
                                                    )}{" "}
                                                  </td>
                                                  <td>
                                                    {moment(
                                                      response.createdAt
                                                    ).format("DD-MM-YYYY")}
                                                  </td>
                                                  <td>
                                                    <button class="btn btn-danger bg-primary">
                                                      Edit
                                                    </button>
                                                    <button
                                                      class="btn btn-danger bg-danger ms-2"
                                                      onClick={(e) =>
                                                        BlockQc(response.id)
                                                      }
                                                    >
                                                      Block
                                                    </button>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <div
                        class="accordion-header collapsed rounded-lg"
                        id="accord-5Two"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse5Two"
                        aria-controls="collapse5Two"
                        aria-expanded="true"
                        role="button"
                      >
                        <h4>Second Qc</h4>

                        <span class="accordion-header-indicator text-dark"></span>
                      </div>
                      <div
                        id="collapse5Two"
                        class="collapse accordion__body"
                        aria-labelledby="accord-5Two"
                        data-bs-parent="#accordion-five"
                      >
                        <div class="accordion-body-text">
                          <div class="accordion-body-text">
                            {SecQcCheck &&
                              SecQcCheck.map((item, index) => {
                                return (
                                  <div class="card">
                                    <div class="card-header">
                                      <h4 class="card-title">{item.name}</h4>
                                    </div>
                                    <div class="card-body">
                                      <div class="table-responsive">
                                        <table class="table table-bordered table-responsive-sm">
                                          <thead>
                                            <tr>
                                              <th>#</th>
                                              <th>Checks</th>
                                              <th>Descriptions</th>
                                              <th>Status</th>
                                              <th>Date</th>
                                              <th>Action</th>
                                            </tr>
                                          </thead>
                                          {item.quality_check_details &&
                                            item.quality_check_details.map(
                                              (response, index) => {
                                                return (
                                                  <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{response.checks}</td>
                                                    <td>
                                                      {response.description}
                                                    </td>
                                                    <td>{response.status}</td>
                                                    <td>
                                                      {response.createdAt}
                                                    </td>
                                                    <td>
                                                      <button class="btn btn-primary">
                                                        Edit
                                                      </button>
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <div
                        class="accordion-header collapsed rounded-lg"
                        id="accord-5Three"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse5Three"
                        aria-controls="collapse5Three"
                        aria-expanded="true"
                        role="button"
                      >
                        <h4>Third Qc</h4>

                        <span class="accordion-header-indicator text-dark"></span>
                      </div>
                      <div
                        id="collapse5Three"
                        class="collapse accordion__body"
                        aria-labelledby="accord-5Three"
                        data-bs-parent="#accordion-five"
                      >
                        <div class="accordion-body-text">
                          <div class="accordion-body-text">
                            {thirdQcCheck &&
                              thirdQcCheck.map((item, index) => {
                                return (
                                  <div class="card">
                                    <div class="card-header">
                                      <h4 class="card-title">{item.name}</h4>
                                    </div>
                                    <div class="card-body">
                                      <div class="table-responsive">
                                        <table class="table table-bordered table-responsive-sm">
                                          <thead>
                                            <tr>
                                              <th>#</th>
                                              <th>Checks</th>
                                              <th>Descriptions</th>
                                              <th>Status</th>
                                              <th>Date</th>
                                              <th>Action</th>
                                            </tr>
                                          </thead>
                                          {item.quality_check_details &&
                                            item.quality_check_details.map(
                                              (response, index) => {
                                                return (
                                                  <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{response.checks}</td>
                                                    <td>
                                                      {response.description}
                                                    </td>
                                                    <td>{response.status}</td>
                                                    <td>
                                                      {moment(
                                                        response.createdAt
                                                      ).format("yyyy-MM-dd")}
                                                    </td>
                                                    <td>
                                                      <button class="btn btn-primary">
                                                        Edit
                                                      </button>
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div
                    class="accordion accordion-start-indicator"
                    id="accordion-five"
                  >
                    {/* {console.log("AllQcCheck", AllQcCheck)} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQcChecks;
