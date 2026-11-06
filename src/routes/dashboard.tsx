import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ListingCard } from "@/components/listing-card";
import { Shell } from "@/components/site";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { PLAN, defaultBrowseSearch, draftToListing, formatMoney, listings, type Listing } from "@/lib/market";
import { usePreview } from "@/lib/preview-state";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard · SellBizOnline" }],
  }),
  component: DashboardPage,
});

type Tab = "overview" | "listings" | "messages" | "saved";

function DashboardPage() {
  const { currency, drafts, threads, saved, removeDraft } = usePreview();
  const [tab, setTab] = useState<Tab>("overview");
  const savedListings = saved
    .map((slug) => listings.find((item) => item.slug === slug) ?? drafts.map(draftToListing).find((item) => item.slug === slug))
    .filter((item): item is Listing => item != null);

  return (
    <Shell
      eyebrow="Your side of the marketplace"
      title="Dashboard"
      lede="The signed-in look: plan, listings, messages and shortlist. Nothing here changes Directorist or WooCommerce."
    >
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">Plan</p>
            <p className="mt-2 font-display text-3xl font-extrabold">{formatMoney(PLAN.month, currency)}<span className="text-base font-semibold text-muted"> / month</span></p>
            <dl className="mt-4 space-y-2 text-sm">
              <Row k="To start" v={formatMoney(PLAN.start, currency)} />
              <Row k="Commission" v="0%" />
              <Row k="Commitment" v="Cancel anytime" />
            </dl>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1" role="tablist" aria-label="Dashboard">
            {(
              [
                ["overview", "Overview"],
                ["listings", `Listings (${drafts.length})`],
                ["messages", `Messages (${threads.length})`],
                ["saved", `Saved (${saved.length})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={cn(
                  "min-h-11 rounded-xl border px-3 text-left text-sm font-semibold",
                  tab === id ? "border-primary bg-primary text-on-primary" : "border-line bg-surface text-fg",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        <div className="lg:col-span-8" role="tabpanel">
          {tab === "overview" && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <Stat label="Draft listings" value={String(drafts.length)} />
                <Stat label="Messages" value={String(threads.length)} />
                <Stat label="Shortlist" value={String(saved.length)} />
              </div>
              <article className="rounded-2xl border border-line bg-surface p-5">
                <h2 className="text-xl font-bold">What this screen is for</h2>
                <p className="mt-2 text-sm text-muted">
                  Sellers land here after they sign in: the flat plan, their listings, and replies from buyers. Search,
                  checkout and the real dashboard keep working as they do now. This is only the new colour, type and
                  layout.
                </p>
                <Link to="/sell" className={buttonClass({ className: "mt-4" })}>
                  Preview a listing
                </Link>
              </article>
            </div>
          )}

          {tab === "listings" && (
            <div className="space-y-4">
              {drafts.length === 0 ? (
                <Empty
                  title="No drafts yet"
                  body="A listing you preview on the pricing page shows up here. Live listings stay on the real site."
                  href="/sell"
                  action="Create a draft"
                />
              ) : (
                drafts.map((draft) => (
                  <article key={draft.id} className="rounded-2xl border border-line bg-surface p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold">{draft.name}</h2>
                        <p className="mt-1 text-sm text-muted">
                          {draft.location}, {draft.country} · {formatMoney(draft.asking, draft.currency)}
                        </p>
                      </div>
                      <button type="button" className={buttonClass({ variant: "quiet" })} onClick={() => removeDraft(draft.id)}>
                        Remove
                      </button>
                    </div>
                    <p className="mt-3 text-sm text-muted">{draft.summary}</p>
                    <Link
                      to="/listing/$slug"
                      params={{ slug: `draft-${draft.id}` }}
                      className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary"
                    >
                      Open listing
                    </Link>
                  </article>
                ))
              )}
            </div>
          )}

          {tab === "messages" && (
            <div className="space-y-3">
              {threads.length === 0 ? (
                <Empty
                  title="No messages yet"
                  body="Open a listing and write to the owner. It will appear here, still only in this browser."
                  href="/browse"
                  action="Browse businesses"
                />
              ) : (
                threads.map((thread) => (
                  <article key={thread.id} className="rounded-2xl border border-line bg-surface p-5">
                    <p className="text-xs font-semibold tracking-widest text-primary uppercase">{thread.listingName}</p>
                    <h2 className="mt-1 text-lg font-bold">{thread.from}</h2>
                    <p className="text-sm text-muted">{thread.email}</p>
                    <p className="mt-3 text-sm text-fg">{thread.body}</p>
                    <p className="mt-3 text-xs text-muted">{new Date(thread.at).toLocaleString("en-GB")}</p>
                  </article>
                ))
              )}
            </div>
          )}

          {tab === "saved" && (
            <div>
              {savedListings.length === 0 ? (
                <Empty
                  title="Nothing saved"
                  body="Use the heart on a card to shortlist a business while you compare."
                  href="/browse"
                  action="Browse businesses"
                />
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {savedListings.map((listing) => (
                    <ListingCard key={listing.slug} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted">{k}</dt>
      <dd className="font-semibold text-fg">{v}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <p className="font-display text-3xl font-extrabold tabular-nums">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

function Empty({ title, body, href, action }: { title: string; body: string; href: "/sell" | "/browse"; action: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{body}</p>
      {href === "/browse" ? (
        <Link to="/browse" search={defaultBrowseSearch} className={buttonClass({ className: "mt-4" })}>
          {action}
        </Link>
      ) : (
        <Link to="/sell" className={buttonClass({ className: "mt-4" })}>
          {action}
        </Link>
      )}
    </div>
  );
}
