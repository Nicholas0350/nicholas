"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [dockCenter, setDockCenter] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const bottom = window.innerHeight + y >= document.body.scrollHeight - 160; // ~footer threshold
      setVisible(y > 400);
      setDockCenter(bottom);
    };
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
        "fixed bottom-16 md:bottom-24 border border-border shadow-sm transition-opacity transform",
        dockCenter ? "left-1/2 -translate-x-1/2 right-auto" : "right-6",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
