import { BiCheckDouble } from "react-icons/bi";
import { IoSend } from "react-icons/io5";

const CHATS = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    color: "bg-rose-500",
    snippet: "Incredible turnaround 🙌",
    time: "2m",
    online: true,
    active: true,
  },
  {
    name: "Support Team",
    initials: "ST",
    color: "bg-emerald-600",
    snippet: "Ticket #482 resolved",
    time: "14m",
    unread: 3,
  },
  {
    name: "Michael Brown",
    initials: "MB",
    color: "bg-indigo-500",
    snippet: "Works great!",
    time: "1h",
  },
  {
    name: "Emily Davis",
    initials: "ED",
    color: "bg-amber-500",
    snippet: "What's the stack?",
    time: "3h",
  },
];

function Bubble({
  children,
  sent,
}: {
  children: React.ReactNode;
  sent?: boolean;
}) {
  return (
    <div className={`flex ${sent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-2.5 py-1.5 text-[11px] shadow ${
          sent ? "bg-green-100 text-gray-800" : "bg-white text-gray-800"
        }`}
      >
        <p>{children}</p>
        {sent && (
          <span className="flex justify-end">
            <BiCheckDouble className="text-blue-500 h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </div>
  );
}

/** Decorative product preview shown beside the auth form on desktop (dummy data). */
export function AuthPreview() {
  return (
    <div className="hidden lg:block w-full max-w-xl shrink-0">
      <div className="rounded-2xl border border-black/5 bg-white shadow-2xl overflow-hidden rotate-[0.6deg]">
        {/* window bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-gray-400">periskope · inbox</span>
        </div>

        <div className="flex h-[420px]">
          {/* conversation list */}
          <aside className="w-[38%] border-r border-gray-100 overflow-hidden">
            {CHATS.map((c) => (
              <div
                key={c.name}
                className={`flex items-center gap-2 px-3 py-2.5 ${
                  c.active ? "bg-green-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative shrink-0">
                  <div
                    className={`h-9 w-9 rounded-full ${c.color} text-white text-xs font-bold flex items-center justify-center`}
                  >
                    {c.initials}
                  </div>
                  {c.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-800 truncate">
                      {c.name}
                    </span>
                    <span className="text-[10px] text-gray-400">{c.time}</span>
                  </div>
                  <div className="flex justify-between items-center gap-1">
                    <span className="text-[11px] text-gray-500 truncate">
                      {c.snippet}
                    </span>
                    {c.unread && (
                      <span className="h-4 min-w-4 px-1 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </aside>

          {/* open conversation */}
          <section
            className="flex-1 flex flex-col"
            style={{
              backgroundImage: "url('/whatsapp-bg.png')",
              backgroundColor: "#efeae2",
            }}
          >
            <header className="flex items-center gap-2 px-3 py-2 bg-white/90 border-b border-gray-100">
              <div className="h-8 w-8 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                SJ
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-800">
                  Sarah Johnson
                </div>
                <div className="text-[10px] text-green-600">online</div>
              </div>
            </header>

            <div className="flex-1 p-3 space-y-2 overflow-hidden">
              <Bubble>Hey! Did the rebuild go out?</Bubble>
              <Bubble sent>Just shipped it — pixel-perfect 😄</Bubble>
              <Bubble>Incredible turnaround 🙌</Bubble>
              <div className="flex justify-start">
                <div className="bg-white shadow rounded-lg px-3 py-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            </div>

            <div className="p-2 bg-white/90 border-t border-gray-100 flex items-center gap-2">
              <div className="flex-1 h-8 rounded-full bg-gray-100 px-3 flex items-center text-[11px] text-gray-400">
                Message…
              </div>
              <span className="h-8 w-8 rounded-full bg-green-700 text-white flex items-center justify-center">
                <IoSend className="h-3.5 w-3.5" />
              </span>
            </div>
          </section>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-gray-500">
        A live preview — the demo account looks just like this.
      </p>
    </div>
  );
}
