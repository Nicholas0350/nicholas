import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "outline" | "ghost";
type Size = "default" | "sm" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 disabled:pointer-events-none";

const variantMap: Record<Variant, string> = {
  default: "bg-foreground text-background hover:bg-foreground/90",
  secondary: "bg-muted text-foreground hover:bg-muted/70",
  outline: "border border-border text-foreground hover:bg-muted/50",
  ghost: "bg-transparent text-foreground hover:bg-muted/50",
};

const sizeMap: Record<Size, string> = {
  default: "h-9 px-4 text-sm",
  sm: "h-8 px-3 text-sm",
  lg: "h-10 px-5 text-base",
  icon: "h-9 w-9",
};

export function buttonClasses(
  opts?: { variant?: Variant; size?: Size; className?: string }
) {
  const variant = opts?.variant ?? "default";
  const size = opts?.size ?? "default";
  return cn(base, variantMap[variant], sizeMap[size], opts?.className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonClasses({ variant, size, className })}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
