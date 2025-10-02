// From offers-meta-agent.md Section 8: FAQ (Objection Handling)

const faqs = [
  {
    q: "Why only 12 spots?",
    a: "Our forensic audit process requires dedicated analyst attention. We cross-reference your operations against 280+ ASIC regulatory guides - that level of quality can't be scaled past 12 entities per quarter without sacrificing the deep analysis that finds hidden risks.",
  },
  {
    q: "What if you don't find anything?",
    a: "You keep everything (dashboard access, bonuses, tools) + we work with you for 6 months at no cost. However, we've never had this happen - the average entity has 7 compliance gaps worth $180K in penalty exposure.",
  },
  {
    q: "How is this different from Big 4 audits?",
    a: "14 days vs 90+ days. $25K vs $200K/year. Real-time ASIC data sync vs manual monitoring. Board-ready reports vs consulting jargon. And if we miss something, we work free - Big 4 firms charge you to fix their mistakes.",
  },
  {
    q: "What happens after Day 14?",
    a: "You get your complete penalty exposure report. Then you can choose to continue with our ongoing programs: Tier 2 DWY ($100K/year) for hands-on support, or Autopilot System ($5K/month) for set-and-forget monitoring. No pressure - the sprint stands alone.",
  },
  {
    q: "Do you offer refunds?",
    a: "No refunds - but service guarantees ensure you get value. If we don't find 3+ gaps by Day 14, we work with you for 3 additional months free. Still not satisfied? We assign a dedicated compliance officer for 90 days at no cost. That's 6 months of total support to make you successful.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Address common objections before you book
          </p>
        </div>
        <dl className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-6 bg-card">
              <dt className="font-semibold text-lg mb-2">{faq.q}</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
