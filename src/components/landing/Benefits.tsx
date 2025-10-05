// From offers-meta-agent.md Section 3: Solution Overview
// "From ASIC Fear To Board Hero In 14 Days"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error JSON import
import offerData from "../../../,Project/offers/asic-compliance-sprint/filled-offers-data.json";

type Benefit = { title: string; desc: string };

const staticBenefits: Benefit[] = [
  {
    title: "60-Second Real-Time Alerts",
    desc: "Get SMS/email alerts the moment ASIC publishes enforcement actions. Your competitors find out 48 hours later.",
  },
  {
    title: "84,000-Entity Intelligence",
    desc: "See which competitors have compliance issues before they're public. Only automated ASIC data monopoly in Australia.",
  },
  {
    title: "Board-Ready Reports",
    desc: "Copy-paste compliance summaries that make you look like a hero to your board. No consulting jargon.",
  },
  {
    title: "90% Done-For-You",
    desc: "You invest 2 hours total. We invest 40+ analyst hours. You get complete peace of mind.",
  },
  {
    title: "14-Day Audit Sprint",
    desc: "Board-ready penalty exposure report in 14 days. Not 90+ days like traditional audits.",
  },
  {
    title: "Service Guarantee",
    desc: "If we don't find 3+ gaps worth $100K+, we work free for 6 months. No refunds - just results.",
  },
];

const benefitsFromJson: Benefit[] | null = Array.isArray((offerData as any)?.offers)
  ? ((offerData as any).offers[0]?.bonusStack || [])
      .filter((b: any) => b?.name && b?.benefit)
      .map((b: any) => ({ title: String(b.name), desc: String(b.benefit) }))
  : null;

export default function Benefits() {
  const benefits = benefitsFromJson && benefitsFromJson.length > 0 ? benefitsFromJson : staticBenefits;
  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            From ASIC Fear To Board Hero In 14 Days
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Australia's only automated ASIC intelligence platform. 84,000+ entities monitored, 60-second alerts, zero manual work.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
