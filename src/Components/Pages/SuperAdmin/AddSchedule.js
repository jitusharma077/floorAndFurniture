import React from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AddSchedule() {
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
                    <h4 className="card-title">Schedule A Task</h4>
                  </div>
                  <div className="card-body">
                    <div className="basic-form">
                      <form>
                        <select className="default-select form-control wide mb-3">
                          <option>Select a Category</option>
                          <option>Measurer</option>
                          <option>Installer</option>
                          <option>Tailer</option>
                        </select>
                        <select className="default-select form-control wide mb-3">
                          <option>Select a Person</option>
                          <option>Person 1</option>
                          <option>Person 2</option>
                          <option>Person 3</option>
                        </select>
                        <div className="mb-3 row">
                          <div className="col-lg-6">
                            <label className="form-label">Select Date</label>
                            <input
                              type="date"
                              className="form-control input-default"
                            />
                          </div>
                          <div className="col-lg-6">
                            <label className="form-label">Select Slot</label>
                            <select className="default-select form-control wide">
                              <option>10:00 am to 12: 00 pm</option>
                              <option>12:00 pm to 02: 00 pm</option>
                              <option>03:00 am to 05: 00 pm</option>
                              <option>05:00 am to 07: 00 pm</option>
                            </select>
                          </div>
                        </div>
                        <div className="buttons text-end mt-4">
                          <button className="btn btn-warning btn-sm">
                            Back
                          </button>
                          <button className="btn btn-primary btn-sm">
                            Submit
                          </button>
                        </div>
                      </form>
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

export default AddSchedule;
