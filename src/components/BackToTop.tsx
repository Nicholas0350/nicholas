"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible((window.scrollY || 0) > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={onClick}
      className={cn(
        buttonClasses({ variant: "secondary", size: "icon" }),
        "fixed right-6 bottom-16 md:bottom-24 border border-border shadow-sm transition-opacity",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <ChevronUp className="h-4 w-4" />
    </button>
  );
}
