"use client"
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { HiMenu, HiArrowSmRight, HiChartPie, HiHome, HiShoppingBag, HiTable, HiUser, HiGlobeAlt, HiX, HiEye, HiViewList, HiBookOpen, HiPlus } from 'react-icons/hi';
import Link from 'next/link';
import { Button } from './ui/button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-gray-800 text-gray-100 h-full min-h-screen ${isCollapsed ? 'w-20' : 'w-64'} absolute top-0 left-0 overflow-y-auto transition-width duration-300`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 border-b border-gray-700 px-4">
        <span className={`text-xl font-semibold ${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</span>
        <button className="text-gray-300 hover:text-white" onClick={toggleSidebar}>
          {isCollapsed ? <HiMenu className="w-6 h-6" /> : <HiX className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className="px-4 py-7 fixed">
        <h3 className={`text-sm font-semibold uppercase text-gray-400 ${isCollapsed ? 'hidden' : 'block'}`}>Menu</h3>
        <ul className="mt-3 space-y-6">
          <li className="relative flex items-center px-6 py-3">
            <Link href={'/'}><HiHome className="w-5 h-5" /></Link>
            <Link href={'/'} className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Home</Link>
          </li>
          <li className="relative flex items-center px-6 py-3">
            <Link href={'/dashboard'}><HiChartPie className="w-5 h-5" /></Link>
            <Link href={'/dashboard'} className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Dashboard</Link>
          </li>
          <li className="relative flex items-center px-6 py-3">
            <Link href={'/users'}><HiUser className="w-5 h-5" /></Link>
            <Link href={'/users'} className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Users</Link>
          </li>
          <li className="relative flex items-center px-6 py-3">
            <Link href={'/dashboard/view-posts'}><HiBookOpen className="w-5 h-5" /></Link>
            <Link href={'/dashboard/view-posts'} className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>View Posts</Link>
          </li>
          <li className="relative flex items-center px-6 py-3">
           <Link href={'/create'}> <HiPlus className="w-5 h-5" /></Link>
            <Link href={'/create'} className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Create</Link>
          </li>
          <li className="relative flex items-center px-6 py-3">
            <Link href={'http://localhost:3001'}><HiGlobeAlt className="w-5 h-5" /></Link>
            <Link href={'http://localhost:3001'} className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Blog Page</Link>
          </li>
          <li className="relative flex items-center px-6 py-3">
            <Link href={'/sign-in'}><HiArrowSmRight className="w-5 h-5" /></Link>
            <Link href={'/sign-in'} className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Sign In</Link>
          </li>
          <li className="relative flex items-center px-6 py-3">
            <Link href={'sign-up'}><HiTable className="w-5 h-5" /></Link>
            <Link href={'sign-up'} className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Sign Up</Link>
          </li>
        </ul>
      </div>

      {/* Sidebar Footer */}
      <div className="absolute  bottom-0 left-0 w-full border-t border-gray-700">
        <div className="flex items-center justify-center h-16">
          <span className={`${isCollapsed ? 'hidden' : 'fixed'} text-sm`}>
          <div className="flex items-center gap-2">
          <SignedIn>
         <p className='text-lg'>Account</p> <UserButton />
        </SignedIn>
          </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
