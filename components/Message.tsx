"use client";

import { UserSentState } from "@/components/Contact";
import { BiCheckDouble } from "react-icons/bi";
import { MdCheck } from "react-icons/md";

interface MessageProps {
  text: string;
  time: string;
  date?: string;
  isSent: boolean;
  userSentState?: UserSentState;
  showHeader?: boolean;
  senderName?: string;
  phone?: string;
}

export const Message = ({ 
  text, 
  time, 
  date, 
  isSent, 
  userSentState, 
  showHeader, 
  senderName, 
  phone 
}: MessageProps) => {
  return (
    <>
      {/* Date Separator - only show when date is provided */}
      {date && (
        <div className="flex justify-center my-3">
          <time className="text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-600">
            {date}
          </time>
        </div>
      )}

      <div className={`flex ${isSent ? "justify-end" : "justify-start"} my-1`}>
        <article className="relative max-w-xs">
          <div
            className={`relative p-2 rounded-lg text-sm min-w-[7.5rem] ${
              isSent ? "bg-green-100 text-black" : "bg-white text-black"
            } shadow`}
          >
            {/* Show name & phone number only when showHeader is true */}
            {showHeader && senderName && (
              <header className="flex justify-between items-center h-4 mb-1">
                <span className="font-semibold text-green-600">{senderName}</span>
                {phone && (
                  <span className="text-xs ml-2 text-gray-500 break-all">{phone}</span>
                )}
              </header>
            )}
            
            <p className="break-words whitespace-pre-wrap">{text}</p>
            {/* Timestamp & Sent State */}
            <footer className="flex items-center justify-end text-xs text-gray-500">
              <time>{time}</time>
              {isSent && (
                <>
                  {userSentState === UserSentState.SENT && (
                    <MdCheck className="text-gray-500 ml-1" aria-label="Sent" />
                  )}
                  {userSentState === UserSentState.RECEIVED && (
                    <BiCheckDouble className="text-gray-500 ml-1" aria-label="Delivered" />
                  )}
                  {userSentState === UserSentState.READ && (
                    <BiCheckDouble className="text-blue-500 ml-1" aria-label="Read" />
                  )}
                </>
              )}
            </footer>
          </div>
        </article>
      </div>
    </>
  );
};
