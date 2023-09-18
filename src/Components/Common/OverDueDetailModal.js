import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";
import moment from "moment";

function OverdueDetails({openModal,toggle,rowName,columnName,mainCallApi,mainSetCallApi}) {
  const [data, setData] = useState([]);
  let date=moment(new Date()).format('YYYY-MM-DD');
  const closeBtn = (
    <button className="btn btn-primary" onClick={toggle} type="button">
      &times;
    </button>
   );

  useEffect(() => { 
   if(mainCallApi){GetDataWithToken(`superadmin/get-enquiry-summary-details?ColumnName=${columnName}&RowName=${rowName.toUpperCase()}&date=${date}`)
      .then((response) =>{
        if (response.status === true) {
           mainSetCallApi(false);
           setData(response.data);
        }
         mainSetCallApi(false);
      }
      )}
  }, [mainCallApi]);
    return (
        <Modal isOpen={openModal} fullscreen toggle={toggle} scrollable>
            <ModalHeader className='ms-2' close={closeBtn}>Task Details</ModalHeader>
            <ModalBody>
              <Table bordered>
                <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>CUSTOMER NAME</th>
                      <th>SALES PERSON NAME</th>
                      <th>Enquiry No.</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((data) =>
                        <tr>
                        <td>{ data?.Category_Name }</td>
                        <td>{data?.customer?.firstName} { data?.customer?.lastName }</td>
                        <td>{data?.user?.firstName} { data?.user?.lastName }</td>
                       <td>{ data?.enquiryId}</td>
                        <td>
                          {data?.enquiryschedules?.date && moment(data?.enquiryschedules?.date)?.format('DD/MM/YYYY')}
                          {data?.installer_tasks?.date && moment(data?.installer_tasks?.date)?.format('DD/MM/YYYY')}
                          {data?.order?.order_date && moment(data?.order?.order_date)?.format('DD/MM/YYYY')}
                        </td>
                        <td>
                          {data?.enquiryschedules?.status && data?.enquiryschedules?.status}
                          {data?.installer_tasks?.status && data?.installer_tasks?.status}
                          {data?.order?.order_status && data?.order?.order_status}
                        </td>
                      </tr>)}
                </tbody>
            </Table>
            </ModalBody>
        </Modal>
    )
}
export default OverdueDetails;