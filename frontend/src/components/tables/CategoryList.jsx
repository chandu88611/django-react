import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../stores/loaderSlice'
import axiosInstance from '../axiosInstance'
import { toast } from 'react-toastify'
import Modal from '@mui/material/Modal';
import { Box, Switch } from '@mui/material'
import * as Yup from 'yup';

import { Formik, Field, Form, ErrorMessage } from 'formik';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:"10px",
    boxShadow: 24,
    p: 4,
  };
function CategoryList() {
    const dispatch=useDispatch()
const [value,setValue]=useState('')
    const initialValues = {
        Name:value,
        // status: false, // Keep status as a boolean
      };
    
      const validationSchema = Yup.object({
        Name: Yup.string().required('Category Name is required'),
      });

      const onSubmit = async (values) => {
   
    dispatch(setLoader(true))
        try {
            
         const res=   await axiosInstance.post(`/edit-product-category/${open}`,{
             name:values.Name
            })
            
            if(res.status){
                dispatch(setLoader(false))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            dispatch(setLoader(false))
            toast.error(error.response?.data?.message)
    
        }
      };






    // list
    const [open, setOpen] = useState(false);
    const [users,setUsers]=useState([])

        const getAllusers=async()=>{
            dispatch(setLoader(true))
        try {
        const res=    await axiosInstance.get("/get-all-product-category")
            
            if(res.status){
                dispatch(setLoader(false))
                setUsers(res.data.productCategories)
            }
        } catch (error) {
            console.log(error)
            dispatch(setLoader(false))
    
        }
        }

        const deleteCategory=async(id)=>{
            dispatch(setLoader(true))
            try {
                const res=await axiosInstance.delete(`/delete-product-category/${id} `)
                if(res.status){
                    dispatch(setLoader(false))
                    toast.success(res.data.message)
                    getAllusers()
                }
            } catch (error) {
                dispatch(setLoader(false))
                toast.error(error.response.data.message)
            }
        }
    useEffect(()=>{
    getAllusers()
    },[])
  return (

    <div className="grid gri-cols-1 lg:grid-cols-6 h-screen">

    <div className=" bg-white  !h-full hidden lg:flex col-span-1 pt-[40px]  pl-3 flex-col align-bottom justify-between pb-[60px]">

    <div class="accordion accordion-border-box !w-full px-2" >
      <p className='text-md pt-2 my-1 py-2 text-muted'>Note</p>

                                            <div class="accordion-item w-full group">
                                                <h2 class="accordion-header" >
                                                    <button class="accordion-button text-xs bg-white text-black py-2" >
                                                        What is Lorem Ipsum ?
                                                    </button>
                                                </h2>
                                                <div  class="accordion-collapse hidden group-hover:block" >
                                                    <div class="accordion-body text-xs">
                                                        If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item w-full group">
                                                <h2 class="accordion-header" >
                                                    <button class="accordion-button text-xs bg-white text-black py-2" >
                                                        What is Lorem Ipsum ?
                                                    </button>
                                                </h2>
                                                <div  class="accordion-collapse hidden group-hover:block" >
                                                    <div class="accordion-body text-xs">
                                                        If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.
                                                    </div>
                                                </div>
                                            </div>
                                         
                                        <hr  className='my-4 text-gray-400'/>
                                        </div>
<div className="px-2 ">
  <p className="text-md text-muted ">
Shortcut
  </p>
  <div className='w-full p-2 my-2 bg-[#e0e0e06c] text-xs hover:scale-105 cursor-pointer'>
    Product list
  </div>
  <div className='w-full p-2 my-2 bg-[#e0e0e06c] text-xs hover:scale-105 cursor-pointer'>
    User list
  </div>
  <div className='w-full p-2 my-2 bg-[#e0e0e06c] text-xs hover:scale-105 cursor-pointer'>
    Category list
  </div>
</div>
    </div>
    <div className='col-span-5'>

    <div className='py-4 px-6 mt-8'>  <div class="row">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Category List</h5>
            </div>
            <div class="card-body">
                <table id="model-datatables" class="table table-bordered nowrap table-striped align-middle" style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>SR No.</th>
                            {/* <th>ID</th> */}
                            <th>Name</th>
                            <th>status</th>
                            <th>Action</th>
                            {/* <th>Assigned To</th>
                            <th>Created By</th>
                            <th>Create Date</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((data,i)=>(

                        <tr key={i+"fgrh"}>
                            <td>{i+1}</td>
                            {/* <td>VLZ-452</td> */}
                            <td>{data?.name+" "}</td>
                            <td><a href="#!"><Switch
  checked={data?.status=="1"}
  onChange={async()=>{
    dispatch(setLoader(true))
    try {
        
     const res=   await axiosInstance.post(`/toggle-category/${data?.id}`)
        
        if(res.status){
            dispatch(setLoader(false))
            toast.success(res.data.message)
            getAllusers()
        }
    } catch (error) {
        console.log(error)
        dispatch(setLoader(false))
        toast.error(error.response?.data?.message)

    }
  }}
  inputProps={{ 'aria-label': 'controlled' }}
/></a></td>
                 
                            {/* <td>Alexis Clarke</td>
                            <td>Joseph Parker</td>
                            <td>03 Oct, 2021</td>
                            <td><span class="badge badge-soft-info">Re-open</span></td>
                            <td><span class="badge bg-danger">High</span></td> */}
                            <td>
                                <div class="dropdown d-inline-block">
                                    <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="ri-more-fill align-middle"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        {/* <li><a href="#!" class="dropdown-item"><i class="ri-eye-fill align-bottom me-2 text-muted"></i> View</a></li> */}
                                        <li><a class="dropdown-item edit-item-btn cursor-pointer"onClick={()=>{
                          setValue(data?.name)
                                            setOpen(data?.id)
                                        }}><i class="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</a></li>
                                        <li>
                                            <a class="dropdown-item remove-item-btn cursor-pointer" onClick={()=>{deleteCategory(data.id)
                                           
                                            }}>
                                                <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        ))}
                       
                       
                       
                    </tbody>
                </table>


            </div>
        </div>
    </div>
</div></div>

    </div>

<Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
<Box sx={style}>
<Formik

        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4 flex flex-col">
            <label htmlFor="Name">Category Name *</label>
            <Field type="text" className="form-control" id="Name" name="Name" />
            <ErrorMessage name="Name" component="div" className="text-red-500" />
          </div>
          <div className='w-full flex  justify-end'>


          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700  w-32  ">
           Create
          </button>
</div>
        </Form>
      </Formik>
</Box>

      </Modal>
    </div>
  
  )
}

export default CategoryList