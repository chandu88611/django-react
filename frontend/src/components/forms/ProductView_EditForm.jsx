import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../axiosInstance";
import { setLoader } from "../../stores/loaderSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { json, useNavigate, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";

import Select from 'react-select';
function ProductView_EditForm() {
  const options = [
    { value: 'IND', label: 'IND' },
    { value: 'USD', label: 'USD' },
    { value: 'EURO', label: 'EURO' }   
  ];
  const [product, setProduct] = useState({});
  const [edit, setEdit] = useState(false);
const [price,setPrice]=useState()
  const [load, setLoad] = useState(false);
  const handleSelectChange = (selectedValues) => {
    setPrice(selectedValues?.map((data)=>(
      {currency:data.value}
    )));
  };
const [price1,setPrice1]=useState()
  const handlePriceChange=(event)=>{
    const newPrice = event.target.value;
    setPrice1(newPrice)
    const updatedCurrencies = price.map((currencyObj) => ({
      ...currencyObj,
      price: currencyObj.currency === 'IND' ? newPrice : '00.00',
    }));
    setPrice(updatedCurrencies);
 
  }
  
  // const {setErrors}=Formik()
  const [initialValues, setInitialValues] = useState({
    image: "",
    product_code: product?.productListing?.product_code,
    name: product?.productListing?.name,
    description: product?.productListing?.description,
    long_desc: product?.productListing?.long_desc,
    category: product?.productListing?.category,
    stock:product?.product_stock?.stock,
  });
  const [description, setDescription] = useState(""); // State for description
  const [longDesc, setLongDesc] = useState("");
  const handleDescriptionChange = (value) => {
    setDescription(value); // Update the description state
  };

  const handleLongDescChange = (value) => {
    setLongDesc(value); 
  };
  const validationSchema = Yup.object({
    // image: Yup.string().required('Image is required'),
    product_code: Yup.string().required("Product Code is required"),
    name: Yup.string().required("Product Name is required"),
    category: Yup.string().required("Category is required"),
  });
  const [users, setUsers] = useState([]);
  const params = useParams();
  const getAllusers = async () => {
    setLoad(true);
    dispatch(setLoader(true));
    try {
      const res = await axiosInstance.get(`/view-product-details/${params.id}`);

      if (res.status) {
        dispatch(setLoader(false));
        setProduct(res.data.data);
        setTimeout(() => {
          setLoad(false);
        }, 100);
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoader(false));
      setTimeout(() => {
        setLoad(false);
      }, 100);
    }
  };
  const getAllusers1 = async () => {
    dispatch(setLoader(true));
    try {
      const res = await axiosInstance.get("/get-all-product-category");

      if (res.status) {
        dispatch(setLoader(false));
        setUsers(res.data.productCategories);
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoader(false));
    }
  };
  
 
 
  const [selectedImage, setSelectedImage] = useState("");

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    dispatch(setLoader(true));
    try {
      const res = await axiosInstance.put(`/edit-product-details/${params.id} `, {
        product_code: values.product_code,
        name: values.name,
        description: description,
        long_desc: longDesc,
        cat_id: values.category,
        availability: "2",
        status: "1",
        stock:values?.stock,
        price:price
      });

      if (res.status) {
        dispatch(setLoader(false));
        toast.success(res.data.message);
        setTimeout(() => {
          // navigate("/dashboard/product/list");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoader(false));
      toast.error("Problem in creating product");
    }
  };
  useEffect(() => {
    getAllusers();
    getAllusers1();
    
  }, []);
  useEffect(()=>{
    console.log(price)
    console.log("product")
      },[price])
  return (

    <div className="grid gri-cols-1 lg:grid-cols-6 h-screen">

    <div className=" bg-white  !h-full hidden lg:flex col-span-1 pt-[40px]  pl-3 flex-col align-bottom justify-between pb-[60px]">

    <div className="accordion accordion-border-box !w-full px-2" >
      <p className='text-md pt-2 my-1 py-2 text-muted'>Note</p>

                                            <div className="accordion-item w-full group">
                                                <h2 className="accordion-header" >
                                                    <button className="accordion-button text-xs bg-white text-black py-2" >
                                                        What is Lorem Ipsum ?
                                                    </button>
                                                </h2>
                                                <div  className="accordion-collapse hidden group-hover:block" >
                                                    <div className="accordion-body text-xs">
                                                        If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item w-full group">
                                                <h2 className="accordion-header" >
                                                    <button className="accordion-button text-xs bg-white text-black py-2" >
                                                        What is Lorem Ipsum ?
                                                    </button>
                                                </h2>
                                                <div  className="accordion-collapse hidden group-hover:block" >
                                                    <div className="accordion-body text-xs">
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

    <div className="max-w-5xl shadow bg-white mx-auto pt-8 px-2 mt-5 rounded">
      <div className="text-lg my-2 flex justify-between pr-6">
        <p>Product Details</p>
        <p
          onClick={() => {
            setEdit(!edit);
          }}
        >
          <FiEdit />
        </p>
      </div>
      <hr />
      <div className="p-4">
        {!load && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className=" flex flex-col">
                  <label htmlFor="product_code">Product Code</label>
                  {edit ? (
                    <Field
                      type="text"
                      className={`styled_input2`}
                      id="product_code"
                      name="product_code"
                    />
                  ) : (
                    <p className="-mt-2 text-muted">
                      {product?.productListing?.product_code
                        ? product?.productListing?.product_code
                        : "Not available"}
                    </p>
                  )}
                  {edit && (
                    <ErrorMessage
                      name="product_code"
                      component="div"
                      className="text-red-500"
                    />
                  )}
                </div>

                <div className=" flex flex-col">
                  <label htmlFor="name">Product Name</label>
                  {edit ? (
                    <Field
                      type="text"
                      className={`styled_input2`}
                      id="name"
                      name="name"
                    />
                  ) : (
                    <p className="-mt-2 text-muted">
                      {product?.productListing?.name
                        ? product?.productListing?.name
                        : "Not available"}
                    </p>
                  )}
                  {edit && (
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  )}
                </div>

                <div className=" flex flex-col">
                  <label htmlFor="description">Description</label>
                  {edit ? (
                    <Field name="description">
                      {({ field }) => (
                        <ReactQuill
                          theme="snow"
                          value={description}
                          onChange={handleDescriptionChange}
                        />
                      )}
                    </Field>
                  ) : (
                    <p className="-mt-2 text-muted">
                      {product?.productListing?.description
                        ?<div dangerouslySetInnerHTML={{ __html: product?.productListing?.description }} />

                        : "Not available"}
                    </p>
                  )}
                  {edit && (
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500"
                    />
                  )}
                </div>

                <div className=" flex flex-col ">
                  <label htmlFor="long_desc">Long Description</label>
                  {edit ? (
                    <Field name="long_desc">
                      {({ field }) => (
                        <ReactQuill
                          theme="snow"
                          value={longDesc}
                          onChange={handleLongDescChange}
                        />
                      )}
                    </Field>
                  ) : (
                    <p className="-mt-2 text-muted">
                      {product?.productListing?.long_desc
                        ? <div dangerouslySetInnerHTML={{ __html: product?.productListing?.long_desc }} />

                        : "Not available"}
                    </p>
                  )}
                  {edit && (
                    <ErrorMessage
                      name="long_desc"
                      component="div"
                      className="text-red-500"
                    />
                  )}
                </div>

                <div className=" flex flex-col mt-14 mb-4">
                  <label htmlFor="category">Select Category</label>
                  {edit ? (
                    <Field
                      as="select"
                      id="category"
                      name="category"
                      className="py-2 rounded border"
                    >
                      <option value="">Select Category</option>
                      {users?.map((data, i) => (
                        <option value={data?.id}>{data?.name}</option>
                      ))}
                    </Field>
                  ) : (
                    <p className="-mt-2 text-muted">
                      {product?.productListing?.cat_id
                        ? users?.filter((data)=>data?.id==product?.productListing?.cat_id)[0].name
                        : "Not available"}
                    </p>
                  )}
                  {edit && (
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500"
                    />
                  )}
                </div>
              </div>
              <div className="text-lg my-2 flex justify-between pr-6">
        <p>Pricing Details</p>
       
      </div>
      <hr />
<div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
<div className=" flex flex-col">
                  <label htmlFor="product_code">Currency</label>
                  {edit ? (
                     <Select
                     defaultValue={product?.productPrice?.price?.map(item => ({value:item.currency, label: item.currency,}))}
                     isMulti
                     name="colors"
                     options={options}
                     className="basic-multi-select"
                     classNamePrefix="select"
                     onChange={handleSelectChange}
                   />
                 
                  ) : (
                    <p className="-mt-2 text-muted flex gap-2">
                 {product?.productPrice?.price?.length>0
                        ? product?.productPrice?.price?.map((data,i)=>(
                          <div>
                            {data?.currency}
                          </div>
                        ))
                        : "Not available"}
                    </p>
                  )}
                  {edit && (
                    <ErrorMessage
                      name="product_code"
                      component="div"
                      className="text-red-500"
                    />
                  )}
                </div>

                <div className=" flex flex-col">
                  <label htmlFor="name">Price</label>
                  {edit ? (
                    <input
                    value={price1}
                      type="text"
                      className={`styled_input2`}
                      id="name"
                      readOnly={price?.length<1}
                      onChange={handlePriceChange}
                      
                    />
                  ) : (
                    <p className="-mt-2 text-muted">
                      {product?.productPrice?.price.length>0
                        ? (price1)
                        : "Not available"}
                    </p>
                  )}
                  {edit && (
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  )}
                </div>
</div>
</div>

<div className="text-lg my-2 flex justify-between pr-6">
        <p>Stock Details</p>
       
      </div>
      <hr />
<div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">


                <div className=" flex flex-col">
                  <label htmlFor="name">Stock</label>
                  {edit ? (
                    <Field
                      type="text"
                      className={`styled_input2`}
                      id="name"
                      name="stock"
                   
                      
                    />
                  ) : (
                    <p className="-mt-2 text-muted">
                      {product?.productStock?.stock>0
                        ? product?.productStock?.stock
                        : "Not available"}
                    </p>
                  )}
                  {edit && (
                    <ErrorMessage
                      name="stock"
                      component="div"
                      className="text-red-500"
                    />
                  )}
                </div>
</div>
</div>
              <div className="w-full flex  justify-end gap-4 ">
              {edit &&<button
                   
                    className="bg-orange-500 text-white p-2 rounded hover:bg-blue-700  w-32   "
                    onClick={()=>setEdit(false)} >
                  
            Cancel
                  </button>}
                {edit && (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700  w-32  "
                  >
                  
                  Update
                  </button>
                )}

              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>



    </div>


    </div>
    
  );
}

export default ProductView_EditForm;


