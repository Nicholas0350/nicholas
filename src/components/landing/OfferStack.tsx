export default function OfferStack() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Offer Stack</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Speed</h3>
            <p className="text-sm">14-Day ASIC Penalty Shield Sprint. Find 3 gaps or pay nothing.</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Certainty</h3>
            <p className="text-sm">Zero-Surprise ASIC Compliance Guarantee. DWY with continuity.</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Effortless</h3>
            <p className="text-sm">Set-and-Forget ASIC Compliance System. DFY automation.</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-[--color-muted-foreground]">Bonus stack reveal with strikethrough pricing • Guarantee: "Find 3 gaps or pay nothing"</div>
      </div>
    </section>
  );
}

