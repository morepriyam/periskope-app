"use client";

import Link from "next/link";
import { SigninForm } from "@/components/auth/SigninForm";
import { PeriskopeIcon } from "@/utils/Icons";

export default function SignInPage() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center lg:justify-start px-6 sm:px-12 lg:px-24 py-20 bg-[#efeae2]"
      style={{ backgroundImage: "url('/whatsapp-bg.png')", backgroundRepeat: "repeat" }}
    >
      <Link
        href="/"
        className="absolute top-6 left-6 sm:left-12 lg:left-24 flex items-center gap-2"
      >
        <PeriskopeIcon className="h-8 w-8" />
        <span className="font-bold text-xl tracking-tight text-green-800">
          periskope
        </span>
      </Link>
      <SigninForm />
    </div>
  );
} 