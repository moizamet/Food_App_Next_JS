'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "../auth_management/authProvider";

export default function Logout(){

    const auth=useAuth()
    const router=useRouter()

    const handleLogout=()=>{
        console.log("performing logout operation")
        auth.logout()
        router.replace("/login")
    }

    return(
        <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
    )

}