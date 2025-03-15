"use client";   
import Miqaat_Common_Card from "@/app/components/miqaat_common_card";
import apiService from "@/app/services/APIServices"
import Link from "next/link";
import { useEffect, useState } from "react"
import { Miqaat_interface } from "@/app/Interface/Miqaat_Interface";

export default function Dashboard_Page(){
    const [miqaat_list,setMiqaatList]=useState<[]>([])

    const get_all_miqaats=async()=>{
        const response=await apiService.get("api/all_miqaat")
        if (response.ok){
            let data=await response.json()
            console.log(data)
            setMiqaatList(data)

        }else{
            console.log("Error")
            console.log(response)
        }
    }

    useEffect(()=>{

        get_all_miqaats()
    },[])

    return (<>
    <h2>Card for miqaats</h2>
    {miqaat_list.map((item:Miqaat_interface,index)=>(
        <div key={"miqaat_common_card"+index} className="w-f[90%] mx-10 my-10 bg-gradient-to-r from-gray-100 to-gray-200 p-6 shadow-xl rounded-lg border border-gray-300">
            <Miqaat_Common_Card  miqaat={item}></Miqaat_Common_Card>
            <div className="w-[full] flex flex-col items-center p-10">
            <Link href={`/admin/dashboard/${item.id}`}  className="btn btn-primary">View Registrations</Link>
            </div>
            
            
        </div>
        
        
        ))}
    </>)
}