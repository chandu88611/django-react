import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

   const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
  const [show,setShow]=useState(false)
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
      setErrors({})
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  };
  const navigate=useNavigate()
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formData);
      try {
       
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
          username: formData?.username,
          password: formData.password,
        }
      );
console.log(response)
       if(response){
        localStorage.removeItem("lockout",false)
          navigate('/dashboard')
          localStorage.setItem("ccp_token",response.data.access)
          console.log(response)
       }
      } catch (error) {
        console.error(error);
    
        if(error?.response?.data?.errors.email){
        setErrors((prev)=>({...prev,
email:error?.response?.data?.errors.email
        }))}
        if(error?.response?.data?.errors.password){
         setErrors((prev)=>({...prev,
 password:error?.response?.data?.errors.password
         }))}
      }
    };
useEffect(()=>{
const token=localStorage.getItem("ccp_token")
if(token){
  navigate("/dashboard")
}
},[])
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
         <div class="auth-page-content ">
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
           
               <div class="row justify-content-center ">
                  <div class="col-md-8 col-lg-6 col-xl-5 w-[450px]">
                     <div class="card mt-4 fadeInDown">
                        <div class="card-body p-4">
                           <div class="text-center mt-2">
                              <h5 class="text-primary">Welcome Back !</h5>
                              <p class="text-muted">Sign in to continue to Global Software.</p>
                           </div>
                           <div class="p-2 mt-4">
                              <form action="dashboard.html" onSubmit={handleFormSubmit}>
                                 <div class="mb-3 fadeIn second">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="username" placeholder="Enter username" name='username' onChange={handleInputChange}/>
                                 {errors?.email&&<p className='text-red-500'>{errors?.email}</p>}
                                 </div>
                                 <div class="mb-3 fadeIn third">
                                    <div class="float-end">
                                       <Link to="/forgotpassword" class="text-muted">Forgot password?</Link>
                                    </div>
                                    <label class="form-label" for="password-input">Password</label>
                                    <div class="position-relative auth-pass-inputgroup mb-3">
                                       <input type="password" class="form-control pe-5 password-input" placeholder="Enter password" id="password-input" name='password' onChange={handleInputChange}/>
                                       <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                    {errors?.password&&<p className='text-red-500'>{errors?.password}</p>}
                                    </div>
                                 </div>
                                 <div class="form-check fadeIn third">
                                    <input class="form-check-input" type="checkbox" value="" id="auth-remember-check"/>
                                    <label class="form-check-label" for="auth-remember-check">Remember me</label>
                                    
                                 </div>
                                 <div class="mt-4 fadeIn fourth">
                                    <button class="btn bg-blue-600 text-white hover:bg-blue-500  w-100" type="submit">Sign In</button>
                                 </div>
                              </form>
                           </div>
                        </div>
                        
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

export default Login