import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import Loader from "../../Common/Loader";
import PaginationComponent from "../../Common/PaginationComponent";

import {
    Nav,
    NavItem,
    NavLink,
    TabContent, TabPane, Row, Col
} from 'reactstrap';

import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import OrdersModal from "../../Common/OrdersModal";
import moment from "moment";
import { useInView } from "react-intersection-observer";

function CustomerRequests() {

    const navigate = useNavigate();
    const [tabOpen, setTabOpen] = useState("1");
    const [callApi, setCallApi] = useState(true);
    const [installationData, setInstallationData] = useState([]);
    const [measurementData, setMeasurementData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, settotalPage] = useState(1);
    // const [invoiceType, setInvoiceType] = useState('INVOICES');
    // const [searchData, setSearchData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // const [isLoading2, setIsLoading2] = useState(true);
    // const [openModal, setOpenModal] = useState(false);
    // const [customerCode, setCustomerCode] = useState('');
    // const [deliveryName, setDeliveryName] = useState('');

    // const [date, setDate] = useState({
    //     fromDate: '',
    //     toDate: '',
    // });
    const { ref: myRef, inView: visibleElement } = useInView();

    // const modalToggle = () => setOpenModal(!openModal);

    // const handlePageClick = (e, index) => {
    //     e.preventDefault();
    //     setCurrentPage(index + 1);
    //     setCallApi(true);
    //     setInvoiceData([]);
    //     setIsLoading(true);

    // };

    const setTabValue = (value) => {
        setTabOpen(value);
        // tabOpen === "1" ? setInvoiceType('CREDIT_NOTE') : setInvoiceType('INVOICES');
        // setCallApi(true);
        // setData([]);
        // setIsLoading(true);
        setCurrentPage(1);
    }

    // const searchDataHandler = () => {
    //     setCurrentPage(1);
    //     // console.log(searchData)
    //     setCallApi(true);
    //     setIsLoading(true);
    //     setInvoiceData([]);
    // }

    useEffect(() => {
        GetDataWithToken(`customer/get-installer-slot?pageNo=${currentPage}&pageSize=10`).then((response) => {
            setInstallationData((prevData) => [...prevData, ...response.data]);
            setIsLoading(false);
            currentPage <= totalPage && setCurrentPage((prevPage) => prevPage + 1);
        })
        GetDataWithToken(`customer/get-measurer-slot?pageNo=${currentPage}`).then((response) => {
            setMeasurementData((prevData) => [...prevData, ...response.data]);
            currentPage <= totalPage && setCurrentPage((prevPage) => prevPage + 1);
        })
        // if (visibleElement) {
        //     // setCallApi(true);

        //     setIsLoading2(true);
        // }
        // if (callApi || visibleElement) {
        //     GetDataWithToken(`superadmin/get-invoice?page=${currentPage}&pageSize=10&costumerCode=${customerCode}&typeCode=${invoiceType}&fromDate=${fromDate}&toDate=${toDate}&searchText=${searchData}&deliveryName=${deliveryName}`)
        //         .then((response) => {
        //             if (response.status === true) {
        //                 settotalPage(response?.data?.length > 0 && Math?.ceil(response?.total / 10));

        //                 setCallApi(false);
        //                 setInvoiceData(prevData => [...prevData, ...response.data]);
        //                 currentPage <= totalPage && setCurrentPage((prevPage) => prevPage + 1);
        //                 console.log('currennnntttttt', currentPage)
        //                 setIsLoading(false);
        //                 setIsLoading2(false);

        //             }
        //             setIsLoading2(false);
        //             setIsLoading(false);
        //         })
        // }
    }, [callApi, visibleElement])

    // console.log('dtaaaaa', invoiceData)

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
                className="show">
                <SuperAdminHeader />
                <SuperAdminSidebar />
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="col-lg-3">
                                            <h4 className="card-title">All Requests</h4>
                                        </div>
                                        <div className="col-lg-7 d-flex">
                                            {/* <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search"
                                                onChange={(e) => {
                                                    setSearchData(e.target.value);
                                                }}
                                            />
                                            <button className="btn btn-primary ms-2" onClick={searchDataHandler}>Search
                                            </button>
                                            <div className="col-lg-2 d-flex">
                                                <button className="btn btn-primary ms-2" onClick={modalToggle}>
                                                    <i className="fa fa-filter"></i>
                                                </button> 


                                        </div>*/}
                                        </div>

                                    </div>
                                    <div className="mt-2">
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink

                                                    className={tabOpen === "1" ? "active" : ""}
                                                    onClick={() => setTabValue('1')}
                                                >
                                                    Installation Request
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink

                                                    className={tabOpen === "2" ? "active" : ""}
                                                    onClick={() => setTabValue('2')}
                                                >
                                                    measurement Request
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={tabOpen}>
                                            <TabPane tabId="1">
                                                <div className="table-responsive">
                                                    <table
                                                        id="example4"
                                                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                                                        style={{ minWidth: "845px" }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>Enquiry Id:</th>
                                                                <th>Requested Date/time</th>
                                                                <th>Customer Name:</th>
                                                                <th>IC Name:</th>
                                                                <th>Action</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {isLoading && <Loader />}
                                                            {installationData && installationData?.length == 0 ? (
                                                                <h3
                                                                    style={{
                                                                        position: "absolute",
                                                                        left: "40%",
                                                                        padding: "10px",
                                                                    }}
                                                                >
                                                                    No data found
                                                                </h3>
                                                            ) : installationData?.map((data, index) =>
                                                                < tr >
                                                                    <td>{data?.enquiry?.id}</td>
                                                                    <td>{
                                                                        moment(data?.date)?.format("DD/MM/YYYY")

                                                                    } ({data?.schedule?.start_time}-{data?.schedule?.end_time})</td>
                                                                    <td>{data?.enquiry?.customer?.firstName} {data?.enquiry?.customer?.lastName}</td>
                                                                    <td>{data?.enquiry?.user?.firstName} {data?.enquiry?.user?.lastName}</td>
                                                                    <td>
                                                                        <button className="btn btn-primary" onClick={() => {
                                                                            navigate("/AddInstalerSchdule", {
                                                                                state:
                                                                                    data

                                                                            })
                                                                        }}>
                                                                            View
                                                                        </button>
                                                                    </td>
                                                                </tr>
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
                                                        style={{ minWidth: "845px" }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>Enquiry Id:</th>
                                                                <th>Requested Date/time</th>
                                                                <th>Customer Name:</th>
                                                                <th>IC Name:</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {isLoading && <Loader />}
                                                            {measurementData && measurementData?.length == 0 ? (
                                                                <h3
                                                                    style={{
                                                                        position: "absolute",
                                                                        left: "40%",
                                                                        padding: "10px",
                                                                    }}
                                                                >
                                                                    No data found
                                                                </h3>
                                                            ) : measurementData?.map((data) =>
                                                                < tr >
                                                                    <td>{data?.enquiry?.id}</td>
                                                                    <td>{
                                                                        moment(data?.date)?.format("DD/MM/YYYY")

                                                                    } ({data?.schedule?.start_time}-{data?.schedule?.end_time})</td>
                                                                    <td>{data?.enquiry?.customer?.firstName} {data?.enquiry?.customer?.lastName}</td>
                                                                    <td>{data?.enquiry?.user?.firstName} {data?.enquiry?.user?.lastName}</td>
                                                                    <td>
                                                                        <button className="btn btn-primary" onClick={() => {
                                                                            navigate("/add-schedule", {
                                                                                state:
                                                                                    data

                                                                            })
                                                                        }}>
                                                                            View
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                    {installationData?.length > 0 && currentPage <= totalPage && <div ref={myRef} id="scroll"></div>}
                                    {isLoading && currentPage > 1 && <h3 style={{ textAlign: 'center' }}>Loading...</h3>}
                                </div>
                            </div>


                            {/* <PaginationComponent
                                 totalPage={totalPage}
                                 currentPage={currentPage}
                                 setCallApi={(val) => setCallApi(val)}
                                 setCurrentPage={(val) => setCurrentPage(val)}
                                 handlePageClick={handlePageClick}
                             /> */}
                        </div>
                    </div>
                </div>
            </div >
            {/* <OrdersModal
                openModal={openModal}
                modalToggle={modalToggle}
                setCustomerCode={setCustomerCode}
                customerCode={customerCode}
                mainCallApi={setCallApi}
                setDate={setDate}
                date={date}
                setDeliveryName={setDeliveryName}
                deliveryName={deliveryName}
                setIsLoading={setIsLoading}
                setMainData={setInvoiceData}
                setCurrentPage={setCurrentPage}
            /> */}
        </>
    );
}
export default CustomerRequests;