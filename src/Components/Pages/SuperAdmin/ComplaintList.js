import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken, PutDataWithToken } from "../../ApiHelper/ApiHelper";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Loader from "../../Common/Loader";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";
import Swal from "sweetalert2";

const ComplaintList = () => {
  const [data, setData] = useState([]);
  const [complaintDetail, setComplaintDetail] = useState([]);

  const [customerDetail, setCustomerDetail] = useState();
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabOpen, setTabOpen] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const modalTogggle = () => setModalOpen(!modalOpen);
  const navigate = useNavigate();

  const setTabValue = (value) => {
    setTabOpen(value);
    // tabOpen === "1" ? setInvoiceType('CREDIT_NOTE') : setInvoiceType('INVOICES');
    // setCallApi(true);
    // setInvoiceData([]);
    // setIsLoading(true);
    // setCurrentPage(1);
  };

  const completeComplaintHandler = () => {
    // console.log("cccmplaintt", complaintDetail);
    Swal.fire({
      title: "Do you want to send feedback message?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Send",
      // denyButtonText: `Don't dont send`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        PutDataWithToken(
          `superadmin/complaint-resolved/${customerDetail?.id}`
        ).then((response) => {
          if (response.status === true) {
            toast.success("Complaint completed successfully");
          } else {
            toast.error(response.message);
          }
        });
        // Swal.fire('Saved!', '', 'success')
      }
    });
  };

  const complaintDetailHandler = (data) => {
    navigate("/ComplaintDetials", {
      state: { data: data },
    });

    // setCustomerDetail(data);

    // const result = [];
    // const nameToTypeMap = {};

    // for (const item of data?.complaint_info) {
    //   const { material, type } = item;

    //   if (!nameToTypeMap[material.name]) {
    //     nameToTypeMap[material.name] = type;
    //   } else {
    //     // If the name already exists in the map, append the type
    //     nameToTypeMap[material.name] += `, ${type}`;
    //   }
    // }
    // // Create the result array based on the nameToTypeMap
    // for (const name in nameToTypeMap) {
    //   const type = nameToTypeMap[name];
    //   result.push({ name, type });
    // }
    // console.log("prev...", data.complaint_info);
    // console.log("new....", result);
    // setComplaintDetail(result);

    // modalTogggle();
  };

  useEffect(() => {
    GetDataWithToken(`superadmin/get-customer-complaints`).then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
    GetDataWithToken(`customer/get-feedback`).then((response) => {
      setFeedbackData(response.data);
    });
  }, []);
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
                    <h4 className="card-title">Complaints</h4>
                  </div>
                  <div className="card-body">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={tabOpen === "1" ? "active" : ""}
                          onClick={() => setTabValue("1")}
                        >
                          COMPLAINTS
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={tabOpen === "2" ? "active" : ""}
                          onClick={() => setTabValue("2")}
                        >
                          FEEDBACK
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={tabOpen}>
                      <TabPane tabId="1">
                        <div className="table-responsive">
                          <table
                            id="example4"
                            className="table card-table display mb-4 shadow-hover table-responsive-lg"
                            style={{ minWidth: "845px", textAlign: "center" }}
                          >
                            <thead>
                              <tr>
                                <th>Enq. No.</th>
                                <th>Customer Name</th>
                                <th>Mobile No.</th>
                                <th>Enq. Status</th>
                                <th>Status</th>
                                {/* <th>Complaints</th> */}
                                <th>IC Name</th>
                                <th>Issue Date</th>
                                {/* <th>Resolve Date</th> */}
                                <th>Installation Date/Time</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading && <Loader />}
                              {data && data.length === 0 ? (
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
                                data?.map((data, index) => (
                                  <tr>
                                    <>
                                      <th>{data?.enquiry?.id}</th>
                                      <th>
                                        {data?.enquiry?.customer?.firstName}
                                        {data?.enquiry?.customer?.lastName}
                                      </th>
                                      <th>
                                        {data?.enquiry?.customer?.primary_phone}
                                      </th>
                                      <td>
                                        <span
                                          className={
                                            data?.enquiry?.status === "progress"
                                              ? "badge  badge-primary"
                                              : "badge badge-dark"
                                          }
                                        >
                                          {data?.enquiry?.status}
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          className={
                                            data?.status === "active"
                                              ? "badge  badge-success"
                                              : "badge badge-dark"
                                          }
                                        >
                                          {data?.status}
                                        </span>
                                      </td>
                                      {/* <td>
                                                                                {data?.complaint_info &&
                                                                                    JSON.parse(data?.complaint_info)?.length}
                                                                                {data?.complaint_info &&
                                                                            JSON.parse(data?.complaint_info)?.map((data) => <p>{data?.type}</p>)}
                                                                            </td> */}
                                      <td>
                                        {data?.enquiry?.user?.firstName}{" "}
                                        {data?.enquiry?.user?.lastName}
                                      </td>
                                      <td>
                                        {moment(data?.createdAt).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </td>
                                      {/* <td>
                                                                                {moment(data?.date).format("DD/MM/YYYY")}
                                                                            </td> */}
                                      <td>
                                        {moment(data?.date)?.format(
                                          "DD/MM/YYYY"
                                        )}
                                        ({data?.schedule.start_time} -{" "}
                                        {data?.schedule.end_time})
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() =>
                                            complaintDetailHandler(data)
                                          }
                                        >
                                          View
                                        </button>
                                        {/* <Link className="btn btn-primary" to="/customer-feedback&complaint-detail" state={{ data: data }} >View</Link> */}
                                      </td>
                                    </>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        <div className="table-responsive">
                          <table
                            id="example4"
                            className="table card-table display mb-4 shadow-hover table-responsive-lg"
                            style={{ minWidth: "845px", textAlign: "center" }}
                          >
                            <thead>
                              <tr>
                                <th>Enq. No.</th>
                                <th>Customer Name</th>
                                <th>Mobile No.</th>
                                <th>IC Name</th>
                                <th>Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading && <Loader />}
                              {data && data.length === 0 ? (
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
                                feedbackData?.map((data, index) => (
                                  <tr>
                                    <>
                                      <th>{data?.enquiry?.id}</th>
                                      <th>
                                        {data?.enquiry?.customer?.firstName}
                                        {data?.enquiry?.customer?.lastName}
                                      </th>
                                      <th>
                                        {data?.enquiry?.customer?.primary_phone}
                                      </th>

                                      <td>
                                        {data?.enquiry?.user?.firstName}{" "}
                                        {data?.enquiry?.user?.lastName}
                                      </td>
                                      <td>
                                        {moment(data?.createdAt).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </td>
                                      <td>
                                        <Link
                                          className="btn btn-primary"
                                          to="/customer-feedback&complaint-detail"
                                          state={{ data: data }}
                                        >
                                          View
                                        </Link>
                                      </td>
                                    </>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} toggle={modalTogggle}>
        <ModalHeader>Complaints Detail</ModalHeader>
        <ModalBody>
          <div className="container">
            {complaintDetail?.map((data) => (
              <div>
                <h3>{data?.name}:</h3>
                <p className="mx-3">{data?.type}</p>
              </div>
            ))}
            <div>
              <Link
                className="btn btn-primary"
                to="/AddInstalerSchdule"
                state={customerDetail}
              >
                Assign Installer
              </Link>
              <button
                className="btn btn-primary mx-2"
                onClick={completeComplaintHandler}
              >
                Complete Complaint{" "}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default ComplaintList;
