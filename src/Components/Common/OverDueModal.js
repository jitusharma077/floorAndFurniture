import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";
import { useState,useEffect } from "react";
import moment from "moment";
function OverdueModal({ openModal, toggle,toggle2,setRowName,setColumnName,mainSetCallApi }) {
    const [data, setData] = useState();
    let todayDate=moment(new Date()).format('YYYY-MM-DD');
    useEffect(() => {
        GetDataWithToken(`superadmin/get-enquiry-summary?date=${todayDate}`).then((response) => {
            if (response.status === true) {
                setData(response.data);  
                
           }
       }) 
    }, [])

    const closeBtn = (
    <button className="btn btn-primary" onClick={toggle} type="button">
      &times;
    </button>
    );
    
    const columnHandler = (name,value,row) => { 
        if (value > 0) {
            mainSetCallApi(true);
            toggle2();
            setColumnName(name);
            setRowName(row);
           
        }
    }    

    return <Modal isOpen={openModal} centered toggle={toggle} size='lg'>
        <ModalHeader className='ms-2' close={closeBtn}>Summary Report</ModalHeader>
        <ModalBody >
            <Table bordered>
                <thead>
                    <tr>
                      <th>Name</th>
                      <th> overdue</th>
                      <th>Pending</th>
                      <th>today</th>
                      <th> closed</th>
                      <th>Cancelled</th>
                      <th>Varient</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((data) =>
                        <tr>
                       <td>{ data?.name }</td>
                       <td onClick={()=>columnHandler('Overdue',data?.Overdue,data?.name)}>{ data?.Overdue }</td>
                       <td onClick={()=>columnHandler('Pending',data?.Pending,data?.name)}>{ data?.Pending }</td>
                       <td onClick={()=>columnHandler('Today',data?.Today,data?.name)}>{ data?.Today }</td>
                       <td onClick={()=>columnHandler('Closed',data?.Closed,data?.name)}>{ data?.Closed }</td>
                       <td onClick={()=>columnHandler('Cancelled',data?.Cancelled,data?.name)}>{ data?.Cancelled }</td>
                       <td onClick={()=>columnHandler('Varient',data?.Varient,data?.name)}>{ data?.Varient }</td>
                    </tr>)}
                </tbody>
            </Table>
        </ModalBody>
    </Modal>
}
export default OverdueModal;