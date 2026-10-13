import Main from "../layout/Main";
import { useState,useEffect } from "react";
import api from "../../api/axios";
import { FaEdit,FaTrash } from "react-icons/fa";

function Department(){
    const [showModal,setShowModal] = useState(false);
    const [departments,setDepartments]=useState([]);
    const [errors,setErrors]=useState({});
    const [isEdit,setIsEdit]=useState("");
    const [formData,setFormData]=useState({
        department:"",
        status:"",
    });

    const fetchDepartment = async() => {
        try{
            const res=await api.get('/departments');
            setDepartments(res.data.data);
        }
        catch(error){
            console.error("Error while fetching data",error);
        }
    }

    const validator=()=>{
        const newErrors={};
        if(!formData.department.trim())newErrors.department = "Department is required";
        if(!formData.status.trim())newErrors.status = "Status is required";
        return newErrors;
    } 

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]:""
        });
    }

    const handleEdit=(dept)=>{
        setShowModal(true);
        setIsEdit(dept.id);
        setFormData({
            department:dept.department,
            status:dept.status,
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const validationErrors=validator();
        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors);
            return;
        }
        try{
            if(isEdit){
                await api.put(`/department/${isEdit}`,formData);
                alert("Department updated successfully");
            }
            else{
                await api.post('/saveDepartment',formData);
                alert("Department saved successfully");
            }
            setShowModal(false);
        }
        catch(error){
            console.error("Error while saving / updating data",error);
        }
    }

    const addDepartment=()=>{
        setShowModal(true);
    }

    useEffect(()=>{
        fetchDepartment();
    },[]);

    return(
        <Main>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-primary" type="button" onClick={addDepartment} >Add Department</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Department Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departments.map((dept,index)=>(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{dept.department}</td>
                                            <td>{dept.status===1?"Active":"Inactive"}</td>
                                            <td className="d-flex gap-2">
                                               <button className="btn btn-sm btn-primary" onClick={()=> handleEdit(emp)} ><FaEdit size={15}/></button>
                                               <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(emp.id)}><FaTrash size={15}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {showModal &&(
                    <div className="modal show fade d-block" style={{ backgroundColor: '#00000079' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Add Department</h5>
                                    <button className="btn btn-sm btn-close" onClick={()=>setShowModal(false)}></button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label htmlFor="department" className="form-label">Department</label>
                                                <input type="text" name="department" id="department" className="form-control" onChange={handleChange} value={formData.department} />
                                                {errors.department &&(
                                                    <div className="text-danger small">{errors.department}</div>
                                                )}
                                            </div>

                                            <div className="col-md-12">
                                                <label htmlFor="status" className="form-label">Status</label>
                                                <select name="status" id="status" className="form-control" onChange={handleChange} value={formData.status}>
                                                    <option value="">Select Status</option>
                                                    <option value="1">Active</option>
                                                    <option value="2">Inactive</option>
                                                </select>
                                                {errors.department &&(
                                                    <div className="text-danger small">{errors.department}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                        <button type="submit" className="btn btn-sm btn-primary">{isEdit ? "Update" : "Save"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Main>
    );
}
export default Department;