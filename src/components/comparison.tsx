import { formatMoney, PLAN, symbol } from "@/lib/market";
import { usePreview } from "@/lib/preview-state";

export function Comparison() {
  const { currency } = usePreview();
  const mark = symbol(currency);
  const rows = [
    ["Cost to sell", `Flat ${mark}30 a month`, "Typically 5–15% of the sale price"],
    ["Commission", "0%", "Often thousands in fees"],
    ["Upfront cost", `${mark}5 to start`, "Often retainers or listing fees"],
    ["Who you deal with", "Buyers, directly", "A go-between"],
    ["Commitment", "Cancel anytime", "Often a fixed-term agreement"],
  ];

  return (
    <div>
      <div className="grid gap-4 md:hidden">
        <CompareCard title="SellBizOnline" emphasis rows={rows.map(([label, ours]) => [label, ours])} />
        <CompareCard title="Traditional brokers" rows={rows.map(([label, , theirs]) => [label, theirs])} />
      </div>
      <div className="hidden overflow-hidden rounded-2xl border border-line md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-4 font-medium text-muted" scope="col">
                <span className="sr-only">Item</span>
              </th>
              <th className="px-4 py-4 font-display text-base font-bold text-primary" scope="col">
                SellBizOnline
              </th>
              <th className="px-4 py-4 font-display text-base font-bold text-fg" scope="col">
                Traditional brokers
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, ours, theirs]) => (
              <tr key={label} className="border-t border-line">
                <th className="bg-raised px-4 py-4 font-medium text-muted" scope="row">
                  {label}
                </th>
                <td className="bg-surface px-4 py-4 font-semibold text-fg">{ours}</td>
                <td className="bg-bg px-4 py-4 text-muted">{theirs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">
        Selling for {formatMoney(200_000, currency)}? A broker at 10% keeps {formatMoney(20_000, currency)}. A
        year here is {formatMoney(PLAN.year, currency)}. Try another price in the{" "}
        <a href="#savings" className="font-semibold text-primary">
          calculator
        </a>
        .
      </p>
    </div>
  );
}

function CompareCard({
  title,
  rows,
  emphasis = false,
}: {
  title: string;
  rows: string[][];
  emphasis?: boolean;
}) {
  return (
    <article className={`rounded-2xl border p-5 ${emphasis ? "border-primary/50 bg-surface" : "border-line bg-surface"}`}>
      <h3 className={`text-lg font-bold ${emphasis ? "text-primary" : "text-fg"}`}>{title}</h3>
      <dl className="mt-4 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold tracking-widest text-muted uppercase">{label}</dt>
            <dd className="mt-1 text-sm font-semibold text-fg">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
