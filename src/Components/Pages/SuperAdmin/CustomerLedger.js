import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function CustomerLedger() {
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
                                </div>
                            </div>
                            </div>
                     </div>
                </div>          
      </div>
        </>
    );
}
export default CustomerLedger;