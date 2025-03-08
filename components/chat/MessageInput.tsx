"use client";

import { IoSend, IoSendSharp } from "react-icons/io5";
import { IoAttach } from "react-icons/io5";
import { BsEmojiSmile, BsStars } from "react-icons/bs";
import {
  MdOutlineTimer,
  MdRefresh,
  MdInsertDriveFile,
  MdMic,
} from "react-icons/md";
import {
  GenerateIcon,
  GenerateOutlineIcon,
  PeriskopeIcon,
  TextFileIcon,
} from "@/utils/Icons";
import { FiPaperclip } from "react-icons/fi";
import { FaMicrophone, FaRegClock } from "react-icons/fa6";
import { AiOutlineHistory } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  userAvatar?: string | null;
  userName?: string | null;
}

export const MessageInput = ({
  message,
  setMessage,
  sendMessage,
  userAvatar,
  userName,
}: MessageInputProps) => {
  return (
    <div className="border-t border-gray-200 py-2.5">
      <div className="flex items-center px-2 sm:px-4 mx-auto">
        <input
          type="text"
          className="flex-1 py-2 sm:py-2.5 px-3 font-medium sm:px-4 rounded-3xl text-md h-10  focus:outline-none"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && message.trim() && sendMessage()
          }
        />
        <button
          className="ml-2 p-1  text-green-700"
          onClick={sendMessage}
          disabled={!message.trim()}
        >
          <IoSend className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center justify-between px-2 sm:px-4 mt-2 ml-3.5 sm:mt-3 mx-auto">
        <div className="flex space-x-4 sm:space-x-7 overflow-x-auto pb-1 scrollbar-hide">
          <button className="focus:outline-none flex-shrink-0 cursor-pointer">
            <FiPaperclip className="h-4 w-4 text-gray-700" />
          </button>
          <button className="focus:outline-none flex-shrink-0 cursor-pointer">
            <BsEmojiSmile className="h-4 w-4 text-gray-700" />
          </button>
          <button className="focus:outline-none flex-shrink-0 hidden sm:block cursor-pointer">
            <FaRegClock className="h-4 w-4 text-gray-700" />
          </button>
          <button className="focus:outline-none flex-shrink-0 cursor-pointer">
            <AiOutlineHistory className="h-4 w-4 text-gray-700" />
          </button>
          <button className="focus:outline-none flex-shrink-0 cursor-pointer">
            <GenerateOutlineIcon className="h-4 w-4 text-gray-700" />
          </button>
          <button className="focus:outline-none flex-shrink-0 hidden sm:block cursor-pointer">
            <TextFileIcon className="h-4 w-4 text-gray-700" />
          </button>
          <button className="focus:outline-none flex-shrink-0 cursor-pointer">
            <FaMicrophone className="h-4 w-4 text-gray-700" />
          </button>
        </div>
        <div className="flex items-center px-1 py-0.5 ml-2 text-black text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap cursor-pointer">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName || "User"}
              className="h-4 w-4 rounded-full mr-2"
            />
          ) : (
            <div className="h-4 w-4 bg-yellow-400 rounded-full mr-2" />
          )}
          {userName || "User"}
          <LuChevronsUpDown className="ml-1 lg:ml-5 h-3 w-3" />
        </div>
      </div>
    </div>
  );
};
