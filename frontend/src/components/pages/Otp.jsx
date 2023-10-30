import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import * as Yup from "yup";
import { useNavigate } from "react-router";



function Otp() {
  const inputs = useRef([]);
  const inputRefs = useRef([]);
  const [show,setShow]=useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const [show1,setShow1]=useState(false)
  const [showpass, setShowPass] = useState(false);
  const [showOtp, setShowOtp] = useState(true);
  const [error, setError] = useState(false);
  const [done, setDone] = useState("");
  const [loader,setLoader]=useState(false)
  const [disabled,setDisabled]=useState(true)
  const [success,setSuccess]=useState()
const [otp,setOtp]=useState('')
  useEffect(() => {
    inputs?.current[0]?.focus();
  }, []);
useEffect(()=>{
console.log(otp)
},[otp])

const navigate=useNavigate()

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required.")
    .min(8,"At least 6 characters long.")
    .max(15,"Password must be at Max 15 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Confirm Password is required."),
});

useEffect(() => {
  if (inputRefs.current[0]) {
    inputRefs.current[0].focus();
  }
  if (!sessionStorage.getItem("resetEmailPasswordHash")) {
//    navigate("/login");
  }
}, []);
const showpassword = () => {
  setShow(!show);
};
const showpassword1 = () => {
  setShow1(!show1);
};




const formik = useFormik({
  initialValues: {
    password: "",
    confirmPassword: "",
  },
  validationSchema,
  onSubmit: () => {
   
  },
});


