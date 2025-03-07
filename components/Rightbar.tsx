"use client";

import { AnalyticsIcon, BroadcastIcon, RulesIcon } from "@/utils/Icons";
import { Contact } from "@/utils/chatService";
import { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { IoChatbubbleEllipses, IoTicket } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";
import { RiContactsBookFill, RiFolderImageFill } from "react-icons/ri";
import SidebarNavLink from "./SidebarNavLink";

interface MenuItem {
    href?: string;
    icon?: IconType;
    divider?: boolean;
    isNew?: boolean;
    isImplemented?: boolean;
}

interface RightbarProps {
    contact: Contact | null;
}

const menuItems: MenuItem[] = [
  { href: "/dashboard", icon: AiFillHome, isImplemented: false },
  { href: "/chats", icon: IoChatbubbleEllipses, isImplemented: true },
  { href: "/tickets", icon: IoTicket, isImplemented: false },
  { href: "/analytics", icon: AnalyticsIcon, isImplemented: false },
  { href: "/list", icon: FaListUl, isImplemented: false },
  { href: "/broadcast", icon: BroadcastIcon, isImplemented: false },
  { href: "/rules", icon: RulesIcon, isImplemented: false },
  { href: "/contacts", icon: RiContactsBookFill, isImplemented: false },
  { href: "/media", icon: RiFolderImageFill, isImplemented: false },
  { href: "/logs", icon: MdChecklist, isImplemented: false },
  { href: "/settings", icon: BsGearFill, isImplemented: false },
];


const Rightbar: React.FC<RightbarProps> = ({ contact }) => {
    return (
        <aside className="w-14 border-l border-gray-200 p-2 flex flex-col gap-2 h-full">
          {menuItems.map(
            (item) =>
              item.href && item.icon && (
                <SidebarNavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  isNew={item.isNew}
                  isImplemented={item.isImplemented}
                />
              )
          )}
        </aside>
    )
};

export default Rightbar;
