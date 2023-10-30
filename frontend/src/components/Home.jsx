import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from '../stores/loaderSlice'
import axiosInstance from './axiosInstance'
import moment from 'moment'
import { Link } from 'react-router-dom'

function Home() {

   const [users,setUsers]=useState([])
   const dispatch=useDispatch()
       const getAllusers=async()=>{
           dispatch(setLoader(true))
       try {
       const res=await axiosInstance.get("/products")
           console.log(res)
           if(res.status){
               dispatch(setLoader(false))
               setUsers(res.data.products)
           }
       } catch (error) {
           console.log(error)
           dispatch(setLoader(false))
   
       }
       }
   useEffect(()=>{
   getAllusers()
   },[])
  return (
    <div className='px-10 py-14'>
  
          <div class="row project-wrapper">
             <div class="col-xxl-8">
                <div class="row">

                   <div class="col-md-6 col-lg-4 col-xl-4 col-xl-4">
                      <div class="card card-animate">
                         <div class="card-body">
                            <div class="d-flex align-items-center">
                               <div class="avatar-sm h-auto">
                                  <p class="text-uppercase fw-medium text-muted white-space-pre mb-2">New Clients</p>
                                  <span class="avatar-title bg-soft-success text-secondary rounded-2 fs-2">
                                  <i class="mdi mdi-account-group text-success"></i>
                                  </span>
                               </div>
                               <div class="flex-grow-1 overflow-hidden ms-3">
                                  <div class="d-flex align-items-center mb-3 text-right">
                                     <h4 class="flex-grow-1 mb-0"><span class="counter-value" data-target="15">0</span></h4>
                                  </div>
                                  <a href="#">
                                     <p class="text-truncate mb-0 text-right"><u>Click for Info</u></p>
                                  </a>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div class="col-md-6 col-lg-4 col-xl-4 col-xl-4">
                      <div class="card card-animate">
                         <div class="card-body">
                            <div class="d-flex align-items-center">
                               <div class="avatar-sm h-auto">
                                  <p class="text-uppercase fw-medium text-muted white-space-pre mb-2">Pending Carts</p>
                                  <span class="avatar-title bg-soft-warning text-warning rounded-2 fs-2">
                                  <i class="mdi mdi-cart-outline text-warning"></i>
                                  </span>
                               </div>
                               <div class="flex-grow-1 overflow-hidden ms-3">
                                  <div class="d-flex align-items-center mb-3 text-right">
                                     <h4 class="flex-grow-1 mb-0"><span class="counter-value" data-target="15">0</span></h4>
                                  </div>
                                  <a href="#">
                                     <p class="text-truncate mb-0 text-right"><u>Click for Info</u></p>
                                  </a>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div class="col-md-6 col-lg-4 col-xl-4 col-xl-4">
                      <div class="card card-animate">
                         <div class="card-body">
                            <div class="d-flex align-items-center">
                               <div class="avatar-sm h-auto">
                                  <p class="text-uppercase fw-medium text-muted mb-2 white-space-pre">Total Payments</p>
                                  <span class="avatar-title bg-soft-success text-success rounded-2 fs-2">
                                  <i class="mdi mdi-cash text-success"></i>
                                  </span>
                               </div>
                               <div class="flex-grow-1 overflow-hidden ms-3">
                                  <div class="d-flex align-items-center mb-3 text-right">
                                     <h4 class="flex-grow-1 mb-0">
                                       <span class="counter-value" data-target="25">0</span>
                                       <span>/</span>
                                       <span class="counter-value" data-target="30">0</span>
                                     </h4>
                                   </div>
                                  <a href="#">
                                     <p class="text-truncate mb-0 text-right"><u>Click for Info</u></p>
                                  </a>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                <div class="row">
                   <div class="col-xl-12">
                      <div class="card h-100 mb-3">
                         <div class="card-header border-0 align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Total Products</h4>
                            <div>
                        
                            </div>
                         </div>
                         <div class="card-body overflow-auto !h-56">
                <table id="model-datatables" class="table table-bordered nowrap table-striped align-middle " style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>SR No.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price
</th>
                            <th>Stock</th>
                 
                            <th>Oder's </th>
                            <th>Created On</th>
                       
                        </tr>
                    </thead>
                     
                    <tbody className=' overflow-auto !h-56'>
                        
                    {users?.map((data,i)=>(
<tr key={i+"fgrh"}>

    <td>{i+1}</td>
    {/* <td>VLZ-452</td> */}
    <td>
<Link to={`/dashboard/product/${data?.id}`}>
      {data?.name+" "}
</Link>
      </td>
    <td>{data?.product_code+" "}</td>
    <td>{data?.description+" "}</td>
    <td>{data?.long_desc+" "}</td>
    <td>{data?.availability+" "}</td>
    <td>{moment(data?.created_at).format("MMM Do YY") +" "}</td>
    
</tr>
))}
                       
                       
                    </tbody>
                   
                </table>
            </div>
                         <div class="card-body p-0 pb-2">
                            <div>
                               <div id="projects-overview-chart" data-colors='["--vz-success", "--vz-secondary", "--vz-danger"]' dir="ltr" class="apex-charts"></div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             <div class="col-xxl-4">
                <div class="card">
                   <div class="card-header border-0">
                      <h4 class="card-title mb-0">Parent Activities</h4>
                   </div>
                   <div class="card-body pt-0">
                      <div class="upcoming-scheduled">
                         <input type="text" class="form-control" data-provider="flatpickr" data-date-format="d M, Y" data-deafult-date="today" data-inline-date="true"/>
                      </div>
                      <h6 class="text-uppercase fw-semibold mt-4 mb-3 text-muted">Events:</h6>
                      <div class="mini-stats-wid d-flex align-items-center mt-3">
                         <div class="flex-shrink-0 avatar-sm">
                            <span class="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                            09
                            </span>
                         </div>
                         <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">Development planning</h6>
                            <p class="text-muted mb-0">iTest Factory </p>
                         </div>
                         <div class="flex-shrink-0">
                            <p class="text-muted mb-0">9:20 <span class="text-uppercase">am</span></p>
                         </div>
                      </div>
                      <div class="mini-stats-wid d-flex align-items-center mt-3">
                         <div class="flex-shrink-0 avatar-sm">
                            <span class="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                            12
                            </span>
                         </div>
                         <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">Design new UI and check sales</h6>
                            <p class="text-muted mb-0">Meta4Systems</p>
                         </div>
                         <div class="flex-shrink-0">
                            <p class="text-muted mb-0">11:30 <span class="text-uppercase">am</span></p>
                         </div>
                      </div>
                      <div class="mini-stats-wid d-flex align-items-center mt-3">
                         <div class="flex-shrink-0 avatar-sm">
                            <span class="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                            25
                            </span>
                         </div>
                         <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">Weekly catch-up </h6>
                            <p class="text-muted mb-0">Nesta Technologies</p>
                         </div>
                         <div class="flex-shrink-0">
                            <p class="text-muted mb-0">02:00 <span class="text-uppercase">pm</span></p>
                         </div>
                      </div>
                      <div class="mini-stats-wid d-flex align-items-center mt-3">
                         <div class="flex-shrink-0 avatar-sm">
                            <span class="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                            27
                            </span>
                         </div>
                         <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">James Bangs (Client) Meeting</h6>
                            <p class="text-muted mb-0">Nesta Technologies</p>
                         </div>
                         <div class="flex-shrink-0">
                            <p class="text-muted mb-0">03:45 <span class="text-uppercase">pm</span></p>
                         </div>
                      </div>
                      <div class="mt-3 text-center">
                         <a href="javascript:void(0);" class="text-muted text-decoration-underline">View all Events</a>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div class="row">
             <div class="col-xl-12">
                <div class="card">
                  <div class="card-header border-0 align-items-center d-flex">
                      <h4 class="card-title mb-0 flex-grow-1">Orders from adjacent domains</h4>
                   </div>
                   <div class="card-body border border-dashed border-end-0 border-start-0">
                      <form>
                         <div class="row g-3">
                            <div class="col-xxl-8 col-sm-4">
                               <div class="search-box">
                                  <input type="text" class="form-control search bg-light border-light" placeholder="Search"/>
                                  <i class="ri-search-line search-icon"></i>
                               </div>
                            </div>
                            <div class="col-xxl-2 col-sm-4">
                               <button type="button" class="btn btn-primary w-100 bg-[#687cfe]" > <i class="ri-equalizer-fill me-1 align-bottom"></i>
                               Search
                               </button>
                            </div>
                            <div class="col-6 col-md-3 col-lg-3 col-xxl-2 col-sm-4">
                               <button id="advSearch" type="button" class="btn btn-info w-100 bg-[#0ac7fb]"> <i class="mdi mdi-magnify search-widget-icon me-1 align-bottom"></i>
                               Advanced Search
                               </button>
                            </div>
                            <div class="col-6 col-md-3 col-lg-3 col-xxl-12 py-2 m-0" id="advSearchDiv">
                               <hr/>
                               <div class="d-flex gap-2">
                                  <div class="col-xxl-2">
                                     <select class="form-control" data-choices name="choices-single-default">
                                        <option value="">Select Source</option>
                                        <option value="Choice 1">Inbound</option>
                                        <option value="Choice 2">Outbound</option>
                                        <option value="Choice 3">Inbound Missed</option>
                                        <option value="Choice 3">Outbound Missed</option>
                                     </select>
                                  </div>
                                  <div class="col-xxl-2">
                                     <input type="text" class="form-control" data-provider="flatpickr" data-date-format="d M, Y" data-range-date="true" placeholder="Select Date Range"/>
                                  </div>
                                  <div class="col-6 col-md-2 col-lg-2 col-xxl-1">
                                     <button class="btn btn-success w-100"> <i class="mdi mdi-magnify search-widget-icon me-1 align-bottom"></i>
                                     Filter
                                     </button>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </form>
                   </div>
                   <div class="card-body">
                      <ul class="nav nav-tabs nav-justified mb-3 gap-3" data-dropdown-tabs="true" id="" role="tablist">
                         <li class="nav-item">
                            <a class="nav-link active" data-bs-toggle="tab" href="#inbound-tab" role="tab" aria-selected="true">
                            <i class="mdi mdi-phone-incoming-outline"></i> Pending
                            </a>
                         </li>
                         <li class="nav-item">
                            <a class="nav-link align-middle" data-bs-toggle="tab" href="#outbound-tab" role="tab" aria-selected="true">
                            <i class="mdi mdi-phone-outgoing-outline"></i> Success
                            </a>
                         </li>
                         <li class="nav-item">
                            <a class="nav-link align-middle" data-bs-toggle="tab" href="#inbound-missed-tab" role="tab" aria-selected="true">
                            <i class="mdi mdi-phone-missed-outline"></i> Failed
                            </a>
                         </li>
                         <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#outbound-missed-tab" role="tab" aria-selected="true">
                            <i class="mdi mdi-phone-missed-outline"></i> Expired
                            </a>
                         </li>
                      </ul>
                      <div class="tab-content text-muted" id="">
                         <div class="tab-pane active" id="inbound-tab" role="tabpanel">
                            <div class="card card-height-100 mt-4">
                               <div class="card-body">
                                  <div class="table-responsive table-card">
                                     <table class="table table-nowrap table-centered align-middle">
                                        <thead class="bg-light text-muted">
                                           <tr>
                                              <th scope="col">Sl No.</th>
                                              <th scope="col">Order No</th>
                                              <th scope="col">Staff</th>
                                              <th scope="col">Client</th>
                                              <th scope="col">Domain</th>
                                              <th scope="col">Amount</th>
                                              <th scope="col">Invoice No</th>
                                           </tr>
                                        </thead>
                                        <tbody>
                                           <tr>
                                              <td>1</td>
                                              <td class="fw-medium">2023-08-23 09:13:52</td>
                                              <td>
                                                 1692762232.2904217
                                              </td>
                                              <td>68415979</td>
                                              <td>09786855179</td>
                                              <td><span class="badge badge-soft-success">ANSWERED</span></td>
                                              <td class="text-muted">5:15</td>
                                              
                                           </tr>
                                        </tbody>
                                     </table>
                                  </div>
                                  <div class="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
                                     <div class="flex-shrink-0">
                                        <div class="text-muted">Showing <span class="fw-semibold">5</span> of <span class="fw-semibold">25</span> Results </div>
                                     </div>
                                     <ul class="pagination pagination-separated pagination-sm mb-0">
                                        <li class="page-item disabled">
                                           <a href="#" class="page-link">←</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">1</a>
                                        </li>
                                        <li class="page-item active">
                                           <a href="#" class="page-link">2</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">3</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">→</a>
                                        </li>
                                     </ul>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div class="tab-pane" id="outbound-tab" role="tabpanel">
                            <div class="card card-height-100 mt-4">
                               <div class="card-body">
                                  <div class="table-responsive table-card">
                                     <table class="table table-nowrap table-centered align-middle">
                                        <thead class="bg-light text-muted">
                                           <tr>
                                              <th scope="col">Sl No.</th>
                                              <th scope="col">Call Date</th>
                                              <th scope="col">Linked ID</th>
                                              <th scope="col">Caller ID</th>
                                              <th scope="col">Destination</th>
                                              <th scope="col">Disposition</th>
                                              <th scope="col">Duration</th>
                                              <th scope="col" style={{width:" 10%"}}>Recording</th>
                                           </tr>
                                        </thead>
                                        <tbody>
                                           <tr>
                                              <td>1</td>
                                              <td class="fw-medium">2023-08-23 09:13:52</td>
                                              <td>
                                                 1692762232.2904217
                                              </td>
                                              <td>68415979</td>
                                              <td>09786855179</td>
                                              <td><span class="badge badge-soft-danger">NOT ANSWERED</span></td>
                                              <td class="text-muted">5:15</td>
                                              
                                           </tr>
                                        </tbody>
                                     </table>
                                  </div>
                                  <div class="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
                                     <div class="flex-shrink-0">
                                        <div class="text-muted">Showing <span class="fw-semibold">5</span> of <span class="fw-semibold">25</span> Results </div>
                                     </div>
                                     <ul class="pagination pagination-separated pagination-sm mb-0">
                                        <li class="page-item disabled">
                                           <a href="#" class="page-link">←</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">1</a>
                                        </li>
                                        <li class="page-item active">
                                           <a href="#" class="page-link">2</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">3</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">→</a>
                                        </li>
                                     </ul>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div class="tab-pane" id="inbound-missed-tab" role="tabpanel">
                            <div class="card card-height-100 mt-4">
                               <div class="card-body">
                                  <div class="table-responsive table-card">
                                     <table class="table table-nowrap table-centered align-middle">
                                        <thead class="bg-light text-muted">
                                           <tr>
                                              <th scope="col">Sl No.</th>
                                              <th scope="col">Call Date</th>
                                              <th scope="col">Linked ID</th>
                                              <th scope="col">Caller ID</th>
                                              <th scope="col">Destination</th>
                                              <th scope="col">Disposition</th>
                                              <th scope="col">Duration</th>
                                              <th scope="col" style={{width:" 10%"}}>Recording</th>
                                           </tr>
                                           
                                        </thead>
                                        
                                        <tbody>
                                           <tr>
                                              <td>1</td>
                                              <td class="fw-medium">2023-08-23 09:13:52</td>
                                              <td>
                                                 1692762232.2904217
                                              </td>
                                              <td>68415979</td>
                                              <td>09786855179</td>
                                              <td><span class="badge badge-soft-success">ANSWERED</span></td>
                                              <td class="text-muted">5:15</td>
                                              
                                           </tr>
                                           
                                        </tbody>
                                     </table>
                                    
                                  </div>
                                  <div class="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
                                     <div class="flex-shrink-0">
                                        <div class="text-muted">Showing <span class="fw-semibold">5</span> of <span class="fw-semibold">25</span> Results </div>
                                     </div>
                                     <ul class="pagination pagination-separated pagination-sm mb-0">
                                        <li class="page-item disabled">
                                           <a href="#" class="page-link">←</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">1</a>
                                        </li>
                                        <li class="page-item active">
                                           <a href="#" class="page-link">2</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">3</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">→</a>
                                        </li>
                                     </ul>
                                  </div>
                               </div>
                               
                            </div>
                            
                         </div>

                         <div class="tab-pane" id="outbound-missed-tab" role="tabpanel">
                            <div class="card card-height-100 mt-4">
                               <div class="card-body">
                                  <div class="table-responsive table-card">
                                     <table class="table table-nowrap table-centered align-middle">
                                        <thead class="bg-light text-muted">
                                           <tr>
                                              <th scope="col">Sl No.</th>
                                              <th scope="col">Call Date</th>
                                              <th scope="col">Linked ID</th>
                                              <th scope="col">Caller ID</th>
                                              <th scope="col">Destination</th>
                                              <th scope="col">Disposition</th>
                                              <th scope="col">Duration</th>
                                              <th scope="col" style={{width:" 10%"}}>Recording</th>
                                           </tr>
                                           
                                        </thead>
                                        
                                        <tbody>
                                           <tr>
                                              <td>1</td>
                                              <td class="fw-medium">2023-08-23 09:13:52</td>
                                              <td>
                                                 1692762232.2904217
                                              </td>
                                              <td>68415979</td>
                                              <td>09786855179</td>
                                              <td><span class="badge badge-soft-danger">NOT ANSWERED</span></td>
                                              <td class="text-muted">5:15</td>
                                              
                                           </tr>
                                           
                                        </tbody>
                                        
                                     </table>
                                    
                                  </div>
                                  <div class="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
                                     <div class="flex-shrink-0">
                                        <div class="text-muted">Showing <span class="fw-semibold">5</span> of <span class="fw-semibold">25</span> Results </div>
                                     </div>
                                     <ul class="pagination pagination-separated pagination-sm mb-0">
                                        <li class="page-item disabled">
                                           <a href="#" class="page-link">←</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">1</a>
                                        </li>
                                        <li class="page-item active">
                                           <a href="#" class="page-link">2</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">3</a>
                                        </li>
                                        <li class="page-item">
                                           <a href="#" class="page-link">→</a>
                                        </li>
                                     </ul>
                                  </div>
                               </div>
                               
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

export default Home