import { cn } from "@/lib/cn";
import { formatMoney, inView, type Currency, type Money as MoneyValue } from "@/lib/market";

export function Money({
  value,
  view,
  className,
  empty = "Ask the owner",
  showNote = true,
}: {
  value: MoneyValue | null;
  view: Currency;
  className?: string;
  empty?: string;
  showNote?: boolean;
}) {
  if (!value) return <span className={className}>{empty}</span>;
  const shown = inView(value, view);
  return (
    <>
      <span className={cn("tabular-nums", className)}>{formatMoney(shown.amount, view, shown.approx)}</span>
      {showNote && shown.approx && (
        <span className="mt-1 block font-sans text-sm font-medium tracking-normal text-muted normal-case">
          Listed at {formatMoney(value.amount, value.currency)}
        </span>
      )}
    </>
  );
}
