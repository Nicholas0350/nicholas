export default function Partners() {
  return (
    <section id="services" className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-xs text-[--color-muted-foreground] mb-3">Trusted by compliance teams at</p>
        <div className="flex flex-wrap gap-3 text-[10px] text-[--color-muted-foreground]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-16 rounded-md border grid place-items-center bg-[--color-muted]/10"
            >
              Logo
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

