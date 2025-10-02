export default function LovedBy() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Loved by people worldwide</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="text-yellow-500">★★★★★</div>
              <p className="text-sm text-[--color-muted-foreground] mt-2">Short love note placeholder.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

