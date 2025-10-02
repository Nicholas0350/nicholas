// From offers-meta-agent.md Section 10: Final CTA
// "Claim Your 14-Day Penalty Shield Before March 31st"

export default function FinalCTA() {
  return (
    <section id="cta" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-bold">
          Claim Your 14-Day Penalty Shield Before March 31st
        </h2>
        <p className="text-xl opacity-90">
          4 of 12 sprint spots remaining. Q2 enforcement window closes soon.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-md bg-background text-foreground px-8 py-4 font-semibold text-lg hover:bg-background/90 transition-colors"
          >
            Book Setup Call Now (4 Spots Left)
          </a>
          <a
            href="#calculator"
            className="inline-flex items-center justify-center rounded-md border-2 border-primary-foreground/20 px-8 py-4 font-semibold text-lg hover:bg-primary-foreground/10 transition-colors"
          >
            Calculate Your Penalty Risk (Free Tool)
          </a>
        </div>

        {/* Trust badges */}
        <div className="pt-8 text-sm opacity-75 space-y-2">
          <p>✓ No Refunds - Service Guarantees Only</p>
          <p>✓ 50% Upfront, 50% On Proof (Day 7 Deliverables)</p>
          <p>✓ Cancel Anytime After Month 3 (Autopilot Only)</p>
        </div>
      </div>
    </section>
  );
}
