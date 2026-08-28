"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

/** App chrome (sidebar + navbar) everywhere except the public landing page. */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <div className="h-screen overflow-y-auto bg-white">{children}</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto bg-white">{children}</div>
      </div>
    </div>
  );
}
