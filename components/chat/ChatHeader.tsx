"use client";

import { Contact } from "@/utils/chatService";
import { IoPersonSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { useState } from "react";

interface ChatHeaderProps {
  selectedContact: Contact | null;
}

export const ChatHeader = ({ selectedContact }: ChatHeaderProps) => {
  const [showSearchTooltip, setShowSearchTooltip] = useState(false);
  
  // This function will be implemented later to handle message search
  const handleSearch = () => {
    console.log("Search functionality to be implemented");
    // Future implementation: Open search modal or toggle search input
  };
  
  return (
    <div className="flex items-center justify-between h-14 px-2 sm:px-3 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        {selectedContact ? (
          <>
            <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center bg-gray-200 mr-2">
              {selectedContact.avatar_url ? (
                <img
                  src={selectedContact.avatar_url}
                  alt="Avatar"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                />
              ) : (
                <IoPersonSharp className="text-white h-3 w-3 sm:h-4 sm:w-4 text-sm" />
              )}
            </div>
            <div className="flex flex-col max-w-[200px] sm:max-w-none">
              <h3 className="text-xs sm:text-sm font-semibold truncate">{selectedContact.username}</h3>
              <div className="text-xs font-normal text-gray-400 truncate">
                {selectedContact.phone || "Click here for contact info"}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      
      {/* Right side buttons - only visible when a chat is selected */}
      {selectedContact && (
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div 
            className="relative"
            onMouseEnter={() => setShowSearchTooltip(true)}
            onMouseLeave={() => setShowSearchTooltip(false)}
          >
            <button 
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
              onClick={handleSearch}
            >
              <FiSearch className="h-4 w-4" />
            </button>
            {showSearchTooltip && (
              <div className="absolute right-0 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                Search
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <BsStars className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-500" />
            </div>
            <span className="text-xs text-gray-500 hidden xs:inline">+3</span>
          </div>
        </div>
      )}
    </div>
  );
}; 