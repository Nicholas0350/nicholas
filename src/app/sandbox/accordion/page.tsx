import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const items = [
  {
    q: "Is this the default shadcn setup?",
    a: "Yes. This page renders the accordion with minimal classes to compare behavior without surrounding styles.",
  },
  {
    q: "What affects smoothness?",
    a: "Two common culprits: mixing transition-height with keyframe height animations, and heavy layout styles around the accordion. We rely solely on keyframes and set will-change: height on content.",
  },
  {
    q: "Does padding cause jumpiness?",
    a: "Padding should live inside the inner wrapper. The accordion content animates height; inner padding is measured consistently.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Accordion Sandbox</h1>

      <section className="space-y-6">
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-2">Minimal (no extra borders/space)</h2>
          <Accordion type="single" collapsible defaultValue="a-0">
            {items.map((it, i) => (
              <AccordionItem key={i} value={`a-${i}`}>
                <AccordionTrigger className="py-4">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-2">With padding (like FAQ)</h2>
          <Accordion type="single" collapsible defaultValue="b-0">
            {items.map((it, i) => (
              <AccordionItem key={`b-${i}`} value={`b-${i}`}>
                <AccordionTrigger className="py-6 px-6 text-left font-semibold">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 px-6 text-muted-foreground leading-relaxed">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}

