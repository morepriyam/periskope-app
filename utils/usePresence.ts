"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "./supabase-client";

type TypingPayload = { from?: string; to?: string };

/**
 * Shared realtime presence over a single channel: tracks which users are online
 * and relays ephemeral "typing…" signals. Uses Supabase Presence + Broadcast, so
 * there are no database writes.
 */
export function usePresence(userId?: string) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [onlineIds, setOnlineIds] = useState<Set<string>>(new Set());
  const [typingIds, setTypingIds] = useState<Set<string>>(new Set());
  const channelRef = useRef<RealtimeChannel | null>(null);
  const typingTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  useEffect(() => {
    if (!userId) return;

    const channel = supabase.channel("periskope-presence", {
      config: { presence: { key: userId } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        setOnlineIds(new Set(Object.keys(channel.presenceState())));
      })
      .on("broadcast", { event: "typing" }, ({ payload }) => {
        const { from, to } = payload as TypingPayload;
        if (!from || to !== userId) return;
        setTypingIds((prev) => new Set(prev).add(from));
        clearTimeout(typingTimers.current.get(from));
        typingTimers.current.set(
          from,
          setTimeout(() => {
            setTypingIds((prev) => {
              const next = new Set(prev);
              next.delete(from);
              return next;
            });
          }, 2500),
        );
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channel.track({ online_at: new Date().toISOString() });
        }
      });

    channelRef.current = channel;
    const timers = typingTimers.current;

    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [userId, supabase]);

  const sendTyping = useCallback(
    (toUserId: string) => {
      channelRef.current?.send({
        type: "broadcast",
        event: "typing",
        payload: { from: userId, to: toUserId },
      });
    },
    [userId],
  );

  return { onlineIds, typingIds, sendTyping };
}
