import React, { useEffect } from 'react'
import axiosInstance from './axiosInstance'
import { useParams } from 'react-router-dom'

function Product() {

    const params=useParams()
    const getProduct=async()=>{
      
    try {
    const res=await axiosInstance.get(`/products/${params?.id}`)
        console.log(res)
        if(res.status){
          
        }
    } catch (error) {
        console.log(error)
       

    }
    }

    useEffect(()=>{
getProduct()
    },[params])
  return (
    <div>Product</div>
  )
}

export default Product