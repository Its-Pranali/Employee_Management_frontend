import { useState, useEffect } from "react";
import Main from "../layout/Main";
import api from "../../api/axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [users, setUsers] = useState([]);
    const [isEdit, setIsEdit] = useState("");
    const [departments, setDepartments] = useState([]);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        user_id: "",
        department: "",
        designation: "",
        mobile_no: "",
        joining_date: "",
        status: "",
    });

    const validator = () => {
        const newErrors = {};
        if (!formData.user_id) newErrors.user_id = "User Id is required";
        if (!formData.department) newErrors.department = "Department is required";
        if (!formData.designation.trim()) newErrors.designation = "Designation is required";
        if (!formData.mobile_no.trim()) newErrors.mobile_no = "Mobile No is required";
        if (!formData.joining_date.trim()) newErrors.joining_date = "Joining date is required";
        if (!formData.status) newErrors.status = "Status is required";
        return newErrors;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    }

    const handleEdit=(emp)=>{
        setIsEdit(emp.id);
        setShowModal(true);
        setFormData({
            user_id:emp.user_id,
            department:emp.department,
            designation:emp.designation,
            mobile_no:emp.mobile_no,
            joining_date:emp.joining_date,
            status:emp.status,
        });
    }

    const handleSubmit = async (e) => {
        console.log("hello");
        e.preventDefault();
        const validationErrors = validator();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (isEdit) {
                await api.put(`/employee/${isEdit}`, formData);
                alert("Data updated successfully");
            }
            else {
                await api.post('/saveEmployee', formData);
                alert("Data saved successfully");
            }
            setShowModal(false);

        }
        catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            console.error("Error while saving / updating data", error);
        }
    }

    const handleDelete=async(id)=>{
        
    }

    const fetchEmployee = async () => {
        try {
            const res = await api.get('/employees');
            setEmployees(res.data.data);
        }
        catch (error) {
            console.error("Error while fetching employee", error);
        }
    }

    const fetchUser = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data.data);
        }
        catch (error) {
            console.error("Error while fetching users", error);
        }
    }

    const fetchDepartment = async () => {
        try {
            const res = await api.get('/departments');
            setDepartments(res.data.data);
        }
        catch (error) {
            console.error("Error while fetching departments", error);
        }
    }

    const addEmployee = () => {
        setShowModal(true);
        setIsEdit(false);
        handleReset();
    }

    useEffect(() => {
        fetchEmployee();
        fetchUser();
        fetchDepartment();
    }, []);

    const handleReset = () => {
        setFormData({
            user_id: "",
            department: "",
            designation: "",
            mobile_no: "",
            joining_date: "",
            status: "",
        });
    }

    return (
        <Main>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-primary" type="button" onClick={addEmployee} >Add Employee</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table bordered stripped">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>User</th>
                                        <th>Department</th>
                                        <th>Designation</th>
                                        <th>Mobile No</th>
                                        <th>Joining Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp,index)=>(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{emp.user ? `${emp.user.first_name || ""} ${emp.user.last_name || ""}`.trim() : emp.user_id}</td>
                                            <td>{emp.dept ? emp.dept.department : emp.department}</td>
                                            <td>{emp.designation}</td>
                                            <td>{emp.mobile_no}</td>
                                            <td>{emp.joining_date}</td>
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

                {showModal && (
                    <div className="modal show fade d-block" style={{ backgroundColor: '#00000079' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>{isEdit ? "Edit Employee" : "Add Employee"}</h5>
                                    <button className="btn btn-close" onClick={() => setShowModal(false)} ></button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6 my-2">
                                                <label htmlFor="user_id" className="form-label">Select User</label>
                                                <select name="user_id" id="user_id" className="form-control" onChange={handleChange} value={formData.user_id}>
                                                    <option value="">Select User</option>
                                                    {users.map((user, index) => (
                                                        <option key={index} value={user.id}>{user.first_name}</option>
                                                    ))}
                                                </select>
                                                {errors.user_id && (
                                                    <div className="text-danger small">{errors.user_id}</div>
                                                )}
                                            </div>

                                            <div className="col-md-6 my-2">
                                                <label htmlFor="department" className="form-label">Department</label>
                                                <select name="department" id="department" className="form-control" onChange={handleChange} value={formData.department}>
                                                    <option value="">Select Department</option>
                                                    {departments.map((dept, index) => (
                                                        <option key={index} value={dept.id}>{dept.department}</option>
                                                    ))}
                                                </select>
                                                {errors.department && (
                                                    <div className="text-danger small">{errors.department}</div>
                                                )}
                                            </div>

                                            <div className="col-md-6 my-2">
                                                <label htmlFor="designation" className="form-label">Designation</label>
                                                <input type="text" id="designation" name="designation" className="form-control" onChange={handleChange} value={formData.designation} />
                                                {errors.designation && (
                                                    <div className="text-danger small">{errors.designation}</div>
                                                )}
                                            </div>

                                            <div className="col-md-6 my-2">
                                                <label htmlFor="mobile_no" className="form-label">Mobile Number</label>
                                                <input type="text" id="mobile_no" name="mobile_no" className="form-control" onChange={handleChange} value={formData.mobile_no} />
                                                {errors.mobile_no && (
                                                    <div className="text-danger small">{errors.mobile_no}</div>
                                                )}
                                            </div>

                                            <div className="col-md-6 my-2">
                                                <label htmlFor="joining_date" className="form-label">Joining Date</label>
                                                <input type="date" id="joining_date" name="joining_date" className="form-control" onChange={handleChange} value={formData.joining_date} />
                                                {errors.joining_date && (
                                                    <div className="text-danger small">{errors.joining_date}</div>
                                                )}
                                            </div>

                                            <div className="col-md-6 my-2">
                                                <label htmlFor="status" className="form-label">Status</label>
                                                <select name="status" id="status" className="form-control" onChange={handleChange} value={formData.status}>
                                                    <option value="">Select Status</option>
                                                    <option value="1">Active</option>
                                                    <option value="2">Inactive</option>
                                                </select>
                                                {errors.status && (
                                                    <div className="text-danger small">{errors.status}</div>
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

export default Employee;