'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../auth_management/authProvider';
import Logout from './logout';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const auth=useAuth()

  return (
    <nav className="bg-base-200 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Food Attendence
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
            {auth.isAuthenticated?<>               
                <Logout/>
                <Link href="/about" className="btn btn-ghost">About</Link>
                <Link href="/" className="btn btn-ghost">Welcome {auth.context_userId?.toUpperCase()}</Link>
          
          </>:<>
          <Link href="/login" className="btn btn-ghost">Login</Link>
          <Link href="/registration" className="btn btn-ghost">Registration</Link>
          <Link href="/about" className="btn btn-ghost">About</Link>
            </>}
            
           
          
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden btn btn-square btn-ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2 p-4 bg-base-300 rounded-lg">
          {/* <Link href="/about" className="btn btn-ghost" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/services" className="btn btn-ghost" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/contact" className="btn btn-ghost" onClick={() => setIsOpen(false)}>Contact</Link> */}


          {auth.isAuthenticated?<>               
                <Logout/>
                <Link href="/about" className="btn btn-ghost">About</Link>
                <Link href="/" className="btn btn-ghost">Welcome {auth.context_userId?.toUpperCase()}</Link>
          
          </>:<>
          <Link href="/login" className="btn btn-ghost">Login</Link>
          <Link href="/registration" className="btn btn-ghost">Registration</Link>
          <Link href="/about" className="btn btn-ghost">About</Link>
            </>}


        </div>
      )}
    </nav>
  );
}
