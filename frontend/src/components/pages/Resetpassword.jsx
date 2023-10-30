import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Resetpassword() {

   const [formData, setFormData] = useState({
      username: '',
   
    });
  const [loader,setLoader]=useState(false)
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
      setErrors({})
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formData);
      setLoader(true)
      try {
       
        const response = await axios.post('https://payment.globalpbxsoftware.com/api/reset-password-link', {
          email: formData?.username
        });
if(response?.data?.status){
  setErrors({color:"green", message:response.data.message });
setLoader(false)
}
      } catch (error) {
        console.error(error);
       
        setErrors({color:"red", message:error.response.data.message });
setLoader(false)

      }
    };

// useEffect(()=>{
// const token=localStorage.getItem("delivery_token")
// if(token){
//   navigate("/")
// }
// },[])
  return (
    <div class="auth-page-wrapper pt-5">
     
         <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>
            <div class="shape">
               <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                  <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
               </svg>
            </div>
         </div>
       
         <div class="auth-page-content">
            <div class="container">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="text-center mt-sm-5 mb-4 text-white-50">
                        <div>
                           <a href="index.html" class="d-inline-block auth-logo">
                           <img src="/logo-global.png" alt="" height=""/>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
              
               <div class="row justify-content-center">
                  <div class="col-md-8 col-lg-6 col-xl-5 w-[450px]">
                     <div class="card mt-4 fadeInDown">
                        <div class="card-body p-4">
                           <div class="text-center mt-2">
                              <h5 class="text-primary">Forgot Password?</h5>
                              <p class="text-muted">Reset your password</p>
                              <lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" class="avatar-xl"></lord-icon>
                           </div>
                           <div class="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                              Enter your email and instructions will be sent to you!
                           </div>
                           <div class="p-2">
                              <form action="otp.html" onSubmit={handleFormSubmit}>
                                 <div class="mb-4">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter Email" name='username' onChange={handleInputChange}/>
                                    {errors.username && <div className="text-red-500">{errors.username}</div>}
                                    {errors.color==="red" && <div className="text-red-500">{errors.message}</div>}
                                    {errors.color==="green" && <div className="text-green-500">{errors.message}</div>}
                                 </div>
                                 <div class="text-center mt-4">
                                    <button class="btn bg-blue-600 text-white hover:bg-blue-500 w-100" type="submit">{!loader?"Send Reset Link":<CircularProgress size={20} className='text-white'/>}</button>
                                 </div>
                              </form>
                           
                           </div>
                        </div>
                   
                     </div>
                 
                     <div class="mt-4 text-center">
                        <p class="mb-0">Wait, I remember my password... <Link to="/login" class="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
                     </div>
                  </div>
               </div>
            
            </div>
      
         </div>
        
         <footer class="footer">
       <div class="flex gap-2 w-fit  mx-auto">
        
             <div class="">
              { new Date().getFullYear()} © All Rights Reserved.
             </div> |
             <div class="">
                <div >
                   Designed and Developed by Global PBX Software
                </div> 
             </div>
       
       </div>
    </footer>
         
      </div>
  )
}

export default Resetpassword