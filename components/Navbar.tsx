"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { LuChevronsUpDown, LuCircleHelp } from "react-icons/lu";
import { MdOutlineInstallDesktop } from "react-icons/md";
import { TbRefreshDot } from "react-icons/tb";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdNotificationsOff } from "react-icons/io";
import { BsStars } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm h-14 flex items-center justify-between px-4 z-50">
      {/* Left Section - Chats Title with Icon */}
      <div className="flex items-center text-black text-sm font-medium">
        <IoChatbubbleEllipses className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-gray-400 font-bold">chats</span>
      </div>

      {/* Mobile Menu Button (Hidden on Desktop) */}
      <button
        className="md:hidden p-2 rounded-md text-black hover:bg-gray-100 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Right Section - Utility Buttons (Visible on Desktop) */}
      <div className="hidden md:flex items-center space-x-2 flex-nowrap overflow-x-auto pr-4">
        <button className="flex items-center px-3 py-1 text-black text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
          <TbRefreshDot className="h-4 w-4 mr-1 text-black" /> Refresh
        </button>
        <button className="flex items-center px-3 py-1 text-black text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
          <LuCircleHelp className="h-4 w-4 mr-1" /> Help
        </button>
        <div className="flex items-center px-3 py-1 text-black text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
          <span className="h-2 w-2 bg-yellow-400 rounded-full mr-2"></span>
          5 / 6 phones
          <LuChevronsUpDown className="ml-1 h-3 w-3"/>
        </div>
        <div className="flex items-center px-3 py-1 text-black text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
         
        <MdOutlineInstallDesktop className="h-5 w-5" />
        </div>
        <div className="flex items-center px-3 py-1 text-black text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
         
         < IoMdNotificationsOff className="h-5 w-5" />
         </div>
         <div className="flex items-center px-3 py-1 text-black text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
         
         < BsStars className="h-5 w-5 p-0.5 text-yellow-500"/><CiBoxList className="h-5 w-5"/>
         </div>
  
      </div>
     

    </nav>
  );
};

export default Navbar;
