"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypingTextProps {
  words: string[];
  typingSpeed?: number; // ms per char while typing
  deletingSpeed?: number; // ms per char while deleting
  pauseBetween?: number; // ms to pause on a full word
  loop?: boolean;
  className?: string;
}

export function TypingText({
  words,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseBetween = 1200,
  loop = true,
  className,
}: TypingTextProps) {
  const [index, setIndex] = React.useState(0);
  const [display, setDisplay] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (!words || words.length === 0) return;
    const current = words[index % words.length] ?? "";

    let timer: number | undefined;

    const tick = () => {
      setDisplay((prev) => {
        if (!deleting) {
          const next = current.slice(0, prev.length + 1);
          if (next === current) {
            window.clearInterval(timer);
            window.setTimeout(() => setDeleting(true), pauseBetween);
          }
          return next;
        } else {
          const next = current.slice(0, Math.max(0, prev.length - 1));
          if (next.length === 0) {
            window.clearInterval(timer);
            if (loop || index + 1 < words.length) {
              setDeleting(false);
              setIndex((i) => (i + 1) % words.length);
            }
          }
          return next;
        }
      });
    };

    timer = window.setInterval(tick, deleting ? deletingSpeed : typingSpeed);
    return () => window.clearInterval(timer);
  }, [deleting, index, words, typingSpeed, deletingSpeed, pauseBetween, loop]);

  // Reset when words change
  React.useEffect(() => {
    setIndex(0);
    setDisplay("");
    setDeleting(false);
  }, [words]);

  return (
    <span className={cn("inline-flex items-baseline align-baseline", className)}>
      <span className="whitespace-pre">{display}</span>
      <span className="w-[1ch] inline-block text-current animate-caret-blink">|</span>
    </span>
  );
}

export default TypingText;

