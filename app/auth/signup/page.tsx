"use client";

import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import { AuthPreview } from "@/components/auth/AuthPreview";
import { PeriskopeIcon } from "@/utils/Icons";

export default function SignUpPage() {
  return (
    <div
      className="relative min-h-screen bg-[#efeae2]"
      style={{ backgroundImage: "url('/whatsapp-bg.png')", backgroundRepeat: "repeat" }}
    >
      <Link
        href="/"
        className="absolute top-6 left-6 sm:left-12 lg:left-16 z-10 flex items-center gap-2"
      >
        <PeriskopeIcon className="h-8 w-8" />
        <span className="font-bold text-xl tracking-tight text-green-800">
          periskope
        </span>
      </Link>
      <div className="mx-auto max-w-7xl min-h-screen flex items-center justify-center lg:justify-between gap-10 px-6 sm:px-12 lg:px-16 py-20">
        <SignupForm />
        <AuthPreview />
      </div>
    </div>
  );
} 