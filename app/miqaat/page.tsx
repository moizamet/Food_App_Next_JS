'use client';

import { useEffect, useState } from 'react';
import EventCard from '../components/event_card';
import apiService from '../services/APIServices';
import { Miqaat_interface } from '../Interface/Miqaat_Interface';

export default function Miqaat_Page() {
  const [miqaats, setMiqaats] = useState<Miqaat_interface[]>([]);

  useEffect(()=>{

    const fetchDetails=async ()=>{
        const response=await apiService.get("api/all_miqaat")
        if (response.ok){
            const data=await response.json()
            console.log(data)
            setMiqaats(data)

        }
    }
    fetchDetails()

  },[])


return (
  
  
  miqaats.map((miqaat,index)=>(
    
    <EventCard key={"unique_miqaat_"+index} miqaat={miqaat} /> 

    
)))

 
}
