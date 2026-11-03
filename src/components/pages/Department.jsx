import Main from "../layout/Main";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function Department() {
    const [showModal, setShowModal] = useState(false);
    const [departmentsHead, setDepartmentsHead] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState("");
    const [formData, setFormData] = useState({
        department_name: "",
        department_head: "",
        description: "",
        status: "",
    });

    const fetchDepartment = async () => {
        try {
            const res = await api.get('/departments');
            setDepartments(res.data.data);
        }
        catch (error) {
            console.error("Error while fetching data", error);
        }
    }

    const fetchDepartmentHead = async () => {
        try {
            const res = await api.get('/department-head');
            setDepartmentsHead(res.data.data);
        }
        catch (error) {
            console.error("Error while fetching data", error);
        }
    }

    const validator = () => {
        const newErrors = {};
        if (!formData.department_name.trim()) newErrors.department_name = "Department is required";
        if (!formData.department_head.toString().trim()) newErrors.department_head = "Department Head is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.status.toString().trim()) newErrors.status = "Status is required";
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

    const handleReset = () => {
        setFormData({
            department_name: "",
            department_head: "",
            description: "",
            status: "",
        });
        setErrors({});
        setIsEdit("");
    }

    const handleEdit = (dept) => {
        setShowModal(true);
        setIsEdit(dept.id);
        setFormData({
            department_name: dept.department_name || "",
            department_head: dept.department_head || "",
            description: dept.description || "",
            status: dept.status || "",
        });
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this department?")) {
            return;
        }
        try {
            await api.delete(`/departments/${id}`);
            alert("Department deleted successfully");
            fetchDepartment();
        } catch (error) {
            console.error("Error while deleting department", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validator();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            if (isEdit) {
                await api.put(`/departments/${isEdit}`, formData);
                alert("Department updated successfully");
            }
            else {
                await api.post('/saveDepartment', formData);
                alert("Department saved successfully");
            }
            setShowModal(false);
            handleReset();
            fetchDepartment();
        }
        catch (error) {
            console.error("Error while saving / updating data", error);
        }
    }

    const addDepartment = () => {
        handleReset();
        setShowModal(true);
    }

    useEffect(() => {
        fetchDepartment();
        fetchDepartmentHead();
    }, []);

    return (
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
                                        <th>Department Head</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departments.map((dept, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{dept.department_name}</td>
                                            <td>{dept.departmentDetails ? dept.departmentDetails.dept_head : "-"}</td>
                                            <td>{String(dept.status) === "1" ? "Active" : "Inactive"}</td>
                                            <td className="d-flex gap-2">
                                                <button className="btn btn-sm btn-primary" onClick={() => handleEdit(dept)} ><FaEdit size={15} /></button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(dept.id)}><FaTrash size={15} /></button>
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
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>{isEdit ? "Edit Department" : "Add Department"}</h5>
                                    <button className="btn btn-sm btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label htmlFor="department_name" className="form-label">Department</label>
                                                <input type="text" name="department_name" id="department_name" placeholder="e.g. Development" className="form-control" onChange={handleChange} value={formData.department_name} />
                                                {errors.department_name && (
                                                    <div className="text-danger small">{errors.department_name}</div>
                                                )}
                                            </div>

                                            <div className="col-md-12">
                                                <label htmlFor="department_head" className="form-label">Department Head</label>
                                                <select name="department_head" id="department_head" className="form-control" onChange={handleChange} value={formData.department_head} >
                                                    <option value="">Select Department Head</option>
                                                    {departmentsHead.map((dhead, index) => (
                                                        <option value={dhead.id} key={index}>{dhead.dept_head}</option>
                                                    ))}
                                                </select>
                                                {errors.department_head && (
                                                    <div className="text-danger small">{errors.department_head}</div>
                                                )}
                                            </div>

                                            <div className="col-md-12">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <textarea name="description" id="description" placeholder="Short description..." className="form-control" onChange={handleChange} value={formData.description}></textarea>
                                                {errors.description && (
                                                    <div className="text-danger small">{errors.description}</div>
                                                )}
                                            </div>

                                            <div className="col-md-12">
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
export default Department;
