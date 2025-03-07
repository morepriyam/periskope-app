"use client";

import { FaPaperPlane } from "react-icons/fa";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}

export const MessageInput = ({ message, setMessage, sendMessage }: MessageInputProps) => {
  return (
    <div className="flex items-center border-t p-2 bg-white">
      <input
        type="text"
        className="flex-1 border p-2 rounded-md text-sm"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        className="ml-2 p-2 bg-green-500 text-white rounded-full"
        onClick={sendMessage}
        disabled={!message.trim()}
      >
        <FaPaperPlane />
      </button>
    </div>
  );
}; 