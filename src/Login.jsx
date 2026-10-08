import { useState,useEffect } from "react";
import api from "./api/axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [changetoggle,setChangeToggle]=useState(false);
    const [errors,setErrors]=useState({});
    const [registerErrors,setRegisterErrors]=useState({});
    const [roles,setRoles]=useState([]);
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate();

    const [registerData,setRegisterData]=useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        role_id:"",
    });

    const validator=()=>{
        const newErrors={};
        if (!formData.email.trim()) {
           newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
           newErrors.email = "Enter a valid email";
        }
        if(!formData.password.trim())newErrors.password="Password is required";
        return newErrors;
    }

    const registerValidator=()=>{
        const newErrors={};
        if(!registerData.first_name.trim())newErrors.first_name="First Name is required";
        if(!registerData.last_name.trim())newErrors.last_name="Last Name is required";
        if(!registerData.email.trim()){
            newErrors.email="Email is required";
        } else if(!/^\S+@\S+\.\S+$/.test(registerData.email)){
            newErrors.email="Enter a valid email";
        }
        if(!registerData.password.trim())newErrors.password="Password is required";
        if(!registerData.role_id)newErrors.role_id="Role is required";
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

    const handleRegisterChange=(e)=>{
        setRegisterData({
            ...registerData,
            [e.target.name]:e.target.value
        });
        setRegisterErrors({
            ...registerErrors,
            [e.target.name]:""
        });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const validationErrors=validator();
        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors);
            return;
        }

        try{
            await api.post('/login',formData);
            alert("Login Successfull");
            navigate("/dashboard");
            handleReset();
        }
        catch(error){
            console.error("Error while Login",error);
        }
    }

    const registerUser=async(e) => {
        e.preventDefault();
        const validationErrors=registerValidator();
        if(Object.keys(validationErrors).length>0){
            setRegisterErrors(validationErrors);
            return;
        }
        try{
            await api.post('/addUser',registerData);
            alert("User registered successfully");
            handleReset();
        }
        catch(error){
            console.error("Error while registering user",error);
        }
    }

    const fetchRoles=async()=>{
        try{
            const res=await api.get('/roles');
            setRoles(res.data.data);
        }
        catch(error){
            console.error("Error while fetching data",error);
        }
    }

    useEffect(()=>{
        fetchRoles();
    },[]);

    const loginForm=()=>{
        setChangeToggle(true);
    }

    const registerForm=()=>{
        setChangeToggle(false);
    }

    const handleReset=()=>{
        setFormData({
            email:"",
            password:"",
        });
        setRegisterData({
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            role_id:"",
        });
    }

    return(
        <>
           <div className="container py-3">
              <div className="row">
                 <div className="d-flex justify-content-center gap-2 mb-2">
                    <button className={`btn btn-sm ${changetoggle ? "btn-primary":"btn-secondary"}`} onClick={loginForm}>Login</button>
                    <button className={`btn btn-sm ${!changetoggle ? "btn-primary":"btn-secondary"}`} onClick={registerForm}>Register</button>
                 </div>
              </div>

              <div className="row">
                  <div className="col-md-5 m-auto">
                     {changetoggle ?(
                        <div className="card py-3 px-2">
                           <h4 className="text-center">Login</h4>
                           <form onSubmit={handleSubmit}>
                              <div className="row">
                                 <div className="col-md-12 my-2">
                                    <label htmlFor="email" className="form-label">Username</label>
                                    <input type="email" name="email" id="email" className="form-control" onChange={handleChange} value={formData.email} />
                                    {errors.email &&(
                                       <div className="text-danger small">{errors.email}</div>
                                    )}
                                 </div>

                                 <div className="col-md-12 my-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" onChange={handleChange} value={formData.password} />
                                    {errors.password &&(
                                       <div className="text-danger small">{errors.password}</div>
                                    )}
                                 </div>

                                 <div className="col-md-12 my-2">
                                     <button type="submit" className="btn btn-sm w-100 btn-primary">Login</button>
                                 </div>
                              </div>
                           </form>
                        </div>
                     ):(
                        <div className="card py-3 px-2">
                          <h4 className="text-center">Register</h4>
                          <form onSubmit={registerUser}>
                              <div className="row">
                                 <div className="col-md-6">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <input type="text" name="first_name" id="first_name" className="form-control" onChange={handleRegisterChange} value={registerData.first_name}/>
                                    {registerErrors.first_name &&(
                                        <div className="text-danger small">{registerErrors.first_name}</div>
                                    )}
                                 </div>

                                 <div className="col-md-6">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <input type="text" name="last_name" id="last_name" className="form-control" onChange={handleRegisterChange} value={registerData.last_name}/>
                                    {registerErrors.last_name &&(
                                        <div className="text-danger small">{registerErrors.last_name}</div>
                                    )}
                                 </div>

                                 <div className="col-md-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" id="email" className="form-control" onChange={handleRegisterChange} value={registerData.email} />
                                    {registerErrors.email &&(
                                        <div className="text-danger small">{registerErrors.email}</div>
                                    )}
                                 </div>

                                 <div className="col-md-12">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" onChange={handleRegisterChange} value={registerData.password} />
                                    {registerErrors.password &&(
                                        <div className="text-danger small">{registerErrors.password}</div>
                                    )}
                                 </div>

                                 <div className="col-md-12">
                                    <label htmlFor="role_id" className="form-label">Role</label>
                                    <select name="role_id" id="role_id" className="form-control" onChange={handleRegisterChange} value={registerData.role_id}>
                                        <option value="">Select Role</option>
                                        {roles.map((role,index)=>(
                                            <option value={role.id} key={index}>{role.role_name}</option>
                                        ))}
                                    </select>
                                    {registerErrors.password &&(
                                        <div className="text-danger small">{registerErrors.password}</div>
                                    )}
                                 </div>

                                 <div className="col-md-12 my-2">
                                    <button type="submit" className="btn btn-sm btn-primary w-100">Register</button>
                                 </div>
                              </div>
                          </form>
                        </div>
                     )}
                  </div>
              </div>
           </div>
        </>
    );
}

export default Login;