"use client";

import { useState, JSX } from "react";
import Link from "next/link";
import { AnalyticsIcon, BroadcastIcon, CollapseIcon, PeriskopeIcon, RulesIcon} from "@/utils/Icons";
import { IconType } from "react-icons";
import { IoChatbubbleEllipses, IoTicket } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { RiContactsBookFill, RiFolderImageFill } from "react-icons/ri";
import { MdChecklist } from "react-icons/md";
import { BsGearFill, BsStars } from "react-icons/bs";
import { TbStarsFilled } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";

interface MenuItem {
  href?: string;
  icon?: IconType
  divider?: boolean;
  isNew?: boolean;
}

const Sidebar:React.FC = () => {
  const [active, setActive] = useState<string>("/chats");

  const menuItems: MenuItem[] = [
    { href: "/dashboard", icon: AiFillHome },
    { divider: true },
    { href: "/chats", icon: IoChatbubbleEllipses },
    { href: "/tickets", icon: IoTicket },
    { href: "/analytics", icon: AnalyticsIcon },
    { divider: true },
    { href: "/list", icon: FaListUl },
    { href: "/broadcast", icon: BroadcastIcon },
    { href: "/rules", icon: RulesIcon, isNew: true },
    { divider: true },
    { href: "/contacts", icon: RiContactsBookFill },
    { href: "/media", icon: RiFolderImageFill },
    { divider: true },
    { href: "/logs", icon: MdChecklist },
    { href: "/settings", icon: BsGearFill },
  ];

  return (
    <div className="h-screen w-14 p-1 flex flex-col justify-between border-r border-gray-200">
      <div className="flex flex-col gap-y-1 p-1">
        <div className="flex justify-center items-center p-2">
          <PeriskopeIcon className="h-10 w-10" />
        </div>
        {menuItems.map((item, index) =>
          item.divider ? (
            <hr key={`divider-${index}`} className="border-gray-200 m-1" />
          ) : (
            item.href && (
              <Link key={item.href} href={item.href ?? "#"}>
                <div
                  className={`relative flex items-center justify-center px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600 ${
                    active === item.href ? "bg-gray-100 text-green-700" : ""
                  }`}
                  onClick={() => item.href && setActive(item.href)}
                >
                  {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
                  {item.isNew && (
                    <BsStars className="absolute top-1 right-1 text-yellow-500 h-3 w-3 rounded-full" />
                  )}
                </div>
              </Link>
            )
          )
        )}
      </div>
      <div className="flex flex-col gap-y-1 p-1">
        <div className="flex items-center justify-center px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600">
          <TbStarsFilled  className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-center px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600">
          <CollapseIcon className="h-5 w-5 rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;