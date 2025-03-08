"use client";

import { Contact, Message } from "@/utils/chatService";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { EmptyChat } from "./EmptyChat";
import { RefObject } from "react";

interface ChatAreaProps {
  selectedContact: Contact | null;
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
  userId?: string;
  username?: string;
  userAvatar?: string | null;
  messagesEndRef: RefObject<HTMLDivElement>;
  onMessagesViewed?: (messageIds: string[]) => void;
}

export const ChatArea = ({
  selectedContact,
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  userId,
  username,
  userAvatar,
  messagesEndRef,
  onMessagesViewed
}: ChatAreaProps) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <ChatHeader selectedContact={selectedContact} />
      
      {selectedContact ? (
        <>
          <div className="flex-1 overflow-hidden">
            <MessageList 
              messages={messages}
              userId={userId}
              selectedContactName={selectedContact.username}
              currentUserName={username}
              messagesEndRef={messagesEndRef}
              onMessagesViewed={onMessagesViewed}
            />
          </div>
          <MessageInput 
            message={newMessage}
            setMessage={setNewMessage}
            sendMessage={sendMessage}
            userName={username}
            userAvatar={userAvatar}
          />
        </>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
}; 