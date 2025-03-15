"use client";
import { useAuth } from "../auth_management/authProvider"

const Protected_Component=()=>{
    const auth=useAuth()

    return (
        <div>
            Confidential information from component
            {auth.isAuthenticated?"User is logged in":"User is not logged in"}
        </div>
    )

}

export default Protected_Component