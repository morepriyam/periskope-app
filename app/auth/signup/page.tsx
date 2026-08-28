"use client";

import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import { AuthPreview } from "@/components/auth/AuthPreview";
import { PeriskopeIcon } from "@/utils/Icons";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Form column — cream doodle background */}
      <div
        className="relative lg:w-[34%] min-h-screen flex items-center justify-center px-6 sm:px-10 py-16 bg-[#efeae2]"
        style={{ backgroundImage: "url('/whatsapp-bg.png')", backgroundRepeat: "repeat" }}
      >
        <Link
          href="/"
          className="absolute top-6 left-6 sm:left-10 z-10 flex items-center gap-2"
        >
          <PeriskopeIcon className="h-8 w-8" />
          <span className="font-bold text-xl tracking-tight text-green-800">
            periskope
          </span>
        </Link>
        <SignupForm />
      </div>

      {/* Preview column — brand dark-green panel (desktop only) */}
      <div className="hidden lg:flex lg:w-[66%] items-center justify-center bg-gradient-to-br from-green-500 via-green-600 to-green-700 px-10 xl:px-16 py-20">
        <AuthPreview />
      </div>
    </div>
  );
} 