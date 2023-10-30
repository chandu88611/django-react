import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../stores/loaderSlice'
import axiosInstance from '../axiosInstance'
import moment from 'moment'
import { addOrder } from '../../stores/orderSlice'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Modal } from '@mui/material'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { toast } from 'react-toastify'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius:"10px",
    boxShadow: 24,
    p: 4,
  };
function ProductsList() {
    const [open, setOpen] = useState(false);
    const [users,setUsers]=useState([])
   
    const [filter,setFilter]=useState("discount")
    const [filtered,setFiltered]=useState([])
    const [search,setSearch]=useState("")
    const [catid,setCatid]=useState('')
    const [categories,setCategories]=useState('')
const [tags,setTags]=useState([])
    const navigate=useNavigate()
    const getAllCategories=async()=>{
        dispatch(setLoader(true))
    try {
    const res=    await axiosInstance.get("/get-all-product-category")
        
        if(res.status){
            dispatch(setLoader(false))
            setCategories(res.data.productCategories)
        }
    } catch (error) {
        console.log(error)
        dispatch(setLoader(false))

    }
    }
    const dispatch=useDispatch()
        const getAllusers=async()=>{
            dispatch(setLoader(true))
        try {
        const res=await axiosInstance.get("/view-product-details")
            
            if(res.status){
                dispatch(setLoader(false))
                setUsers(res.data.data)
                setFiltered(res.data.data)
            }
        } catch (error) {
            console.log(error)
            dispatch(setLoader(false))
    
        }
        }
    useEffect(()=>{
    getAllusers()
    getAllCategories()
    },[])
const filterData=()=>{
if(search && !catid){
    const filteredarray = filtered.filter((data, i) => (
        data?.name.toLowerCase().includes(search.toLocaleLowerCase()) 
      ));
      setUsers(filteredarray)
}

if(search && catid){
    const filteredarray = filtered.filter((data, i) => (
        data?.name.toLowerCase().includes(search.toLocaleLowerCase()) && data?.cat_id==catid
      ));
      setUsers(filteredarray)
}

if(catid && !search){
    const filteredarray = filtered.filter((data, i) => (
     data?.cat_id==catid
      ));
      setUsers(filteredarray)
}
if(tags?.length>0 && !search && !catid){
    const filteredarray = filtered.filter((data, i) =>{ 
        const lowerCaseName = data?.name.toLowerCase()
        return tags.some((tag) => lowerCaseName.includes(tag.toLowerCase()))
     } );
     console.log(filteredarray)
      setUsers(filteredarray)
}
if(tags?.length>0 &&catid){
    const filteredarray = filtered.filter((data, i) =>{ 
        const lowerCaseName = data?.name.toLowerCase()
        return tags.some((tag) => lowerCaseName.includes(tag.toLowerCase()) && data?.cat_id === catid);
     } );
      setUsers(filteredarray)
}

}

useEffect(()=>{
    console.log(tags)
    if(search || catid ||tags){

        filterData()
    }else{
        setUsers(filtered)
    }
    if(tags?.length<1 &&!catid&&!search){
        setUsers(filtered)

    }
 
},[search,catid,tags])

  return (
<div className='mt-12 px-10 min-w-lg '>
                <div >

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Products</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Ecommerce</a></li>
                                        <li className="breadcrumb-item active">Products</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-11 w-full lg:max-w-[95vw] mx-auto gap-4 px-3">
                   
                        <div className=" col-span-3 lg:col-span-2 overflow-auto">
                            <div className="card overflow-auto">
                                <div className="card-header">
                                    <div className="d-flex mb-3">
                                        <div className="flex-grow-1">
                                            <h5 className="fs-16">Filters</h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <a  className="text-decoration-underline cursor-pointer" id="clearall" onClick={()=>{
                                                setCatid("")
                                                setSearch('')
                                            }}>Clear All</a>
                                        </div>
                                    </div>

                                    <div className="filter-choices-input">
                                        <TagsInput value={tags} onChange={(e)=>setTags(e)}  />
                                    </div>
                                </div>

                                <div className="accordion accordion-flush filter-accordion">

                                    <div className="card-body border-bottom">
                                        <div>
                                            <p className="text-muted text-uppercase fs-12 fw-medium mb-2">Products</p>
                                            <ul className="list-unstyled mb-0 filter-list">
                                                {categories?.length>0&&categories?.map((data,i)=>(

                                                <li>
                                                    <a  className="d-flex py-1 align-items-center cursor-pointer" onClick={()=>setCatid(data?.id)} >
                                                        <div className="flex-grow-1 flex gap-2">
                                                      <input type="checkbox" name="" id="" checked={data?.id==catid}/>      <h5 className="fs-13 mb-0 listname" style={{color:data?.id==catid?"blue":""}}>{data.name}</h5>
                                                        </div>
                                                    </a>
                                                </li>
                                                ))}
                                                
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="card-body border-bottom">
                                        <p className="text-muted text-uppercase fs-12 fw-medium mb-4">Price</p>

                                        <div id="product-price-range"></div>
                                        <div className="formCost d-flex gap-2 align-items-center mt-3">
                                            <input className="form-control form-control-sm" type="text" id="minCost" value="0" /> <span className="fw-semibold text-muted">to</span> <input className="form-control form-control-sm" type="text" id="maxCost" value="1000" />
                                        </div>
                                    </div>

                                   

                                    <div className="accordion-item group">
                                        <h2 className="accordion-header" onClick={()=>{
                                                if(filter==="discount"){
                                                    setFilter(" ")
                                                }else{
                                                    setFilter("discount")
                                                }
                                            }}>
                                            <button className="accordion-button bg-transparent shadow-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseDiscount" aria-expanded="true" aria-controls="flush-collapseDiscount">
                                                <span className="text-muted text-uppercase fs-12 fw-medium">Discount</span> <span className="badge bg-success rounded-pill align-middle ms-1 filter-badge"></span>
                                            </button>
                                        </h2>
                                        <div className="accordion-collapse collapse " />
                                            <div className={` text-body pt-1 ${filter==="discount"?"block":"hidden"} `} >
                                                <div className="d-flex flex-column gap-2 filter-check">
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productdiscountRadio6">50% or more</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productdiscountRadio5">40% or more</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productdiscountRadio4">
                                                            30% or more
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productdiscountRadio3">
                                                            20% or more
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productdiscountRadio2">
                                                            10% or more
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productdiscountRadio1">
                                                            Less than 10%
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="accordion-item group">
                                    <h2 className="accordion-header" onClick={()=>{
                                                if(filter=="rating"){
                                                    setFilter("")
                                                }else{
                                                    setFilter("rating")
                                                }
                                            }} >
                                            <button className="accordion-button bg-transparent shadow-none collapsed" type="button" data-bs-toggle="collapse" >
                                                <span className="text-muted text-uppercase fs-12 fw-medium">Rating</span> <span className="badge bg-success rounded-pill align-middle ms-1 filter-badge"></span>
                                            </button>
                                        </h2>

                                        <div id="flush-collapseRating" className={`accordion-body text-body pt-1  ${filter=="rating"?"block":"hidden"} `}  aria-labelledby="flush-headingRating">
                                            <div className="accordion-body text-body">
                                                <div className="d-flex flex-column gap-2 filter-check">
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productratingRadio4">
                                                            <span className="text-muted">
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star"></i>
                                                            </span> 4 & Above
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productratingRadio3">
                                                            <span className="text-muted">
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star"></i>
                                                                <i className="mdi mdi-star"></i>
                                                            </span> 3 & Above
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productratingRadio2">
                                                            <span className="text-muted">
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star"></i>
                                                                <i className="mdi mdi-star"></i>
                                                                <i className="mdi mdi-star"></i>
                                                            </span> 2 & Above
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" for="productratingRadio1">
                                                            <span className="text-muted">
                                                                <i className="mdi mdi-star text-warning"></i>
                                                                <i className="mdi mdi-star"></i>
                                                                <i className="mdi mdi-star"></i>
                                                                <i className="mdi mdi-star"></i>
                                                                <i className="mdi mdi-star"></i>
                                                            </span> 1
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                            </div>
                        <div className="col-span-9 ">
                            <div>
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="row g-4">
                                            <div className="col-sm-auto">
                                                <div>
                                                    <a href="/dashboard/product/create" className="btn btn-secondary" id="addproduct-btn"><i className="ri-add-line align-bottom me-1"></i> Add Product</a>
                                                </div>
                                            </div>
                                            <div className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control" id="searchProductList" placeholder="Search Products..." onChange={(e)=>setSearch(e.target.value)}/>
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-header">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <ul className="nav nav-tabs-custom card-header-tabs border-bottom-0" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active fw-semibold" data-bs-toggle="tab" href="#productnav-all" role="tab">
                                                            All <span className="badge badge-soft-danger align-middle rounded-pill ms-1">{users?.length}</span>
                                                        </a>
                                                    </li>
                                                  
                                                </ul>
                                            </div>
                                            <div className="col-auto">
                                                <div id="selection-element">
                                                    <div className="my-n1 d-flex align-items-center text-muted">
                                                        Select <div id="select-content" className="text-body fw-semibold px-1"></div> Result <button type="button" className="btn btn-link link-danger p-0 ms-3" data-bs-toggle="modal" data-bs-target="#removeItemModal">Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body overflow-auto">
                                        <div className="tab-content text-muted">
                                            <div className="tab-pane active overflow-auto max-h-[60vh]" id="productnav-all" role="tabpanel">
                                            <table className="table align-middle table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col" style={{width: "46px"}}>
                                                            <div className="form-check">
                                                                <label className="form-check-label" for="cardtableCheck"></label>
                                                            </div>
                                                        </th>
                                                        <th scope="col"></th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Stock</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col" style={{width: "159px"}}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((data,i)=>(
                                                    <tr key={i+"fuh"}>
                                                        <td>
                                                            <div className="form-check">
                                                                <label className="form-check-label" for="cardtableCheck01"></label>
                                                            </div>
                                                        </td>
                                                        <td><Avatar src={data?.img_1} variant="square">{data?.name?.charAt(0)}</Avatar></td>
                                                        <td>{data?.name}</td>
                                                        <td>{moment(data?.created_at).format("MMM Do YY") +" "}</td>
                                                        <td onClick={()=>console.log(data?.product_price?.price)}>{data?.product_price?.price?.map((data)=>data?.price) }</td>
                                                        <td><span className=" ">{data?.product_stock?.stock}</span></td>
                                                        <td><span className=" ">nill</span></td>

                                                        <td>
                                                        <div onClick={()=>{
                   dispatch(addOrder(data))
                   navigate(`/dashboard/product/view/${data.id}`)
                   }}><a className="dropdown-item edit-item-btn cursor-pointer"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</a></div>
                   <div onClick={()=>setOpen(data?.id)}><a className="dropdown-item edit-item-btn cursor-pointer text-red-500"><i className="ri-pencil-fill align-bottom me-2 "></i> Delete</a></div>
                                                        </td>
                                                    </tr>
                                                    ))}
                                                    
                                                </tbody>
                                            </table>
                                            </div>
                                            <div className="tab-pane" id="productnav-published" role="tabpanel">
                                                <div id="table-product-list-published" className="table-card gridjs-border-none"></div>
                                            </div>
                                            <div className="tab-pane" id="productnav-draft" role="tabpanel">
                                                <div className="py-4 text-center">
                                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style={{width:'72px',height:"72px"}}>
                                                    </lord-icon>
                                                    <h5 className="mt-4">Sorry! No Result Found</h5>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
<Box sx={style}>
<div>
    <p className='text-center'>Are You Sure want to delete this product?</p>
    <div className="w-fit mx-auto flex gap-4 mt-4">
        <button className='bg-red-500 text-white px-2 py-1 rounded shadow ' onClick={async()=>{
                 dispatch(setLoader(true))
                 try {
                     const res=await axiosInstance.delete(`/delete-product-details/${open} `)
                     if(res.status){
                         dispatch(setLoader(false))
                         toast.success(res.data.message)
                         getAllusers()
                         setOpen(false)
                     }
                 } catch (error) {
                     dispatch(setLoader(false))
                     setOpen(false)
                     toast.error(error.response.data.message)
                 }
                   }}>Delete</button>
        <button className='bg-blue-500 text-white px-2 py-1 rounded shadow ' onClick={()=>setOpen(false)}>Cancel</button>
        
    </div>
</div>
</Box>

      </Modal>
                </div>
                
          
  )
}

export default ProductsList