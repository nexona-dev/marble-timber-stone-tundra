import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ListingCard } from "@/components/listing-card";
import { Shell } from "@/components/site";
import { buttonClass } from "@/components/ui/button";
import {
  BROWSE_USD_PER_GBP,
  CATEGORIES,
  defaultBrowseSearch,
  draftToListing,
  filterListings,
  listings,
  parseBrowseSearch,
  symbol,
  type BrowseSearch,
} from "@/lib/market";
import { usePreview } from "@/lib/preview-state";

export const Route = createFileRoute("/browse")({
  validateSearch: (search): BrowseSearch => parseBrowseSearch(search),
  head: () => ({
    meta: [{ title: "Businesses for sale · SellBizOnline" }],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/browse" });
  const { currency, drafts } = usePreview();
  const [q, setQ] = useState(search.q);
  const mark = symbol(currency);

  useEffect(() => {
    setQ(search.q);
  }, [search.q]);

  const source = useMemo(() => [...drafts.map(draftToListing), ...listings], [drafts]);
  const results = filterListings(source, search, currency);

  function update(partial: Partial<BrowseSearch>) {
    void navigate({ search: { ...search, ...partial }, replace: true });
  }

  return (
    <Shell
      eyebrow="Marketplace"
      title="Businesses for sale"
      lede="Browse businesses, brands and digital assets, then talk to the owner yourself. No broker in the middle."
    >
      <form
        className="grid gap-3 md:grid-cols-12"
        onSubmit={(event) => {
          event.preventDefault();
          update({ q });
        }}
      >
        <label className="md:col-span-4">
          <span className="mb-1.5 block text-sm font-medium">Search</span>
          <input className="field" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Name, place or trade" />
        </label>
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium">Category</span>
          <select className="field" value={search.category} onChange={(event) => update({ category: event.target.value })}>
            <option value="all">All</option>
            {CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium">Country</span>
          <select className="field" value={search.country} onChange={(event) => update({ country: event.target.value })}>
            <option value="all">USA & UK</option>
            <option value="UK">UK</option>
            <option value="USA">USA</option>
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium">Max price</span>
          <select className="field" value={search.max} onChange={(event) => update({ max: event.target.value })}>
            <option value="">Any</option>
            {[50_000, 100_000, 250_000, 500_000].map((amount) => (
              <option key={amount} value={String(amount)}>
                Up to {mark}
                {amount.toLocaleString("en-GB")}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium">Sort</span>
          <select
            className="field"
            value={search.sort}
            onChange={(event) => update({ sort: event.target.value as BrowseSearch["sort"] })}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </label>
      </form>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {results.length} {results.length === 1 ? "business" : "businesses"}
        </p>
        <button type="button" className={buttonClass({ variant: "quiet" })} onClick={() => void navigate({ search: defaultBrowseSearch })}>
          Reset filters
        </button>
      </div>
      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-line bg-surface p-8">
          <h2 className="text-2xl font-bold">Nothing matches those filters</h2>
          <p className="mt-2 text-sm text-muted">
            Widen the price, or clear the search. New businesses are added on the live site regularly.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      )}
      <p className="mt-6 text-sm text-muted">
        Prices in the other currency use £1 = ${BROWSE_USD_PER_GBP} and are marked ≈. The plan itself is £5 / $5, then
        £30 / $30 — those are the real prices, not a conversion.
      </p>
    </Shell>
  );
}
