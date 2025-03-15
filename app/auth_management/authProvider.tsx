"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getToken, getUserId, handleLogin, handleLogout } from "./actions";

interface AuthContexType {
    isAuthenticated:boolean;
    login: (obj:any)=>void;
    logout: ()=>void;
    context_userId:string | null;
}

type AuthProviderProps={
    children: ReactNode;
}

const AuthContext=createContext<AuthContexType | undefined>(undefined)

export function AuthProvider({children}:AuthProviderProps){
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [context_userId,setUserId]=useState<string | null>("")

    useEffect(()=>{
        const validation=async()=>{
            const token=await getToken();
            token!==null?setIsAuthenticated(true):setIsAuthenticated(false);
            const user_response=await getUserId();
            user_response!==null?setUserId(user_response):setUserId(null);

        }

        validation()
    })
   

    const login=(user_obj:any)=>{
        console.log("Making global context authentication to True")
        console.log(user_obj)
        handleLogin(user_obj.username,user_obj.access,user_obj.refresh)
        setIsAuthenticated(true)
    }

    const logout=()=>{
        console.log("Making global context authentication to False")
        handleLogout()
        setIsAuthenticated(false)
        console.log("Process Complete")
    }

    return <AuthContext.Provider value={{isAuthenticated,login,logout,context_userId}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth(){
    const context=useContext(AuthContext);
    if (context===undefined){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
