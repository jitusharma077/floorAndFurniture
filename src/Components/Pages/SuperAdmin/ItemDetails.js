import { useLocation } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { useState, useEffect } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import {
  Nav,
  NavItem,
    NavLink,
  TabContent,TabPane,Row,Col
} from 'reactstrap';


function ItemDetails() {
     const location = useLocation();
     const [tabOpen, setTabOpen] = useState("1");
     const [tabOpen2, setTabOpen2] = useState("3");
     const [detailsData, setDetailsData] = useState();
    //  const [productCode, setProductCode] = useState();
     const[tableData, setTableData] = useState({});
     const setTabValue = (value) => {
          setTabOpen(value);
     };
    
    const setTabValue2 = (value) => {
        setTabOpen2(value);
    };
    
    useEffect(() => {

         GetDataWithToken(`superadmin/stock-item-details?code=${location?.state?.itemId}&companyCode=ffg`).then(
        (response) => {
         if (response.status === true) {
          console.log('details dataaa',response?.data)
          setDetailsData(response?.data);  
           }
         }
       );
        GetDataWithToken(`superadmin/stock-common-details/${location?.state?.itemId}`)
            .then((response) => {
                if (response.status === true) {
                      setTableData(response?.data);
                  }       
            })  
     }, []);

    return (
        <>
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
                                             <h4 className="card-title">Order details</h4>
                                        </div>
                                    </div> 
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div
                                            style={{marginLeft: '25%', marginTop: '10%'}}
                                            >
                                                <img src="" width="50%" />
                                               <button className="btn btn-primary ms-2">Find alternate items
                                                 </button>
                                            </div>  
                                        </div>
                                       
                                        <div class="col-lg-6">
                                            <ul class="list-group list-group-flush">
                                                <li>
                                                    <h1 className="card-title">Macaron Ivory</h1>
                                                    <div>
                                                         <strong>PRODUCT CODE:</strong>
                                                        <span class="mb-0">{detailsData?.ITEMID}</span>
                                                    </div>
                                                    <div>
                                                         <strong>SEARCH NAME:</strong>
                                                        <span class="mb-0">{detailsData?.SearchName }</span>
                                                    </div>
                                                    <div>
                                                         <strong>CURRENT STOCK:</strong>
                                                         <span class="mb-0">{ detailsData?.QtySO }</span>
                                                    </div>
                                                </li>
                                                 <Nav tabs>
                                            <NavItem>
                                            <NavLink
                                                className={tabOpen==="1"?"active":""}
                                                onClick={()=>setTabValue('1')}
                                            >
                                                FFI
                                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                            <NavLink
                                                className={tabOpen==="2"?"active":""}
                                                onClick={()=>setTabValue('2')}
                                            >
                                                FFG
                                            </NavLink>
                                            </NavItem>                                                                                 
                                        </Nav>
                                        <TabContent activeTab={tabOpen}>
                                            <TabPane tabId="1">
                                                     <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong> Item family code:</strong>
                                                      <span class="mb-0">null</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Reserved Qty:</strong>
                                                    <span class="mb-0">0</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                   
                                                    <strong>Current Available:</strong>
                                                     <span class="mb-0">0</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Vendor Group:</strong>
                                                    <span class="mb-0">null</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Primary vendor:</strong>
                                                    <span class="mb-0">null</span>
                                            </li> <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Contact No:</strong>
                                                    <span class="mb-0">null</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">  
                                                    <strong>External Item No:</strong>
                                                    <span class="mb-0">null</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Purchase Price:</strong>
                                                    <span class="mb-0">null</span>
                                                        </li>
                                                         <li class="list-group-item d-flex justify-content-between">
                                                    <strong>MRP:</strong>
                                                    <span class="mb-0">null</span>
                                            </li> 
                                            </TabPane>
                                                <TabPane tabId="2">
                                                      <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong> Item family code:</strong>
                                                      <span class="mb-0">{ detailsData?.ItemFamilyCode }</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Reserved Qty:</strong>
                                                    <span class="mb-0">{ detailsData?.QtySO }</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                   
                                                    <strong>Current Available:</strong>
                                                     <span class="mb-0">0</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Vendor Group:</strong>
                                                    <span class="mb-0">{ detailsData?.vendgroup }</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Primary vendor:</strong>
                                                    <span class="mb-0">{ detailsData?.VendorName }</span>
                                            </li> <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Contact No:</strong>
                                                    <span class="mb-0">{ detailsData?.ContactNo }</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">  
                                                    <strong>External Item No:</strong>
                                                    <span class="mb-0">{ detailsData?.ExternalItemId }</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Purchase Price:</strong>
                                                    <span class="mb-0">{ detailsData?.PruchasePrice }</span>
                                                        </li>
                                                         <li class="list-group-item d-flex justify-content-between">
                                                    <strong>MRP:</strong>
                                                    <span class="mb-0">{ detailsData?.MRP }</span>
                                            </li> 
                                            </TabPane>                                                                                                            
                                                </TabContent> 
                                                  <Nav tabs>
                                            <NavItem>
                                            <NavLink
                                                className={tabOpen2==="3"?"active":""}
                                                onClick={()=>setTabValue2('3')}
                                            >
                                                PO DETAILS
                                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                            <NavLink
                                                className={tabOpen2==="4"?"active":""}
                                                onClick={()=>setTabValue2('4')}
                                            >
                                                TECHNICAL DETAILS
                                            </NavLink>
                                            </NavItem>                                                                                 
                                        </Nav>
                                              <TabContent activeTab={tabOpen2}>
                                                    <TabPane tabId="3">
                                                          <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong> Qty in PO:</strong>
                                                      <span class="mb-0">0</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Expected:</strong>
                                                    <span class="mb-0">oct 19,2023</span>
                                            </li>  <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong> Bilty No:</strong>
                                                      <span class="mb-0">0</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Bilty Date:</strong>
                                                    <span class="mb-0">0</span>
                                            </li>  <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong> Transport:</strong>
                                                      <span class="mb-0">0</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Status:</strong>
                                                    <span class="mb-0">0</span>
                                                        </li>
                                                     
                                                    </TabPane>
                                                </TabContent> 
                                                <TabContent activeTab={tabOpen2}>
                                                    <TabPane tabId="4">
                                                          <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong>Reorder Qty:</strong>
                                                      <span class="mb-0">300</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Lead Period:</strong>
                                                    <span class="mb-0">120</span>
                                            </li>  <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong>Repeat Vertical:</strong>
                                                      <span class="mb-0">0</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Repeat Horizontal:</strong>
                                                    <span class="mb-0">0</span>
                                            </li>  <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong> Width:</strong>
                                                      <span class="mb-0">0</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Length:</strong>
                                                    <span class="mb-0">0</span>
                                                        </li>                           
                                                    </TabPane>
                                              </TabContent>  
                                                </ul>
                                               {tableData?.Batches?.length>0 && <table className="mt-4">
                                                    <tr>
                                                      <th>Batch</th>   
                                                      <th>Loc</th>
                                                      <th>Company</th>
                                                      <th>Qty</th>
                                                    </tr>
                                                    {tableData?.Batches?.map((data)=><tr>
                                                        <td>{ data?.Code }</td>
                                                        <td>{ data?.LocId }</td>
                                                        <td>{ data?.Company }</td>
                                                        <td>{ data?.Qty }</td>
                                                    </tr>)}
                                                </table>}   
                                        </div>
                                    </div>
                                </div>
                             </div>   
                        </div> 
                    </div>
            </div>        
        </div>   
        </>
        </>
    )
}
 
export default ItemDetails;