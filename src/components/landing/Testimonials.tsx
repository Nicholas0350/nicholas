const testimonials = [
  {
    quote:
      "Beta clients reduced compliance monitoring time by 80% in first 14 days.",
    author: "Head of Compliance, AFSL",
  },
  {
    quote:
      "We identified $300K in hidden penalty exposure within two weeks.",
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
