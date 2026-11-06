import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ListingCard } from "@/components/listing-card";
import { Shell } from "@/components/site";
import { buttonClass } from "@/components/ui/button";
import { CATEGORIES, PLAN, draftToListing, formatMoney, symbol, type CategoryId, type Country } from "@/lib/market";
import { usePreview } from "@/lib/preview-state";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [{ title: "List your business · SellBizOnline" }],
  }),
  component: SellPage,
});

function SellPage() {
  const { currency, addDraft } = usePreview();
  const navigate = useNavigate();
  const mark = symbol(currency);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<CategoryId>("food");
  const [country, setCountry] = useState<Country>(currency === "usd" ? "USA" : "UK");
  const [location, setLocation] = useState("");
  const [asking, setAsking] = useState("80000");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const amount = Number(asking);
  const preview = draftToListing({
    id: "preview",
    name: name.trim() || "Your business",
    category,
    location: location.trim() || "Location",
    country,
    asking: Number.isFinite(amount) && amount > 0 ? amount : 0,
    currency,
    summary: summary.trim() || "A short description buyers can read before they message you.",
    createdAt: "",
  });

  return (
    <Shell
      eyebrow="For sellers"
      title={`List for ${mark}${PLAN.start}. Then ${mark}${PLAN.month} a month.`}
      lede="Keep 100% of the sale. Buyers contact you directly. Cancel anytime. No commission, ever."
    >
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {[
              [`${mark}${PLAN.start}`, "To start"],
              [`${mark}${PLAN.month}`, "Each month, while the listing is up"],
              ["0%", "Taken from the sale price"],
            ].map(([k, v]) => (
              <li key={v} className="bg-surface px-5 py-5">
                <p className="font-display text-4xl font-extrabold text-fg tabular-nums">{k}</p>
                <p className="mt-1 text-sm text-muted">{v}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li>Your listing stays up while the plan is active.</li>
            <li>Buyers message you from the listing. There is no broker in the thread.</li>
            <li>You agree the price. We do not take a cut.</li>
            <li>Cancel anytime. A year of the plan is {formatMoney(PLAN.year, currency)}, before the {formatMoney(PLAN.start, currency)} start.</li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            This page does not take payment. On the live site the {mark}
            {PLAN.start} start continues to checkout. Staging checkout stays off until you approve the look.
          </p>
        </div>

        <div className="lg:col-span-7">
          <form
            className="rounded-2xl border border-line bg-surface p-5 md:p-6"
            onSubmit={(event) => {
              event.preventDefault();
              if (name.trim().length < 2) {
                setError("Add the business name.");
                return;
              }
              if (location.trim().length < 2) {
                setError("Add a town or city.");
                return;
              }
              if (!Number.isFinite(amount) || amount <= 0) {
                setError("Add an asking price, or leave it as a round number buyers can read.");
                return;
              }
              if (summary.trim().length < 20) {
                setError("Write at least a sentence buyers can skim.");
                return;
              }
              setError("");
              const id = addDraft({
                name: name.trim(),
                category,
                location: location.trim(),
                country,
                asking: Math.round(amount),
                currency,
                summary: summary.trim(),
              });
              void navigate({ to: "/listing/$slug", params: { slug: `draft-${id}` } });
            }}
          >
            <h2 className="text-2xl font-extrabold">Preview a listing</h2>
            <p className="mt-2 text-sm text-muted">
              Same fields a seller fills in. Saving it only updates this preview — Directorist, WooCommerce and checkout
              are untouched.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm md:col-span-2">
                Business name
                <input className="field mt-1.5" value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <label className="text-sm">
                Category
                <select className="field mt-1.5" value={category} onChange={(event) => setCategory(event.target.value as CategoryId)}>
                  {CATEGORIES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Country
                <select className="field mt-1.5" value={country} onChange={(event) => setCountry(event.target.value as Country)}>
                  <option value="UK">United Kingdom</option>
                  <option value="USA">United States</option>
                </select>
              </label>
              <label className="text-sm">
                Location
                <input className="field mt-1.5" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Town or city" />
              </label>
              <label className="text-sm">
                Asking price ({mark})
                <input className="field mt-1.5" inputMode="decimal" value={asking} onChange={(event) => setAsking(event.target.value)} />
              </label>
              <label className="text-sm md:col-span-2">
                Summary
                <textarea className="field mt-1.5" value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="What is for sale, and what a buyer should know first." />
              </label>
            </div>
            {error && (
              <p className="mt-3 text-sm font-medium" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className={buttonClass({ className: "mt-4" })}>
              Save draft and view it
            </button>
          </form>
          <div className="mt-5 max-w-md">
            <ListingCard listing={{ ...preview, asking: Number.isFinite(amount) && amount > 0 ? preview.asking : null }} linked={false} />
          </div>
        </div>
      </div>
    </Shell>
  );
}
