import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../axiosInstance';
import { setLoader } from '../../stores/loaderSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import ReactSelect from 'react-select';


function ProductForm() {
  const params = useParams();
  const [message,setMessage]=useState("")
  const options = [
    { value: 'INR', label: 'INR' },
    { value: 'USD', label: 'USD' },
    { value: 'EURO', label: 'EURO' }   
  ];
  const [price,setPrice]=useState([{currency:'INR',price:"00.00"}])
  const [price1,setPrice1]=useState('')
const [des,setDes]=useState('')
  const handlePriceChange=(event)=>{
    const newPrice = event.target.value;

    // Remove non-numeric characters from the input
    const numericPrice = newPrice.replace(/[^0-9.]/g, '');
  
    setPrice1(numericPrice);
    const updatedCurrencies = price?.map((currencyObj) => ({
      ...currencyObj,
      price: currencyObj.currency === 'INR' ? numericPrice : '00.00',
    }));
    setPrice(updatedCurrencies);
 
  }
  const handleSelectChange = (selectedValues) => {
  

      setPrice(selectedValues?.map((data)=>(
        {currency:data.value,price:data.value=="INR"?price1:"00.00"}
      )));
   
  };



  const [description, setDescription] = useState(''); // State for description
  const [longDesc, setLongDesc] = useState('');
  const handleDescriptionChange = (value) => {
    setDescription(value); 
    setDes('')// Update the description state
  };

  const handleLongDescChange = (value) => {
    setLongDesc(value); // Update the longDesc state
  };
  const validationSchema = Yup.object().shape({
    // image: Yup.string().required('Image is required'),
    product_code: Yup.string().required('Product Code is required'),
    name: Yup.string().required('Product Name is required'),
    category: Yup.string().required('Category is required'),
    stock: Yup.string().matches(/^[0-9]+$/, { excludeEmptyString: true, message: 'Pincode should only contain Numbers' }).required('Stock is required'),
  });
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


        const [product, setProduct] = useState({});
        const [edit, setEdit] = useState(false);
        const [load, setLoad] = useState(true);


        const [initialValues, setInitialValues] = useState({
          image: "",
          product_code: product?.product_code,
          name: product?.productListing?.name,
          description: product?.productListing?.description,
          long_desc: product?.productListing?.long_desc,
          category: product?.productListing?.category,
          stock:""
        });

        const getAllusers1 = async () => {

          setLoad(false);
          dispatch(setLoader(true));
          try {
            const res = await axiosInstance.get(`/view-product-details/${params.id}`);
      
            if (res.status) {
              dispatch(setLoader(false));
              setProduct(res.data.data);
              setTimeout(() => {
                setLoad(true);
              }, 100);
            }
          } catch (error) {
           
            dispatch(setLoader(false));
            setTimeout(() => {
              setLoad(true);
            }, 100);
          }
        };

        const deleteImage = async (url) => {

      
          dispatch(setLoader(true));
          try {
            const res = await axiosInstance.post(`/delete-product-image/${params.id}`,{
              url:url
            });
      
            if (res.status) {
              dispatch(setLoader(false));
              toast.success("image Deleted Succesfully")
            
            }
          } catch (error) {
           
            dispatch(setLoader(false));
            toast.error("Problem in deleting image")
          
          }
        };

    useEffect(()=>{
      if(params?.id){
        getAllusers1()
      }
    getAllusers()
    },[params])
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onSubmit = async (values) => {
   console.log(price)
    if(!/[a-zA-Z]/.test(description) || description=="<p><br></p>"){
      setDes("Short description is required")
      return
    }
    if(description.trim()?.length>0){
  
    dispatch(setLoader(true))
    if(params?.id){
      try {
        
        const res= await axiosInstance.post(`/edit-product-details/${params?.id}`,{
         product_code: values.product_code,
         name: values.name,
         description:description,
         long_desc: longDesc,
         cat_id: values.category,
         availability: "2",
         status: "1",
         stock:values?.stock,
         price:price,
         images:image.filter((data)=>data!=null&&data?.startsWith("data"))
         })
         
         if(res.status){
             dispatch(setLoader(false))
        toast.success(res.data.message)
        setTimeout(()=>{
 navigate("/dashboard/product/list")
        },3000)
         }
     } catch (error) {
         console.log(error)
         dispatch(setLoader(false))
         toast.error("Problem in creating product")
 
     }
    }else{
      
      try {
          
         const res= await axiosInstance.post("/store-product-details",{
          product_code: values.product_code,
          name: values.name,
          description:description,
          long_desc: longDesc,
          cat_id: values.category,
          availability: "2",
          status: "1",
          stock:values?.stock,
          price:price,
          images:image.filter((data)=>data!=null&&data?.startsWith("data"))
          })
          
          if(res.status){
              dispatch(setLoader(false))
         toast.success(res.data.message)
         setTimeout(()=>{
  navigate("/dashboard/product/list")
         },3000)
          }
      } catch (error) {
          console.log(error)
          dispatch(setLoader(false))
          toast.error("Problem in creating product")
  
      }
    }
  }


  };
const [image,setImage]=useState([])
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage((prev)=>([...prev,reader.result]))
      console.log(reader.result);
      // setShowFileInput(false);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };




  useEffect(() => {
    
    setInitialValues({
      product_code: product?.product_code,
      name: product?.name,
      
      stock:product?.product_stock?.stock,
      category: product?.cat_id,
    });
    setDescription(product?.description);
    setLongDesc(product?.long_desc);
    setPrice1(product?.product_price?.price?.filter((data)=>data.currency=="INR")[0]?.price)
    setImage([product?.img_1,product?.img_2,product?.img_3,product?.img_4,product?.img_5])

  }, [product]);
 
  useEffect(()=>{
    if(params?.id){

      setPrice(product?.product_price?.price?.map(item => ({currency:item.currency, price:item.currency=="INR"?price1:"00.00",})))
    }

  },[price1])
  useEffect(()=>{
    console.log(price)
      },[price])
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

    <div class="row mt-14 w-[80vw] md:w-[80vw]   mx-auto px-4">
                        <div class="col-12">
                            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 class="mb-sm-0">{params?.id?"Update Product":"Create Product"}</h4>

                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Product</a></li>
                                        <li class="breadcrumb-item active">{params?.id?"Update Product":"Create Product"}</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
    <div className="w-[80vw] md:w-[80vw]   mx-auto  p-4 rounded ">
      
     {load&& <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          {/* <div className=" flex flex-col relative w-fit">
            <label htmlFor="image">Image</label>
            <img src={selectedImage?selectedImage:"https://static.thenounproject.com/png/4818663-200.png"} alt="" className="mb-2 max-h-64 w-[150px] h-[100px]" />
            <Field type="file" id="image" name="image" className="opacity-0 absolute w-full h-full z-30"  onChange={handleImageChange}/>
            <ErrorMessage name="image" component="div" className="text-red-500 !my-2" />
          </div> */}
 

 <div className="row">
                    <div className="col-lg-8">
                            <div className="card">
                            <div className="card-header">
                                        <h5 className="card-title mb-0 text-blue-500 ">Product Details</h5>
                                    </div>
                                    <div className="card-body ">
                                    <div className="mb-3 px-3">
                                            <label className="form-label text-blue-500" for="product-title-input"> Name *</label>
                                      
                                        
                                            <Field type="text"  id="name" name="name" className="form-control mb-2" placeholder="Enter product Name" required/>
                                            <ErrorMessage name="name" component="div" className="text-red-500 !my-2" />
                                        </div>
                                        <div className="mb-3 px-3">
                                            <label className="form-label text-blue-500" for="product-title-input"> Code / HSN *</label>
                                       
                                            <Field type="text"  id="product_code" name="product_code" className="form-control mb-2"  placeholder="Enter product code" />
                                            
                                        <ErrorMessage name="product_code" component="div" className="text-red-500 " />
                                        </div>
                                        <div className=" px-3">
                                 
                                    <div className=" h-56">
                                    <label className='text-blue-500'>Short Description</label>
                                        <Field name="description">
                      {({ field }) => (
                        <ReactQuill
                        className='h-24 relative'
                          theme="snow"
                          value={description}
                          onChange={handleDescriptionChange}
                        />
                      )}
                    </Field>
                                    </div>
                                    <p className='text-red-500 -mt-4 mb-2 pl-4'>{des}</p>
                                </div>
                                       

                                       
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0 text-blue-500 ">Product Gallery</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-4 px-3">
                                            <h5 className="fs-14 mb-1">Product Image</h5>
                                            <p className="text-muted">Add Product main Image [max 4 , min 1]</p>
                                            <div className='flex gap-4 flex-wrap mt-2 '>

                                            {image?.filter?.((data)=>data!=null).map((data,index)=>(
<div className='relative'>
                                            <img src={data} alt=""  className='h-24' />
                                            <div className='absolute right-0 text-white text-sm px-2 py-1 rounded my-1 cursor-pointer bg-red-500  ' onClick={()=>{
                                             if(data?.startsWith("https")){
deleteImage(data)
                                             }else{

                                               const filotered=image.filter((data,i)=>i!=index)
                                               setImage(filotered)
                                             }
                                            }}>Delete</div>
                                            </div>
                                            ))}
                                            </div>
                                            <div className="text-center mt-10 border-2 p-3 border-dashed">
                                                <div className="position-relative d-inline-block border-dashed">
                                                    <div className="position-absolute top-100 start-100 translate-middle  !border-dashed p-2 ">
                                                        <label for="product-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Image">
                                                            <div className="avatar-xs">
                                                                <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                    <i className="ri-image-fill"></i>
                                                                </div>
                                                            </div>
                                                        </label>
                                                        <input className="form-control d-none" value="" id="product-image-input" type="file" accept="image/png, image/gif, image/jpeg" onChange={(e)=>{
                                                          if(image?.filter?.((data)=>data!=null).length<=3){
                                                          handleImageUpload(e)}else{
                                                            setMessage("Image limit reached")
                                                            return 
                                                          }
                                                        }
                                                          } />
                                                    </div>
                                                    <div className="avatar-lg">
                                                        <div className="avatar-title bg-light rounded">
                                                            <img src="" id="product-img" className="avatar-md h-auto" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
{message&&<p className='text-red-500 pt-3'>{message}</p>}
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <ul className="nav nav-tabs-custom card-header-tabs border-bottom-0" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-bs-toggle="tab" href="#addproduct-general-info" role="tab">
                                                   Product Info
                                                </a>
                                            </li>
                                            {/* <li className="nav-item">
                                                <a className="nav-link" data-bs-toggle="tab" href="#addproduct-metadata" role="tab">
                                                    Meta Data
                                                </a>
                                            </li> */}
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="addproduct-general-info" role="tabpanel">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="mb-3 px-3">
                                                            <label className="form-label text-blue-500" for="manufacturer-name-input">Select Currency*</label>
                                                            <ReactSelect
                     defaultValue={product?.product_price?.price?.length>0?product?.product_price?.price?.map(item => ({value:item.currency, label: item.currency,})):[options[0]]}
                     isMulti
                     name="colors"
                     options={options}
                     className="basic-multi-select"
                     classNamePrefix="select"
                     onChange={handleSelectChange}
                   />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3 px-3">
                                                            <label className="form-label text-blue-500" for="manufacturer-brand-input">Price [INR]*</label>
                                                            <input
                    value={price1}
                      type="text"
                      className={`form-control`}
                      id="name"
                      readOnly={price?.length<1}
                      onChange={handlePriceChange}
                      
                    />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="mb-3 px-3">
                                                            <label className="form-label text-blue-500" for="stocks-input">Stocks Available *</label>
                                                            <Field
                      type="text"
                      className="form-control mb-2"
                      id="name"
                      name="stock"
                      placeholder="Stocks"
                   
                      
                    />
                                                     <ErrorMessage name="stock" component="div" className="text-red-500 " />
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                                <div className='bg-white h-56 px-3'>
                                            <label className='text-blue-500'>Long Description</label>

                                            <Field name="long_desc"  >
                      {({ field }) => (
                        <ReactQuill
                      className='h-24 relative'
                          theme="snow"
                          value={longDesc}
                          onChange={handleLongDescChange}
                        />
                      )}
                    </Field>
                                        </div>
 <div className='w-full flex  justify-end'>


<button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700  w-32  ">
{params?.id?"Update Product":"Create Product"}
</button>
</div>
                                            </div>

                                            <div className="tab-pane" id="addproduct-metadata" role="tabpanel">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label text-blue-500" for="meta-title-input">Meta title</label>
                                                            <input type="text" className="form-control mb-2" placeholder="Enter meta title" id="meta-title-input"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label text-blue-500" for="meta-keywords-input">Meta Keywords</label>
                                                            <input type="text" className="form-control mb-2" placeholder="Enter meta keywords" id="meta-keywords-input"/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="form-label text-blue-500" for="meta-description-input">Meta Description</label>
                                                    <textarea className="form-control mb-2" id="meta-description-input" placeholder="Enter meta description" rows="3"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             
                            </div>

                            <div className="col-lg-4">
                                

                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0 text-blue-500">Product Categories *</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="text-muted mb-2"> 
                                               Select product category</p>
                                                <Field as="select" id="category" name="category" className="form-select mb-2">
              <option value="">Select Category</option>
              {users?.map((data,i)=>(

              <option value={data?.id}>{data?.name}</option>
        
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className="text-red-500 " />
                                    </div>
                                </div>
                               

                               

                            </div>
                        </div>










        </Form>
      </Formik>}

      <form id="createproduct-form" autocomplete="off" className="needs-validation px-4 pt-14" novalidate>
                        

                    </form>
    </div>
    </div>
    </div>
    </>
  );
}

export default ProductForm;
