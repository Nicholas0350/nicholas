export default function Urgency() {
  return (
    <section className="py-16 bg-[--color-muted]/20">
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">Scarcity + Urgency</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Only 12 Spots Available This Quarter</li>
          <li>Prices Increase 50% On April 1st</li>
        </ul>
        <div className="text-sm text-[--color-muted-foreground]">Countdown timer to March 31st deadline • Seats remaining counter (placeholder)</div>
      </div>
    </section>
  );
}

