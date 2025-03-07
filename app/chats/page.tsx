"use client";

import { useAuth } from "@/utils/AuthProvider";
import { useEffect, useRef, useState } from "react";
import { ChatService, Contact as ContactType, Message as MessageType } from "@/utils/chatService";
import Rightbar from "@/components/Rightbar";
import { ContactsList } from "@/components/chat/ContactsList";
import { ChatArea } from "@/components/chat/ChatArea";
import { FiArrowLeft } from "react-icons/fi";

const ChatsPage: React.FC = () => {
  const { user, profile } = useAuth();
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<ContactType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const [showContactsOnMobile, setShowContactsOnMobile] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatService = useRef(new ChatService()).current;

  // When a contact is selected on mobile, hide the contacts list
  useEffect(() => {
    if (selectedContact && window.innerWidth < 768) {
      setShowContactsOnMobile(false);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (user?.id) {
      loadContacts();
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    const unsubscribe = chatService.subscribeToMessages(user.id, (newMessage) => {
      if (selectedContact && 
         (newMessage.sender_id === selectedContact.id || newMessage.receiver_id === selectedContact.id)) {
        setMessages(prev => [...prev, newMessage]);
      }
      
      loadContacts();
    });

    return () => {
      chatService.unsubscribeFromMessages();
    };
  }, [user?.id, selectedContact]);

  useEffect(() => {
    if (selectedContact && user?.id) {
      loadMessages(selectedContact.id);
    }
  }, [selectedContact, user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const loadContacts = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    setPermissionError(false);
    try {
      let attempts = 0;
      let contactsList: ContactType[] = [];
      let permissionIssue = false;
      
      while (attempts < 3) {
        try {
          contactsList = await chatService.getContacts(user.id);
          break;
        } catch (error: any) {
          console.log(`Attempt ${attempts + 1} failed, retrying...`);
          attempts++;
          
          if (error?.message?.includes('permission denied')) {
            permissionIssue = true;
          }
          
          if (attempts < 3) {
            await sleep(1000);
          }
        }
      }
      
      if (permissionIssue) {
        setPermissionError(true);
      }
      
      setContacts(contactsList);
    } catch (error: any) {
      console.error("Error loading contacts:", error);
      if (error?.message?.includes('permission denied')) {
        setPermissionError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (contactId: string) => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const messagesList = await chatService.getMessages(user.id, contactId);
      setMessages(messagesList);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedContact || !user?.id) return;
    
    try {
      const sentMessage = await chatService.sendMessage(
        user.id,
        selectedContact.id,
        newMessage.trim()
      );
      
      if (sentMessage) {
        setMessages(prev => [...prev, sentMessage]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleContactSelect = (contact: ContactType) => {
    setSelectedContact(contact);
    setIsSearching(false);
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleSearchUsers = async () => {
    if (!searchQuery.trim() || !user?.id) return;
    
    setIsLoading(true);
    try {
      const results = await chatService.searchUsers(searchQuery, user.id);
      setSearchResults(results);
      setIsSearching(true);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = async (contactId: string) => {
    if (!user?.id) return;
    
    try {
      const success = await chatService.addContact(user.id, contactId);
      if (success) {
        loadContacts();
        setIsSearching(false);
        setSearchResults([]);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBackToContacts = () => {
    setShowContactsOnMobile(true);
  };

  return (
    <div className="flex h-full relative">
      {/* Contact list - hidden on mobile when chat is open */}
      <div className={`${!showContactsOnMobile ? 'hidden md:block' : 'block'} w-full md:w-80 lg:w-96 h-full overflow-hidden`}>
        <ContactsList 
          contacts={contacts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchUsers={handleSearchUsers}
          handleContactSelect={handleContactSelect}
          handleAddContact={handleAddContact}
          selectedContact={selectedContact}
          searchResults={searchResults}
          isSearching={isSearching}
          permissionError={permissionError}
          loadContacts={loadContacts}
        />
      </div>

      {/* Chat area - shown on mobile only when a contact is selected */}
      <div className={`${showContactsOnMobile ? 'hidden md:flex' : 'flex'} flex-col flex-1 h-full overflow-hidden`}>
        {selectedContact && (
          <div className="md:hidden absolute top-3 left-3 z-10">
            <button 
              onClick={handleBackToContacts}
              className="p-2 rounded-full bg-white shadow-md"
            >
              <FiArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}
        
        <ChatArea 
          selectedContact={selectedContact}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          userId={user?.id}
          username={profile?.username}
          messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
        />
      </div>

      {/* Rightbar - shown only on large screens */}
      <div className="hidden lg:block h-full overflow-hidden">
        <Rightbar contact={selectedContact} />
      </div>
    </div>
  );
};

export default ChatsPage;
