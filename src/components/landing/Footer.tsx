export default function Footer() {
  return (
    <footer className="border-t py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-2">Nicholas Gousis</div>
          <p className="text-[--color-muted-foreground]">Compliance intelligence for ASIC-regulated entities.</p>
        </div>
        <div>
          <div className="font-medium mb-2">Menu</div>
          <ul className="space-y-1 text-[--color-muted-foreground]">
            <li><a href="#services">Services</a></li>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Legal</div>
          <ul className="space-y-1 text-[--color-muted-foreground]">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Newsletter</div>
          <div className="flex gap-2">
            <input className="flex-1 border rounded-md px-3 py-2 bg-transparent" placeholder="Email" />
            <button className={buttonClasses({ size: "sm" })}>Join</button>
          </div>
        </div>
      </div>
      <div className="text-xs text-[--color-muted-foreground] text-center mt-6">© {new Date().getFullYear()} Nicholas gousis</div>
    </footer>
  );
}
import { buttonClasses } from "@/components/ui/button";
