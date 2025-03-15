"use client"
import apiService from "@/app/services/APIServices"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Miqaat_Registration } from "@/app/Interface/Miqaat_Interface"


interface params{
    id:string
}



export default function Registration_Detail_Page(){
    const params=useParams()
    const miqaat_id=params.id
    const [registrations,setRegistration]=useState<Miqaat_Registration[]>([])
    const [total_count,setTotalCount]=useState(0)

 
    useEffect(()=>{
        const get_all_registration=async()=>{
            const response=await apiService.get(`api/miqaat_registration_all/${miqaat_id}`)
            if (response.ok){
                console.log("response received")
                const miqaat_registration=await response.json()
                setRegistration(miqaat_registration)
                let total_registration=0
                console.log(miqaat_registration)
                await miqaat_registration.forEach(element => {
                    console.log(element)
                    let count=parseInt(element.user_count)
                    total_registration=total_registration+count

                })
                
                setTotalCount(total_registration);

                // let arr = [10, 20, 30, 40];

                //     for (var index in miqaat_registration) {
                //     console.log(index); // prints indexes: 0, 1, 2, 3

                //     console.log(miqaat_registration[index]); // prints elements: 10, 20, 30, 40
                //     }

            }
        }


        get_all_registration()
        

    },[])


    return (<>

<div className="overflow-x-auto p-6">
    <h3>Total Count {total_count}</h3>
      <div className="bg-base-100 shadow-lg rounded-xl p-4">
        <h2 className="text-2xl font-bold text-center mb-4">User List</h2>

        <table className="table w-full border rounded-lg">
          {/* Table Header */}
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-3 text-left rounded-tl-lg">#</th>
              <th className="p-3 text-left">Sabeel</th>
              <th className="p-3 text-left">Registration Date Time</th>
              <th className="p-3 text-left">Count</th>
              
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {registrations.map((item:Miqaat_Registration, index:number) => (
              <tr key={`registration_index_${index}`} className="hover:bg-base-200">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.sabeel_id}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.user_count}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


   
    
    </>)
}