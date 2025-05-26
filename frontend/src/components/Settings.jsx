import React,{useState} from 'react'
import style from './Settings.module.css'
import {useLocation} from 'react-router-dom';
import {updateSettings} from '../FetchMaker.js';
import { toast, ToastContainer } from "react-toastify";
import checkCircle from '../images/checkCircle.png'
import toastErrorImage from "../images/toastErrorImage.png";

function Settings() {
  const location = useLocation();
  const userName = location.state?.username; 

  const [formData, setformData] = useState({
      firstName:"",
      lastName:"",
      email: "",
      password: "",
      confirmPassword: ""
    })
  const [errors, setErrors] = useState({}); 

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) {  newErrors.firstName = "First name is required*";}
    if (!formData.lastName) {  newErrors.lastName = "Last name is required*";}
    if (!formData.email) {  newErrors.email = "Email is required";} 
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {  newErrors.email = "Email address is invalid";}
    if (!formData.password) {  newErrors.password = "Password is required*";} 
    else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(formData.password))
          { newErrors.password = "Password must be at least 6 characters, include letters, numbers & a special character";}

    if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = "Passwords do not match";}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log(formData)
    try {
      const response = await updateSettings(formData.firstName, 
                                            formData.lastName, 
                                            formData.email, 
                                            formData.password, 
                                            formData.confirmPassword
                                          );
      const updatedData = await response.json();
  
        if (updatedData.success) {
                    toast.success(
                        <div className={style.toastContent}>
                          <img src={checkCircle} alt="Success" className={style.toastIcon} />
                          <span>Profile edited successfully</span>
                        </div>,
                        {
                          className: `${style.customToast} ${style.toastGreen}`,
                          autoClose: true,
                          hideProgressBar: true,
                          closeOnClick: true,
                          draggable: false,
                          closeButton: ({ closeToast }) => (
                            <span className={style.closeBtn} onClick={closeToast}>✖</span>
                          ),
                          icon: false,
                        }
                      );
                } 
       else {
            toast.error(
                  <div className={style.toastContent} >
                    <img src={toastErrorImage} alt="Fail" className={style.toastIcon} />
                    <span>{updatedData.message}</span>
                  </div>,
                  {
                    className: `${style.customToast} ${style.toastRed}`,
                    autoClose: true,
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: false,
                    closeButton: ({ closeToast }) => (
                      <span className={style.closeBtn} onClick={closeToast}>✖</span>
                    ),
                    icon: false,
                  }
                );
                }
    } catch (error) {
    console.log(error)
    }
  };
// =================================================================================================
  return (
    <div className={style.container}>
       <ToastContainer   />
          {/* ==================================header====================================== */}
          <div className={style.header}>
            <div>
            <p style={{marginBottom:'4px', letterSpacing:'1px'}}><span style={{fontWeight: '700'}}>Hi,</span>&nbsp;{userName}</p>
            <p style={{color:'#383838', fontSize:'14px'}}>Congratulations, you got a great response today.</p>
            </div>
          </div>

          <div className={style.settingsContainer}>
            <span>Edit Profile</span>
            <hr id={style.hrOfSettings}/>

            {/* ================================ FORM ============================================= */}
               <form id="myForm" onSubmit={handleEdit} className={style.editForm}>
                      <label htmlFor="firstname">First name</label>
                      <input autoFocus type="text" name="firstName" 
                      value={formData.firstName} onChange={(e)=>setformData({...formData,[e.target.name]: e.target.value})} />
             {errors.firstName && <p className={style.errorText}>{errors.firstName}</p>}
            
                      <label htmlFor="lastname">Last name</label>
                <input type="text" name="lastName" 
                      value={formData.lastName} onChange={(e)=>setformData({...formData,[e.target.name]: e.target.value})} />
                      {errors.lastName && <p className={style.errorText}>{errors.lastName}</p>}
            
                      <label htmlFor="email">Email</label>
                      <input type="text" name="email" 
                      value={formData.email} onChange={(e)=>setformData({...formData,[e.target.name]: e.target.value})} />
            {errors.email && <p className={style.errorText}>{errors.email}</p>}
            
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password"
                      value={formData.password} onChange={(e)=>setformData({...formData,[e.target.name]: e.target.value})} />
              {errors.password && <p className={style.errorText}>{errors.password}</p>}
            
                      <label htmlFor="confirmpassword">Confirm Password</label>
                      <input type="password" name="confirmPassword" 
                      value={formData.confirmPassword} onChange={(e)=>setformData({...formData,[e.target.name]: e.target.value})} />
              {errors.confirmPassword && <p className={style.errorText}>{errors.confirmPassword}</p>}                 
                    </form>

            <div>
              <button className={style.editButton} type="submit" form="myForm">Save</button> 
            </div>
              
                    
            {/* ============== */}
          </div>
    </div>
  )
}

export default Settings
