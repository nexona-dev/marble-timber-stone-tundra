import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 min-h-11",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-strong font-display font-bold",
        surface: "border border-line bg-surface text-fg hover:bg-surface-2",
        quiet: "bg-transparent px-3 text-muted hover:text-fg",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function buttonClass({
  variant,
  className,
}: {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
} = {}) {
  return cn(buttonVariants({ variant }), className);
}
