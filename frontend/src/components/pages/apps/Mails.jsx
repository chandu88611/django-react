import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../../stores/loaderSlice'
import axiosInstance from '../../axiosInstance'
import moment from 'moment'

function Mails() {

    const [users,setUsers]=useState([])
    const [mail,setMail]=useState()
    const dispatch=useDispatch()
        const getAllusers=async()=>{
            dispatch(setLoader(true))
        try {
        const res=    await axiosInstance.get("/fetch-all-app-mails")
            
            if(res.status){
                dispatch(setLoader(false))
                setUsers(res.data.data)
            }
        } catch (error) {
            console.log(error)
            dispatch(setLoader(false))
    
        }
        }

        // const fetchMAilbyID=async(id)=>{
        //     dispatch(setLoader(true))
        //     try {
        //     const res=    await axiosInstance.get(`/preview-app-mail/${id}`)
                
        //         if(res.status){
        //             dispatch(setLoader(false))
        //             setMail(res.data)
        //         }
        //     } catch (error) {
        //         console.log(error)
        //         dispatch(setLoader(false))
        
        //     }
        // }
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

<div className='grid grid-cols-2 gap-4 mt-12 p-2'>
<div className="bg-white p-2 min-h-[30vh]">
{users?.map((data)=>(

<div className='w-full p-2 my-2 bg-[#e0e0e06c] text-xs hover:scale-105 cursor-pointer flex justify-between' onClick={()=>setMail(data)}>
    <p>

{data?.name}
    </p>
    <p>
    {moment(data?.created_at).format("MMM Do YY") +" "}    
    </p>
</div>
))}

</div>
<div className="bg-white p-2 min-h-[30vh]" >
{mail&&
<div>
    <p>Enter Email</p>
<input type="text" className='styled_input border w-full'  />
<div dangerouslySetInnerHTML={{ __html: mail?.source_code }} />
</div>

}

</div>
</div>


</div>


</div>
  )
}

export default Mails