"use client";

import { useState } from "react";

type Props = {
  endpoint?: string; // default /api/hero-chat
};

export default function HeroMicroChat({ endpoint = "/api/hero-chat" }: Props) {
  const [value, setValue] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    setError(null);
    setReply(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input: value }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const text = await res.text();
      setReply(text);
    } catch (err: any) {
      setError("Unable to fetch answer right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={onSubmit} className="flex gap-2">
        <label htmlFor="hero-micro-chat" className="sr-only">
          Ask a question
        </label>
        <input
          id="hero-micro-chat"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask how this helps your AFSL..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Ask"}
        </button>
      </form>
      <div className="mt-3 min-h-[1.5rem] text-sm text-left">
        {error ? (
          <span className="text-red-600">{error}</span>
        ) : reply ? (
          <span className="text-foreground">{reply}</span>
        ) : null}
      </div>
    </div>
  );
}

