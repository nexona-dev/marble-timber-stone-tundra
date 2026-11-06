import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ListingArt } from "@/components/listing-art";
import { Money } from "@/components/money";
import { cn } from "@/lib/cn";
import { categoryLabel, type Listing } from "@/lib/market";
import { usePreview } from "@/lib/preview-state";

const kindLabel = { live: "Listed", example: "Example", draft: "Your draft" } as const;

export function ListingCard({ listing, linked = true }: { listing: Listing; linked?: boolean }) {
  const { currency, saved, toggleSaved } = usePreview();
  const on = saved.includes(listing.slug);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-200 hover:-translate-y-1 hover:border-primary/40 motion-reduce:transform-none">
      <div className="relative">
        {linked ? (
          <Link
            to="/listing/$slug"
            params={{ slug: listing.slug }}
            className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ListingArt id={listing.art} />
          </Link>
        ) : (
          <ListingArt id={listing.art} />
        )}
        {linked && (
          <button
            type="button"
            aria-pressed={on}
            aria-label={on ? `Remove ${listing.name} from shortlist` : `Save ${listing.name}`}
            onClick={() => toggleSaved(listing.slug)}
            className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full border border-line bg-bg/90 text-fg"
          >
            <Heart className={cn("size-4", on && "fill-accent text-accent")} />
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold tracking-widest uppercase">
          <span className={listing.kind === "live" ? "text-primary" : "text-muted"}>{kindLabel[listing.kind]}</span>
          {listing.featured && <span className="text-accent">This week</span>}
        </div>
        <h3 className="mt-2 text-xl font-bold text-fg">
          {linked ? (
            <Link to="/listing/$slug" params={{ slug: listing.slug }} className="hover:text-primary">
              {listing.name}
            </Link>
          ) : (
            listing.name
          )}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {categoryLabel(listing.category)} · {listing.location}
        </p>
        <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted">{listing.summary}</p>
        <div className="mt-4 border-t border-line pt-4">
          <p className="font-display text-2xl font-extrabold text-fg">
            <Money value={listing.asking} view={currency} empty="Price on request" />
          </p>
          {listing.revenue && (
            <p className="mt-1 text-sm text-muted">
              Revenue <Money value={listing.revenue} view={currency} showNote={false} />
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
