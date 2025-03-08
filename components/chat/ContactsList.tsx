"use client";

import React, { useState, useRef, useEffect } from "react";
import { ContactItem } from "@/components/Contact";
import { Contact } from "@/utils/chatService";
import { FiSearch, FiX } from "react-icons/fi";
import { MdOutlineFilterList } from "react-icons/md";
import { HiFolderArrowDown } from "react-icons/hi2";
import { NewChatIcon } from "@/utils/Icons";

interface ContactsListProps {
  contacts: Contact[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchUsers: () => void;
  handleContactSelect: (contact: Contact) => void;
  handleContactDeselect?: () => void;
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
  handleContactDeselect,
  handleAddContact,
  selectedContact,
  searchResults,
  isSearching,
  permissionError,
  loadContacts,
}: ContactsListProps) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [filterUnread, setFilterUnread] = useState(false);
  const contactRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    if (showSearchInput) {
      // Clear search when toggling off
      setSearchQuery("");
    }
  };

  const toggleFilter = () => {
    setFilterUnread(!filterUnread);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && handleContactDeselect) {
      handleContactDeselect();
    }
  };

  // Filter contacts based on filter and search criteria
  const displayedContacts = contacts.filter((contact) => {
    // First apply unread filter if active
    const passesUnreadFilter =
      !filterUnread || (contact.unreadCount && contact.unreadCount > 0);

    // Then apply search filter if search is active
    const passesSearchFilter =
      !showSearchInput ||
      !searchQuery.trim() ||
      contact.username.toLowerCase().includes(searchQuery.toLowerCase());

    return passesUnreadFilter && passesSearchFilter;
  });

  // Scroll to selected contact when it changes
  useEffect(() => {
    if (selectedContact && contactRefs.current.has(selectedContact.id)) {
      const contactElement = contactRefs.current.get(selectedContact.id);
      if (contactElement) {
        // Add a small delay to ensure the UI is updated
        setTimeout(() => {
          contactElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }, 100);
      }
    }
  }, [selectedContact]);

  // Debounce search as user types
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      // We only filter contacts locally now, no API calls needed
      // if search is needed in the future, it can be re-enabled here
    }, 500); // 500ms delay for UI updates

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, showSearchInput]);

  // Function to cancel search
  const cancelSearch = () => {
    setSearchQuery("");
    setShowSearchInput(false);
  };

  return (
    <div className="border-r border-gray-200 h-full flex flex-col relative">
      {/* Fixed header */}
      <div className="h-14 px-2 flex items-center justify-between bg-gray-50 sticky top-0 z-10 border-b border-gray-200 flex-shrink-0">
        <div className="flex">
          <div className="flex items-center px-1.5 py-1 text-gray-600 font-semibold text-xs rounded-md cursor-default">
            <HiFolderArrowDown
              className={`h-4 w-4 mr-1 ${
                filterUnread ? "text-green-600" : "text-gray-600"
              }`}
            />
            <span className={filterUnread ? "text-green-600" : "text-gray-600"}>
              {filterUnread ? "Custom Filter" : "Inbox"}
            </span>
          </div>
          <button className="ml-1 flex items-center px-1.5 py-1 text-gray-600 text-xs cursor-pointer border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out whitespace-nowrap">
            Save
          </button>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <div className="relative">
            <button
              className={`flex items-center px-1.5 py-1 cursor-pointer text-xs border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 whitespace-nowrap ${
                showSearchInput && searchQuery.trim()
                  ? "text-green-600 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={toggleSearchInput}
            >
              <FiSearch
                className={`h-3 w-3 mr-1 stroke-3 ${
                  showSearchInput && searchQuery.trim()
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              />
              {showSearchInput && searchQuery.trim() ? "Searching" : "Search"}
            </button>
            {showSearchInput && searchQuery.trim() && (
              <button
                className="absolute -top-2 -right-2 bg-green-600 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs hover:bg-green-500 transition-colors"
                onClick={cancelSearch}
                aria-label="Cancel search"
              >
                <FiX className="h-3 w-3" />
              </button>
            )}
          </div>
          <div className="relative">
            <button
              className={`flex items-center px-1.5 py-1 text-xs cursor-pointer border text-gray-600 ${
                filterUnread
                  ? "text-green-600 font-semibold"
                  : "border-gray-300"
              } rounded-md hover:bg-gray-100 hover:border-gray-400 whitespace-nowrap`}
              onClick={toggleFilter}
            >
              <MdOutlineFilterList
                className={`h-4 w-4 mr-1 ${
                  filterUnread ? "text-green-600" : "text-gray-600"
                }`}
              />
              {filterUnread ? "Filtered" : "Filter"}
            </button>
            {filterUnread && (
              <button
                className="absolute -top-2 -right-2 bg-green-600 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs hover:bg-green-500 transition-colors"
                onClick={toggleFilter}
                aria-label="Remove filter"
              >
                <FiX className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search input - conditionally rendered and fixed */}
      {showSearchInput && (
        <div className="px-2 pt-2 flex-shrink-0">
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-8 pr-10 py-1.5 text-sm rounded-md  border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-colors duration-200 ease-in-out"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
            <FiSearch
              className="absolute left-2.5 top-2 text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-gray-600"
              size={15}
            />
            {/* X button at right of input */}
            {searchQuery.trim() ? (
              <button
                className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 ease-in-out"
                onClick={cancelSearch}
                aria-label="Clear search"
              >
                <FiX size={15} />
              </button>
            ) : (
              <button
                className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 ease-in-out"
                onClick={() => setShowSearchInput(false)}
                aria-label="Close search"
              >
                <FiX size={15} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ overflowY: "auto", overscrollBehavior: "contain" }}
        onClick={handleBackgroundClick}
      >
        {permissionError ? (
          <div className="p-4 text-center">
            <p className="text-red-500 mb-2 text-xs">
              Failed to load contacts. Permission denied.
            </p>
            <button
              onClick={loadContacts}
              className="mt-2 text-blue-500 underline text-xs"
            >
              Try Again
            </button>
          </div>
        ) : displayedContacts.length > 0 ? (
          displayedContacts.map((contact) => (
            <div
              key={contact.id}
              ref={(el) => {
                if (el) {
                  contactRefs.current.set(contact.id, el);
                }
              }}
              onClick={() => handleContactSelect(contact)}
              className="cursor-default"
            >
              <ContactItem
                name={contact.username}
                latestMessage={contact.latestMessage || "Send new message"}
                phone={contact.phone || ""}
                unreadCount={contact.unreadCount}
                date={contact.lastMessageDate || ""}
                avatar={contact.avatar_url || undefined}
                userSentState={contact.userSentState}
                isActive={selectedContact?.id === contact.id}
              />
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 text-xs sm:text-sm">
            {filterUnread
              ? "No unread messages."
              : showSearchInput && searchQuery
              ? "No matches found. Try a different search term."
              : "No contacts yet. Search for users to start chatting."}
          </div>
        )}
      </div>

      {/* Chat Button - Bottom Right of Contact List */}
      <div className="absolute bottom-4 right-4 z-10">
        <button className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-110 transition-all duration-300 ease-in-out transform-gpu">
          <NewChatIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

