"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/dictionaries/types";
import { cn } from "@/lib/utils";

type Assistant = Dictionary["assistant"];
type Msg = { id: number; role: "user" | "assistant"; content: string; seeded?: boolean };

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const IconChat = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} aria-hidden {...stroke}>
    <path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z" />
  </svg>
);
const IconClose = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} aria-hidden {...stroke}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const IconReset = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} aria-hidden {...stroke}>
    <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" />
  </svg>
);
const IconSend = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} aria-hidden {...stroke}>
    <path d="M5 12h13M12 6l6 6-6 6" />
  </svg>
);

export function Chatbot({ dict, locale }: { dict: Assistant; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const counter = useRef(1);
  const messagesRef = useRef<Msg[]>(messages);
  messagesRef.current = messages;
  const loadingRef = useRef(false);
  loadingRef.current = loading;
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogId = useId();

  const seedGreeting = () => [
    { id: 0, role: "assistant" as const, content: dict.greeting, seeded: true },
  ];

  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<{ question?: string }>).detail?.question;
      if (q) setPending(q);
    };
    window.addEventListener("open-assistant", handler);
    return () => window.removeEventListener("open-assistant", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setMessages((prev) => (prev.length ? prev : seedGreeting()));
      const t = setTimeout(() => inputRef.current?.focus(), 280);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loadingRef.current) return;

    const history = messagesRef.current
      .filter((m) => !m.seeded)
      .map((m) => ({ role: m.role, content: m.content }));

    const userMsg: Msg = { id: counter.current++, role: "user", content: trimmed };
    setMessages((prev) => (prev.length ? [...prev, userMsg] : [...seedGreeting(), userMsg]));
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, locale, history }),
      });
      const data = await res.json();
      const reply: string = data?.text || dict.error;
      setMessages((prev) => [...prev, { id: counter.current++, role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { id: counter.current++, role: "assistant", content: dict.error }]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open && pending) {
      send(pending);
      setPending(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pending]);

  const showSuggestions = messages.filter((m) => m.role === "user").length === 0;

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        aria-label={dict.open}
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "shadow-paper-lg fixed bottom-5 right-5 z-50 grid h-13 w-13 place-items-center rounded-full bg-accent text-accent-ink sm:bottom-6 sm:right-6",
          open && "max-sm:hidden",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconChat className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={dialogId}
            role="dialog"
            aria-label={dict.headerTitle}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="shadow-paper-lg fixed inset-x-3 bottom-3 z-50 flex h-[min(82svh,40rem)] flex-col overflow-hidden rounded-md border border-line-strong bg-card sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[min(34rem,72svh)] sm:w-[23rem]"
          >
            <header className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-[1.05rem] text-ink">{dict.headerTitle}</p>
                <p className="flex items-center gap-1.5 text-xs text-ink-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {dict.online}
                </p>
              </div>
              <button
                type="button"
                aria-label={dict.reset}
                title={dict.reset}
                onClick={() => setMessages(seedGreeting())}
                className="grid h-8 w-8 place-items-center rounded-sm text-ink-3 transition-colors hover:bg-paper-2 hover:text-ink"
              >
                <IconReset className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-sm text-ink-3 transition-colors hover:bg-paper-2 hover:text-ink"
              >
                <IconClose className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-atomic="false"
              aria-label={dict.headerTitle}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m) => (
                <Bubble key={m.id} role={m.role} content={m.content} />
              ))}

              {loading && (
                <div className="flex items-center gap-1.5 px-1 text-ink-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-ink-3"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}

              {showSuggestions && !loading && (
                <div className="space-y-2 pt-1">
                  <p className="eyebrow px-1 uppercase tracking-[0.14em]">{dict.suggestionsTitle}</p>
                  {dict.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="block w-full rounded-sm border border-line bg-paper px-3 py-2 text-left text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-line p-3"
            >
              <div className="flex items-center gap-2 rounded-sm border border-line bg-paper px-2 py-1.5 focus-within:border-line-strong">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={dict.inputPlaceholder}
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-ink-3"
                  maxLength={1000}
                />
                <button
                  type="submit"
                  aria-label={dict.send}
                  disabled={!input.trim() || loading}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-accent text-accent-ink transition-opacity disabled:opacity-40"
                >
                  <IconSend className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 px-1 text-center text-[0.65rem] leading-tight text-ink-3">
                {dict.disclaimer}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-md px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-xs bg-accent text-accent-ink"
            : "rounded-bl-xs border border-line bg-paper-2 text-ink",
        )}
      >
        {content}
      </div>
    </motion.div>
  );
}
