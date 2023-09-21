import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent, TabPane, Row, Col
} from 'reactstrap';
import Loader from "../../Common/Loader";
import moment from "moment";
import { Link } from "react-router-dom";

const ComplaintList = () => {
    const [data, setData] = useState([]);
    const [feedbackData, setFeedbackData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tabOpen, setTabOpen] = useState("1");

    const setTabValue = (value) => {
        setTabOpen(value);
        // tabOpen === "1" ? setInvoiceType('CREDIT_NOTE') : setInvoiceType('INVOICES');
        // setCallApi(true);
        // setInvoiceData([]);
        // setIsLoading(true);
        // setCurrentPage(1);
    }


    useEffect(() => {
        GetDataWithToken(`superadmin/get-customer-complaints`).then((response) => {
            setData(response.data);
            setIsLoading(false);
        })
        GetDataWithToken(`customer/get-feedback`).then((response) => {
            setFeedbackData(response.data);
        })
    }, [])
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
                                                    onClick={() => setTabValue('1')}
                                                >
                                                    COMPLAINTS
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink

                                                    className={tabOpen === "2" ? "active" : ""}
                                                    onClick={() => setTabValue('2')}
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
                                                                <th>Status</th>
                                                                <th>Complaints</th>
                                                                <th>Issue Date</th>
                                                                <th>Resolve Date</th>
                                                                {/* <th>Action</th> */}
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
                                                                            <th>{data?.enquiry?.customer?.primary_phone}</th>
                                                                            <td>
                                                                                <span
                                                                                    className={
                                                                                        data?.status === "inprogess"
                                                                                            ? "badge  badge-primary"
                                                                                            : "badge badge-dark"
                                                                                    }
                                                                                >
                                                                                    {data?.status}
                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                {data?.complaint_info &&
                                                                                    JSON.parse(data?.complaint_info)?.length}
                                                                                {/* {data?.complaint_info &&
                                                                            JSON.parse(data?.complaint_info)?.map((data) => <p>{data?.type}</p>)} */}
                                                                            </td>
                                                                            <td>
                                                                                {moment(data?.createdAt).format("DD/MM/YYYY")}
                                                                            </td>
                                                                            <td>
                                                                                {moment(data?.date).format("DD/MM/YYYY")}
                                                                            </td>
                                                                            {/* <td>
                                                                                <Link className="btn btn-primary" to="/customer-feedback&complaint-detail" state={{ data: data }} >View</Link>
                                                                            </td> */}
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
                                                                {/* <th>Status</th>
                                                                <th>Complaints</th>
                                                                <th>Issue Date</th>
                                                                <th>Resolve Date</th> */}
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
                                                                            <th>{data?.enquiry?.customer?.primary_phone}</th>
                                                                            {/* <td>
                                                                                <span
                                                                                    className={
                                                                                        data?.status === "inprogess"
                                                                                            ? "badge  badge-primary"
                                                                                            : "badge badge-dark"
                                                                                    }
                                                                                >
                                                                                    {data?.status}
                                                                                </span>
                                                                            </td> */}
                                                                            {/* <td>
                                                                                {data?.complaint_info &&
                                                                                    JSON.parse(data?.complaint_info)?.length}
                                                                                {data?.complaint_info &&
                                                                            JSON.parse(data?.complaint_info)?.map((data) =>
                                                                             <p>{data?.type}</p>)}
                                                                            </td> */}
                                                                            {/* <td>
                                                                                {moment(data?.createdAt).format("DD/MM/YYYY")}
                                                                            </td>
                                                                            <td>
                                                                                {moment(data?.date).format("DD/MM/YYYY")}
                                                                            </td> */}
                                                                            <td>
                                                                                <Link className="btn btn-primary" to="/customer-feedback&complaint-detail" state={{ data: data }} >View</Link>
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
            </div >
        </>
    );
}
export default ComplaintList;