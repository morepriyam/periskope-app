"use client";

import { Message as MessageType } from "@/utils/chatService";
import { Message } from "@/components/Message";
import { UserSentState } from "@/components/Contact";
import { RefObject } from "react";

interface MessageListProps {
  messages: MessageType[];
  userId?: string;
  selectedContactName?: string;
  currentUserName?: string;
  messagesEndRef: RefObject<HTMLDivElement>;
}

const formatMessageDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const today = new Date();
  
  if (date.getDate() === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear()) {
    return 'Today';
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.getDate() === yesterday.getDate() && 
      date.getMonth() === yesterday.getMonth() && 
      date.getFullYear() === yesterday.getFullYear()) {
    return 'Yesterday';
  }
  
  return date.toLocaleDateString();
};

export const MessageList = ({ 
  messages, 
  userId, 
  selectedContactName, 
  currentUserName,
  messagesEndRef 
}: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          text={msg.content}
          time={new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          date={formatMessageDate(msg.created_at)}
          isSent={msg.sender_id === userId}
          userSentState={
            msg.sender_id === userId 
              ? msg.status === 'read' 
                ? UserSentState.READ 
                : msg.status === 'received' 
                  ? UserSentState.RECEIVED 
                  : UserSentState.SENT
              : undefined
          }
          showHeader={false}
          senderName={msg.sender_id === userId ? currentUserName : selectedContactName}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}; 