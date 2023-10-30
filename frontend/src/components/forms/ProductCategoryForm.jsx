import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axiosInstance';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../stores/loaderSlice';
import { toast } from 'react-toastify';

function ProductCategoryForm() {
  const initialValues = {
    Name: '',
    // status: false, // Keep status as a boolean
  };

  const validationSchema = Yup.object({
    Name: Yup.string().required('Category Name is required'),
  });
const dispatch=useDispatch()
  const onSubmit = async (values) => {
    console.log('Form submitted with values:', values);
dispatch(setLoader(true))
    try {
        
     const res=   await axiosInstance.post("/create-product-category",{
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

  return (
    <>
    <div className="grid gri-cols-1 lg:grid-cols-6 h-screen ">

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
<h1 className=" font-semibold  absolute left-1/2 text-white top-1/2 -translate-x-1/2 !z-50m text-xl md:text-3xl ">Create New Category</h1>
        </div>
    </div>
    <div className="w-[70vw] md:w-[50vw] lg:w-[35vw]   mx-auto -mt-24 p-4 bg-gray-100 rounded shadow-lg">
    
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4 flex flex-col">
            <label htmlFor="Name">Category Name *</label>
            <Field type="text" className="styled_input" id="Name" name="Name" />
            <ErrorMessage name="Name" component="div" className="text-red-500" />
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

export default ProductCategoryForm;
