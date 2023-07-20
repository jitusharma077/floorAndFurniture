import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Table } from "reactstrap";

function OrderDetails() {
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
                                             <h4 className="card-title">Order details</h4>
                                        </div>
                                    </div> 
                                    <div class="row">
                                        <div class="col-lg-6">
                                        <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong>Order No.</strong>
                                                      <span class="mb-0">SO-2324-12985</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Order Date.</strong>
                                                    <span class="mb-0">july 19,2023</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                   
                                                    <strong>Sales person Contact</strong>
                                                     <span class="mb-0">7836010872</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Remarks.</strong>
                                                    <span class="mb-0">18 Jul 2023, 13:03 SEND TO SEC 32</span>
                                            </li>
                                                
                                               <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Delivery Mode</strong>
                                                    <span class="mb-0">By Van</span>
                                            </li>
                                            </ul>
                                        </div>
                                       
                                        <div class="col-lg-6">
                                        <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong>Customer No.</strong>
                                                      <span class="mb-0">FFG-C-61932</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Sales Person Name</strong>
                                                    <span class="mb-0">Jagadish Singh</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                   
                                                    <strong>Sales Person Email</strong>
                                                     <span class="mb-0">retailbd@fandf.in</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Transport</strong>
                                                    <span class="mb-0">By Van</span>
                                            </li>
                                                
                                               <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Delivery Name</strong>
                                                    <span class="mb-0">dfsfa</span>
                                            </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div>
                                         <div className="col-lg-3">
                                             <h4 className="card-title">items</h4>
                                        </div>
                                        <Table bordered>
                                          <thead>
                                             <tr>
                                               <th>
                                               item
                                            </th>
                                            <th>
                                               ordered
                                            </th>
                                            <th>
                                               pending
                                            </th>
                                            <th>
                                               Shipping date
                                                    </th>
                                                    <th>
                                              status
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td>
                                               BOOK ESLA & HANS
                                            </td>
                                            <td>
                                               1
                                            </td>
                                            <td>
                                               1
                                            </td>
                                            <td>
                                                july 1 2023
                                                    </td>
                                                    <td>
                                                open order
                                            </td>
                                            </tr>
                                        </tbody>
                                        </Table>
                                    </div>
                                </div>
                             </div>   
                        </div> 
                    </div>
            </div>        
        </div>        
       </>
    );
}

export default OrderDetails;