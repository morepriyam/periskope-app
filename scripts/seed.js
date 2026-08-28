// Seeds the Periskope demo database: a set of confirmed users (incl. a public
// `demo` account) and a believable set of conversations for that account.
//
// Idempotent — safe to run repeatedly (used by the nightly reseed workflow).
// Reads credentials from the environment; nothing is hardcoded:
//   SUPABASE_URL=https://<project-ref>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY=<service_role key>   (server-only secret)

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running.",
  );
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const avatar = (name, bg = "random") =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff`;

// The public demo account — the "Try the demo" button on the signin page uses these.
const DEMO = {
  key: "demo",
  email: "demo@periskope.morepriyam.com",
  password: "demodemo",
  user_metadata: {
    username: "demo",
    avatar_url: avatar("Demo User", "15803d"),
    phone: "+1 555-000-0000",
  },
};

// `key` is an internal slug (used for the email + id lookup); `username` is the
// real display name shown in the UI.
const PEOPLE = [
  ["sarah", "Sarah Johnson", "+1 555-123-4001"],
  ["michael", "Michael Brown", "+1 555-123-4002"],
  ["emily", "Emily Davis", "+1 555-123-4003"],
  ["david", "David Wilson", "+1 555-123-4004"],
  ["jennifer", "Jennifer Martinez", "+1 555-123-4005"],
  ["james", "James Taylor", "+1 555-123-4006"],
  ["sophia", "Sophia Anderson", "+1 555-123-4007"],
  ["alex", "Alex Thomas", "+1 555-123-4008"],
].map(([key, name, phone]) => ({
  key,
  email: `${key}@example.com`,
  password: "SecurePass123!",
  user_metadata: { username: name, avatar_url: avatar(name), phone },
}));

// Conversations with the demo account. `from` is a person's key or "demo".
// minsAgo = how long ago the message was sent (drives ordering + timestamps).
// People not listed here are left with no messages (empty chats).
const THREADS = [
  { with: "sarah", messages: [
    { from: "sarah", text: "Hey! Did the Periskope rebuild go out?", minsAgo: 300, status: "read" },
    { from: "demo", text: "Just shipped it — pixel-perfect from a single screenshot 😄", minsAgo: 296, status: "read" },
    { from: "sarah", text: "Incredible turnaround. The whole team is impressed.", minsAgo: 292, status: "read" },
    { from: "demo", text: "Thanks! Realtime, presence and typing indicators are all live too.", minsAgo: 288, status: "read" },
    { from: "sarah", text: "Let's demo it to the client on Friday 🚀", minsAgo: 284, status: "read" },
  ]},
  { with: "michael", messages: [
    { from: "michael", text: "Can you add an unread filter to the inbox?", minsAgo: 220, status: "read" },
    { from: "demo", text: "Done — it's the toggle at the top of the chat list.", minsAgo: 216, status: "read" },
    { from: "michael", text: "Perfect, exactly what I needed 🙌", minsAgo: 210, status: "read" },
    { from: "michael", text: "One more — can we tag contacts as Lead / Customer?", minsAgo: 120, status: "received" },
  ]},
  { with: "emily", messages: [
    { from: "emily", text: "Realtime feels instant. What's the stack?", minsAgo: 150, status: "read" },
    { from: "demo", text: "Next.js + Supabase channels, with optimistic inserts on the client.", minsAgo: 146, status: "read" },
    { from: "emily", text: "Nice. And how do the green online dots work?", minsAgo: 142, status: "read" },
    { from: "demo", text: "Supabase Presence for online status, Broadcast for typing 👌", minsAgo: 138, status: "received" },
  ]},
  { with: "david", messages: [
    { from: "david", text: "Hi, is the WhatsApp API integration ready for our account?", minsAgo: 95, status: "read" },
    { from: "demo", text: "Yes! You can connect up to 6 numbers under one shared inbox.", minsAgo: 90, status: "read" },
    { from: "david", text: "Great — we'll onboard the sales team this week.", minsAgo: 85, status: "read" },
    { from: "demo", text: "I'll send over the setup guide shortly 👍", minsAgo: 80, status: "received" },
  ]},
  { with: "james", messages: [
    { from: "james", text: "Welcome to Periskope 👋 Ping me if you need anything.", minsAgo: 40, status: "read" },
    { from: "demo", text: "Thanks James! Loving the product so far.", minsAgo: 36, status: "received" },
  ]},
];

async function listAllUsers() {
  const byEmail = new Map();
  let page = 1;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    for (const u of data.users) byEmail.set(u.email, u);
    if (data.users.length < 200) break;
    page += 1;
  }
  return byEmail;
}

async function ensureUser(u, existing) {
  const found = existing.get(u.email);
  if (found) return found.id;
  const { data, error } = await admin.auth.admin.createUser({
    email: u.email,
    password: u.password,
    user_metadata: u.user_metadata,
    email_confirm: true,
  });
  if (error) throw error;
  console.log(`created ${u.email}`);
  // Small delay to stay under auth rate limits.
  await new Promise((r) => setTimeout(r, 400));
  return data.user.id;
}

async function main() {
  console.log("Seeding demo users…");
  const existing = await listAllUsers();

  const people = [DEMO, ...PEOPLE];
  const idOf = {};
  for (const u of people) {
    idOf[u.key] = await ensureUser(u, existing);
  }

  // Ensure a profile row exists for every user (backfills when the auth trigger
  // didn't run, e.g. users created before the schema). The profile INSERT
  // trigger also wires up the contacts between everyone.
  const profileRows = people.map((u) => ({
    id: idOf[u.key],
    username: u.user_metadata.username,
    avatar_url: u.user_metadata.avatar_url,
    phone: u.user_metadata.phone,
  }));
  const { error: upErr } = await admin
    .from("profiles")
    .upsert(profileRows, { onConflict: "id" });
  if (upErr) throw upErr;

  console.log("Resetting demo conversations…");
  await admin.from("messages").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const rows = [];
  for (const thread of THREADS) {
    for (const m of thread.messages) {
      const sender = m.from === "demo" ? "demo" : thread.with;
      const receiver = m.from === "demo" ? thread.with : "demo";
      rows.push({
        sender_id: idOf[sender],
        receiver_id: idOf[receiver],
        content: m.text,
        status: m.status,
        created_at: new Date(Date.now() - m.minsAgo * 60_000).toISOString(),
      });
    }
  }

  const { error: merr } = await admin.from("messages").insert(rows);
  if (merr) throw merr;

  console.log(`Seeded ${rows.length} messages across ${THREADS.length} conversations.`);
  console.log("Done. Demo login: demo@periskope.morepriyam.com / demodemo");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
