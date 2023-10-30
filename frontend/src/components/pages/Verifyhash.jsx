
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";


export default function VerifyHah() {
    const [exp,setExp]=useState(true)
  const navigate=useNavigate()
  const [loading,setloading]=useState(true)
  const params = useParams();
  const hash=params.hash


  const verifyHash=async()=>{
    sessionStorage.setItem("resetEmailPasswordHash", hash);
    try {
        const response = await axios.post(
          "https://payment.globalpbxsoftware.com/api/verify/hash",
          { hash: hash}
        );
        const { status, data } = response.data;
        if(response){
            setloading(false)
        }
        if(status){      
            setExp(false)
            setTimeout(()=>{
    navigate("/forgotpassword/verify/otp");  },[1000])
}
      } catch (error) {
        setExp(true)
        setloading(false)
    setTimeout(()=>{

        // navigate("/login");
    },[3000])
      }
  }

  useEffect(()=>{
verifyHash()
  },[])

  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600">
     {loading &&<CircularProgress size={30} className="text-white mt-auto"/>}
      {exp? (
          <p className="m-auto w-fit text-white ">
            Link expired.
          </p>
        ) : (
          <p  className="m-auto w-fit text-white ">Redirecting...</p>
        )}
    </div>
  );
}


