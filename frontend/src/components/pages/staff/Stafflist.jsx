import React from 'react'

function Stafflist() {
  return (
    <div>  <div class="row h-100">
    <div class="col-lg-3 col-md-6">
       <div class="card card-animate">
          <div class="card-body">
             <div class="d-flex align-items-center">
                <div class="avatar-sm flex-shrink-0">
                   <span class="avatar-title bg-light text-primary rounded-circle fs-3">
                   <i class="mdi mdi-phone-incoming-outline align-middle"></i>
                   </span>
                </div>
                <div class="flex-grow-1 ms-3">
                   <p class="text-uppercase fw-semibold fs-12 text-muted mb-1"> Inbound Calls</p>
                   <h4 class="mb-2"><span class="counter-value" data-target="25">0</span>h <span class="counter-value" data-target="25">0</span>m <span class="counter-value" data-target="25">0</span>s</h4>
                   <h6 class="text-muted mb-0"><span class="counter-value" data-target="2390">0</span> Calls</h6>
                </div>
                <div class="flex-shrink-0 align-self-end">
                   <span class="badge bg-success-subtle text-success"><i class="ri-arrow-up-s-fill align-middle me-1"></i>6.24 %<span>
                   </span></span>
                </div>
             </div>
          </div>
          
       </div>
       
    </div>
    
    <div class="col-lg-3 col-md-6">
       <div class="card card-animate">
          <div class="card-body">
             <div class="d-flex align-items-center">
                <div class="avatar-sm flex-shrink-0">
                   <span class="avatar-title bg-light text-success rounded-circle fs-3">
                   <i class="mdi mdi-phone-outgoing-outline align-middle"></i>
                   </span>
                </div>
                <div class="flex-grow-1 ms-3">
                   <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">Outbound Calls</p>
                   <h4 class="mb-2"><span class="counter-value" data-target="25">0</span>h <span class="counter-value" data-target="25">0</span>m <span class="counter-value" data-target="25">0</span>s</h4>
                   <h6 class="text-muted mb-0"><span class="counter-value" data-target="2390">0</span> Calls</h6>
                </div>
                <div class="flex-shrink-0 align-self-end">
                   <span class="badge bg-success-subtle text-success"><i class="ri-arrow-up-s-fill align-middle me-1"></i>3.67 %<span>
                   </span></span>
                </div>
             </div>
          </div>
          
       </div>
       
    </div>
    
    <div class="col-lg-3 col-md-6">
       <div class="card card-animate">
          <div class="card-body">
             <div class="d-flex align-items-center">
                <div class="avatar-sm flex-shrink-0">
                   <span class="avatar-title bg-light text-danger rounded-circle fs-3">
                   <i class="mdi mdi-phone-missed-outline align-middle"></i>
                   </span>
                </div>
                <div class="flex-grow-1 ms-3">
                   <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">Inbound Missed Calls</p>
                   <h4 class="mb-2"><span class="counter-value" data-target="25">0</span>h <span class="counter-value" data-target="25">0</span>m <span class="counter-value" data-target="25">0</span>s</h4>
                   <h6 class="text-muted mb-0"><span class="counter-value" data-target="2390">0</span> Calls</h6>
                </div>
                <div class="flex-shrink-0 align-self-end">
                   <span class="badge bg-danger-subtle text-danger"><i class="ri-arrow-down-s-fill align-middle me-1"></i>4.80 %<span>
                   </span></span>
                </div>
             </div>
          </div>
          
       </div>
       
    </div>
    
    <div class="col-lg-3 col-md-6">
       <div class="card card-animate">
          <div class="card-body">
             <div class="d-flex align-items-center">
                <div class="avatar-sm flex-shrink-0">
                   <span class="avatar-title bg-light text-warning rounded-circle fs-3">
                   <i class="mdi mdi-phone-missed-outline align-middle"></i>
                   </span>
                </div>
                <div class="flex-grow-1 ms-3">
                   <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">Outbound Missed Calls</p>
                   <h4 class="mb-2"><span class="counter-value" data-target="25">0</span>h <span class="counter-value" data-target="25">0</span>m <span class="counter-value" data-target="25">0</span>s</h4>
                   <h6 class="text-muted mb-0"><span class="counter-value" data-target="2390">0</span> Calls</h6>
                </div>
                <div class="flex-shrink-0 align-self-end">
                   <span class="badge bg-danger-subtle text-danger"><i class="ri-arrow-down-s-fill align-middle me-1"></i>4.80 %<span></span></span>
                </div>
             </div>
          </div>
          
       </div>
       
    </div>
    
 </div>
 <div class="row">
    <div class="col-lg-9">
       <div class="card" id="tasksList">
          <div class="card-header border-0">
             <div class="d-flex align-items-center gap-2">
                <h5 class="card-title mb-0 flex-grow-1">Staffs List</h5>
                <span class="btn btn-warning btn-sm fs-12 py-1">Inactive</span>
                <span class="btn btn-danger btn-sm fs-12 py-1">Terminate</span>
             </div>
          </div>
          <div class="card-body border border-dashed border-end-0 border-start-0">
             <form>
                <div class="row g-3">
                   <div class="col-xxl-10 col-sm-12">
                      <div class="search-box">
                         <input type="text" class="form-control search bg-light border-light" placeholder="Search"/>
                         <i class="ri-search-line search-icon"></i>
                      </div>
                   </div>
                   
                   <div class="col-xxl-2 col-sm-4">
                      <button type="button" class="btn btn-primary w-100 bg-[#687cfe]"> <i class="ri-equalizer-fill me-1 align-bottom"></i>
                      Search
                      </button>
                   </div>
                   
                </div>
             </form>
          </div>
          <div class="card-body">
             <div class="table-responsive table-card mb-4">
                <table class="table dt-responsive w-100" id="example">
                   <thead class="table-light text-muted">
                      <tr>
                         <th scope="col" style={{width: "40px"}}>
                            <div class="form-check">
                               <input class="form-check-input" type="checkbox" id="checkAll" value="option"/>
                            </div>
                         </th>
                         <th>Ext No.</th>
                         <th>Name</th>
                         <th>IP</th>
                         <th>Created Date</th>
                         <th>Last Login</th>
                      </tr>
                   </thead>
                   <tbody class="list form-check-all">
                      <tr>
                         <th scope="row">
                            <div class="form-check">
                               <input class="form-check-input" type="checkbox" name="chk_child" value="option1"/>
                            </div>
                         </th>
                         <td><a href="" class="fw-medium link-primary">8002</a></td>
                         <td>
                            <a class="fw-medium link-primary fs-16">Mohamed Momin</a>
                            <p class="mb-0">Momin@gleamglobalservicesindia.com</p>
                         </td>
                         <td>
                            <span>120.250.25.25</span>
                         </td>
                         <td>
                            <span class="badge badge-soft-secondary p-2 fs-12">28-08-2023</span>
                         </td>
                         <td>
                            <span>28 August, 2023 | 10:10:25	</span>
                         </td>
                      </tr>
                      <tr>
                         <th scope="row">
                            <div class="form-check">
                               <input class="form-check-input" type="checkbox" name="chk_child" value="option1"/>
                            </div>
                         </th>
                         <td><a href="" class="fw-medium link-primary">2001</a></td>
                         <td>
                            <a class="fw-medium link-primary fs-16">Mohamed Momin</a>
                            <p class="mb-0">Momin@gleamglobalservicesindia.com</p>
                         </td>
                         <td>
                            <span>120.250.25.25</span>
                         </td>
                         <td>
                            <span class="badge badge-soft-secondary p-2 fs-12">28-08-2023</span>
                         </td>
                         <td>
                            <span>28 August, 2023 | 10:10:25	</span>
                         </td>
                      </tr>
                   </tbody>
                </table>
                <div class="noresult" style={{display: "none"}}>
                   <div class="text-center">
                      <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{width:"75px",height:"75px"}}></lord-icon>
                      <h5 class="mt-2">Sorry! No Result Found</h5>
                      <p class="text-muted mb-0">We've searched more than 200k+ tasks We did not find any tasks for you search.</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
       
    </div>
    <div class="col-lg-3">
       <div class="card" id="contact-view-detail">
          <div class="card-body text-center">
             <div class="position-relative d-inline-block">
                <img src="/assets/images/users/avatar-10.jpg" alt="" class="avatar-lg rounded-circle img-thumbnail"/>
                <span class="contact-active position-absolute rounded-circle bg-success"><span class="visually-hidden"></span>
                </span>
             </div>
             <h5 class="mt-4">Mohamed Momin</h5>
             <ul class="list-inline mb-0">
                <li class="list-inline-item avatar-xs">
                   <a href="javascript:void(0);" class="avatar-title bg-soft-success text-success fs-15 rounded">
                   <i class="ri-phone-line"></i>
                   </a>
                </li>
                <li class="list-inline-item avatar-xs">
                   <a href="javascript:void(0);" class="avatar-title bg-soft-danger text-danger fs-15 rounded">
                   <i class="ri-mail-line"></i>
                   </a>
                </li>
                <li class="list-inline-item avatar-xs">
                   <a href="javascript:void(0);" class="avatar-title bg-soft-warning text-warning fs-15 rounded">
                   <i class="ri-question-answer-line"></i>
                   </a>
                </li>
             </ul>
          </div>
          <div class="card-body">
                      <div class="table-responsive table-card">
                <table class="table table-borderless mb-0">
                   <tbody>
                      <tr>
                         <td class="fw-bold py-1" width="200" scope="row">Email ID</td>
                         <td class="py-1">Momin@gleamglobalservicesindia.com</td>
                      </tr>
                      <tr>
                         <td class="fw-bold py-1" scope="row">Phone No</td>
                         <td class="py-1">9036183631</td>
                      </tr>
                      <tr>
                         <td class="fw-bold py-1" scope="row">Ext No</td>
                         <td class="py-1">
                            <span class="badge badge-soft-info fs-12">8002</span>
                         </td>
                      </tr>
                      <tr>
                         <td valign="top" class="fw-bold" scope="row">Address</td>
                         <td class="py-1">No.3 FC, 401, level-4 RAGHAVA BUILDING, 4Th Floor, Near Airtel Showroom, Ramamurthy Nagar, Bengaluru, Karnataka - 560016.</td>
                      </tr>
                      <tr>
                         <td class="fw-bold py-1" scope="row">Branch</td>
                         <td class="py-1">Bengaluru</td>
                      </tr>
                      <tr>
                         <td class="fw-bold py-1" scope="row">Staff Activity</td>
                         <td class="py-1">
                            <span class="btn btn-secondary btn-sm fs-12 py-0">View</span>
                         </td>
                      </tr>
                      <tr>
                         <td class="fw-bold py-1" scope="row">Status</td>
                         <td class="py-1">
                            <span class="badge badge-outline-success fs-12">Active</span> |
                            <a href="#" class="text-danger">Change</a>
                         </td>
                      </tr>
                      <tr>
                         <td colspan="2" class="pt-1 pb-3" align="right">
                            <span><a class="text-primary" href="edit-profile.html"><i class="mdi mdi-square-edit-outline"></i> Edit</a></span> |
                            <span><button class="btn text-danger px-0" id="sa-dialog-three-btn"><i class="mdi mdi-trash-can-outline"></i> Terminate</button></span>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </div>
       </div>
       
    </div>
    
 </div>
 
 
 <div class="modal fade" id="createTask" tabindex="-1" aria-labelledby="createTaskLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
       <div class="modal-content border-0">
          <div class="modal-header p-3 bg-soft-success">
             <h5 class="modal-title" id="createTaskLabel">Create Comment</h5>
             <button type="button" class="btn-close" data-bs-dismiss="modal" id="createTaskBtn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
             <div id="task-error-msg" class="alert alert-danger py-2"></div>
             <form autocomplete="off" action="" id="creattask-form">
                <input type="hidden" id="taskid-input" class="form-control"/>
                <div class="mb-3">
                   <label for="task-title-input" class="form-label">Comment Title</label>
                   <input type="text" id="task-title-input" class="form-control" placeholder="Enter task title"/>
                </div>
                <div class="mb-3">
                   <label for="task-title-input" class="form-label">Comment</label>
                   <textarea name="name" class="form-control" rows="" cols=""></textarea>
                </div>
                <div class="mb-3 position-relative">
                   <label for="task-assign-input" class="form-label">Assigned To : <span class="text-muted">Staff Name</span> </label>
                   <div class="avatar-group justify-content-center" id="assignee-member">
                      <a href="javascript: void(0);" class="avatar-group-item mb-2" data-img="assets/images/users/avatar-3.jpg" data-bs-toggle="tooltip" data="" data-bs-title="John Robles">
                      <img src="assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xs"/>
                      </a>
                   </div>
                </div>
                <div class="row g-4 mb-3">
                   <div class="col-lg-6">
                      <label for="task-status" class="form-label">Status</label>
                      <select class="form-control" data-choices data-choices-search-false id="task-status-input">
                         <option value="">Status</option>
                         <option value="Ringing" selected>Ringing</option>
                         <option value="Postponed">Postponed</option>
                         <option value="Not Interested">Not Interested</option>
                         <option value="Completed">Completed</option>
                      </select>
                   </div>
                   <div class="col-lg-6">
                      <label for="priority-field" class="form-label">Post Time</label>
                      <input type="text" class="form-control flatpickr-input active" data-provider="timepickr" data-time-hrs="true" id="timepicker-24hrs" readonly="readonly"/>
                   </div>
                </div>
                <div class="mb-4">
                   <label for="task-duedate-input" class="form-label">Post Date</label>
                   <input type="text" class="form-control flatpickr-input active" data-provider="flatpickr" data-date-format="d M, Y" placeholder="DD MM, YYYY" readonly="readonly"/>
                </div>
                <div class="hstack gap-2 justify-content-end">
                   <button type="button" class="btn btn-ghost-success" data-bs-dismiss="modal"><i class="ri-close-fill align-bottom"></i> Close</button>
                   <button type="submit" class="btn btn-primary" id="addNewTodo">Add Comment</button>
                </div>
             </form>
          </div>
       </div>
    </div>
 </div></div>
  )
}

export default Stafflist