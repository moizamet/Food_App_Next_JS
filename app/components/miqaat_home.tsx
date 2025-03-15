'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth_management/authProvider';
import apiService from '../services/APIServices';

export default function Miqaat_Home() {
    const auth=useAuth()
    const [sabeel,setSabeel]=useState("")

    useEffect(()=>{

        const fetchInformation=async()=>{
          
          if (auth.isAuthenticated && auth.context_userId){
            const response=await apiService.get("api/custom_user?userid="+auth.context_userId)
            if (response.ok){
                const data=await response.json()
                console.log(data)
                setSabeel(data.sabeel)
            }else{
                console.log("Invalid User")
            }
          }
            

        }
        fetchInformation()
    },[auth])


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-base-100 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4">Miqaat Registration</h2>
        <p className="text-2xl text-gray-600 mb-6">
          <span>Sabeel No. <b>{sabeel}</b></span>
        </p>
        <p className="text-gray-600 mb-6">
          Register here and provide couting to stop food wastage.
        </p>
        <Link href="/miqaat">
          <button className="btn btn-primary w-full">Register</button>
        </Link>
      </div>
    </div>
  );
}