import React, {useState} from 'react'
import fire from '../images/fire.png'
import spark from '../images/SPARK.png'
import sideWoman from '../images/sideWoman.png'
import checkCircle from '../images/checkCircle.png'
import style from  './Signup.module.css'
import { useNavigate } from 'react-router-dom';

import signup from '../FetchMaker';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    firstName:"",
    lastName:"",
    email: "",
    password: "",
    confirmPassword: ""
  })

const [errors, setErrors] = useState({}); 

const validateForm = () => {
  let newErrors = {};

  if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
  if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
  if (!formData.email.trim()) newErrors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
  if (!formData.password.trim()) newErrors.password = "Password is required";
   else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(formData.password))
          { newErrors.password = "Password must be at least 6 characters, include letters, numbers & a special character";}
  if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required";
  else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSignup = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const capitalize = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const updatedFormData = {
    ...formData,
    name: capitalize(`${formData.firstName} ${formData.lastName}`.trim()),
  };
  
  try {
    const response = await signup(updatedFormData);
    const signupData = await response.json();

    if (response.ok) {
      navigate('/personalization', { state: { userid: signupData.user._id, name: signupData.user.name,} });
    }
     else {
      toast.error( <div className={style.toastContent}>
        <img src={checkCircle} alt="Success" className={style.toastIcon} />
        <span>{signupData.msg || "Signup failed"}</span>
      </div>,
      {
        className: style.customToast,
        autoClose: false, 
        hideProgressBar: true,
        closeOnClick: false,
        draggable: false,
        closeButton: ({ closeToast }) => ( 
          <span className={style.closeBtn} onClick={closeToast}>✖</span>
        ), 
        icon: false, 
      });
    }
  } catch (error) {
     toast.error( <div className={style.toastContent}>
            <img src={checkCircle} alt="Success" className={style.toastIcon} />
            <span>Network error. Please check your internet connection.</span>
          </div>,
          {
            className: style.customToast,
            autoClose: false, 
            hideProgressBar: true,
            closeOnClick: false,
            draggable: false,
            closeButton: ({ closeToast }) => ( 
              <span className={style.closeBtn} onClick={closeToast}>✖</span>
            ), 
            icon: false, 
          });
  }
}; 
// // ===============================================================================================================================================
  return (
    <div className={style.signupContainer}>

      <div className={style.sparkLogo}>
          <img src={fire} alt="fire_logo"/>
          <img src={spark} alt="spark_logo" />
      </div>

      <div className={style.formContainer}>
        <h1>Sign up to your Spark</h1>
        <div className={style.signup_options}>
          <p>Create an account</p>
          <p onClick={() => navigate("/login")}>Sign in instead</p>
        </div>

        <form onSubmit={handleSignup} className={style.signupForm}>
          <label htmlFor="firstname">First name</label>
          <input type="text" name="firstName" 
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

          <div className={style.checkbox}>
              <input type="checkbox" name="checkbox" id="" />
              <p>By creating an account, I agree to our <span style={{textDecoration: 'underline'}}>Terms of use</span>  and <span style={{textDecoration: 'underline'}}>Privacy Policy</span></p>
          </div>

          <button className={style.signupButton}>Create an account</button>
        </form>

        <p style={{marginBottom: '1%'}}>This site is proctected by reCAPTCHA and the <span style={{textDecoration: 'underline'}}>Google Privacy Policy</span>
         and <span style={{textDecoration: 'underline'}}>Terms of Service</span> apply.</p>
     </div>

       <div className={style.sideWoman}>
           <img src={sideWoman} alt="sideWomanImg" />
       </div>
   
      <ToastContainer   />
    </div>
  )
}

export default Signup