const resetPassword = async () => {
  setIsLoading(true);
  const { password, confirmPassword } = formik.values;
 
  try {
    const res = await axios.post(
      "https://payment.globalpbxsoftware.com/api/reset/password",
      {
        hash:sessionStorage.getItem("resetEmailPasswordHash"),
        password: password,
        confirm_password: confirmPassword,
      }
    )
    if (res.data.status) {
      setIsLoading(false);
      console.log("eufbguhf")
      setDone(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    console.log("eufbguhf")

  } catch (error) {
    console.log(error)
    setIsLoading(false);

  }
 
};



  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData.getData("text");
    const otpLength = inputs.current.length;

    for (let i = 0; i < otpLength; i++) {
      if (i < pastedValue.length) {
        inputs.current[i].value = pastedValue[i];
        inputs.current[i].removeAttribute("disabled");
        inputs.current[i].focus();
      } else {
        inputs.current[i].value = "";
        inputs.current[i].focus();
      }
    }
  };

  const handleKeyUp = (index, e) => {
    const currentInput = inputs.current[index];
    const nextInput = inputs.current[index + 1];
    const prevInput = inputs.current[index - 1];

    if (currentInput.value.length > 1) {
      currentInput.value = currentInput.value.charAt(0); // Keep only the first character
    }

    if (e.key === "Backspace" && index > 0 && !currentInput.value) {
      // Handle backspace
      currentInput.setAttribute("disabled", true);
      prevInput.focus();
    } else if (e.key >= "0" && e.key <= "9") {
      // Handle numeric keys
      currentInput.value = e.key;

      if (nextInput) {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
      }
    }

    // Check if all inputs are filled
    const otpValue = [...inputs.current].map((input) => input.value).join('');
    setOtp(otpValue);
    const isAllFilled = [...inputs.current].every((input) => input.value);
    const button = document.querySelector(".btn");
    if (isAllFilled) {
      button.classList.add("btn-primary");
      button.removeAttribute("disabled");
     setDisabled(false)
    
    } else {
      button.classList.remove("btn-primary");
      button.setAttribute("disabled", "disabled");
    }
  };

  
  return (
    <div className="auth-page-wrapper pt-5">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        {/* ... Background and overlay */}
      </div>
      <div className="auth-page-content">
        <div className="container">
         
          <div className="card mt-4 fadeInDown w-[450px] mx-auto py-4">
           {!showpass&& <div className="card-body p-4">
              <div className="text-center mt-2 fadeIn second">
                <h3 className="text-primary">Verify OTP</h3>
                <p className="text-muted">Your code was sent to you via email</p>
              </div>
              <div className="p-2 fadeIn third">
                <div className="otp-field mb-4">
                  {Array.from({ length: 4 }, (_, index) => (
                    <input
                      key={index}
                      type="text" 
                      ref={(el) => (inputs.current[index] = el)}
                      onPaste={handlePaste}
                      onKeyUp={(e) => handleKeyUp(index, e)}
                    //   onChange={(e)=>{
                    //     const value = e.target.value.replace(/\D/g, "");
                    //     setOtp((prev)=>prev+value)}}
                    />
                  ))}
                </div>
                <button className="btn w-100 bg-blue-600 " disabled={disabled} onClick={()=>{
                  setLoader(true)
                    axios.post("https://laraveltest.gtechwebservice.com/api/verify/otp", {
                      otp: otp,
                      hash: sessionStorage.getItem("resetEmailPasswordHash"),
                    })
                    .then((response) => {
                      setShowPass(true);
                     
                      setLoader(false)
                    })
                    .catch((error) => {
                      setLoader(false)
                      setError(error.response.data.message);
                    });
                }}>
                 { !loader?" Verify":<CircularProgress size={20} className="text-white"/>}
                </button>
                <p className="resend text-muted mb-0 mt-2">
                  Didn't receive code? <a href="#">Request again</a>
                </p>
                <p className="text-center text-red-600 py-4 text-sm">{error}</p>
              </div>
            </div>}

            {showpass && (
                <div className="fadeIn  items-center  text-center py-3">
                  <p className="text-5xl font-bold tracking-tight leading-tight mb-3" style={{fontSize:'2rem'}}>
                    Change password
                  </p>

                  <div className="mb-4 relative  "  style={{position:'relative',width:'fit-content',margin:'auto'}}>
                    <label htmlFor="password" className="block -mb-1">
                      New Password
                    </label><br />
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      pattern="[0-9]*"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className={`border ${
                        formik.errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md px-8 py-2 text-gray-500 `}
                    />
                    <AiFillEye
           style={{right:10,position:"absolute",color:'gray',top:'50px'}}
                      onClick={showpassword}
                    />
                  </div>
                  {formik.errors.password && (
                    <p className="text-red-500 mt-[-15px] mb-3 text-xs" style={{color:'red'}}>
                      {formik.errors.password}
                    </p>
                  )}
                  <div className="mb-4  " style={{position:'relative',width:'fit-content',margin:'auto'}}>
                    <label htmlFor="confirmPassword" className="block -mb-2 ">
                      Confirm Password
                    </label><br />
                    <input
                      type={show1 ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      className={`border ${
                        formik.errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md px-8 py-2 text-gray-500 `}
                    />

                    <AiFillEye
                      style={{right:10,position:"absolute",color:'gray',top:'45px'}}
                      onClick={showpassword1}
                    />
                  </div>
                  {formik.errors.confirmPassword && (
                    <p className=" mt-[-15px] mb-4 text-xs " style={{color:'red'}}>
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                  <button
                    type="submit"
                    className=" text-white font-bold py-2 px-4 rounded text-left bg-blue-600" 
                    onClick={resetPassword}
                  >
                   {isLoading?<CircularProgress size={20} className="text-white"/>:"Reset Password"}
                  </button>
                </div>
              )}
              <p className="text-center text-green-600 py-4 text-sm">{done}</p>
             
          </div>
        </div>
      </div>
      <footer className="footer w-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <script>{`document.write(new Date().getFullYear())`}</script> © All Rights Reserved.
            </div>
            <div className="col-sm-6">
              <div className="text-sm-end d-none d-sm-block">
                Designed and Developed by Call Center Projects
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Otp;
