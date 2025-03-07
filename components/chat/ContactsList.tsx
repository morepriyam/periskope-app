"use client";

import { ContactItem } from "@/components/Contact";
import { Contact } from "@/utils/chatService";
import { IoPersonSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFilterList } from "react-icons/md";
import { HiFolderArrowDown } from "react-icons/hi2";
import { useState } from "react";

interface ContactsListProps {
  contacts: Contact[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchUsers: () => void;
  handleContactSelect: (contact: Contact) => void;
  handleAddContact: (contactId: string) => void;
  selectedContact: Contact | null;
  searchResults: Contact[];
  isSearching: boolean;
  permissionError: boolean;
  loadContacts: () => void;
}

export const ContactsList = ({
  contacts,
  searchQuery,
  setSearchQuery,
  handleSearchUsers,
  handleContactSelect,
  handleAddContact,
  selectedContact,
  searchResults,
  isSearching,
  permissionError,
  loadContacts,
}: ContactsListProps) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <div className="border-r border-gray-200 h-full flex flex-col">
      {/* Fixed header */}
      <div className="h-14 px-2 flex items-center justify-between bg-gray-50 sticky top-0 z-10 border-b border-gray-200 flex-shrink-0">
        <div className="flex">
          <button className="flex items-center px-1.5 py-1 text-green-600 font-semibold text-xs rounded-md cursor-pointer transition">
            <HiFolderArrowDown className="h-4 w-4 mr-1 text-green-600" />
            Custom filter
          </button>
          <button className="ml-1 flex items-center px-1.5 py-1 text-gray-600 text-xs cursor-pointer border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
            Save
          </button>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button 
            className="flex items-center px-1.5 py-1 text-gray-600 cursor-pointer text-xs border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap"
            onClick={toggleSearchInput}
          >
            <FiSearch className="h-3 w-3 mr-1 stroke-3" /> 
            Search
          </button>
          <button className="flex items-center px-1.5 py-1 text-green-600 font-semibold text-xs cursor-pointer border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
            <MdOutlineFilterList className="h-4 w-4 mr-1 text-green-600" />
            Filtered
          </button>
        </div>
      </div>

      {/* Search input - conditionally rendered and fixed */}
      {showSearchInput && (
        <div className="px-2 pt-2 flex-shrink-0">
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-8 pr-4 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchUsers()}
            />
            <FiSearch className="absolute left-2.5 top-2 text-gray-400" size={15} />
            <button
              className="absolute right-2 top-1.5 text-gray-500 hover:text-gray-700 text-xs bg-gray-100 px-2 py-0.5 rounded"
              onClick={handleSearchUsers}
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ overflowY: 'auto', overscrollBehavior: 'contain' }}>
        {isSearching ? (
          searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-2 sm:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                onClick={() => handleAddContact(result.id)}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {result.avatar_url ? (
                      <img src={result.avatar_url} alt={result.username} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                    ) : (
                      <IoPersonSharp className="text-blue-500" size={18} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{result.username}</p>
                  </div>
                </div>
                <button className="text-blue-500 text-xs sm:text-sm font-medium">
                  Add Contact
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No users found. Try a different search.
            </div>
          )
        ) : permissionError ? (
          <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
            <div>Database permission issue. Please run the fix-permissions.sql script in your Supabase SQL editor.</div>
            <button 
              onClick={() => loadContacts()} 
              className="mt-2 text-blue-500 underline text-xs"
            >
              Try Again
            </button>
          </div>
        ) : contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleContactSelect(contact)}
              className={`cursor-pointer ${
                selectedContact?.id === contact.id ? "bg-blue-50" : ""
              }`}
            >
              <ContactItem
                name={contact.username}
                latestMessage={contact.latestMessage || ""}
                phone={contact.phone || ""}
                unreadCount={contact.unreadCount}
                date={contact.lastMessageDate || ""}
                avatar={contact.avatar_url || undefined}
                userSentState={contact.userSentState}
              />
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 text-xs sm:text-sm">
            No contacts yet. Search for users to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};
