import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { Link } from "react-router-dom";

const FootfallList = () => {
    const [clientList, setClientList] = useState([]);
    const [footfallDashboard, setFootfallDashboard] = useState({});
    const ListHeading = ["Client Name", "category", "Customer Group", "Customer Type", "Mobile Number", "Query Register", "Action"]
    useEffect(() => {
        GetDataWithToken("customer/get-client").then((response) => {
            if (response.status === true) {
                setClientList(response.data);
            }
        })
        GetDataWithToken("customer/walkin-dashboard?fromDate=2024-03-29 00:00:00&toDate=2024-03-29 11:59:59").then((response) => {
            if (response.status === true) {
                setFootfallDashboard(response.data);
            }
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
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <h4 className="fs-20">Footfall Dashboard</h4>
                                        <div className="newest ms-3">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <h4 className="fs-20">Footfall List</h4>
                                        <div className="newest ms-3">
                                            {/* <input type="date" className="default-select"  /> */}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="table-responsive">
                                            <table
                                                className="table card-table display mb-4 shadow-hover table-responsive-lg"
                                                id="guestTable-all"
                                            >
                                                <thead>
                                                    <tr>
                                                        {ListHeading?.map((data) => <th>{data}</th>)}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {clientList?.map((data) => <tr>
                                                        <td>{data?.clientName}</td>
                                                        <td>{data?.category && JSON.parse(data?.category)?.map((data, index) => <p className="p-0 m-0">{index + 1}. {data}</p>)}</td>
                                                        <td>{data?.customerGroup}</td>
                                                        <td>{data?.customerType}</td>
                                                        <td>{data?.mobileNo}</td>
                                                        <td>{data?.query_register}</td>
                                                        <td><Link
                                                            to="/footfall-detail"
                                                            state={data}
                                                            className="btn btn-primary">View</Link
                                                        ></td>
                                                    </tr>)}
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
    )
}
export default FootfallList;