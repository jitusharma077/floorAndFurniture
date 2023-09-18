import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import Loader from "../../Common/Loader";
import moment from "moment";
import { Link } from "react-router-dom";

const ComplaintList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        GetDataWithToken(`superadmin/get-customer-complaints`).then((response) => {
            setData(response.data);
            setIsLoading(false);
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