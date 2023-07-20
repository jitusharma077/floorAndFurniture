import { Link } from "react-router-dom";
import { useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import {
  Nav,
  NavItem,
    NavLink,
  TabContent,TabPane,Row,Col
} from 'reactstrap';

function Invoices() {
     const [tabOpen, setTabOpen] = useState("1");
    
    const setTabValue = (value) => {
        setTabOpen(value);
    }
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
                                             <h4 className="card-title">Search stock</h4>
                                        </div>
                                          <div className="col-lg-5 d-flex">
                                              <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                                 <button className="btn btn-primary ms-2">Search
                                                 </button>
                                        </div>
                                        <div className="col-lg-3 d-flex">
                                                <div className="btn btn-primary ms-2">Sort by
                                               </div>
                                            <div>
                                              <input type="radio" id="brand" name="size"/>
                                              <label for="brand">brand</label>    
                                            </div>
                                            <div>
                                              <input type="radio" id="collection" name="size"/>
                                              <label for="collection">collection</label>    
                                            </div>
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
                                                        <tr>
                                                            <td>1</td>
                                                            <td>19,july 2023</td>
                                                                <td>marc</td>
                                                             <td>
                                                                <button className="btn btn-primary">
                                                                   <Link to="/invoice-detail">
                                                                           View
                                                                    </Link>
                                                                </button>
                                                            </td>     
                                                        </tr>                        
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
                                                        <tr>
                                                            <td>1</td>
                                                            <td>19,july 2023</td>
                                                                <td>marc</td>
                                                              <td>
                                                                <button className="btn btn-primary">
                                                                    View
                                                                </button>
                                                            </td>    
                                                        </tr>                        
                                                    </tbody>
                                                </table>
                                           </div>
                                            </TabPane>                                                                                                            
                                        </TabContent>
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
export default Invoices;