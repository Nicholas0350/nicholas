import type { Config } from "tailwindcss";
import design from "./design.json" assert { type: "json" };

// Map keys from design.json to Tailwind v4 theme tokens.
// Note: Tailwind v4 primarily uses @import and @theme inline, but this
// config is kept so tools like shadcn know where to look and for
// potential future extensions. Values mirror CSS variables.

const cfg = {
  darkMode: ["class"],
  theme: {
    extend: {
      // Fonts
      fontFamily: design.fontFamily ?? {},
      // Colors map to hsl(var(--token)) entries from design.json
      colors: design.colors ?? {},
      // Radii
      borderRadius: design.borderRadius ?? {},
      // Animations
      keyframes: design.keyframes ?? {},
      animation: design.animation ?? {},
      // Screens (if any)
      screens: design.screens ?? {},
    },
  },
} satisfies Config;

export default cfg;

