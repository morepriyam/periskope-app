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
  phoneNumber?: string;
}

export const Message = ({ 
  text, 
  time, 
  date, 
  isSent, 
  userSentState, 
  showHeader, 
  senderName, 
  phoneNumber 
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
          {/* Show name & phone number only on first message of the group */}
          {showHeader && !isSent && (
            <header className="flex justify-between items-center mb-1">
              <span className="font-bold text-green-600">{senderName}</span>
              {phoneNumber && (
                <span className="text-xs text-gray-500">{phoneNumber}</span>
              )}
            </header>
          )}

          <div
            className={`relative p-2 rounded-lg text-sm ${
              isSent ? "bg-green-100 text-black" : "bg-white text-black"
            } shadow`}
          >
            <p>{text}</p>
            {/* Timestamp & Sent State */}
            <footer className="flex items-center justify-end text-xs text-gray-500 mt-1">
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
