// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error JSON import
import offerData from "../../../,Project/offers/asic-compliance-sprint/filled-offers-data.json";

type Testimonial = { quote: string; author: string };

const offer0: any | undefined = Array.isArray((offerData as any)?.offers)
  ? (offerData as any).offers[0]
  : undefined;

const fromSnippets: Testimonial[] = Array.isArray(offer0?.socialProofSnippets)
  ? (offer0.socialProofSnippets as string[]).slice(0, 3).map((q) => ({ quote: q, author: "AFSL/ACL client" }))
  : [];

const socialSection: any | undefined = Array.isArray(offer0?.sections)
  ? offer0.sections.find((s: any) => s?.id === "section-7-social-proof")
  : undefined;
const fromCases: Testimonial[] = Array.isArray(socialSection?.caseStudies)
  ? (socialSection.caseStudies as any[]).map((c) => ({ quote: c?.result || "", author: c?.title || "Case Study" })).slice(0, 3)
  : [];

const testimonials: Testimonial[] = (fromSnippets.length ? fromSnippets : fromCases).length
  ? (fromSnippets.length ? fromSnippets : fromCases)
  : [
      {
        quote: "Beta clients reduced compliance monitoring time by 80% in first 14 days.",
        author: "Head of Compliance, AFSL",
      },
      {
        quote: "We identified $300K in hidden penalty exposure within two weeks.",
        author: "CFO, $50M AFS Licensee",
      },
      {
        quote: "Only automated ASIC data monopoly in Australia.",
        author: "General Counsel, FinServ",
      },
    ];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-[--color-muted]/20 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <blockquote key={idx} className="rounded-lg border p-4 text-sm">
              <p>“{t.quote}”</p>
              <footer className="mt-3 text-[--color-muted-foreground]">— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
