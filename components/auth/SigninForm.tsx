"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiArrowLeft } from "react-icons/fi";
import { createBrowserSupabaseClient } from "@/utils/supabase-client";
import { PeriskopeIcon } from "@/utils/Icons";
import { validateEmail } from "@/utils/validationUtils";

// Public demo account seeded by scripts/seed.js — intentionally shareable.
const DEMO_EMAIL = "demo@periskope.morepriyam.com";
const DEMO_PASSWORD = "demodemo";

export const SigninForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [highlightDemo, setHighlightDemo] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo")) setHighlightDemo(true);
  }, []);

  const supabase = createBrowserSupabaseClient();

  // Email-first: validate the address, then reveal the password step.
  const handleContinueWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setStep("password");
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/` },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Could not continue with Google",
      );
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An error occurred during sign in",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      });
      if (error) throw error;
      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Could not open the demo",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-md">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <PeriskopeIcon className="h-14 sm:h-16 w-14 sm:w-16" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Log in to Periskope
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage your chats, contacts, and conversations
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      {step === "email" ? (
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400">or</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleContinueWithEmail}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your official email address"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                autoComplete="email"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full flex justify-center py-2.5 px-4 rounded-md text-sm font-semibold text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
            >
              Continue with Email
            </button>
          </form>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSignIn}>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setError(null);
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700"
          >
            <FiArrowLeft className="h-3.5 w-3.5" />
            {email}
          </button>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium text-green-600 hover:text-green-500"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 rounded-md text-sm font-semibold text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      )}

      <div className="space-y-2 border-t border-gray-100 pt-5">
        {highlightDemo && (
          <p className="text-center text-sm font-semibold text-green-700">
            👇 One click — no account needed
          </p>
        )}
        <button
          type="button"
          onClick={handleDemoSignIn}
          disabled={loading}
          className={`w-full flex justify-center py-2.5 px-4 border-2 border-green-600 rounded-md text-sm font-bold text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 ${
            highlightDemo ? "ring-2 ring-green-400 ring-offset-2 animate-pulse" : ""
          }`}
        >
          Try the live demo — no signup
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign up
          </Link>
        </p>
      </div>

      <p className="text-center text-xs text-gray-400">
        By continuing you agree to Periskope&apos;s{" "}
        <a
          href="https://periskope.app/terms"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-600"
        >
          Terms
        </a>{" "}
        and{" "}
        <a
          href="https://periskope.app/privacy"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-600"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};
