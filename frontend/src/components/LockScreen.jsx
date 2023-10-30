import React from 'react'

function LockScreen() {
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
                      <img src="/assets/images/logo-m.webp" alt="" height=""/>
                      </a>
                   </div>
                </div>
             </div>
          </div>
     
          <div class="row justify-content-center">
             <div class="col-md-8 col-lg-6 col-xl-5 w-[450px]">
                <div class="card mt-4 fadeInDown">
                   <div class="card-body p-4">
                      <div class="text-center mt-2 fadeIn second">
                         <h5 class="text-primary">Lock Screen</h5>
                         <p class="text-muted">Enter your password to unlock the screen!</p>
                      </div>
                      <div class="user-thumb text-center fadeIn third">
                         <img src="/assets/images/users/avatar-1.jpg" class="rounded-circle img-thumbnail avatar-lg" alt="thumbnail"/>
                         <h5 class="font-size-15 mt-3">Anna Adame</h5>
                      </div>
                      <div class="p-2 mt-4 fadeIn fourth">
                         <form>
                            <div class="mb-3">
                               <label class="form-label" for="userpassword">Password</label>
                               <input type="password" class="form-control" id="userpassword" placeholder="Enter password" required/>
                            </div>
                            <div class="mb-2 mt-4">
                               <button class="btn bg-blue-600 text-white hover:bg-blue-500  w-100" type="submit">Unlock</button>
                            </div>
                         </form>
                      </div>
                   </div>
                </div>
                <div class="mt-4 text-center">
                   <p class="mb-0">Not you ? return <a href="index.html" class="fw-semibold text-primary text-decoration-underline"> Signin </a> </p>
                </div>
             </div>
          </div>
       </div>
    </div>
    
    <footer class="footer w-100">
       <div class="container-fluid">
          <div class="row">
             <div class="col-sm-6">
              {new Date().getFullYear()} © All Rights Reserved.
             </div>
             <div class="col-sm-6">
                <div class="text-sm-end d-none d-sm-block">
                   Designed and Developed by Call Center Projects
                </div>
             </div>
          </div>
       </div>
    </footer>
 </div>
  )
}

export default LockScreen