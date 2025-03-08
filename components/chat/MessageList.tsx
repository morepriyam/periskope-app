"use client";

import { Message as MessageType } from "@/utils/chatService";
import { Message } from "@/components/Message";
import { UserSentState } from "@/components/Contact";
import { RefObject, useEffect, useRef, useState } from "react";

interface MessageListProps {
  messages: MessageType[];
  userId?: string;
  selectedContactName?: string;
  currentUserName?: string;
  messagesEndRef: RefObject<HTMLDivElement>;
  onMessagesViewed?: (messageIds: string[]) => void;
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
  messagesEndRef,
  onMessagesViewed 
}: MessageListProps) => {
  const [viewedMessages, setViewedMessages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const dateSectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!userId || !onMessagesViewed) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const newlyViewedMessages: string[] = [];
        
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute('data-message-id');
            if (messageId && !viewedMessages.has(messageId)) {
              newlyViewedMessages.push(messageId);
              setViewedMessages(prev => new Set([...prev, messageId]));
            }
          }
        });
        
        if (newlyViewedMessages.length > 0 && onMessagesViewed) {
          onMessagesViewed(newlyViewedMessages);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    messageRefs.current.forEach((element) => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [userId, onMessagesViewed, messages, viewedMessages]);

  useEffect(() => {
    if (!messages.length) return;

    if (firstLoad.current) {
      const uniqueDates = [...new Set(messages.map(msg => formatMessageDate(msg.created_at)))];
      if (uniqueDates.length > 0) {
        const lastDate = uniqueDates[uniqueDates.length - 1];
        const lastDateSection = dateSectionRefs.current.get(lastDate);
        
        if (lastDateSection) {
          lastDateSection.scrollIntoView({ behavior: 'auto', block: 'start' });
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      firstLoad.current = false;
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, messagesEndRef]);

  useEffect(() => {
    firstLoad.current = true;
    return () => {
      firstLoad.current = true;
    };
  }, [selectedContactName]);

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 h-full bg-stone-50" 
      style={{ 
        overflowY: 'auto', 
        overscrollBehavior: 'contain',
        backgroundImage: "url('/whatsapp-bg.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto'
      }}
    >
      <div className="flex flex-col min-h-full">
        <div className="flex-1">
          {messages.map((msg, index) => {
            const showDate = index === 0 || !isSameDay(msg.created_at, messages[index - 1].created_at);
            const dateText = showDate ? formatMessageDate(msg.created_at) : undefined;
            
            return (
              <div 
                key={msg.id}
                className={showDate && dateText ? "date-section" : ""}
                ref={el => {
                  if (el && showDate && dateText) {
                    dateSectionRefs.current.set(dateText, el);
                  }
                  if (el && msg.receiver_id === userId && msg.status !== 'read') {
                    messageRefs.current.set(msg.id, el);
                  }
                }}
                data-message-id={msg.id}
              >
                <Message
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
              </div>
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}; 