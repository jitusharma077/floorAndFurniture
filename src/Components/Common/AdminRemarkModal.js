import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { PostDataWithToken } from "../ApiHelper/ApiHelper";
import { useLocation } from "react-router-dom";
import { toast } from "material-react-toastify";

const AdminRemarkModal = ({ remarkModal, toggle, enquiryId }) => {
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const submitHandler = (data) => {
        const submitData = {
            enquiryId: enquiryId,
            remark: data.remarks
        }
        PostDataWithToken(`superadmin/add-remark`, submitData).then((response) => {
            if (response.status === true) {
                toast.success("remarks added successfully");
                toggle();
            }
        })
    }

    return <Modal isOpen={remarkModal} toggle={toggle}>
        <ModalHeader>Add Admin Remarks here
        </ModalHeader>
        <ModalBody>
            <form
                onSubmit={handleSubmit(submitHandler)}
            >
                <div className="mb-3 row align-items-center">
                    <div className="col-lg-12 my-1">
                        <textarea className="form-control" {...register("remarks", {
                            required: "please enter outlet password",
                        })} />
                        {/* <button className="btn btn-primary">submit</button> */}
                    </div>

                </div>
                <div className="form-buttons text-end">
                    <button
                        onClick={toggle}
                        className="btn btn-secondary me-3"
                    >
                        Cancel
                    </button>

                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </ModalBody>
    </Modal>
        ;
}
export default AdminRemarkModal;