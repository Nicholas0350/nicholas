// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error JSON import
import offerData from "../../../,Project/offers/asic-compliance-sprint/filled-offers-data.json";

export default function Proof() {
  const offer0: any | undefined = Array.isArray((offerData as any)?.offers)
    ? (offerData as any).offers[0]
    : undefined;
  const socialSection: any | undefined = Array.isArray(offer0?.sections)
    ? offer0.sections.find((s: any) => s?.id === "section-7-social-proof")
    : undefined;
  const metrics: string[] = Array.isArray(socialSection?.metrics)
    ? socialSection.metrics
    : [
        "84,000 entities | 847 investigations | 60-second alerts | 300% Q4 spike",
        "Only automated ASIC data monopoly in Australia",
        "Fortnightly data sync",
        "Zero manual entry",
        "Complete RG001-RG280 library",
      ];
  const headline: string = socialSection?.headline || "Proof / Data Monopoly";
  return (
    <section className="py-16 bg-[--color-muted]/20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{headline}</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {metrics.map((m, idx) => (
            <li key={idx} className="rounded-md border p-4">
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
