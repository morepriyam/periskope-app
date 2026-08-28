"use client";

import Link from "next/link";
import { PeriskopeIcon } from "@/utils/Icons";
import {
  IoChatbubblesOutline,
  IoSearchOutline,
  IoHappyOutline,
} from "react-icons/io5";
import { FiZap, FiEye, FiGithub, FiExternalLink } from "react-icons/fi";

const FEATURES = [
  {
    icon: IoChatbubblesOutline,
    label: "REALTIME MESSAGING",
    title: "Messages that arrive while you watch",
    desc: "Supabase Realtime channels deliver messages instantly, with sent / delivered / read ticks tracked end to end.",
  },
  {
    icon: FiEye,
    label: "PRESENCE & TYPING",
    title: "See who's online and who's typing",
    desc: "A live presence layer shows online dots across the app and a typing indicator in the conversation — no polling, no database writes.",
  },
  {
    icon: IoSearchOutline,
    label: "IN-CHAT SEARCH",
    title: "Find any message in a conversation",
    desc: "Search inside a chat with instant match highlighting, plus an unread-messages divider so you never lose your place.",
  },
  {
    icon: IoHappyOutline,
    label: "THE DETAILS",
    title: "Unread filters, emoji, the little things",
    desc: "Unread-count badges, inbox filtering, an emoji picker, date separators, message grouping — the polish that makes a chat feel real.",
  },
];

const STACK = [
  "Next.js 15",
  "React 19",
  "Supabase Auth",
  "Postgres · RLS",
  "Realtime Presence",
  "Tailwind CSS 4",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Disclaimer ribbon */}
      <div className="bg-[#041200] text-green-100 text-center text-xs px-4 py-1.5 border-b border-green-900/40">
        Unofficial rebuild for a 72-hour hiring challenge — not affiliated with
        the real product.{" "}
        <a
          href="https://periskope.app"
          target="_blank"
          rel="noreferrer"
          className="underline font-semibold text-green-400 hover:text-green-300"
        >
          Visit periskope.app →
        </a>
      </div>

      {/* Dark hero — matches periskope.app design language */}
      <div className="bg-gradient-to-b from-[#041200] via-[#062a10] to-[#0a3d1a] text-white">
        <header className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2">
            <PeriskopeIcon className="h-8 w-8" />
            <span className="font-bold text-xl tracking-tight">periskope</span>
            <span className="ml-1 rounded bg-green-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-300">
              rebuild
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://github.com/morepriyam/periskope-app"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-green-100/80 hover:text-white"
            >
              <FiGithub className="h-4 w-4" /> Source
            </a>
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-green-100/80 hover:text-white px-2 py-1.5"
            >
              Login
            </Link>
            <Link
              href="/auth/signin?demo=1"
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-600 transition-colors"
            >
              Try the live demo
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-14 pb-8 text-center">
          <p className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300 mb-7">
            One screenshot · 72 hours · a working product
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Rebuild <span className="text-green-400">a real-time chat</span>{" "}
            product from a{" "}
            <span className="text-green-400">single screenshot</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-green-100/70">
            The take-home brief: no design file, no API docs, no second
            screenshot. Rebuild the interface pixel-perfect and fully working in
            72 hours. This is that build — live auth, realtime messaging,
            presence, and search.
          </p>

          {/* Stacked CTAs */}
          <div className="mx-auto mt-10 max-w-xl space-y-3">
            <Link
              href="/auth/signin?demo=1"
              className="block w-full rounded-lg bg-green-700 px-6 py-4 text-lg font-bold text-white hover:bg-green-600 transition-colors shadow-lg shadow-green-900/40"
            >
              Try the live demo — no signup
            </Link>
            <a
              href="https://periskope.app"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-lg font-bold text-gray-900 hover:bg-gray-100 transition-colors"
            >
              See the real Periskope <FiExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 text-sm text-green-100/50">
            One click drops you into a seeded inbox as the demo user.
          </p>
        </section>

        {/* Logo cloud (the stack behind the rebuild) */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20 pt-6">
          <p className="text-center text-base font-medium text-green-100/60 mb-8">
            Rebuilt in 72 hours with
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-6 place-items-center">
            {STACK.map((item) => (
              <li
                key={item}
                className="text-lg font-bold tracking-tight text-white/70"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* White: features */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <h2 className="text-center text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Everything in the screenshot —{" "}
          <span className="text-green-600">and what it implied</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-gray-600">
          A screenshot is one frozen frame. Empty states, hover states, realtime
          behaviour, and everything off-frame had to be designed in the
          product&apos;s voice.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-md hover:border-green-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  <f.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold tracking-widest text-green-700">
                  {f.label}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The challenge */}
      <section className="bg-[#041200] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                The <span className="text-green-400">challenge</span>
              </h2>
              <p className="mt-4 text-green-100/70 leading-relaxed">
                A take-home unlike the usual: here is one screenshot of our
                product — rebuild it, pixel-perfect and working. No design file,
                no API docs, no second screenshot.
              </p>
            </div>
            <dl className="md:col-span-2 grid gap-5 sm:grid-cols-3">
              <div className="rounded-xl bg-green-900/40 border border-green-800/50 p-6">
                <dt className="text-4xl font-extrabold text-green-400">1</dt>
                <dd className="mt-2 text-sm text-green-100/70">
                  screenshot as the entire spec — spacing counted in zoomed-in
                  pixels
                </dd>
              </div>
              <div className="rounded-xl bg-green-900/40 border border-green-800/50 p-6">
                <dt className="text-4xl font-extrabold text-green-400">72h</dt>
                <dd className="mt-2 text-sm text-green-100/70">
                  from brief to a working, deployed realtime chat
                </dd>
              </div>
              <div className="rounded-xl bg-green-900/40 border border-green-800/50 p-6">
                <dt className="text-4xl font-extrabold text-green-400">
                  <FiZap className="inline h-8 w-8" />
                </dt>
                <dd className="mt-2 text-sm text-green-100/70">
                  outcome: a job offer — and this demo, kept alive since
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          See it running, not screenshots of it
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
          The demo account is pre-loaded with conversations. Open it in two
          browsers and watch presence, typing, and read receipts move in real
          time.
        </p>
        <Link
          href="/auth/signin?demo=1"
          className="mt-9 inline-block rounded-lg bg-green-700 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-green-700/20 hover:bg-green-600 hover:shadow-xl transition-all"
        >
          Try the live demo — no signup
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <PeriskopeIcon className="h-6 w-6" />
            <span>
              Rebuilt by{" "}
              <a
                href="https://morepriyam.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-gray-700 hover:text-green-700"
              >
                Priyam More
              </a>{" "}
              as a hiring-challenge demo.
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/morepriyam/periskope-app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-700 inline-flex items-center gap-1.5"
            >
              <FiGithub className="h-4 w-4" /> Source code
            </a>
            <a
              href="https://periskope.app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-700 inline-flex items-center gap-1.5"
            >
              The real Periskope <FiExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating demo button (echoes their floating action button) */}
      <Link
        href="/auth/signin?demo=1"
        className="fixed bottom-5 right-5 z-30 rounded-full bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-green-900/30 hover:bg-green-600 transition-colors"
      >
        Try the demo
      </Link>
    </div>
  );
}
