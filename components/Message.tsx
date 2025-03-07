"use client";

import { UserSentState } from "@/components/Contact";
import { BiCheckDouble } from "react-icons/bi";
import { MdCheck } from "react-icons/md";

export const Message = ({ text, time, date, isSent, userSentState, showHeader, senderName, phoneNumber }: any) => {
  return (
    <>
      {/* Date Separator - only show when date is provided */}
      {date && (
        <div className="flex justify-center my-3">
          <span className="text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-600">
            {date}
          </span>
        </div>
      )}

      <div className={`flex ${isSent ? "justify-end" : "justify-start"} my-1`}>
        <div className="relative max-w-xs">
          {/* Show name & phone number only on first message of the group */}
          {showHeader && !isSent && (
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-green-600">{senderName}</span>
              <span className="text-xs text-gray-500">{phoneNumber}</span>
            </div>
          )}

          <div
            className={`relative p-2 rounded-lg text-sm ${
              isSent ? "bg-green-100 text-black" : "bg-white text-black"
            } shadow`}
          >
            <p>{text}</p>
            {/* Timestamp & Sent State */}
            <div className="flex items-center justify-end text-xs text-gray-500 mt-1">
              <span>{time}</span>
              {isSent && (
                <>
                  {userSentState === UserSentState.SENT && (
                    <MdCheck className="text-gray-500 ml-1" />
                  )}
                  {userSentState === UserSentState.RECEIVED && (
                    <BiCheckDouble className="text-gray-500 ml-1" />
                  )}
                  {userSentState === UserSentState.READ && (
                    <BiCheckDouble className="text-blue-500 ml-1" />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
