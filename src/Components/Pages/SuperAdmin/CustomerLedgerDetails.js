import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Table } from "reactstrap";

function CustomerLedgerDetails() {
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
                                    </div> 
                                    <div>
                                        <Table bordered>
                                            <thead>
                                                <tr>
                                                    OPENING BAL: INR 0, CURRENT BAL: INR 0
                                                </tr>
                                             <tr>
                                               <th>
                                               Type
                                            </th>
                                            
                                                    <th>
                                              Posting Date
                                                    </th>
                                                     <th>
                                             Doc No.
                                                    </th>
                                                    <th>
                                              Debit
                                                    </th>
                                                     <th>
                                              Credit
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td>
                                               Payment
                                            </td>
                                            <td>
                                               30/04/2023
                                                    </td>
                                                    <td>
                                                        CCR-2324-00432
                                                    </td>
                                                    <td>
                                               0
                                                    </td>
                                                     <td>
                                               -1000
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

export default CustomerLedgerDetails;