import { BiCheckDouble } from "react-icons/bi";
import { FaPhone } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdCheck } from "react-icons/md"; // Single tick for SENT

// Enum for message status
export enum UserSentState {
  SENT = "sent",
  RECEIVED = "received",
  READ = "read",
}

interface ContactItemProps {
  name?: string;
  latestMessage: string;
  phone: string;
  unreadCount?: number;
  tags?: string[];
  date: string;
  avatar?: string;
  isMuted?: boolean;
  userSentState?: UserSentState;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  name,
  latestMessage,
  phone,
  unreadCount,
  tags = ["Demo", "internal"],
  date,
  avatar,
  isMuted = false,
  userSentState,
}) => {
  return (
    <div className="flex items-center justify-between bg-white hover:bg-gray-100 cursor-pointer rounded-sm">
      {/* Left Section - Profile Icon and Contact Info */}
      <div className="flex items-center space-x-2 p-2">
        {/* Profile Picture */}
        <div className="relative transform -translate-y-1.5 h-10 w-10 rounded-full flex items-center justify-center bg-gray-200">
          {avatar ? (
            <img src={avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
          ) : (
            <IoPersonSharp className="text-white h-4 w-4 text-sm" />
          )}
        </div>
        {/* Contact Details */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 flex items-center mb-0.5">
            {name || phone} {/* Display name if available, otherwise phone */}
          </h4>
          <div className="flex items-center">
            {unreadCount && unreadCount > 0 ? null : (
              <>
                {userSentState === UserSentState.SENT && (
                  <MdCheck className="text-gray-500 text-sm" />
                )}
                {userSentState === UserSentState.RECEIVED && (
                  <BiCheckDouble className="text-gray-500 text-sm" />
                )}
                {userSentState === UserSentState.READ && (
                  <BiCheckDouble className="text-blue-500 text-sm" />
                )}
              </>
            )}
            <p className="text-xs text-gray-500 truncate w-20 lg:w-50 px-0.5">
              {latestMessage}
            </p>
          </div>
          <p className="text-xs w-fit px-1 mt-0.5 rounded-md bg-gray-100 text-gray-400 flex items-center justify-start">
            <FaPhone className="h-2 w-2  mr-1" />
            {phone}
          </p>
        </div>
      </div>
      {/* Right Section - Tags, Unread Count, Date */}
      <div className="flex flex-col relative items-end space-y-1 right-2 top-0 h-14">
        {/* Tags */}
        <div className="flex space-x-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`text-xs px-1 py-0.5 rounded-md ${
                tag === "Demo"
                  ? "bg-orange-50 text-stone-400"
                  : tag === "internal"
                  ? "bg-green-100 text-green-700"
                  : tag === "Signup"
                  ? "bg-green-100 text-green-700"
                  : tag === "Dont Send"
                  ? "bg-red-50 text-red-500"
                  : "bg-gray-100 text-brown-400"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex absolute bottom-3 gap-0.5">
          {/* Unread Count */}
          {unreadCount && unreadCount > 0 ? (
            <span className="text-xs bg-emerald-400 text-white px-1 rounded-full">
              {unreadCount}
            </span>
          ) : null}
          <div className="relative h-4 w-4 bottom-0.5 rounded-full flex items-center justify-center bg-gray-200">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="h-4 w-4 rounded-full" />
            ) : (
              <IoPersonSharp className="text-white h-2 w-2" />
            )}
          </div>
        </div>

        {/* Date */}
        <span className="text-xs text-gray-400 absolute bottom-0">
          {date}
        </span>
      </div>
    </div>
  );
};
