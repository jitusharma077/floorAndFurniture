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
  TabContent,TabPane,Row,Col
} from 'reactstrap';
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import OrdersModal from "../../Common/OrdersModal";
import moment from "moment";

function Invoices() {
    const navigate = useNavigate();
     const [tabOpen, setTabOpen] = useState("1");
    const [callApi, setCallApi] = useState(true);
    const [invoiceData, setInvoiceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, settotalPage] = useState(10);
    const [invoiceType, setInvoiceType] = useState('INVOICES');
    const [searchData, setSearchData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false); 
    const [customerCode, setCustomerCode] = useState('');
     const[deliveryName, setDeliveryName] = useState('');
    const [date, setDate] = useState({
    fromDate: '',
    toDate: '',
    });

    const modalToggle = () => setOpenModal(!openModal);

    const handlePageClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index + 1);
        setCallApi(true);
        setInvoiceData([]);
        setIsLoading(true);
       
    };

   const setTabValue=(value)=>{
        setTabOpen(value);
        tabOpen === "1" ? setInvoiceType('CREDIT_NOTE') : setInvoiceType('INVOICES');
        setCallApi(true);
       setInvoiceData([]);
       setIsLoading(true);
       setCurrentPage(1);
    }

    const searchDataHandler = () => {
        setCurrentPage(1);
        console.log(searchData)
        setCallApi(true);
        setIsLoading(true);
         setInvoiceData([]);
    }

    let fromDate = date?.fromDate ?moment(date?.fromDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD"):'';
    let toDate = date?.toDate ? moment(date?.toDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD"):'';

    useEffect(() => {
        if (callApi) {
            GetDataWithToken(`superadmin/get-invoice?page=${currentPage}&pageSize=10&&costumerCode=${customerCode}&typeCode=${invoiceType}&fromDate=${fromDate}&toDate=${toDate}&searchText=${searchData}&deliveryName=${deliveryName}`)
                .then((response) => {
                    if (response.status === true) { 
                        console.log(response?.data);
                        setCallApi(false);
                        setInvoiceData(response?.data);
                        settotalPage(response?.data?.length > 0 && Math?.ceil(response?.total / 10));
                        setIsLoading(false);
                    }
                    setIsLoading(false);
            })
        }
    },[callApi])

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
                                             <h4 className="card-title">Invoices</h4>
                                        </div>
                                          <div className="col-lg-7 d-flex">
                                              <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                onChange={(e) => {
                                                    setSearchData(e.target.value);
                                                }}
                                                />
                                                 <button className="btn btn-primary ms-2" onClick={searchDataHandler}>Search
                                                 </button>
                                        </div>
                                       <div className="col-lg-2 d-flex">
                                                <button className="btn btn-primary ms-5" onClick={modalToggle}>Filter
                                                </button>
                                          </div>
                                    </div>
                                    <div>
                                        <Nav tabs>
                                            <NavItem>
                                            <NavLink
                                                className={tabOpen==="1"?"active":""}
                                                onClick={()=>setTabValue('1')}
                                            >
                                                INVOICE
                                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                            <NavLink
                                                className={tabOpen==="2"?"active":""}
                                                onClick={()=>setTabValue('2')}
                                            >
                                                CREDIT-NOTE
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
                                                    <th>Invoice No:</th>
                                                    <th>Invoice Date:</th>
                                                                <th>Delivery name</th>
                                                                <th>Invoices</th>
                                                                                      
                                                </tr>
                                                </thead>
                                                        <tbody>
                                                            {isLoading && <Loader />} 

                                                       

                                                     {invoiceData && invoiceData?.length == 0 ? (
                            <h3
                              style={{
                                position: "absolute",
                                left: "40%",
                                padding: "10px",
                              }}
                            >
                              No data found
                            </h3>
                          ) :    invoiceData?.map((data,index) =>
                                                             < tr >
                                                             <td>{ index + 1 }</td>
                                                             <td>{ data?.InvoiceDate?.split('T')?.[0] }</td>
                                                             <td>{ data?.DeliveryName }</td>
                                                             <td>
                                                                    <button className="btn btn-primary" onClick={() => {
                                                                     navigate("/invoice-detail", {
                                                                         state: {
                                                                                data:data?.Code
                                                                            }
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
                                                    <th>Invoice No:</th>
                                                    <th>Invoice Date:</th>
                                                    <th>Delivery name</th>
                                                     <th>Action</th>                                         
                                                </tr>
                                                </thead>
                                                        <tbody>
                                                         {isLoading && <Loader />}      
                                                       {invoiceData && invoiceData?.length == 0 ? (
                                                            <h3
                                                            style={{
                                                                position: "absolute",
                                                                left: "40%",
                                                                padding: "10px",
                                                            }}
                                                            >
                                                            No data found
                                                            </h3>
                                                        ) :  invoiceData?.map((data,index) =>
                                                             < tr >
                                                             <td>{ index + 1 }</td>
                                                             <td>{ data?.InvoiceDate?.split('T')?.[0] }</td>
                                                             <td>{ data?.DeliveryName }</td>
                                                             <td>
                                                                   <button className="btn btn-primary" onClick={() => {
                                                                       navigate("/invoice-detail",{
                                                                           state: {
                                                                             data:data?.Code
                                                                         }
                                                                         })
                                                                   }}>
                                                                    view   
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
                                </div>
                            </div>
                               <PaginationComponent
                                 totalPage={totalPage}
                                 currentPage={currentPage}
                                 setCallApi={(val) => setCallApi(val)}
                                 setCurrentPage={(val) => setCurrentPage(val)}
                                 handlePageClick={handlePageClick}
                             />
                            </div>
                     </div>
                </div>        
            </div>
             <OrdersModal
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
            />  
        </>
    );
}
export default Invoices;