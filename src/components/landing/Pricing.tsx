"use client";

import { Check, Star } from "lucide-react";
import PricingQnA from "@/components/ui/pricing-qna";

// TODO: Import from generated offer data when ready
// import offerData from '@/,Project/offers/asic-compliance-sprint/filled-offers-data.json'

type PricingTier = {
  name: string;
  price: string;
  priceAnchor?: string;
  period?: string;
  positioningAngle: string;
  description: string;
  capacityNote?: string;
  features: string[];
  bullets: string[];
  cta: string;
  href: string;
  isPopular: boolean;
  guarantee: {
    headline: string;
    terms: string;
  };
};

const pricingTiers: PricingTier[] = [
  {
    name: "Autopilot System",
    price: "$5,000",
    period: "/month",
    priceAnchor: "$17,000/month",
    positioningAngle: "EFFORTLESS",
    description: "Zero hours after setup - 100% automated monitoring",
    capacityNote: "Capacity: 20 clients",
    features: [
      "Real-time ASIC monitoring (60-second alerts)",
      "AI Compliance Copilot",
      "Automatic board report generation",
      "Unlimited alert channels (SMS, Slack, Teams)",
      "84,000+ entity database access",
      "30-minute setup, 10 min/month maintenance",
    ],
    bullets: [
      "$5K/month (vs $17K/month Tier 1 annual)",
      "100% Done-For-You - zero hours after setup",
      "Time-back guarantee: Free month if you spend >30 min/month",
      "Limited to 20 autopilot clients (infrastructure capacity)",
      "$30K/year in automation tools included",
    ],
    cta: "Start Autopilot",
    href: "#contact",
    isPopular: false,
    guarantee: {
      headline: "Time-Back Guarantee",
      terms: "If you spend more than 30 minutes per month on ASIC monitoring after setup, we'll give you the next month free OR automate an additional workflow at no cost.",
    },
  },
  {
    name: "14-Day Sprint",
    price: "$25,000",
    period: "one-time",
    priceAnchor: "$200,000/year",
    positioningAngle: "SPEED",
    description: "Audit-ready compliance in 14 days (not 90+ days)",
    capacityNote: "Capacity: 12 spots",
    features: [
      "Board-ready compliance report (Day 14)",
      "3+ penalty exposure gaps guaranteed",
      "Real-Time ASIC Alert System ($15K value)",
      "84,000-Entity Penalty Database ($25K value)",
      "Board Report Template ($5K value)",
      "Only 2 hours of your time total",
    ],
    bullets: [
      "$25K one-time (vs $200K/year competitors)",
      "90% Done-For-You - 2 hours total investment",
      "Service guarantee: 3 months free + 90 days dedicated officer",
      "Limited to 12 entities per quarter (analyst capacity)",
      "$45K in crisis prevention tools included",
    ],
    cta: "Book Sprint",
    href: "#contact",
    isPopular: true, // HIGHLIGHTED - Middle tier (Hormozi best practice)
    guarantee: {
      headline: "3+ Gaps Guaranteed",
      terms: "If we don't deliver a board-ready report identifying 3+ penalty exposure risks by Day 14, we'll work with you for 3 additional months at no cost. Still not satisfied? We assign a dedicated compliance officer for 90 days free.",
    },
  },
  {
    name: "Forensic Audit",
    price: "$35,000",
    period: "one-time",
    priceAnchor: "$200,000/year",
    positioningAngle: "CERTAINTY",
    description: "Find every gap or we cover remediation",
    capacityNote: "Capacity: 8 audits",
    features: [
      "Comprehensive 21-day forensic audit",
      "Cross-referenced against 280+ ASIC Regulatory Guides",
      "Remediation coverage guarantee",
      "12-month regulatory change tracker ($12K value)",
      "Personalized compliance roadmap ($8K value)",
      "Only 3 hours of your time total",
    ],
    bullets: [
      "$35K one-time (vs $200K/year Big 4)",
      "95% Done-For-You - 3 hours total investment",
      "Anti-guarantee: We cover remediation if we miss a gap",
      "Limited to 8 audits per quarter (forensic hours)",
      "$70K in certainty tools included",
    ],
    cta: "Get Certainty",
    href: "#contact",
    isPopular: false,
    guarantee: {
      headline: "Zero-Miss Guarantee",
      terms: "If ASIC or an external auditor finds a compliance gap within 12 months that we didn't identify, we'll cover remediation costs PLUS give you 12 months of premium monitoring free.",
    },
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Choose Your ASIC Compliance Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three proven approaches to eliminate penalty exposure.
            <br />
            All plans include access to Australia's only automated ASIC data intelligence platform.
          </p>
          {/* Q&A input (progressive enhancement) */}
          <div className="mt-6">
            <PricingQnA />
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-lg border p-8 flex flex-col ${
                tier.isPopular
                  ? "border-primary shadow-lg ring-2 ring-primary scale-105"
                  : "border-border"
              }`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-sm text-primary font-semibold mb-3">
                  {tier.positioningAngle}
                </div>
                {tier.capacityNote && (
                  <div className="mb-3 inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    {tier.capacityNote}
                  </div>
                )}
                <p className="text-sm text-muted-foreground mb-4">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-1">
                  {tier.priceAnchor && (
                    <span className="text-lg text-muted-foreground line-through">
                      {tier.priceAnchor}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>
              </div>

              {/* Hormozi Bullets */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <div className="text-xs font-semibold text-muted-foreground mb-2">
                  OFFER DETAILS:
                </div>
                <ul className="space-y-2 text-sm">
                  {tier.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="mb-6 flex-1">
                <div className="text-sm font-semibold mb-3">What's included:</div>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantee */}
              <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="text-sm font-semibold text-primary mb-1">
                  {tier.guarantee.headline}
                </div>
                <p className="text-xs text-muted-foreground">
                  {tier.guarantee.terms}
                </p>
              </div>

              {/* CTA */}
              <a
                href={tier.href}
                className={`w-full inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition-colors ${
                  tier.isPopular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Trust Footer (Value-Based Proof - NO unvalidated stats) */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Monitoring <span className="font-semibold">84,000+ ASIC-regulated entities</span> •{" "}
            Tracking <span className="font-semibold">847 active investigations</span> •{" "}
            Only automated ASIC data intelligence platform in Australia
          </p>
        </div>
      </div>
    </section>
  );
}
