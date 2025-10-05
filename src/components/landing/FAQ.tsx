// From offers-meta-agent.md Section 8: FAQ (Objection Handling)
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error JSON import
import offerData from "../../../,Project/offers/asic-compliance-sprint/filled-offers-data.json";

type FAQItem = { q: string; a: string };

const staticFaqs: FAQItem[] = [
  {
    q: "Why only 12 spots?",
    a: "Our forensic audit process requires dedicated analyst attention. We cross-reference your operations against 280+ ASIC regulatory guides—this level of quality doesn’t scale beyond 12 entities per quarter without sacrificing the deep analysis that finds hidden risks.",
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

const offer0: any | undefined = Array.isArray((offerData as any)?.offers)
  ? (offerData as any).offers[0]
  : undefined;

const faqsFromJson: FAQItem[] = (() => {
  if (!offer0) return [];
  const arr: FAQItem[] = [];
  const cap = offer0?.scarcity?.capacity as number | undefined;
  if (cap) {
    arr.push({
      q: `Why only ${cap} spots?`,
      a: offer0?.scarcity?.copy ||
        `We limit capacity to ${cap} entities per quarter to maintain quality forensic analysis without compromise.`,
    });
  }
  const g = offer0?.guarantee;
  if (g?.headline || g?.terms) {
    arr.push({
      q: "What happens if you don't find anything?",
      a: g?.terms || "We extend service/time until you're successful. No cash refunds; we put in the work.",
    });
  }
  const terms = offer0?.price?.terms as string | undefined;
  if (terms) {
    arr.push({ q: "How do payments work?", a: terms });
  }
  return arr;
})();

export default function FAQ() {
  const faqs = faqsFromJson.length ? faqsFromJson : staticFaqs;
  return (
    <section id="faq" className="py-16 bg-muted/20 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Address common objections before you book
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 px-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-6 px-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
