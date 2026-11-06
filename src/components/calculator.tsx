import { useState } from "react";
import { cn } from "@/lib/cn";
import { BROKER_RATES, PLAN, SALE_STEPS, brokerFee, formatMoney } from "@/lib/market";
import { usePreview } from "@/lib/preview-state";

export function SavingsCalculator() {
  const { currency } = usePreview();
  const [index, setIndex] = useState(SALE_STEPS.indexOf(200_000));
  const [rate, setRate] = useState<(typeof BROKER_RATES)[number]>(10);
  const sale = SALE_STEPS[index] ?? 200_000;
  const broker = brokerFee(sale, rate);
  const saved = broker - PLAN.year;
  const max = Math.max(broker, PLAN.year, 1);

  return (
    <section id="savings" className="rounded-2xl border border-line bg-surface p-5 md:p-6">
      <p className="text-xs font-semibold tracking-widest text-primary uppercase">Savings calculator</p>
      <h2 className="mt-2 text-2xl font-extrabold text-fg">What a broker would keep</h2>
      <p className="mt-2 text-sm text-muted">
        Twelve months here is {formatMoney(PLAN.year, currency)}. The {formatMoney(PLAN.start, currency)} start
        is separate. Move the sale price — the fee does not change with it.
      </p>

      <p className="mt-5 font-display text-4xl font-extrabold text-fg tabular-nums">
        {formatMoney(sale, currency)}
      </p>
      <label className="mt-3 block text-sm text-muted">
        Sale price
        <input
          className="mt-2"
          type="range"
          min={0}
          max={SALE_STEPS.length - 1}
          step={1}
          value={index}
          aria-valuetext={formatMoney(sale, currency)}
          onChange={(event) => setIndex(Number(event.target.value))}
        />
      </label>

      <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Broker rate">
        {BROKER_RATES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={rate === item}
            onClick={() => setRate(item)}
            className={cn(
              "min-h-11 rounded-xl border text-sm font-semibold",
              rate === item
                ? "border-primary bg-primary text-on-primary"
                : "border-line bg-bg text-muted hover:text-fg",
            )}
          >
            {item}%
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <Bar label={`${rate}% broker`} amount={formatMoney(broker, currency)} width={(broker / max) * 100} tone="line" />
        <Bar
          label="SellBizOnline, 12 months"
          amount={formatMoney(PLAN.year, currency)}
          width={Math.max((PLAN.year / max) * 100, 2)}
          tone="primary"
        />
      </div>

      <p
        className={cn(
          "mt-5 font-display text-3xl font-extrabold tabular-nums",
          saved > 0 ? "text-accent" : "text-fg",
        )}
      >
        {saved > 0 ? formatMoney(saved, currency) : formatMoney(broker, currency)}
      </p>
      <p className="mt-1 text-sm text-muted">
        {saved > 0
          ? `more stays with you than a ${rate}% fee. Add ${formatMoney(PLAN.start, currency)} to start, then ${formatMoney(PLAN.month, currency)} a month. Cancel anytime.`
          : `is the broker fee at ${rate}% — less than ${formatMoney(PLAN.year, currency)} for a year here. The flat price is built for ordinary sales, not tiny ones.`}
      </p>
    </section>
  );
}

function Bar({
  label,
  amount,
  width,
  tone,
}: {
  label: string;
  amount: string;
  width: number;
  tone: "line" | "primary";
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-semibold text-fg tabular-nums">{amount}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-raised">
        <div
          className={cn("h-full rounded-full", tone === "primary" ? "bg-primary" : "bg-muted")}
          style={{ width: `${Math.min(100, Math.max(width, 2))}%` }}
        />
      </div>
    </div>
  );
}
