"use client";

import React from "react";
import { BiCheckDouble } from "react-icons/bi";
import { FaPhone } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import Image from "next/image";

export enum UserSentState {
  SENT = "sent",
  RECEIVED = "received",
  READ = "read",
}

interface ContactItemProps {
  name?: string;
  latestMessage: string;
  phone: string;
  unreadCount?: number;
  date: string;
  avatar?: string;
  isMuted?: boolean;
  userSentState?: UserSentState;
  isActive?: boolean;
  isOnline?: boolean;
}

// Meaningful CRM-style labels, assigned deterministically per contact.
const TAG_POOL = [
  { label: "Lead", className: "bg-blue-50 text-blue-600" },
  { label: "Customer", className: "bg-green-50 text-green-700" },
  { label: "VIP", className: "bg-amber-50 text-amber-600" },
  { label: "Support", className: "bg-orange-50 text-orange-600" },
  { label: "Follow-up", className: "bg-yellow-50 text-yellow-700" },
  { label: "Onboarding", className: "bg-indigo-50 text-indigo-600" },
  { label: "Priority", className: "bg-red-50 text-red-600" },
  { label: "New", className: "bg-teal-50 text-teal-600" },
];

function tagsFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const count = (h % 2) + 1; // 1 or 2 tags
  return Array.from({ length: count }, (_, i) => TAG_POOL[(h + i * 3) % TAG_POOL.length]);
}

export const ContactItem: React.FC<ContactItemProps> = ({
  name,
  latestMessage,
  phone,
  unreadCount,
  date,
  avatar,
  isMuted = false,
  userSentState,
  isActive = false,
  isOnline = false,
}) => {
  return (
    <div className={`flex items-center justify-between border-b border-gray-100 ${isActive ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100 rounded-sm transition-all duration-200 ease-in-out`}>
      {/* Left Section - Profile Icon and Contact Info */}
      <div className="flex items-center space-x-2 p-2 flex-1 min-w-0">
        {/* Profile Picture */}
        <div className="relative transform -translate-y-1.5 h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 hover:shadow-md transition-shadow duration-200 ease-in-out">
          {avatar ? (
            <Image 
              src={avatar} 
              alt="Avatar" 
              width={40}
              height={40}
              className="rounded-full hover:opacity-90 transition-opacity duration-200" 
            />
          ) : (
            <IoPersonSharp className="text-white h-4 w-4 text-sm" />
          )}
          {isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </div>
        {/* Contact Details */}
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center mb-0.5">
            {name || phone} {/* Display name if available, otherwise phone */}
          </h4>
          <div className="flex items-center min-h-4 min-w-0">
            {unreadCount && unreadCount > 0 ? null : (
              <>
                {userSentState === UserSentState.SENT && (
                  <MdCheck className="text-gray-500 text-sm" />
                )}
                {userSentState === UserSentState.RECEIVED && (
                  <BiCheckDouble className="text-gray-500 text-sm" />
                )}
                {userSentState === UserSentState.READ && (
                  <BiCheckDouble className="text-blue-500 text-sm" />
                )}
              </>
            )}
            <p className="text-xs text-gray-500 truncate w-full min-w-0 px-0.5">
              {latestMessage}
            </p>
          </div>
          <p className="text-xs w-fit px-1 mt-0.5 rounded-md bg-gray-100 text-gray-400 flex items-center justify-start">
            <FaPhone className="h-2 w-2  mr-1" />
            {phone}
          </p>
        </div>
      </div>
      {/* Right Section - Tags, Unread Count, Date */}
      <div className="flex flex-col relative items-end space-y-1 right-2 top-0 h-14">
        <div className="flex space-x-1">
          {tagsFor(name || phone).map((t) => (
            <span
              key={t.label}
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${t.className}`}
            >
              {t.label}
            </span>
          ))}
        </div>
        <div className="flex absolute items-center bottom-3 gap-1">
          {/* Unread Count */}
          {unreadCount && unreadCount > 0 ? (
            <span className="text-xs flex relative bottom-0.5 font-semibold items-center justify-center bg-emerald-400 text-white h-4  w-4 p-1 rounded-full">
              {unreadCount}
            </span>
          ) : null}
          <div className="relative h-4 w-4 bottom-0.5 rounded-full flex items-center justify-center bg-gray-200 hover:bg-green-600 transition-colors duration-200 group cursor-pointer">
            <IoPersonSharp className="text-white h-2 w-2 group-hover:text-white group-hover:scale-110 transition-transform duration-200" />
          </div>
        </div>

        {/* Date */}
        <span className="text-xs text-gray-400 absolute bottom-0">
          {date}
        </span>
      </div>
    </div>
  );
};
