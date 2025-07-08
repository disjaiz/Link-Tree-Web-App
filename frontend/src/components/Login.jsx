import React , {useState} from 'react'
import fire from '../images/fire.png'
import spark from '../images/SPARK.png'
import sideWoman from '../images/sideWoman.png'
import checkCircle from '../images/checkCircle.png'
import openedEye from '../images/openedEye.png'
import closedEye from '../images/closedEye.png'
import style from  './Login.module.css'
import { useNavigate } from 'react-router-dom';
import {login} from '../FetchMaker';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setformData] = useState({
        userName: "",
        password: "",
      })
    const [errors, setErrors] = useState({
        userName: "",
        password: "",
    });     
     
    // const handleLogin = async (e) => {
    //   e.preventDefault();
      
    //   const newErrors = { userName: "", password: "" }; // Reset errors

    // // Backend validation is handled here after form submission
    // try {
    //   const response = await login(formData); // Assuming login API
    //   const logindata = await response.json();

    //   if (response.ok) {
    //     navigate('/dashboard', { state: { userid: logindata.existingUser._id, username: logindata.existingUser.profileTitle, name: logindata.existingUser.name} } ); // Navigate to dashboard or home page
    //   } else {
    //     // Handle backend errors based on status codes
    //     if (logindata.msg) {
    //       if (logindata.msg === "User does not exists.") {
    //         newErrors.userName = logindata.msg;
    //       } else if (logindata.msg === "Incorrect password.") {
    //         newErrors.password = logindata.msg;
    //       } else {
    //         // For other unknown errors
    //         toast.error(logindata.msg || "An error occurred.");
    //       }
    //     }
    //   }
    //   setErrors(newErrors); // Set errors based on backend response

    // } catch (error) {
    //   alert(error.message);
    //   toast.error( <div className={style.toastContent}>
    //     <img src={checkCircle} alt="Success" className={style.toastIcon} />
    //     <span>Network error. Please check your internet connection.</span>
    //   </div>,
    //   {
    //     className: style.customToast,
    //     autoClose: 3000, 
    //     hideProgressBar: true,
    //     closeOnClick: false,
    //     draggable: false,
    //     closeButton: ({ closeToast }) => ( 
    //       <span className={style.closeBtn} onClick={closeToast}>✖</span>
    //     ), 
    //     icon: false, 
    //   });
    // }}


  const handleLogin = async (e) => {
      e.preventDefault();
      const newErrors = { userName: "", password: "" };
      let hasError = false;

  if (formData.userName == "") {
    newErrors.userName = "Username required*";
    hasError = true;
  }
  if (formData.password == "") {
    newErrors.password = "Please enter your password*";
    hasError = true;
  }

  if (hasError) {
    setErrors(newErrors);
    return; 
  }

      try {
        const response = await login(formData);
        const logindata = await response.json();
    
        if (response.ok) {
          navigate('/dashboard', {
            state: {
              userid: logindata.existingUser._id,
              username: logindata.existingUser.profileTitle,
              name: logindata.existingUser.name
            }
          });
        } else {
          switch (response.status) {
            case 400:
              if (logindata.msg === "User does not exists.") {
                newErrors.userName = logindata.msg; 
              } else if (logindata.msg === "Incorrect password.") {
                newErrors.password = logindata.msg;
              }
              break;
            case 401:
              alert("Unauthorized access.");
              break;
            case 500:
              alert("Server error. Try again later.");
              break;
            default:
              alert("An unexpected error occurred.");
          }
        }
        setErrors(newErrors);
      } catch (error) {
        toast.error(
          <div className={style.toastContent}>
            <img src={checkCircle} alt="Success" className={style.toastIcon} />
            <span>Network error. Please check your internet connection.</span>
          </div>,
          {
            className: style.customToast,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            draggable: false,
            closeButton: ({ closeToast }) => (
              <span className={style.closeBtn} onClick={closeToast}>✖</span>
            ),
            icon: false,
          }
        );
      }
    };
    
      
    
  // ===============================================================================================================================================
    return (
      <div className={style.signupContainer}>
       
        <div className={style.sparkLogo}>
            <img src={fire} alt="fire_logo"/>
            <img src={spark} alt="spark_logo" />
        </div>
  
        <div className={style.formContainer}>
          <h1>Sign in to your Spark</h1> 

      <form onSubmit={handleLogin} className={style.loginForm}>
        <label htmlFor="username" >Username</label>
          <input
            autoFocus
            style={{marginBottom: '1.4em'}}
            type="text"
            name="userName"
            placeholder="Spark/Username"
            value={formData.userName}
            onChange={(e) => setformData({ ...formData, [e.target.name]: e.target.value })}
          />
          {errors.userName && <p className={style.errorText}>{errors.userName}</p>}
          
          <label htmlFor="password">Password</label>
           <div className={style.passwordField}>
             <input
             type={showPassword ? "text" : "password"}
              name="password"
                placeholder="Password"
               value={formData.password}
               onChange={(e) => setformData({ ...formData, [e.target.name]: e.target.value })}
              />
              <img
                 src={showPassword ? openedEye : closedEye}
                 alt="Toggle visibility"
                 className={style.eyeIcon}
                 onClick={() => setShowPassword(!showPassword)}              />
          </div>
          {errors.password && <p className={style.errorText}>{errors.password}</p>}

            <button className={style.loginButton}>Login</button>

            <p id={style.pOne} style={{ textDecoration: 'underline', color: '#28A263', fontSize: '14px' }} >Forgot Password?</p>

            <p id={style.pTwo} style={{ marginTop: '30px', fontSize: '13px', color: '#000000' }}> Don't have an account?&nbsp;
            <span 
              id={style.span}
              style={{ textDecoration: 'underline', color: '#28A263', fontSize: '14px' }} 
              onClick={() => navigate("/signup")}>Sign up</span></p>
       </form>
  
            <p> This site is protected by reCAPTCHA and the{' '} <span style={{ textDecoration: 'underline' }}>Google Privacy Policy</span> and{' '} <span style={{ textDecoration: 'underline' }}>Terms of Service</span> apply. </p>
        </div>
  
        <div className={style.sideWoman}>
            <img src={sideWoman} alt="sideWomanImg" />
        </div>
        <ToastContainer />
      </div>
    )
}

export default Login
