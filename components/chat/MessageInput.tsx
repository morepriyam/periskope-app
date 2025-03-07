"use client";

import { IoSendSharp } from "react-icons/io5";
import { IoAttach } from "react-icons/io5";
import { BsEmojiSmile, BsStars } from "react-icons/bs";
import { MdOutlineTimer, MdRefresh, MdInsertDriveFile, MdMic } from "react-icons/md";
import { PeriskopeIcon } from "@/utils/Icons";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}

export const MessageInput = ({ message, setMessage, sendMessage }: MessageInputProps) => {
  return (
    <div className="border-t bg-gray-50 py-2.5">
      {/* Message input row */}
      <div className="flex items-center px-2 sm:px-4 mx-auto">
        <input
          type="text"
          className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-3xl border border-gray-200 text-sm focus:outline-none"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && message.trim() && sendMessage()}
        />
        <button
          className="ml-2 p-2 bg-green-600 text-white rounded-full disabled:opacity-50 disabled:bg-green-400"
          onClick={sendMessage}
          disabled={!message.trim()}
        >
          <IoSendSharp className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom icons bar - scrollable on small screens */}
      <div className="flex items-center justify-between px-2 sm:px-4 mt-2 sm:mt-3 mx-auto">
        <div className="flex space-x-4 sm:space-x-7 overflow-x-auto pb-1 scrollbar-hide">
          <button className="focus:outline-none flex-shrink-0">
            <IoAttach className="h-5 w-5 text-gray-500" />
          </button>
          <button className="focus:outline-none flex-shrink-0">
            <BsEmojiSmile className="h-5 w-5 text-gray-500" />
          </button>
          <button className="focus:outline-none flex-shrink-0 hidden sm:block">
            <MdOutlineTimer className="h-5 w-5 text-gray-500" />
          </button>
          <button className="focus:outline-none flex-shrink-0">
            <MdRefresh className="h-5 w-5 text-gray-500" />
          </button>
          <button className="focus:outline-none flex-shrink-0">
            <BsStars className="h-5 w-5 text-gray-500" />
          </button>
          <button className="focus:outline-none flex-shrink-0 hidden sm:block">
            <MdInsertDriveFile className="h-5 w-5 text-gray-500" />
          </button>
          <button className="focus:outline-none flex-shrink-0">
            <MdMic className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
          <span className="text-xs sm:text-sm font-medium text-gray-700 hidden xs:inline">Periskope</span>
          <div className="w-4 h-4">
            <PeriskopeIcon />
          </div>
        </div>
      </div>
    </div>
  );
}; 