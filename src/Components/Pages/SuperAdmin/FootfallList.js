import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";

const FootfallList = () => {
    const [clientList, setClientList] = useState([]);
    const ListHeading = ["Client Name", "category", "Customer Group", "Customer Type", "Mobile Number", "Query Register", "Action"]
    useEffect(() => {
        GetDataWithToken("customer/get-client").then((response) => {
            if (response.status === true) {
                setClientList(response.data);
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
                                        <h4 className="fs-20">Purchase History</h4>
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
                                                        <td>{data?.category}</td>
                                                        <td>{data?.customerGroup}</td>
                                                        <td>{data?.customerType}</td>
                                                        <td>{data?.mobileNo}</td>
                                                        <td>{data?.query_register}</td>
                                                        <td><button className="btn btn-primary">View</button></td>
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