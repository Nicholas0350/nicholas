export default function Navbar() {
  const links = [
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b bg-[--color-background]/80">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#" className="font-semibold">Nicholas Gousis</a>
        <div className="hidden sm:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:underline underline-offset-4">
              {l.label}
            </a>
          ))}
        </div>
        <a href="#cta" className="inline-flex items-center justify-center rounded-md bg-[--color-foreground] text-[--color-background] px-3 py-1.5 text-sm font-medium">
          CTA
        </a>
      </div>
    </nav>
  );
}
