import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LockScreen from './LockScreen'
import axiosInstance from './axiosInstance'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../stores/userSlice'


function Layout({children}) {
const loading=useSelector(state=>state.loader)
    const [show,setShow]=useState(false)
    const [locked,setLocked]=useState(false)
    const router=useNavigate()
    const dispatch=useDispatch()
    const [showCategory, setShowCategory] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const checkAuthentication = async () => {
        const token =localStorage.getItem("ccp_token")
        if (token) {
          try {
          
            const response = await axiosInstance.get("/get-user-info");
            console.log(response)
            if (response.status===200) {
              dispatch(addUser(response.data));
            }
            console.log(response)

          } catch (error) {
            localStorage.removeItem("ccp_token");
            router("/login");
          }
        }else{
            router("/login");
        }
      };


     
      const logout = async () => {
        const token =localStorage.getItem("ccp_token")
        if (token) {
          try {
          
            const response = await axiosInstance.get("/logout");
            if (response.data.status) {
                localStorage.removeItem("ccp_token");
                router("/login");
            }
          } catch (error) {
            localStorage.removeItem("ccp_token");
            router("/login");
          }
        }else{
            router("/login");
        }
      };
const location=useLocation()

      useEffect(()=>{

checkAuthentication()

      },[location.pathname])

     
      const handleFacebookShare = (product) => {
        // Generate the URL for the product being shared
        const shareURL = `https://your-ecommerce-site.com/products/${product.id}`;
        
        // Initialize the Facebook SDK
        window.fbAsyncInit = function() {
          FB.init({
            appId: '275081505489831',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v13.0',
          });
        };
    
        // Load the Facebook SDK asynchronously
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    
        // Once the Facebook SDK is loaded, share the product
        window.fbAsyncInit();
        FB.ui({
          method: 'share_open_graph',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object: shareURL,
            image: product.imageURL,
            description: product.description,
            message: 'Check out this awesome product!',
          }),
        });
      };
  return (
    <>
    {loading&&<div className=" fixed top-10 left-0  bg-[#cfd13c24]  w-full h-full z-50 flex justify-center items-center ">

<span class="loader  z-20 "></span>
    </div>}
  {!locked? <div id="layout-wrapper" >
    <header id="page-topbar">
  <div className="layout-width">
      <div className="navbar-header">
          <div className="d-flex" >
        
              <div className="navbar-brand-box horizontal-logo">
                  <Link  className="logo logo-dark " onClick={()=>handleFacebookShare({name:"gjivigb",id:"1"})}>
                      <span className="logo-sm">
                          <img src="/logo-global.png" alt="" height="" width="75%" className='mt-2'/>
                      </span>
                      <span className="logo-lg">
                          <img src="/logo-global.png" alt="" height="" width="75%" className='mt-2'/>
                      </span>
                  </Link>
                  <Link to="/dashboard/index.html" className="logo logo-light">
                      <span className="logo-sm">
                          <img src="/logo-global.png" alt="" height="" width="75%" className='mt-2'/>
                      </span>
                      <span className="logo-lg">
                          <img src="/logo-global.png" alt="" height="" width="75%" className='mt-2'/>
                      </span>
                  </Link>
              </div>

              <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" id="topnav-hamburger-icon" onClick={()=>setShow(!show)}>
                  <span className="hamburger-icon">
                      <span></span>
                      <span></span>
                      <span></span>
                  </span>
              </button>

              <form className="app-search d-none d-md-block">
                  <div className="position-relative">
                      <input type="text" className="form-control" placeholder="Search..." autocomplete="off" id="search-options" value=""/>
                      <span className="mdi mdi-magnify search-widget-icon"></span>
                      <span className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none" id="search-close-options"></span>
                  </div>
                  <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                      <div data-simplebar style={{maxHeight: "320px"}}>
                          
                          <div className="dropdown-header">
                              <h6 className="text-overflow text-muted mb-0 text-uppercase">Recent Searches</h6>
                          </div>

                          <div className="dropdown-item bg-transparent text-wrap">
                              <Link to="/dashboard/index.html" className="btn btn-soft-secondary btn-sm btn-rounded">how to setup <i className="mdi mdi-magnify ms-1"></i></Link>
                              <Link to="/dashboard/index.html" className="btn btn-soft-secondary btn-sm btn-rounded">buttons <i className="mdi mdi-magnify ms-1"></i></Link>
                          </div>
                          
                          <div className="dropdown-header mt-2">
                              <h6 className="text-overflow text-muted mb-1 text-uppercase">Pages</h6>
                          </div>
                          <Link to="/dashboard/javascript:void(0);" className="dropdown-item notify-item">
                              <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                              <span>Analytics Dashboard</span>
                          </Link>
                  /
                          <Link to="/dashboard/javascript:void(0);" className="dropdown-item notify-item">
                              <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                              <span>Help Center</span>
                          </Link>
                        /
                          <Link to="/dashboard/javascript:void(0);" className="dropdown-item notify-item">
                              <i className="ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                              <span>My account settings</span>
                          </Link>
/
                          <div className="dropdown-header mt-2">
                              <h6 className="text-overflow text-muted mb-2 text-uppercase">Members</h6>
                          </div>
                          <div className="notification-list">
                           /
                              <Link to="/dashboard/javascript:void(0);" className="dropdown-item notify-item py-2">
                                  <div className="d-flex">
                                      <img src="/assets/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                      <div className="flex-1">
                                          <h6 className="m-0">Angela Bernier</h6>
                                          <span className="fs-11 mb-0 text-muted">Manager</span>
                                      </div>
                                  </div>
                              </Link>
                          /
                              <Link to="/dashboard/javascript:void(0);" className="dropdown-item notify-item py-2">
                                  <div className="d-flex">
                                      <img src="/assets/images/users/avatar-3.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                      <div className="flex-1">
                                          <h6 className="m-0">David Grasso</h6>
                                          <span className="fs-11 mb-0 text-muted">Web Designer</span>
                                      </div>
                                  </div>
                              </Link>
                            
                              <Link to="/dashboard/javascript:void(0);" className="dropdown-item notify-item py-2">
                                  <div className="d-flex">
                                      <img src="/assets/images/users/avatar-5.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                      <div className="flex-1">
                                          <h6 className="m-0">Mike Bunch</h6>
                                          <span className="fs-11 mb-0 text-muted">React Developer</span>
                                      </div>
                                  </div>
                              </Link>
                          </div>
                      </div>

                      <div className="text-center pt-3 pb-1">
                          <Link to="/dashboard/pages-search-results.html" className="btn btn-primary btn-sm">View All Results <i className="ri-arrow-right-line ms-1"></i></Link>
                      </div>
                  </div>
              </form>
          </div>

          <div className="d-flex align-items-center">

              <div className="dropdown d-md-none topbar-head-dropdown header-item">
                  <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="bx bx-search fs-22"></i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                      <form className="p-3">
                          <div className="form-group m-0">
                              <div className="input-group">
                                  <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username"/>
                                  <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>

              <div className="ms-1 header-item d-none d-sm-flex">
                 <Link to="/dashboard/pricing.html" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-toggle="tooltip" title="Pricing">
                     <i className="mdi mdi-tag-text-outline fs-22"></i>
                 </Link>
              </div>

              <div className="ms-1 header-item d-none d-sm-flex">
                  <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-toggle="fullscreen">
                      <i class='bx bx-fullscreen fs-22'></i>
                  </button>
              </div>

              <div className="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
                  <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                      <i class='bx bx-bell fs-22'></i>
                      <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">3<span className="visually-hidden">unread messages</span></span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">

                      <div className="dropdown-head bg-primary bg-pattern rounded-top">
                          <div className="p-3">
                              <div className="row align-items-center">
                                  <div className="col">
                                      <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                  </div>
                                  <div className="col-auto dropdown-tabs">
                                      <span className="badge badge-soft-light fs-13"> 4 New</span>
                                  </div>
                              </div>
                          </div>

                          <div className="px-2 pt-2">
                              <ul className="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true" id="notificationItemsTab" role="tablist">
                                  <li className="nav-item !text-gray-600 waves-effect waves-light">
                                      <Link className="nav-link active" data-bs-toggle="tab" to="/dashboard/#all-noti-tab" role="tab" aria-selected="true">
                                          All (4)
                                      </Link>
                                  </li>
                                  <li className="nav-item !text-gray-600 waves-effect waves-light">
                                      <Link className="nav-link" data-bs-toggle="tab" to="/dashboard/#messages-tab" role="tab" aria-selected="false">
                                          Messages
                                      </Link>
                                  </li>
                                  <li className="nav-item !text-gray-600 waves-effect waves-light">
                                      <Link className="nav-link" data-bs-toggle="tab" to="/dashboard/#alerts-tab" role="tab" aria-selected="false">
                                          Alerts
                                      </Link>
                                  </li>
                              </ul>
                          </div>

                      </div>

                      <div className="tab-content position-relative" id="notificationItemsTabContent">
                          <div className="tab-pane fade show active py-2 ps-2" id="all-noti-tab" role="tabpanel">
                              <div data-simplebar style={{maxHeight: "300px"}} className="pe-2">
                                  <div className="text-reset notification-item d-block dropdown-item position-relative">
                                      <div className="d-flex">
                                          <div className="avatar-xs me-3">
                                              <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                                  <i className="bx bx-badge-check"></i>
                                              </span>
                                          </div>
                                          <div className="flex-1">
                                              <Link to="/dashboard/#!" className="stretched-link">
                                                  <h6 className="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic
                                                      Optimization <span className="text-secondary">reward</span> is
                                                      ready!
                                                  </h6>
                                              </Link>
                                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                  <span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                              </p>
                                          </div>
                                          <div className="px-2 fs-15">
                                              <div className="form-check notification-check">
                                                  <input className="form-check-input" type="checkbox" value="" id="all-notification-check01"/>
                                                  <label className="form-check-label" for="all-notification-check01"></label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="text-reset notification-item d-block dropdown-item position-relative">
                                      <div className="d-flex">
                                          <img src="/assets/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                          <div className="flex-1">
                                              <Link to="/dashboard/#!" className="stretched-link">
                                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                                              </Link>
                                              <div className="fs-13 text-muted">
                                                  <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                      graph 🔔.</p>
                                              </div>
                                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                  <span><i className="mdi mdi-clock-outline"></i> 48 min ago</span>
                                              </p>
                                          </div>
                                          <div className="px-2 fs-15">
                                              <div className="form-check notification-check">
                                                  <input className="form-check-input" type="checkbox" value="" id="all-notification-check02"/>
                                                  <label className="form-check-label" for="all-notification-check02"></label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="text-reset notification-item d-block dropdown-item position-relative">
                                      <div className="d-flex">
                                          <div className="avatar-xs me-3">
                                              <span className="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                                                  <i class='bx bx-message-square-dots'></i>
                                              </span>
                                          </div>
                                          <div className="flex-1">
                                              <Link to="/dashboard/#!" className="stretched-link">
                                                  <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b className="text-success">20</b> new messages in the conversation
                                                  </h6>
                                              </Link>
                                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                  <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                              </p>
                                          </div>
                                          <div className="px-2 fs-15">
                                              <div className="form-check notification-check">
                                                  <input className="form-check-input" type="checkbox" value="" id="all-notification-check03"/>
                                                  <label className="form-check-label" for="all-notification-check03"></label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="text-reset notification-item d-block dropdown-item position-relative">
                                      <div className="d-flex">
                                          <img src="/assets/images/users/avatar-8.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                          <div className="flex-1">
                                              <Link to="/dashboard/#!" className="stretched-link">
                                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                                              </Link>
                                              <div className="fs-13 text-muted">
                                                  <p className="mb-1">We talked about a project on linkedin.</p>
                                              </div>
                                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                  <span><i className="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                                              </p>
                                          </div>
                                          <div className="px-2 fs-15">
                                              <div className="form-check notification-check">
                                                  <input className="form-check-input" type="checkbox" value="" id="all-notification-check04"/>
                                                  <label className="form-check-label" for="all-notification-check04"></label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="my-3 text-center view-all">
                                      <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                          All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                                  </div>
                              </div>

                          </div>

                          <div className="tab-pane fade py-2 ps-2" id="messages-tab" role="tabpanel" aria-labelledby="messages-tab">
                              <div data-simplebar style={{maxHeight: "300px"}} className="pe-2">
                                  <div className="text-reset notification-item d-block dropdown-item">
                                      <div className="d-flex">
                                          <img src="/assets/images/users/avatar-3.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                          <div className="flex-1">
                                              <Link to="/dashboard/#!" className="stretched-link">
                                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6>
                                              </Link>
                                              <div className="fs-13 text-muted">
                                                  <p className="mb-1">We talked about a project on linkedin.</p>
                                              </div>
                                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                  <span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
                                              </p>
                                          </div>
                                          <div className="px-2 fs-15">
                                              <div className="form-check notification-check">
                                                  <input className="form-check-input" type="checkbox" value="" id="messages-notification-check01"/>
                                                  <label className="form-check-label" for="messages-notification-check01"></label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="text-reset notification-item d-block dropdown-item">
                                      <div className="d-flex">
                                          <img src="/assets/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                          <div className="flex-1">
                                              <Link to="/dashboard/#!" className="stretched-link">
                                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                                              </Link>
                                              <div className="fs-13 text-muted">
                                                  <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                      graph 🔔.</p>
                                              </div>
                                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                  <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                              </p>
                                          </div>
                                          <div className="px-2 fs-15">
                                              <div className="form-check notification-check">
                                                  <input className="form-check-input" type="checkbox" value="" id="messages-notification-check02"/>
                                                  <label className="form-check-label" for="messages-notification-check02"></label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="text-reset notification-item d-block dropdown-item">
                                      <div className="d-flex">
                                          <img src="/assets/images/users/avatar-6.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                          <div className="flex-1">
                                              <Link to="/dashboard/#!" className="stretched-link">
                                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6>
                                              </Link>
                                              <div className="fs-13 text-muted">
                                                  <p className="mb-1">Mentionned you in his comment on 📃 invoice #12501.
                                                  </p>
                                              </div>
                                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                  <span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                                              </p>
                                          </div>
                                          <div className="px-2 fs-15">
                                              <div className="form-check notification-check">
                                                  <input className="form-check-input" type="checkbox" value="" id="messages-notification-check03"/>
                                                  <label className="form-check-label" for="messages-notification-check03"></label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="text-reset notification-item d-block dropdown-item">
                                      <div className="d-flex">
                                          <img src="/assets/images/users/avatar-8.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                          <div className="flex-1">
                                              <Link to="/dashboard/#!" className="stretched-link">
                                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                                              </Link>
                                              <div className="fs-13 text-muted">
                                                  <p className="mb-1">We talked about a project on linkedin.</p>
                                              </div>
                                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                  <span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
                                              </p>
                                          </div>
                                          <div className="px-2 fs-15">
                                              <div className="form-check notification-check">
                                                  <input className="form-check-input" type="checkbox" value="" id="messages-notification-check04"/>
                                                  <label className="form-check-label" for="messages-notification-check04"></label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="my-3 text-center view-all">
                                      <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                          All Messages <i className="ri-arrow-right-line align-middle"></i></button>
                                  </div>
                              </div>
                          </div>
                          <div className="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab"></div>

                          <div className="notification-actions" id="notification-actions">
                              <div className="d-flex text-muted justify-content-center">
                                  Select <div id="select-content" className="text-body fw-semibold px-1">0</div> Result <button type="button" className="btn btn-link link-danger p-0 ms-3" data-bs-toggle="modal" data-bs-target="#removeNotificationModal">Remove</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="dropdown ms-sm-3 header-item topbar-user">
                  <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="d-flex align-items-center">
                          <img className="rounded-circle header-profile-user" src="/assets/images/users/avatar-1.jpg" alt="Header Avatar"/>
                          <span className="text-start ms-xl-2">
                              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">Admin</span>
                              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">106.51.73.212</span>
                          </span>
                      </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                
                     <h6 className="dropdown-header">Welcome Anna!</h6>
                     <Link className="dropdown-item" to="/dashboard/profile.html"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Profile</span></Link>
                     <Link className="dropdown-item" to="/dashboard/apps-chat.html"><i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Messages</span></Link>
                     <Link className="dropdown-item" to="/dashboard/pages-faqs.html"><i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Help</span></Link>
                     <div className="dropdown-divider"></div>
                     <Link className="dropdown-item" to="/dashboard/transactions.html"><i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Balance : <b>$5971.67</b></span></Link>
                     <Link className="dropdown-item" to="/dashboard/settings.html"><span className="badge bg-soft-success text-success mt-1 float-end">New</span><i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Settings</span></Link>
                     <Link className="dropdown-item" to="/dashboard/lockscreen.html"><i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span></Link>
                     <Link className="dropdown-item" onClick={logout}><i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span className="align-middle" data-key="t-logout" >Logout</span></Link>
                  </div>
              </div>
          </div>
      </div>
  </div>
</header>


<div id="removeNotificationModal" className="modal fade zoomIn" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
          <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close"></button>
          </div>
          <div className="modal-body">
              <div className="mt-2 text-center">
                  <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{width:'100px',height:"100px"}}></lord-icon>
                  <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                      <h4>Are you sure ?</h4>
                      <p className="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p>
                  </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                  <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn w-sm btn-danger" id="delete-notification">Yes, Delete It!</button>
              </div>
          </div>

      </div>
  </div>
</div>
{show&&<div className="app-menu navbar-menu !block !md:hidden">

<div id="scrollbar" >
          
          <div className="container-fluid ">
             <div id="two-column-menu "></div>
             <ul className="navbar-nav block" >
                <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                <li className="nav-item !text-gray-600">
                   <Link className="nav-link" to="/dashboard">
                   <i className="ri-dashboard-2-line"></i> <span data-key="t-dashboard">Dashboard</span>
                   </Link>
                </li>
                <li class="nav-item !text-gray-600 group relative">
<Link class="nav-link menu-link"  data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="UploadEnq">
   <i class="mdi mdi-headphones"></i> <span data-key="t-enquiries">User</span>
</Link>
<div class="hidden group-hover:block ml-5 border-b" >
   <ul class="nav nav-sm flex-column">
      <li class="nav-item !text-gray-600">
         <Link to="/dashboard/enquiry/domainEnquiry" class="nav-link" data-key="t-upload-enquiries"><i class="mdi mdi-earth"></i>Add User </Link>
      </li>
      <li class="nav-item !text-gray-600">
         <Link to="/dashboard/enquiry/assigned" class="nav-link" data-key="t-new-enquiries">
             {/* <i class="mdi mdi-headphones"></i> */}
        List User
              </Link>
      </li>
 
    
   </ul>
</div>
</li>

                {/* <li className="nav-item !text-gray-600 group relative">
                   <Link className="nav-link menu-link" to="/dashboard/#sidebarApps" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarApps">
                   <i className="ri-apps-2-line"></i> <span data-key="t-extensions">Extensions</span>
                   </Link>
                   <div class=" menu-dropdown hidden group-hover:block ml-5 border-b" id="sidebarApps">
                      <ul className="nav nav-sm flex-column">
                         <li className="nav-item !text-gray-600">
                            <Link to="/dashboard/active-extensions.html" className="nav-link" data-key="t-activeExt"> Active </Link>
                         </li>
                         <li className="nav-item !text-gray-600">
                            <Link to="/dashboard/inactive-extensions.html" className="nav-link" data-key="t-inactiveExt"> Inactive </Link>
                         </li>
                         <li className="nav-item !text-gray-600">
                            <Link to="/dashboard/assigned-extensions.html" className="nav-link" data-key="t-assignedExt"> Assigned </Link>
                         </li>
                      </ul>
                   </div>
                </li> */}
            
        
             </ul>
          </div>
       </div>

          <div className="sidebar-background"></div>
      </div>}
      <div className="app-menu navbar-menu ">
          
         


          <div id="scrollbar" >
          
             <div className="container-fluid ">
                <div id="two-column-menu "></div>
                <ul className="navbar-nav " >
                   <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                   <li className="nav-item !text-gray-600">
                      <Link className="nav-link" to="/dashboard">
                      <i className="ri-dashboard-2-line"></i> <span data-key="t-dashboard">Dashboard</span>
                      </Link>
                   </li>
                   <li class="nav-item !text-gray-600 group relative">
   <Link class="nav-link menu-link"  data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="UploadEnq">
      <i class="mdi mdi-account"></i> <span data-key="t-enquiries">User</span>
   </Link>
   <div class=" menu-dropdown hidden group-hover:block" >
   <ul class="nav nav-sm flex-column">
      <li class="nav-item !text-gray-600">
         <Link to="/dashboard/user/create" class="nav-link" data-key="t-upload-enquiries"><i className="mdi mdi-account-plus-outline"></i>Add User </Link>
      </li>
      <li class="nav-item !text-gray-600">
         <Link to="/dashboard/user/list" class="nav-link" data-key="t-new-enquiries">
             {/* <i class="mdi mdi-headphones"></i> */}
             <i className="mdi mdi-account-details"></i>  List User
              </Link>
      </li>
  
    
   </ul>
   </div>
</li>


      <li className="nav-item !text-gray-600 group">
        <Link
          className="nav-link menu-link "
          data-bs-toggle="collapse"
        
          onClick={() => setShowCategory(!showCategory)}
        >
          <i className="mdi mdi-square-outline"></i>
          <span data-key="t-products" className='pr-2'>Products</span>
        </Link>
        <div className={`menu-dropdown ${showCategory ? 'block' : 'hidden'}`}>
          <ul className="nav nav-sm flex-column">
            <li className="nav-item !text-gray-600 group">
              <Link
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                onClick={() => setShowCategory(!showCategory)}
              >
                <i className="mdi mdi-file-document-outline"></i> Category
              </Link>
              <div
                className={`menu-dropdown ${showCategory ? 'block' : 'hidden'}`}
                id="sidebarInvoice"
              >
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item !text-gray-600">
                    <Link to="/dashboard/category/list" className="nav-link">
                      <i className="mdi mdi-format-list-bulleted"></i> List
                    </Link>
                  </li>
                  <li className="nav-item !text-gray-600">
                    <Link to="/dashboard/category/create" className="nav-link text-success">
                      <i className="mdi mdi-plus"></i> Create
                    </Link>
                  </li>
               
                </ul>
              </div>
            </li>
            <li className="nav-item !text-gray-600 group">
              <Link
                to="/dashboard/#sidebarInvoice"
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                onClick={() => setShowProducts(!showProducts)}
              >
                <i className="mdi mdi-file-document-multiple-outline"></i> Products
              </Link>
              <div className={`menu-dropdown ${showProducts ? 'block' : 'hidden'}`}>
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item !text-gray-600">
                    <Link to="/dashboard/product/list" className="nav-link">
                      <i className="mdi mdi-format-list-bulleted"></i> List
                    </Link>
                  </li>
                  <li className="nav-item !text-gray-600">
                    <Link to="/dashboard/product/create" className="nav-link text-success">
                      <i className="mdi mdi-plus"></i> Create
                    </Link>
                  </li>
                  {/* <li className="nav-item !text-gray-600">
                    <Link to="/dashboard/product/stock" className="nav-link ">
                      <i className="mdi mdi-cube"></i> Stock
                    </Link>
                  </li>
                  <li className="nav-item !text-gray-600">
                    <Link to="/dashboard/product/price" className="nav-link ">
                      <i className="mdi mdi-cash"></i> Price
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>
            
          </ul>
        </div>
      </li>
       
      <li class="nav-item !text-gray-600 group relative">
   <Link class="nav-link menu-link"  data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="UploadEnq">
      <i class="mdi mdi-cube"></i> <span data-key="t-enquiries">Apps</span>
   </Link>
   <div class=" menu-dropdown hidden group-hover:block" >
   <ul class="nav nav-sm flex-column">
      <li class="nav-item !text-gray-600">
         <Link to="/dashboard/apps/mail" class="nav-link" data-key="t-upload-enquiries"><i className="mdi mdi-mail"></i>Mails</Link>
      </li>
      {/* <li class="nav-item !text-gray-600">
         <Link to="/dashboard/user/list" class="nav-link" data-key="t-new-enquiries">

             <i className="mdi mdi-account-details"></i>  List User
              </Link>
      </li> */}
  
    
   </ul>
   </div>
</li>
           
                </ul>
             </div>
          </div>

          <div className="sidebar-background"></div>
      </div>
 
      <div className="vertical-overlay"></div>

      <div className="main-content">
      <div className="page-content !p-0">
        <div className="container-fluid">
        <div className="row">
        <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
        <div className="page-title-right">
        {/* <ol className="breadcrumb m-0">
        <li className="breadcrumb-item"><Link to="/dashboard/javascript: void(0);">Dashboard</Link></li>
        <li className="breadcrumb-item active">Pricing</li>
        </ol> */}
        </div>
        </div>
        </div>
        </div>
        </div>
{children}
      </div>
          
      </div>
    
  </div>:<div className='fixed z-[4334] top-0 left-0 w-[100vw] h-[100vh] bg-white'>
        <LockScreen/>
    </div>}
    </>
  )
}

export default Layout