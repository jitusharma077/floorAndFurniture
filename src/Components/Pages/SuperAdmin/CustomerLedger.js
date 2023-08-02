import { useEffect, useState } from "react";
import DateModal from "../../Common/DateModal";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import PaginationComponent from "../../Common/PaginationComponent";
import Loader from "../../Common/Loader";
import OrdersModal from "../../Common/OrdersModal";
import moment from "moment";

function CustomerLedger() {
  const [dateModal, setDateModal] = useState(false);
  const dateToggle = () => setDateModal(!dateModal);
   const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(10);
  const [data, setdata] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [searchData, setSearchData] = useState('');
  const [customerId, setCustomerId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false); 
   const [customerCode, setCustomerCode] = useState('');
    const [date, setDate] = useState({
    fromDate: '',
    toDate: '',
    });
  const modalToggle = () => setOpenModal(!openModal);
  
  const showLegerDetail = (data) => {
    setCustomerId(data);
    console.log('show date');
    dateToggle();
  };

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index + 1);
    setCallApi(true);
    setdata([]);
    setIsLoading(true);
    
  };

  const handleSearch = () => {
     setCurrentPage(1);
     setCallApi(true);
     setdata([]);
     setIsLoading(true);
  }

   let fromDate = date?.fromDate ?moment(date?.fromDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD"):'';
   let toDate = date?.toDate ? moment(date?.toDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD"):'';

  useEffect(() => {
     if(callApi){GetDataWithToken(`superadmin/customer?searchText=${searchData}&page=${currentPage}&pageSize=10&fromDate=${fromDate}&toDate=${toDate}&customerCode=${customerCode}`).then(
      (response) => {
         if (response.status === true) {
          
          setCallApi(false);
          setdata(response?.data);
          console.log(response?.data?.[0]?.TotalCount/10);
          settotalPage(response?.data?.length > 0 && Math?.ceil(response?.data?.[0]?.TotalCount / 10));
          console.log("totallll pageeeee", totalPage);
          setIsLoading(false);
         }
         setIsLoading(false);
      }
    );  
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
                                             <h4 className="card-title">Customer Ledger</h4>
                                        </div>
                                          <div className="col-lg-7 d-flex">
                                              <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                    onChange={(e)=> setSearchData(e.target.value)}  
                                                />
                                                 <button className="btn btn-primary ms-2" onClick={handleSearch}>Search
                                                 </button>
                                        </div>
                                         <div className="col-lg-5 d-flex">
                                            <button className="btn btn-primary ms-3" onClick={modalToggle}>Filter
                                            </button>
                                          </div> 
                    </div>
                     <table
                        id="example4"
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                        style={{ minWidth: "845px" }}
                      >
                        <thead>
                          <tr>
                            <th>S.NO.</th>
                            <th>CUSTOMER NAME</th>
                            <th>Action</th>                                    
                          </tr>
                        </thead>
                      <tbody>
                        {isLoading&&<Loader />}
                              {data && data?.length == 0 ? (
                            <h3
                              style={{
                                position: "absolute",
                                left: "40%",
                                padding: "10px",
                              }}
                            >
                              No data found
                            </h3>
                          ) :    data?.map((data,index)=><tr>
                                <td>{ index + 1 }</td>
                                <td>{ data?.NAME }</td>
                                 <td >
                                    <button className="btn btn-primary"  onClick={()=>showLegerDetail(data?.ACCOUNTNUM)}>
                                        View
                                    </button>
                                 </td>                                 
                              </tr>)  }                      
                        </tbody>
                      </table>
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
        <DateModal dateModal={dateModal} dateToggle={dateToggle} customerId={customerId} />
         <OrdersModal
        openModal={openModal}
        modalToggle={modalToggle}
        setCustomerCode={setCustomerCode}
        mainCallApi={setCallApi}
        setDate={setDate}
        date={date}
        ledger={'ledger'}  
        setIsLoading={setIsLoading}  
        setMainData={setdata}  
      />   

        </>
    );
}
export default CustomerLedger;