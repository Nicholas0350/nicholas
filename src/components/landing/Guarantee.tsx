// From offers-meta-agent.md Section 6: Guarantee (Risk Reversal)
// "If We Don't Find 3 Gaps Worth $100K+ By Day 14, We Work For 6 Months Free"

const guarantees = [
  {
    title: "Primary Guarantee",
    headline: "3+ Gaps or 3 Months Free",
    desc: "If we don't deliver a board-ready compliance report identifying 3+ penalty exposure risks by Day 14, we'll work with you for 3 additional months at no cost until you're 100% confident.",
  },
  {
    title: "Secondary Guarantee",
    headline: "Still Not Satisfied? 90 Days Free Support",
    desc: "If after 3 months of free work you're still not satisfied, we'll assign a dedicated compliance officer to work with you for 90 days at no cost. That's 6 months of total support to make you successful.",
  },
  {
    title: "Tool Access Guarantee",
    headline: "Keep Everything We Build",
    desc: "Dashboard access, alert system, penalty database, board report templates - if we don't find significant risks, you keep all tools + 6 months premium access at no additional cost.",
  },
];

export default function Guarantee() {
  return (
    <section id="guarantee" className="py-16 bg-primary/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            If We Don't Find 3 Gaps Worth $100K+ By Day 14, We Work For 6 Months Free
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're so confident in our forensic audit process that we'll work for free until you're successful. No refunds - just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {guarantees.map((guarantee, index) => (
            <div key={guarantee.title} className="relative rounded-lg border-2 border-primary/20 bg-card p-6 space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                {index + 1}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{guarantee.title}</p>
                <h3 className="font-semibold text-lg mb-3">{guarantee.headline}</h3>
                <p className="text-sm text-muted-foreground">{guarantee.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="text-center p-8 border rounded-lg bg-muted/50">
          <p className="text-2xl font-bold mb-2">100% Success Rate Finding Compliance Gaps</p>
          <p className="text-sm text-muted-foreground">
            In our forensic compliance audits, we've never had a client for whom we couldn't identify significant penalty exposure risks. The average entity has 7 compliance gaps worth $180K in potential ASIC penalties.
          </p>
        </div>

        {/* No refunds callout */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Important:</strong> We don't offer cash refunds. Our service guarantees ensure you get value through extended support, dedicated resources, and tool access - not money back. We're committed to making you successful, not taking your money and running.
          </p>
        </div>
      </div>
    </section>
  );
}
