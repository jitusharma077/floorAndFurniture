import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

export default function EnquiryDetailModal({ isLoading, enquiryData, toggle, openModal, setEnquiryData, DownloadReportHandler, downloadLink }) {
  const navigate = useNavigate();
  const closeHandler = () => {
    toggle();
    setEnquiryData((prev) => ({
      ...prev,
      enquiryData: []
    }));
  }

  const closeBtn = (
    <button className="btn btn-primary" onClick={closeHandler} type="button">
      &times;
    </button>
  );

  return (<Modal isOpen={openModal} fullscreen toggle={closeHandler} scrollable>
    <div className="d-flex justify-content-between align-items-center py-4 px-5 ">
      <h4>Task Details</h4>
      <div>
        <button
          onClick={() => DownloadReportHandler(downloadLink)}
          className="btn btn-primary mx-1"
        >
          Download
        </button>
        {closeBtn}
      </div>
    </div>
    {/* <ModalHeader className='ms-2' close={closeBtn}>
      Task Details
     
    </ModalHeader> */}
    <ModalBody>

      {isLoading ?

        <div className="d-flex justify-content-center py-4">
          <Spinner />
        </div>

        :
        <div className="table-responsive">
          <table
            id="example4"
            className="table card-table display mb-4 shadow-hover table-responsive-lg"
            style={{ minWidth: "845px", textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Enq. No.</th>
                <th>Customer Name</th>
                <th>Mobile No.</th>
                <th>Status</th>
                {enquiryData?.[0]?.report ? <th>Report Title</th> : ""}
                {enquiryData?.[0]?.report ? <th>Report Type</th> : ""}
                {/* {enquiryData?.[0]?.report ? <th>Report Category</th> : ""} */}
                <th>Category</th>
                <th>IC</th>
                <th>Date</th>
                {enquiryData?.[0]?.description ? <th>Q1</th> : ""}
                {enquiryData?.[0]?.description ? <th>Q2</th> : ""}
                {enquiryData?.[0]?.description ? <th>Q3</th> : ""}
                {enquiryData?.[0]?.description ? <th>Q4</th> : ""}
                {enquiryData?.[0]?.description ? <th>Q5</th> : ""}
                {enquiryData?.[0]?.description ? <th>Ratings</th> : ""}
                <th>Overdue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log("length", AllEnquiry.length)} */}

              {/* {isLoading && <Loader />} */}
              {enquiryData && enquiryData.length === 0 ? (
                <h3
                  style={{
                    position: "absolute",
                    left: "40%",
                    padding: "10px",
                  }}
                >
                  No data found
                </h3>
              ) : (
                enquiryData?.map((data, index) => (
                  <tr>
                    <>
                      <th>{data?.id}</th>
                      <th>
                        {data?.customer?.firstName || data?.enquiry?.customer?.firstName}
                        {data?.customer?.lastName || data?.enquiry?.customer?.lastName}
                      </th>
                      <th>{data?.customer?.primary_phone || data?.enquiry?.customer?.primary_phone}</th>
                      <td>
                        <span
                          className={
                            data?.status || data?.enquiry?.status === "inprogess"
                              ? "badge  badge-primary"
                              : "badge badge-dark"
                          }
                        >
                          {data?.status || data?.enquiry?.status}
                        </span>
                      </td>
                      {data?.report && <td>
                        {data?.report && JSON.parse(data?.report)?.map(item =>
                          <>
                            <span>
                              {item?.title}{","}
                            </span>
                          </>
                        )}
                      </td>}
                      {data?.report && <td>
                        {data?.report && JSON.parse(data?.report)?.map(item =>
                          <>
                            <span>
                              {item?.type}{","}
                            </span>
                          </>
                        )}
                      </td>}
                      {/* <td>
                        {data?.report && JSON.parse(data?.report)?.map(item =>
                          <>
                            <span>
                              {item?.categary}{","}
                            </span>
                          </>
                        )}
                      </td> */}

                      <td>
                        {data?.products?.map((i, index) => {
                          return (
                            <p
                              style={{
                                padding: 0,
                                lineHeight: 1,
                                marginBottom: 2,
                              }}
                            >{`${i},`}</p>
                          );
                        })}
                      </td>
                      <td>
                        {data?.user?.firstName}
                        {data?.user?.lastName}
                      </td>
                      <td>
                        {moment(data?.createdAt).format("DD/MM/YYYY")}
                      </td>
                      {data?.description && data?.description?.map((item) => <>
                        <td>{item?.ans}</td>
                      </>)}
                      {/* <td>{moment(data?.overdueDate)?.format('DD/MM/YYYY') === 'Invalid date' ? data?.overdueDate : moment(data?.overdueDate)?.format('DD/MM/YYYY')}</td> */}

                      <td>{data?.overdue} {data?.overdue && typeof data?.overdue === 'number' && "days"}</td>
                      <td>
                        <button
                          onClick={() => {
                            navigate("/EnquiryDetials", {
                              state: {
                                data: data?.id,
                                category: data?.products,
                                icPerson: `${data?.user?.firstName} ${data?.user?.lastName}`,
                              },
                            });
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          View More
                        </button>
                        {/* <a
                                    href="Schedule.html"
                                    className="btn btn-primary btn-sm"
                                  >
                                    Enquiry Assignment
                                  </a> */}
                      </td>
                    </>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>}
    </ModalBody>
  </Modal>
  )
}
