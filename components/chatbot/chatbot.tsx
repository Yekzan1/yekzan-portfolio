"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, Send, Sparkles, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/dictionaries/types";
import { cn } from "@/lib/utils";

type Assistant = Dictionary["assistant"];
type Msg = { id: number; role: "user" | "assistant"; content: string; seeded?: boolean };

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

  // Open via global event (used by the Assistant section CTA). An optional
  // `detail.question` is sent automatically once the panel is open.
  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<{ question?: string }>).detail?.question;
      if (q) setPending(q);
    };
    window.addEventListener("open-assistant", handler);
    return () => window.removeEventListener("open-assistant", handler);
  }, []);

  // Seed greeting on first open; focus input.
  useEffect(() => {
    if (open) {
      setMessages((prev) => (prev.length ? prev : seedGreeting()));
      const t = setTimeout(() => inputRef.current?.focus(), 280);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Autoscroll to newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Close on Escape.
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

  // Fire a pending question (from the Assistant section CTA) once open.
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
          "fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_10px_40px_-8px_var(--ring)] sm:bottom-6 sm:right-6",
          open && "max-sm:hidden",
        )}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-accent opacity-60 blur-md" aria-hidden />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "spark"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
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
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-50 flex h-[min(82svh,40rem)] flex-col overflow-hidden rounded-3xl border border-border bg-background-soft/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[min(34rem,72svh)] sm:w-[24rem]"
          >
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold tracking-tight">{dict.headerTitle}</p>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {dict.online}
                </p>
              </div>
              <button
                type="button"
                aria-label={dict.reset}
                title={dict.reset}
                onClick={() => setMessages(seedGreeting())}
                className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Messages */}
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
                <div className="flex items-center gap-1.5 px-1 text-muted">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}

              {showSuggestions && !loading && (
                <div className="space-y-2 pt-1">
                  <p className="px-1 text-xs font-medium uppercase tracking-wider text-muted-2">
                    {dict.suggestionsTitle}
                  </p>
                  {dict.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="block w-full rounded-xl border border-border bg-surface px-3 py-2 text-left text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-border p-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1.5 focus-within:border-border-strong">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={dict.inputPlaceholder}
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-2"
                  maxLength={1000}
                />
                <button
                  type="submit"
                  aria-label={dict.send}
                  disabled={!input.trim() || loading}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-opacity disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 px-1 text-center text-[0.65rem] leading-tight text-muted-2">
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
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-accent text-accent-foreground"
            : "rounded-bl-md border border-border bg-surface text-foreground",
        )}
      >
        {content}
      </div>
    </motion.div>
  );
}
