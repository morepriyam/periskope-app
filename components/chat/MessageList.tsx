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

// Function to check if the date is the same as the previous message
const isSameDay = (date1: string, date2: string): boolean => {
  if (!date1 || !date2) return false;
  
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const MessageList = ({ 
  messages, 
  userId, 
  selectedContactName, 
  currentUserName,
  messagesEndRef 
}: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100 h-full" style={{ overflowY: 'auto', overscrollBehavior: 'contain' }}>
      <div className="flex flex-col min-h-full">
        <div className="flex-1">
          {messages.map((msg, index) => {
            // Determine if we should show the date
            // Show date if it's the first message or if the date is different from the previous message
            const showDate = index === 0 || !isSameDay(msg.created_at, messages[index - 1].created_at);
            
            return (
              <Message
                key={msg.id}
                text={msg.content}
                time={new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                date={showDate ? formatMessageDate(msg.created_at) : undefined}
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
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}; 