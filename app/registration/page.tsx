'use client';

import { useState } from 'react';
import Link from 'next/link';
import apiService from '../services/APIServices';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [its,setITS]=useState("");
  const [sabeel,setSabeel]=useState("");
  const [role,setRole]=useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router=useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const request_body={
        "username":username,
        "name": name,
        "its": its,
        "sabeel": sabeel,
        "email": email,
        "phone_number": "",
        "role": role,
        "password": password
      }
      const response=await apiService.post("api/custom_user",request_body,false)
      if(response.ok){
        console.log("User Successfully registered")
        router.replace("/login")
      }
      else{
        console.log("Error Occured")
        console.log(response.json())
      }

    console.log('Registering with:', { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Register User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              className="input input-bordered w-full" 
              placeholder="Enter your full name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="name">Username</label>
            <input 
              type="text" 
              id="name" 
              className="input input-bordered w-full" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="input input-bordered w-full" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="input input-bordered w-full" 
              placeholder="Create a password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="name">ITS No.</label>
            <input 
              type="text" 
              id="name" 
              className="input input-bordered w-full" 
              placeholder="Enter your ITS No." 
              value={its} 
              onChange={(e) => setITS(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="name">Sabeel No.</label>
            <input 
              type="text" 
              id="name" 
              className="input input-bordered w-full" 
              placeholder="Enter your Sabeel No." 
              value={sabeel} 
              onChange={(e) => setSabeel(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="name">Role</label>
            <select className="input input-bordered w-full"  value={role} onChange={(e)=>{setRole(e.target.value)}} required>
                <option value="User">User</option>
                <option value="User">Admin</option>
            </select>
            
          </div>
          
          <button type="submit" className="btn btn-primary w-full">Sign Up</button>
        </form>
        
        <p className="text-center mt-4">
          Already have an account? <Link href="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
}
