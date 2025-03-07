"use client";

import { ContactItem, UserSentState } from "@/components/Contact";
import { Message } from "@/components/Message";
import Rightbar from "@/components/Rightbar";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiFolderArrowDown } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";

const generateDummyMessages = () => {
  const messages = [
    {
      id: 1,
      text: "Hey! How's your day going?",
      time: "09:15",
      date: "05-03-2025",
      isSent: false,
      senderName: "Alice Brown",
      phoneNumber: "+1 987 654 3210",
      userSentState: UserSentState.RECEIVED,
    },
    {
      id: 2,
      text: "Hey Alice! It's going great. Just working on some code.",
      time: "09:17",
      date: "",
      isSent: true,
      senderName: "Roshnag Airtel",
      phoneNumber: "+91 63646 47925",
      userSentState: UserSentState.SENT,
    },
    {
      id: 3,
      text: "A chat UI similar to WhatsApp.",
      time: "09:20",
      date: "",
      isSent: true,
      senderName: "Roshnag Airtel",
      phoneNumber: "+91 63646 47925",
      userSentState: UserSentState.READ,
    },
    {
      id: 4,
      text: "Nice! What are you working on?",
      time: "09:18",
      date: "",
      isSent: false,
      senderName: "Alice Brown",
      phoneNumber: "+1 987 654 3210",
      userSentState: UserSentState.RECEIVED,
    },
    {
      id: 5,
      text: "That sounds cool! Are you using Tailwind for it?",
      time: "09:22",
      date: "",
      isSent: false,
      senderName: "Alice Brown",
      phoneNumber: "+1 987 654 3210",
      userSentState: UserSentState.RECEIVED,
    },
    {
      id: 6,
      text: "Yep! Tailwind + Next.js. It's fun to work with!",
      time: "09:24",
      date: "",
      isSent: true,
      senderName: "Roshnag Airtel",
      phoneNumber: "+91 63646 47925",
      userSentState: UserSentState.READ,
    },
    {
      id: 7,
      text: "Awesome! Can't wait to see it live!",
      time: "09:25",
      date: "",
      isSent: false,
      senderName: "Alice Brown",
      phoneNumber: "+1 987 654 3210",
      userSentState: UserSentState.RECEIVED,
    },
  ];
  return messages;
};

const ChatsPage: React.FC = ({ avatar }: any) => {
  const [messages, setMessages] = useState(generateDummyMessages());

  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: messages.length === 0 ? new Date().toLocaleDateString("en-GB") : "", // Add date only if it's the first message
      isSent: true,
      senderName: "Roshnag Airtel", // Ensure sender name is included
      phoneNumber: "+91 63646 47925",
      userSentState: UserSentState.SENT,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="flex h-full">
      {/* Contacts List (Scrollable) */}
      <div className="border-r border-gray-200 overflow-y-auto">
        {/* Top Filter Section */}
        <div className="h-14  px-2 flex items-center justify-between bg-gray-50  sticky top-0 z-10 border-b border-gray-200">
          <div className="flex">
            <button className="flex items-center px-1.5 py-1 text-green-600 font-semibold text-xs rounded-md cursor-pointer transition">
              <HiFolderArrowDown className="h-4 w-4 mr-1 text-green-600" />
              Custom filter
            </button>
            <button className="flex items-center px-1.5 py-1 text-gray-600 text-xs cursor-pointer border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
              Save
            </button>
          </div>
          <div className="flex gap-2 ">
            <button className="flex items-center px-1.5 py-1 text-gray-600 cursor-pointer text-xs  border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
              <FiSearch className="h-3 w-3 mr-1 stroke-3" /> Search
            </button>
            <button className="flex items-center px-1.5 py-1 text-green-600 font-semibold text-xs cursor-pointer border border-gray-300 rounded-md hover:bg-gray-100 transition whitespace-nowrap">
              <MdOutlineFilterList className="h-4 w-4 mr-1  text-green-600" />
              Filtered
            </button>
          </div>
        </div>

        <div className="h-full">
          {/* Example Contacts */}
          <ContactItem
            name="Test Skope Final 5"
            latestMessage="This doesn't go on Tuesday..."
            phone="+91 99718 44008"
            unreadCount={4}
            tags={["Demo", "internal"]}
            date="Yesterday"
            userSentState={UserSentState.RECEIVED} // Adjust as needed
          />
          <ContactItem
            latestMessage="Test message"
            phone="+91 99718 44008"
            unreadCount={3}
            tags={["Demo", "Signup"]}
            date="28-Feb-25"
            userSentState={UserSentState.SENT} // Adjust as needed
          />
          {/* Additional Dummy Contacts */}
          {Array.from({ length: 8 }, (_, i) => (
            <ContactItem
              key={i}
              name={`Contact ${i + 3}`}
              latestMessage="Last latestMessage preview..................................................."
              phone="+91 90000 00000"
              unreadCount={i % 2 === 0 ? 2 : 0}
              tags={["Dont Send"]}
              date="Today"
              userSentState={UserSentState.RECEIVED} // Adjust as needed
            />
          ))}
        </div>
      </div>
      {/* Chat Section (Scrollable) */}

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center h-14  p-3 border-b border-gray-200 bg-white">
          <div className="relative h-8 w-8 rounded-full flex items-center justify-center bg-gray-200">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <IoPersonSharp className="text-white h-4 w-4 text-sm" />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold ml-2">Periskope</h3>
            <div className="text-xs font-semibold text-gray-400 ml-2">
              Click here for contact info
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {messages.map((msg, index) => {
            const showHeader =
              index === 0 || messages[index - 1].isSent !== msg.isSent;
            return (
              <Message
                key={msg.id}
                {...msg}
                date={
                  msg.date ||
                  (index === 0 || messages[index - 1].date !== msg.date
                    ? msg.date
                    : "")
                }
                showHeader={showHeader}
                senderName="Roshnag Airtel"
                phoneNumber="+91 63646 47925"
              />
            );
          })}
        </div>

        {/* Message Input */}
        <div className="flex items-center border-t p-2 bg-white">
          <input
            type="text"
            className="flex-1 border p-2 rounded-md text-sm"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white rounded-full"
            onClick={sendMessage}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
      <Rightbar />
    </div>
  );
};

export default ChatsPage;
