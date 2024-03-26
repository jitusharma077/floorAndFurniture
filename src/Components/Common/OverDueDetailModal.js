import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner, Table } from "reactstrap";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";
import moment from "moment";

function OverdueDetails({ openModal, toggle,
  rowName, columnName, mainCallApi,
  mainSetCallApi, storeId, salesPersonId, date }) {

  const [data, setData] = useState([]);
  // let date = moment(new Date()).format('YYYY-MM-DD');
  const [isLoading, setIsLoading] = useState(false);
  const closeHandler = () => {
    toggle();
  };

  let todayDate = moment(new Date()).format('YYYY-MM-DD');
  let yesterdayDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
  let tomorrowDate = moment().add(1, 'day').format('YYYY-MM-DD');

  const closeBtn = (
    <button className="btn btn-primary" onClick={closeHandler} type="button">
      &times;
    </button>
  );

  useEffect(() => {
    let apiLink;
    if (mainCallApi) {
      let fromDate = date?.fromDate ? `${moment(date?.fromDate)?.format("YYYY-MM-DD")} 00:00:00` : ``;
      let toDate = date?.toDate ? `${moment(date?.toDate)?.format("YYYY-MM-DD")} 00:00:00` : ``;

      if (todayDate === moment(date?.fromDate).format('YYYY-MM-DD') && todayDate === moment(date?.fromDate).format('YYYY-MM-DD')) {
        apiLink = `superadmin/get-enquiry-summary-details?RowName=${columnName}&ColumnName=${rowName}&date=${todayDate}&fromDate=${fromDate}&toDate=${toDate}&storeId=${storeId}&salesId=${salesPersonId}`;
      } else if (yesterdayDate === moment(date?.fromDate).format('YYYY-MM-DD') && yesterdayDate === moment(date?.fromDate).format('YYYY-MM-DD')) {
        apiLink = `superadmin/get-enquiry-summary-details?RowName=${columnName}&ColumnName=${rowName}&date=${yesterdayDate}&fromDate=${fromDate}&toDate=${toDate}&storeId=${storeId}&salesId=${salesPersonId}`;
      } else if (tomorrowDate === moment(date?.fromDate).format('YYYY-MM-DD') && tomorrowDate === moment(date?.fromDate).format('YYYY-MM-DD')) {
        apiLink = `superadmin/get-enquiry-summary-details?RowName=${columnName}&ColumnName=${rowName}&date=${tomorrowDate}&fromDate=${fromDate}&toDate=${toDate}&storeId=${storeId}&salesId=${salesPersonId}`;
      }
      else {
        apiLink = `superadmin/get-enquiry-summary-details?RowName=${columnName}&ColumnName=${rowName}&fromDate=${fromDate}&toDate=${toDate}&storeId=${storeId}&salesId=${salesPersonId}`;
      }
      setIsLoading(true);
      GetDataWithToken(apiLink)
        .then((response) => {
          if (response.status === true) {
            mainSetCallApi(false);
            setData(response.data);
            setIsLoading(false);
          }
          setIsLoading(false);
          mainSetCallApi(false);
        }
        )
    }
  }, [mainCallApi]);

  return (
    <Modal isOpen={openModal} fullscreen toggle={toggle} scrollable>
      <ModalHeader className='ms-2' close={closeBtn}>Task Details</ModalHeader>
      <ModalBody>
        {isLoading ?

          <div className="d-flex justify-content-center py-4">
            <Spinner />
          </div>

          : <Table bordered>
            <thead>
              <tr>
                {/* <th>Category Name</th> */}
                <th>TASK DATE</th>
                <th>ENQUIRY NO.</th>
                <th>CUSTOMER NAME</th>
                <th>SALES PERSON NAME</th>
                <th>CATEGORY NAME</th>
                <th>AGING</th>
                <th>DAYS</th>
                <th>DATE</th>
                <th>REASON FOR RESCHEDULE</th>
                <th>COUNT OF RESCHEDULE</th>
                {rowName === "Cancelled" && <th>REMARK</th>}
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data) =>
                <tr>
                  <td>{data?.createdAt && moment(data?.createdAt)?.format("DD/MM/YYYY")}</td>
                  <td>{data?.enquiryId}</td>

                  <td>{data?.customer?.firstName} {data?.customer?.lastName}</td>
                  <td>{data?.user?.firstName} {data?.user?.lastName}</td>
                  <td>{data?.products}</td>
                  <td>{data?.aging}</td>
                  <td>{data?.days}</td>
                  <td>
                    {data?.enquiryschedules?.date && moment(data?.enquiryschedules?.date)?.format('DD/MM/YYYY')}
                    {data?.installer_tasks?.date && moment(data?.installer_tasks?.date)?.format('DD/MM/YYYY')}
                    {data?.order?.order_date && moment(data?.order?.order_date)?.format('DD/MM/YYYY')}
                  </td>

                  <td>{data?.reschedule_remark}</td>
                  <td>{data?.reschedule_count}</td>
                  {rowName === "Cancelled" && <td>{data?.remark}</td>}
                  <td>
                    {/* {rowName} */}

                    {rowName === "Pending" && columnName === "Estimate" ? data?.status : rowName === "Overdue" ? "Overdue" : (
                      data?.enquiryschedules?.status ? data?.enquiryschedules?.status : data?.installer_tasks?.status ? data?.installer_tasks?.status : data?.order?.order_status ? data?.order?.order_status : data?.status
                    )}
                    {/* { && (data?.installer_tasks?.status ? data?.installer_tasks?.status : data?.status)}
                     {data?.order?.order_status ? data?.order?.order_status : data?.status} */}

                  </td>
                </tr>)}
            </tbody>
          </Table>}
      </ModalBody>
    </Modal>
  )
}
export default OverdueDetails;