"use client";

import React, { useState } from "react";
import { Contact } from "@/utils/chatService";
import { IoPersonSharp } from "react-icons/io5";
import { FiSearch, FiX } from "react-icons/fi";
import { GenerateIcon } from "@/utils/Icons";
import Image from "next/image";

interface ChatHeaderProps {
  selectedContact: Contact | null;
  isOnline?: boolean;
  isTyping?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

export const ChatHeader = ({
  selectedContact,
  isOnline = false,
  isTyping = false,
  searchTerm = "",
  onSearchChange,
}: ChatHeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    if (showSearch) onSearchChange?.("");
    setShowSearch((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between h-14 px-2 sm:px-3 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        {selectedContact ? (
          <>
            <div className="relative h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 mr-2">
              {selectedContact.avatar_url ? (
                <Image
                  src={selectedContact.avatar_url}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <IoPersonSharp className="text-white h-3 w-3 sm:h-4 sm:w-4 text-sm" />
              )}
              {isOnline && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              )}
            </div>
            <div className="flex flex-col max-w-[200px] sm:max-w-none">
              <h3 className="text-xs sm:text-sm font-semibold truncate">
                {selectedContact.username}
              </h3>
              <div className="text-xs font-normal truncate">
                {isTyping ? (
                  <span className="text-green-600">typing…</span>
                ) : isOnline ? (
                  <span className="text-green-600">Online</span>
                ) : (
                  <span className="text-gray-400">
                    {selectedContact.phone || "Click here for contact info"}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Right side buttons - only visible when a chat is selected */}
      {selectedContact && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-6 h-6 flex items-center justify-center ">
              <GenerateIcon className="h-4 w-4 text-gray-700 cursor-pointer" />
            </div>
          </div>
          <div className="relative flex items-center">
            {showSearch && (
              <div className="relative mr-1">
                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Search this chat…"
                  className="w-40 sm:w-56 pl-3 pr-7 py-1 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-300"
                />
                {searchTerm && (
                  <button
                    className="absolute right-2 top-1.5 text-gray-400 hover:text-gray-600"
                    onClick={() => onSearchChange?.("")}
                    aria-label="Clear search"
                  >
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
            <button
              className={`p-1.5 rounded-full ${showSearch ? "text-green-600" : "text-gray-700"}`}
              onClick={toggleSearch}
              aria-label="Search conversation"
            >
              <FiSearch className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
