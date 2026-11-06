import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ListingArt } from "@/components/listing-art";
import { ListingCard } from "@/components/listing-card";
import { Money } from "@/components/money";
import { Page } from "@/components/site";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { QUESTIONS, categoryLabel, draftToListing, listings, type Listing } from "@/lib/market";
import { usePreview } from "@/lib/preview-state";

export const Route = createFileRoute("/listing/$slug")({
  head: () => ({
    meta: [{ title: "Business for sale · SellBizOnline" }],
  }),
  component: ListingPage,
});

function ListingPage() {
  const { slug } = Route.useParams();
  const { drafts, currency, saved, toggleSaved, addThread } = usePreview();
  const listing = useMemo(() => findListing(slug, drafts), [slug, drafts]);

  if (!listing) {
    return (
      <Page>
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="text-4xl font-extrabold">That listing is not in this preview</h1>
          <Link to="/browse" search={{ q: "", category: "all", country: "all", sort: "featured", max: "" }} className={buttonClass({ className: "mt-6" })}>
            Back to businesses
          </Link>
        </div>
      </Page>
    );
  }

  const related = listings.filter((item) => item.slug !== listing.slug && item.category === listing.category).slice(0, 3);
  const on = saved.includes(listing.slug);

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link to="/browse" search={{ q: "", category: "all", country: "all", sort: "featured", max: "" }} className="text-sm font-semibold text-primary">
          All businesses
        </Link>
        <div className="mt-4 grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-line">
              <ListingArt id={listing.art} label={categoryLabel(listing.category)} />
            </div>
            <p className="mt-5 text-xs font-semibold tracking-widest text-primary uppercase">
              {listing.kind === "example" ? "Example listing" : listing.kind === "draft" ? "Your draft" : "On the marketplace"}
              {" · "}
              {listing.country}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-fg">{listing.name}</h1>
            <p className="mt-2 text-muted">
              {listing.location} · {categoryLabel(listing.category)}
              {listing.established ? ` · Est. ${listing.established}` : ""}
            </p>
            <p className="mt-4 text-base text-muted">{listing.detail}</p>
            {listing.kind === "example" && (
              <p className="mt-3 text-sm text-muted">Shown so you can judge the page. It is not a live listing.</p>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              <Fact label="Asking price">
                <Money value={listing.asking} view={currency} empty="Price on request" />
              </Fact>
              <Fact label="Revenue">
                <Money value={listing.revenue} view={currency} />
              </Fact>
              <Fact label="Profit">
                <Money value={listing.profit} view={currency} />
              </Fact>
              <Fact label="Where">{listing.location}</Fact>
            </dl>

            {listing.published.length > 0 && (
              <section className="mt-8">
                <h2 className="text-xl font-bold">As published</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {listing.published.map((item) => (
                    <li key={item} className="border-l-2 border-primary pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {listing.included.length > 0 && (
              <section className="mt-8">
                <h2 className="text-xl font-bold">Included</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {listing.included.map((item) => (
                    <li key={item} className="rounded-full border border-line px-3 py-2 text-sm text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-8">
              <h2 className="text-xl font-bold">Worth asking</h2>
              <ul className="mt-3 space-y-3">
                {QUESTIONS.map((item) => (
                  <li key={item.q}>
                    <p className="font-semibold text-fg">{item.q}</p>
                    <p className="text-sm text-muted">{item.a}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-24">
              <p className="text-sm text-muted">Asking price</p>
              <p className="mt-1 font-display text-4xl font-extrabold text-fg">
                <Money value={listing.asking} view={currency} empty="Price on request" />
              </p>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggleSaved(listing.slug)}
                className={buttonClass({ variant: "surface", className: "mt-4 w-full" })}
              >
                <Heart className={cn("size-4", on && "fill-accent text-accent")} />
                {on ? "Saved to your shortlist" : "Save to shortlist"}
              </button>
              <ContactForm
                listing={listing}
                onSend={(message) =>
                  addThread({
                    listingSlug: listing.slug,
                    listingName: listing.name,
                    from: message.from,
                    email: message.email,
                    body: message.body,
                  })
                }
              />
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-extrabold">More in {categoryLabel(listing.category).toLowerCase()}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <ListingCard key={item.slug} listing={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Page>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="bg-surface px-4 py-4">
      <dt className="text-xs font-semibold tracking-widest text-muted uppercase">{label}</dt>
      <dd className="mt-1 font-display text-lg font-bold text-fg">{children}</dd>
    </div>
  );
}

function ContactForm({
  listing,
  onSend,
}: {
  listing: Listing;
  onSend: (message: { from: string; email: string; body: string }) => void;
}) {
  const [from, setFrom] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState(
    `I’m interested in ${listing.name}. Could you share the last 12 months of accounts, and why you are selling?`,
  );
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mt-5 text-sm text-muted" role="status">
        Saved to the dashboard preview in this browser. On the live site this goes to the owner. Nothing was sent from
        here.
      </p>
    );
  }

  return (
    <form
      className="mt-5 space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (from.trim().length < 2) {
          setError("Add your name.");
          return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          setError("Add a real email address.");
          return;
        }
        if (body.trim().length < 10) {
          setError("Write a short note for the owner.");
          return;
        }
        setError("");
        onSend({ from: from.trim(), email: email.trim(), body: body.trim() });
        setSent(true);
      }}
    >
      <h2 className="text-lg font-bold text-fg">Message the owner</h2>
      <label className="block text-sm">
        Your name
        <input className="field mt-1.5" value={from} onChange={(event) => setFrom(event.target.value)} autoComplete="name" />
      </label>
      <label className="block text-sm">
        Email
        <input className="field mt-1.5" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
      </label>
      <label className="block text-sm">
        Message
        <textarea className="field mt-1.5" value={body} onChange={(event) => setBody(event.target.value)} />
      </label>
      {error && (
        <p className="text-sm font-medium text-fg" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className={buttonClass({ className: "w-full" })}>
        Send message
      </button>
      <p className="text-xs text-muted">Stays in this browser. This preview does not email anyone.</p>
    </form>
  );
}

function findListing(slug: string, drafts: Parameters<typeof draftToListing>[0][]): Listing | null {
  return listings.find((item) => item.slug === slug) ?? drafts.map(draftToListing).find((item) => item.slug === slug) ?? null;
}
