// From offers-meta-agent.md Section 4: How It Works
// "The 14-Day Penalty Shield Sprint: Your Path To Compliance Confidence"

const steps = [
  {
    day: "Day 1",
    title: "30-Min Kickoff + Access",
    desc: "Quick setup call to grant dashboard access and confirm your AFS/ACL licence scope. We start working immediately.",
  },
  {
    day: "Days 3-7",
    title: "Forensic Analysis (40+ Hours)",
    desc: "Our compliance team does the heavy lifting - cross-referencing your operations against 280+ ASIC regulatory guides while you focus on your business.",
  },
  {
    day: "Day 7",
    title: "Interim Findings Delivered",
    desc: "Receive top 5 compliance gaps identified. This triggers your 2nd payment milestone ($12,500) and proves we're finding real risks.",
  },
  {
    day: "Day 14",
    title: "Board-Ready Report",
    desc: "Complete penalty exposure analysis with risk scoring, ASIC guide citations, and remediation timeline. Ready to present to your board.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-muted/20 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The 14-Day Penalty Shield Sprint
          </h2>
          <p className="text-lg text-muted-foreground">
            Your path to compliance confidence - 2 hours of your time, 14 days total
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.day} className="relative">
              {/* Timeline connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border"
                     style={{ width: 'calc(100% - 2rem)' }} />
              )}

              <div className="rounded-lg border bg-card p-6 relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                  {index + 1}
                </div>
                <div className="text-sm font-semibold text-primary mb-2">{step.day}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upsell mention */}
        <div className="mt-12 text-center p-6 border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            <strong>Day 15+:</strong> Optional upsell to ongoing programs - Tier 2 DWY ($100K/year) or Autopilot System ($5K/month)
          </p>
        </div>
      </div>
    </section>
  );
}
