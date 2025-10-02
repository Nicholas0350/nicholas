// From offers-meta-agent.md Section 2: Problem Agitation
// "847 Active ASIC Investigations. 300% Spike In Licence Cancellations. Are You Next?"

const painPoints = [
  {
    title: "Manual Monitoring Wastes 10+ Hours/Week",
    desc: "Your compliance team is drowning in ASIC website checks, regulatory guide updates, and enforcement action monitoring. Time that could be spent on strategic work is lost to manual data collection.",
  },
  {
    title: "Miss One Regulatory Change = $3.5M Penalty",
    desc: "ASIC publishes updates across multiple channels. One missed enforcement action, one overlooked regulatory guide change, and your licence is at risk. The average penalty? $3.5M.",
  },
  {
    title: "Board Demands Proof You're Compliant",
    desc: "Executive leadership wants board-ready compliance reports, not scattered spreadsheets. You need professional documentation that proves you're audit-ready, not just hoping you are.",
  },
  {
    title: "Competitors Are Getting Ahead",
    desc: "While you're manually checking ASIC's website, competitors with automated intelligence platforms know about enforcement actions 48 hours before you do. Information asymmetry is a competitive disadvantage.",
  },
  {
    title: "Traditional Audits Take 90+ Days",
    desc: "Big 4 consultancies charge $200K/year and take 3+ months to deliver audit results. When ASIC is investigating, you don't have 90 days to wait for answers.",
  },
];

export default function ProblemAgitation() {
  return (
    <section className="py-16 bg-destructive/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            847 Active ASIC Investigations. 300% Spike In Licence Cancellations. Are You Next?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Australian financial services entities are facing unprecedented regulatory scrutiny. The question isn't if you have compliance gaps - it's how many.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point) => (
            <div key={point.title} className="rounded-lg border border-destructive/20 bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Urgency callout */}
        <div className="mt-12 p-6 border-2 border-destructive/30 rounded-lg bg-destructive/10 text-center">
          <p className="text-lg font-semibold">
            ASIC's Q4 enforcement pattern shows a 300% spike in licence cancellations. The entities who act now avoid becoming the next case study.
          </p>
        </div>
      </div>
    </section>
  );
}
