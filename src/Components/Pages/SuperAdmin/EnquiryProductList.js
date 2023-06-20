import React, { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";

function EnquiryProductList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [EnquiryDetials, setEnquiryDetials] = useState([]);
  useEffect(() => {
    console.log("location", location.state.data);
    GetDataWithToken(`sales/enq-detail/${location.state.data}`).then(
      (response) => {
        if (response.status === true) {
          setEnquiryDetials(response.data);
          console.log("ress", response);
          alert("");
        }
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
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header border-0">
                    <h4 className="fs-20">Purchase History</h4>
                    {/* <div className="newest ms-3">
                  <select className="default-select">
                    <option>Newest</option>
                    <option>Oldest</option>
                  </select>
                </div> */}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnquiryProductList;

// {res.sofa.map((item, i) => (
//     <div>
//       <p>{item.type}</p>
//     </div>
//   ))}
