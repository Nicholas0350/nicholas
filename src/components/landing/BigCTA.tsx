import { buttonClasses } from "@/components/ui/button";

export default function BigCTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-xl border p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-3">Ready to eliminate compliance blind spots?</h3>
          <p className="text-sm text-[--color-muted-foreground]">
            Claim your 14-Day ASIC Penalty Shield Sprint. Find 3+ gaps worth $100K+ in penalty exposure or pay nothing.
          </p>
          <div className="pt-6 flex items-center justify-center gap-3">
            <a href="#cta" className={buttonClasses({ variant: "default", size: "lg" })}>Get Started</a>
            <a href="#pricing" className={buttonClasses({ variant: "outline", size: "lg" })}>View Pricing</a>
          </div>
        </div>
      </div>
    </section>
  );
}
