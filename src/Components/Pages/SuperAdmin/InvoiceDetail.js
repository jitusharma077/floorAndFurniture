import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Table } from "reactstrap";

function InvoiceDetails() {
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
                                             <h4 className="card-title">Invoice details</h4>
                                        </div>
                                    </div> 
                                    <div class="row">
                                        <div class="col-lg-6">
                                        <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong>Invoice No:</strong>
                                                      <span class="mb-0">SO-2324-12985</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Invoice Date:</strong>
                                                    <span class="mb-0">july 19,2023</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                   
                                                    <strong>Order No:</strong>
                                                     <span class="mb-0">7836010872</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Order Date:</strong>
                                                    <span class="mb-0">18 Jul 2023, 13:03 SEND TO SEC 32</span>
                                            </li>
                                                
                                               <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>AWB No.</strong>
                                                    <span class="mb-0">83601087</span>
                                                </li>
                                                 <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Type</strong>
                                                    <span class="mb-0">Credit Note</span>
                                                </li>
                                                 <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Delivery Name</strong>
                                                    <span class="mb-0">FFG-Concept Store-Head office</span>
                                                </li>
                                            </ul>
                                        </div>
                                       
                                        <div class="col-lg-6">
                                        <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong>Delivery Mode</strong>
                                                      <span class="mb-0">shipping</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Transport</strong>
                                                    <span class="mb-0">--</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                   
                                                    <strong>Sales Person Name</strong>
                                                     <span class="mb-0">Anamika</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                   
                                                    <strong>Sales Person Email</strong>
                                                     <span class="mb-0">retailbd@fandf.in</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Sales Person Contact</strong>
                                                    <span class="mb-0">8092432016</span>
                                            </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Remarks:</strong>
                                                    <span class="mb-0">Due to material recd. back vide inv-I-2324-08670/13-Jun-23</span>
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
                                              Quantity
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

export default InvoiceDetails;