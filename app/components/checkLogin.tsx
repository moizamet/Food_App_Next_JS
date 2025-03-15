'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        
        <p className="text-center mt-4">
          Don't have an account? <Link href="/register" className="text-primary">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
