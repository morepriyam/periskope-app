"use client";

import { Contact } from "@/utils/chatService";
import { IoPersonSharp } from "react-icons/io5";

interface ChatHeaderProps {
  selectedContact: Contact | null;
}

export const ChatHeader = ({ selectedContact }: ChatHeaderProps) => {
  return (
    <div className="flex items-center h-14 p-3 border-b border-gray-200 bg-white">
      {selectedContact ? (
        <>
          <div className="relative h-8 w-8 rounded-full flex items-center justify-center bg-gray-200">
            {selectedContact.avatar_url ? (
              <img
                src={selectedContact.avatar_url}
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <IoPersonSharp className="text-white h-4 w-4 text-sm" />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold ml-2">{selectedContact.username}</h3>
            <div className="text-xs font-semibold text-gray-400 ml-2">
              {selectedContact.phone || "Click here for contact info"}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative h-8 w-8 rounded-full flex items-center justify-center bg-gray-200">
            <IoPersonSharp className="text-white h-4 w-4 text-sm" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold ml-2">Periskope</h3>
            <div className="text-xs font-semibold text-gray-400 ml-2">
              Select a contact to start chatting
            </div>
          </div>
        </>
      )}
    </div>
  );
}; 