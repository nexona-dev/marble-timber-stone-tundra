import type { ReactNode } from "react";

const plates: Record<string, ReactNode> = {
  dessert: (
    <>
      <circle cx="248" cy="36" r="64" className="fill-accent/15" />
      <rect x="36" y="46" width="132" height="88" rx="18" className="fill-surface-2" />
      <circle cx="72" cy="88" r="16" className="fill-accent" />
      <circle cx="108" cy="78" r="12" className="fill-primary" />
      <circle cx="136" cy="100" r="10" className="fill-accent/70" />
      <path d="M36 154h150" className="stroke-line" strokeWidth="2" />
    </>
  ),
  kiosk: (
    <>
      <rect x="70" y="24" width="62" height="132" rx="10" className="fill-none stroke-primary" strokeWidth="3" />
      <rect x="176" y="24" width="62" height="132" rx="10" className="fill-surface-2 stroke-primary" strokeWidth="3" />
      <circle cx="101" cy="58" r="11" className="fill-accent" />
      <circle cx="207" cy="58" r="11" className="fill-accent" />
      <rect x="90" y="96" width="22" height="60" className="fill-primary/30" />
      <rect x="196" y="96" width="22" height="60" className="fill-primary/40" />
    </>
  ),
  chicken: (
    <>
      <path d="M40 70h200l-16 28H56L40 70z" className="fill-accent/80" />
      <rect x="64" y="98" width="152" height="58" rx="6" className="fill-surface-2" />
      <path d="M88 98v58M128 98v58M168 98v58" className="stroke-line" strokeWidth="2" />
      <rect x="108" y="128" width="64" height="8" rx="4" className="fill-primary" />
    </>
  ),
  fragrance: (
    <>
      <rect x="58" y="70" width="36" height="78" rx="8" className="fill-surface-2" />
      <rect x="132" y="48" width="40" height="100" rx="10" className="fill-primary/80" />
      <rect x="206" y="62" width="36" height="86" rx="8" className="fill-accent" />
      <rect x="66" y="54" width="20" height="16" rx="4" className="fill-line" />
      <rect x="142" y="32" width="20" height="16" rx="4" className="fill-primary-strong" />
      <rect x="214" y="46" width="20" height="16" rx="4" className="fill-accent/70" />
    </>
  ),
  restaurant: (
    <>
      <circle cx="160" cy="108" r="46" className="fill-surface-2" />
      <circle cx="144" cy="104" r="12" className="fill-none stroke-accent" strokeWidth="3" />
      <circle cx="178" cy="112" r="10" className="fill-none stroke-primary" strokeWidth="3" />
      <path d="M96 28v48M160 22v40M224 28v48" className="stroke-line" strokeWidth="2" />
      <circle cx="96" cy="80" r="4" className="fill-accent" />
      <circle cx="160" cy="66" r="4" className="fill-primary" />
      <circle cx="224" cy="80" r="4" className="fill-accent" />
    </>
  ),
  saas: (
    <>
      <rect x="48" y="36" width="224" height="116" rx="16" className="fill-surface-2" />
      <path d="M48 62h224" className="stroke-line" strokeWidth="2" />
      <rect x="78" y="104" width="22" height="28" rx="4" className="fill-primary/40" />
      <rect x="114" y="90" width="22" height="42" rx="4" className="fill-primary/70" />
      <rect x="150" y="78" width="22" height="54" rx="4" className="fill-primary" />
      <rect x="186" y="96" width="22" height="36" rx="4" className="fill-accent" />
      <circle cx="68" cy="49" r="4" className="fill-line" />
    </>
  ),
  cottage: (
    <>
      <path d="M160 36 78 96h164L160 36z" className="fill-accent/80" />
      <rect x="96" y="96" width="128" height="64" className="fill-surface-2" />
      <rect x="146" y="116" width="28" height="44" className="fill-primary/70" />
      <circle cx="122" cy="122" r="8" className="fill-accent" />
      <path d="M40 160h240" className="stroke-primary/50" strokeWidth="3" />
    </>
  ),
  notes: (
    <>
      <rect x="70" y="36" width="150" height="112" rx="8" className="fill-surface-2" />
      <path d="M92 68h106M92 92h86M92 116h64" className="stroke-line" strokeWidth="3" strokeLinecap="round" />
      <rect x="196" y="78" width="52" height="40" rx="6" className="fill-primary" />
      <circle cx="248" cy="128" r="16" className="fill-accent" />
    </>
  ),
  draft: (
    <>
      <rect x="96" y="40" width="128" height="100" rx="16" className="fill-surface-2" />
      <path d="M160 68v44M138 90h44" className="stroke-primary" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
};

export function ListingArt({ id, label }: { id: string; label?: string }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-raised">
      <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
        {plates[id] ?? plates.draft}
      </svg>
      {label && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-raised to-transparent" />
          <p className="absolute bottom-3 left-4 text-xs font-semibold tracking-widest text-primary uppercase">{label}</p>
        </>
      )}
    </div>
  );
}
