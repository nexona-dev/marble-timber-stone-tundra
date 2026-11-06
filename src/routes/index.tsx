import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ListingCard } from "@/components/listing-card";
import { SavingsCalculator } from "@/components/calculator";
import { Comparison } from "@/components/comparison";
import { Page } from "@/components/site";
import { buttonClass } from "@/components/ui/button";
import {
  CATEGORIES,
  PLAN,
  QUESTIONS,
  defaultBrowseSearch,
  formatMoney,
  listings,
  symbol,
} from "@/lib/market";
import { usePreview } from "@/lib/preview-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SellBizOnline — List for £5. Keep 100% of the sale." },
      {
        name: "description",
        content:
          "Buy and sell a business direct. £5 / $5 to start, then £30 / $30 a month. 0% commission. Cancel anytime.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { currency } = usePreview();
  const mark = symbol(currency);
  const featured = listings.filter((listing) => listing.featured);

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">USA · UK · Worldwide</p>
            <h1 className="mt-3 text-4xl font-extrabold text-fg sm:text-5xl">
              List your business for {mark}5. Keep 100% of the sale.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted">
              Reach buyers in the USA, UK and worldwide. Start with £5 / $5, then £30 / $30 a month. We never take
              commission when you sell. Buyers contact you directly. Cancel anytime.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/sell" className={buttonClass()}>
                List my business for {mark}5
              </Link>
              <Link to="/browse" search={defaultBrowseSearch} className={buttonClass({ variant: "surface" })}>
                Browse businesses
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <SavingsCalculator />
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {[
            { k: "0%", v: "Commission when you sell", emphasis: true },
            { k: `${mark}5`, v: "To start", emphasis: false },
            { k: `${mark}30`, v: "Then each month", emphasis: false },
            { k: "Direct", v: "You deal with the owner", emphasis: false },
          ].map((item) => (
            <li key={item.v} className="bg-surface px-4 py-5">
              <p className={`font-display text-3xl font-extrabold tabular-nums ${item.emphasis ? "text-primary" : "text-fg"}`}>
                {item.k}
              </p>
              <p className="mt-1 text-sm text-muted">{item.v}</p>
            </li>
          ))}
        </ul>

        <HomeSearch />

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-fg">Businesses of the week</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Three businesses taken from the public marketplace. The other cards are examples, so the layout can be
                judged before anything goes live.
              </p>
            </div>
            <Link to="/browse" search={defaultBrowseSearch} className="hidden text-sm font-semibold text-primary sm:inline">
              See all
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {featured.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>

        <section id="how" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-extrabold text-fg">Buy a business in three steps</h2>
          <p className="mt-2 max-w-2xl text-muted">Find it, ask the right questions, and agree the deal with the owner.</p>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Search and shortlist", "Use the search and filters to find businesses that fit your budget and interests. Open a listing to see the details."],
              ["02", "Contact the owner", "Send a message and ask for what you need: accounts, traffic, customers, reasons for selling."],
              ["03", "Agree the deal", "Negotiate directly. We never take a cut, so the price you agree is the price you pay the seller."],
            ].map(([n, title, body]) => (
              <li key={n} className="rounded-2xl border border-line bg-surface p-5">
                <p className="font-display text-sm font-bold text-primary">{n}</p>
                <h3 className="mt-3 text-xl font-bold text-fg">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-extrabold text-fg">Looking to buy a business? Start here.</h2>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {[
              ["Deal direct", "Message sellers straight from the listing and get first-hand answers."],
              ["Every kind of business", "Online, e-commerce, shops, restaurants, tech, digital assets and property."],
              ["Search your way", "Filter by category, location, asking price, revenue and profit."],
              ["Fresh listings", "New businesses are added regularly, so check back often."],
            ].map(([title, body]) => (
              <article key={title} className="bg-surface p-5">
                <h3 className="text-lg font-bold text-fg">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="max-w-3xl text-3xl font-extrabold text-fg md:text-4xl">
            Why pay a broker 5–15% when you don’t have to?
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Traditional brokers take a share of your sale price. We charge one flat monthly rate —{" "}
            {formatMoney(PLAN.month, currency)} — and nothing when the business sells.
          </p>
          <div className="mt-6">
            <Comparison />
          </div>
        </section>

        <section id="questions" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-extrabold text-fg">Questions worth asking any seller</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Buying directly means you lead the conversation. These help you decide with confidence.
          </p>
          <div className="mt-4 rounded-2xl border border-line bg-surface px-5">
            {QUESTIONS.map((item) => (
              <details key={item.q} className="border-b border-line py-4 last:border-b-0">
                <summary className="flex min-h-11 items-center justify-between gap-4 font-display text-base font-bold text-fg">
                  {item.q}
                  <span className="text-primary" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pt-2 text-sm text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            General guidance only. Always do your own due diligence and take professional advice before buying.
          </p>
        </section>

        <section className="mt-16 rounded-2xl border border-line bg-surface px-5 py-8 md:px-8">
          <h2 className="text-3xl font-extrabold text-fg">Buy. Sell. Grow.</h2>
          <p className="mt-3 max-w-xl text-muted">
            Deal direct, with no commission and no broker in the middle. The same plan on either side of the Atlantic:
            £5 / $5 to start, then £30 / $30 a month.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/sell" className={buttonClass()}>
              Start my {mark}5 listing
            </Link>
            <Link to="/browse" search={defaultBrowseSearch} className={buttonClass({ variant: "surface" })}>
              Start searching
            </Link>
          </div>
        </section>
      </div>
    </Page>
  );
}

function HomeSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-2xl font-extrabold text-fg">Businesses, brands and digital assets for sale</h2>
      </div>
      <form
        className="mt-4 grid gap-3 md:grid-cols-12"
        onSubmit={(event) => {
          event.preventDefault();
          void navigate({ to: "/browse", search: { ...defaultBrowseSearch, q, category } });
        }}
      >
        <label className="md:col-span-6">
          <span className="sr-only">Search businesses</span>
          <input
            className="field"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search by name, place or trade"
          />
        </label>
        <label className="md:col-span-3">
          <span className="sr-only">Category</span>
          <select className="field" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button className={buttonClass({ className: "md:col-span-3" })} type="submit">
          Search
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((item) => {
          const count = listings.filter((listing) => listing.category === item.id).length;
          return (
            <Link
              key={item.id}
              to="/browse"
              search={{ ...defaultBrowseSearch, category: item.id }}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-3 text-sm text-muted hover:border-primary hover:text-fg"
            >
              {item.label}
              <span className="ml-2 text-fg/60">{count}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
