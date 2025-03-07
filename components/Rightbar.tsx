"use client";

import { AnalyticsIcon, BroadcastIcon, RulesIcon } from "@/utils/Icons";
import { Contact } from "@/utils/chatService";
import Link from "next/link";
import { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { IoChatbubbleEllipses, IoTicket } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";
import { RiContactsBookFill, RiFolderImageFill } from "react-icons/ri";

interface MenuItem {
    href?: string;
    icon?: IconType;
    divider?: boolean;
    isNew?: boolean;
}

interface RightbarProps {
  contact?: Contact | null;
}

const menuItems: MenuItem[] = [
  { href: "/dashboard", icon: AiFillHome },
  { href: "/chats", icon: IoChatbubbleEllipses },
  { href: "/tickets", icon: IoTicket },
  { href: "/analytics", icon: AnalyticsIcon },
  { href: "/list", icon: FaListUl },
  { href: "/broadcast", icon: BroadcastIcon },
  { href: "/rules", icon: RulesIcon },
  { href: "/contacts", icon: RiContactsBookFill },
  { href: "/media", icon: RiFolderImageFill },
  { href: "/logs", icon: MdChecklist },
  { href: "/settings", icon: BsGearFill },
];


const Rightbar: React.FC<RightbarProps> = ({ contact }) => {
    return (
        <aside className="w-14 border-l border-gray-200 p-2 flex flex-col gap-2 h-full">
          {menuItems.map(
            (item) =>
              item.href && (
                <Link key={item.href} href={item.href ?? "#"}>
                  <div
                    className={`relative flex items-center justify-center px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-gray-300`}
                  >
                    {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
                  </div>
                </Link>
              )
          )}
        </aside>
        )
};

export default Rightbar;
