import { useEffect, useState } from "react";
import { GetData, GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CustomerComplaintCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("locationnn...", location.state?.data);
  const [materialList, setMaterialList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("submit dataaaa...", data);
    GetData(`customer/get-complaints-category-wise?materialId=[${data?.category}]`).then((response) => {
      if (response.status === true) {
        // console.log("dataaa array", complaintData);
        navigate("/customer-complaint-form", { state: { data: response.data, enquiry: location.state?.data } });
      }
    })
  }

  useEffect(() => {
    GetDataWithToken(`customer/get-my-room?enquiryId=${location?.state?.data?.id}`).then(response => {
      setMaterialList(response.data)
    })
  }, [])

  return (<>
    <div className="authincation h-100">
      <div className="container h-100vh">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-xl-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="card-header">
                    <h4>Select category </h4>
                    <span onClick={() => { navigate(-1) }} style={{ cursor: "pointer" }}><i className="fas fa-arrow-left" style={{ fontSize: "20px" }}></i></span>
                  </div>
                  <div className="container-fluid">
                    <div className="row flex-item-center">
                      <div className="col-xl-12">
                        <div className="p-5 mx-2">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                              {materialList?.map((data, index) =>
                                data?.selectedmaterials?.map((data) => {
                                  return (
                                    <div>
                                      <input type="checkbox"
                                        className="form-check-input mx-2"
                                        value={data?.material?.id}
                                        {...register(`category`, {
                                          required: true,
                                          maxLength: 80,
                                        })}
                                      />
                                      <label>{data?.material?.name}</label>
                                    </div>
                                  )
                                })
                              )}
                              <div>

                              </div>
                              <button className="btn btn-primary mt-4" type="submit">Next</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default CustomerComplaintCategory;