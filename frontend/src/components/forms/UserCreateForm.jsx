import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../stores/loaderSlice';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UserCreateForm() {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
  });
const navigate=useNavigate()
  const dispatch=useDispatch()
  const onSubmit = async (values) => {
    console.log('Form submitted with values:', values);
dispatch(setLoader(true))
    try {
        
       const res= await axiosInstance.post("/store-new-client ",{
            first_name:values.firstName,
            last_name:values.lastName,
            phone:values.phone,
            email:values.email
        })
        
        if(res.status){
            dispatch(setLoader(false))
            toast.success(res.data.message)
            setTimeout(()=>{

              navigate("/dashboard/user/list")
            },2000)
        }
    } catch (error) {
        console.log(error)
        dispatch(setLoader(false))
        toast.error("Problem in creating user")
    }
  };
  return (
    <>
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

    <div >
        <div className="w-full relative h-[300px] -z-[1] bg-center bg-no-repeat bg-cover" style={{backgroundImage:"url(https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_640.jpg"}}>
<div className='bg-blue-500 absolute h-full w-full opacity-70'></div>
    <h1 className=" font-semibold  absolute left-1/2 text-white top-1/2 -translate-x-1/2 !z-50 text-3xl ">Create New User</h1>
        </div>
    </div>
    <div className="w-[70vw] md:w-[50vw] lg:w-[35vw]  mx-auto -mt-24 p-4 bg-gray-100 rounded shadow-lg">
     
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className=" flex flex-col col-span-2">
            <label htmlFor="firstName">First Name</label>
            <Field type="text" className="styled_input" id="firstName" name="firstName" />
            <ErrorMessage name="firstName" component="div" className="text-red-500" />
          </div>

          <div className=" flex flex-col col-span-2">
            <label htmlFor="lastName">Last Name</label>
            <Field type="text" className="styled_input" id="lastName" name="lastName" />
            <ErrorMessage name="lastName" component="div" className="text-red-500" />
          </div>

          <div className=" flex flex-col col-span-3">
            <label htmlFor="email">Email</label>
            <Field type="text" className="styled_input" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div className="mb-4 flex flex-col col-span-2">
            <label htmlFor="phone">Phone</label>
            <Field type="text" className="styled_input" id="phone" name="phone" />
            <ErrorMessage name="phone" component="div" className="text-red-500" />
          </div>
            </div>
<div className='w-full flex  justify-end'>


          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700  w-32  ">
           Create
          </button>
</div>
        </Form>
      </Formik>
    </div>
    </div>
    </div>
    </>
   
  );
}

export default UserCreateForm;
