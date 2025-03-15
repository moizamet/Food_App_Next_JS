"use client";   
import { FormEvent, useState } from "react"
import apiService from "../services/APIServices";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth_management/authProvider";
import Link from "next/link";


export default function Login(){
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [error,setErrors]=useState("")
    const router=useRouter()
    const auth=useAuth()

    const submitForm=async (e:FormEvent<HTMLFormElement>)=>{
        console.log("Prevent Default")
        e.preventDefault()
        const body={
            "username": username,
            "password": password
          }
        let response=await apiService.post("api/token/pair",body)
       
        if (response.ok){
            const obj=await response.json()
            console.log(obj)
            auth.login(obj)
            console.log("making navigation to home")
            router.push("/")
        }
        else{
            setErrors("Invalid Username and Password")
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <form onSubmit={(e)=>{submitForm(e)}}className="space-y-4">
          <div>
            <label className="label" htmlFor="email">Username</label>
            <input 
              type="text" 
              id="username" 
              className="input input-bordered w-full" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="input input-bordered w-full" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error}
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        
        <p className="text-center mt-4">
          Not Registered? <Link href="/register" className="text-primary">Sign up</Link>
        </p>
      </div>
    </div>

        
    )
}