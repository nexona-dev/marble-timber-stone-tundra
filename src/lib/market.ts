export type Currency = "gbp" | "usd";
export type Country = "UK" | "USA";
export type Kind = "live" | "example" | "draft";

export const CATEGORIES = [
  { id: "food", label: "Food & drink" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "hospitality", label: "Hospitality" },
  { id: "tech", label: "Tech" },
  { id: "property", label: "Property" },
  { id: "digital", label: "Online & digital" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const PLAN = { start: 5, month: 30, year: 360 };
export const BROWSE_USD_PER_GBP = 1.27;

export const SALE_STEPS = [
  10_000, 25_000, 50_000, 100_000, 150_000, 200_000, 350_000, 500_000, 750_000, 1_000_000,
  2_000_000,
] as const;

export const BROKER_RATES = [5, 10, 15] as const;

export type Money = { amount: number; currency: Currency };

export type Listing = {
  slug: string;
  name: string;
  category: CategoryId;
  location: string;
  country: Country;
  summary: string;
  detail: string;
  asking: Money | null;
  revenue: Money | null;
  profit: Money | null;
  established: string | null;
  art: string;
  kind: Kind;
  featured: boolean;
  order: number;
  published: string[];
  included: string[];
};

export type Draft = {
  id: string;
  name: string;
  category: CategoryId;
  location: string;
  country: Country;
  asking: number;
  currency: Currency;
  summary: string;
  createdAt: string;
};

export type BrowseSearch = {
  q: string;
  category: string;
  country: string;
  sort: "featured" | "price-asc" | "price-desc";
  max: string;
};

export const defaultBrowseSearch: BrowseSearch = {
  q: "",
  category: "all",
  country: "all",
  sort: "featured",
  max: "",
};

export function parseBrowseSearch(search: Record<string, unknown>): BrowseSearch {
  const sort = search.sort;
  return {
    q: typeof search.q === "string" ? search.q : "",
    category: typeof search.category === "string" ? search.category : "all",
    country: typeof search.country === "string" ? search.country : "all",
    sort: sort === "price-asc" || sort === "price-desc" ? sort : "featured",
    max: typeof search.max === "string" ? search.max : "",
  };
}

export function categoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? "Business";
}

export function symbol(currency: Currency) {
  return currency === "gbp" ? "£" : "$";
}

export function formatMoney(amount: number, currency: Currency, approx = false) {
  const body = Math.round(amount).toLocaleString("en-GB");
  return `${approx ? "≈ " : ""}${symbol(currency)}${body}`;
}

export function convert(amount: number, from: Currency, to: Currency) {
  if (from === to) return Math.round(amount);
  if (from === "gbp") return Math.round(amount * BROWSE_USD_PER_GBP);
  return Math.round(amount / BROWSE_USD_PER_GBP);
}

export function inView(value: Money, view: Currency) {
  return {
    amount: convert(value.amount, value.currency, view),
    approx: value.currency !== view,
  };
}

export const QUESTIONS = [
  {
    q: "Why are you selling?",
    a: "The honest answer tells you a lot.",
  },
  {
    q: "Can I see the last 12–24 months of accounts?",
    a: "Check revenue and profit match the listing.",
  },
  {
    q: "Where do your customers or traffic come from?",
    a: "Look for over-reliance on one source.",
  },
  {
    q: "What does a typical week involve?",
    a: "Know the time you’ll need to put in.",
  },
  {
    q: "What’s included in the sale?",
    a: "Stock, equipment, domains, accounts, suppliers, contracts.",
  },
] as const;

export const listings: Listing[] = [
  {
    slug: "dessert-shop",
    name: "Dessert shop",
    category: "food",
    location: "United Kingdom",
    country: "UK",
    summary:
      "Established corner-position business with about £5,000 weekly turnover, a studio flat and a car park.",
    detail:
      "A working dessert shop already on SellBizOnline. The public listing describes an established corner position, weekly trade around £5,000, a studio flat earning £10,800 a year, and a car park. Anything not published — exact profit, the lease, or why it is for sale — is for the owner to answer.",
    asking: { amount: 80_000, currency: "gbp" },
    revenue: { amount: 260_000, currency: "gbp" },
    profit: null,
    established: null,
    art: "dessert",
    kind: "live",
    featured: true,
    order: 1,
    published: [
      "Asking price £80,000",
      "Annual revenue £260,000",
      "About £5,000 weekly turnover",
      "Studio flat earning £10,800 a year",
      "Car park included",
    ],
    included: ["Shop", "Studio flat", "Car park"],
  },
  {
    slug: "red-telephone-box-coffee-kiosk",
    name: "Red telephone box coffee kiosk",
    category: "food",
    location: "United Kingdom",
    country: "UK",
    summary:
      "Two classic red telephone boxes, converted into a coffee kiosk with a professional espresso machine and grinder.",
    detail:
      "A distinctive kiosk already listed on the marketplace. The public description is a pair of red telephone boxes, fully equipped with a professional espresso machine and grinder. The asking price was not on the public card, so it stays as “price on request” until the owner states it.",
    asking: null,
    revenue: null,
    profit: null,
    established: null,
    art: "kiosk",
    kind: "live",
    featured: true,
    order: 2,
    published: [
      "Converted from two classic red telephone boxes",
      "Professional espresso machine and grinder included",
      "Asking price was not published — ask the owner",
    ],
    included: ["Both kiosk structures", "Espresso machine", "Grinder"],
  },
  {
    slug: "krispys-fried-chicken",
    name: "Krispy’s fried chicken takeaway",
    category: "food",
    location: "Tong Street, Bradford",
    country: "UK",
    summary: "Established fried chicken takeaway on Tong Street, Bradford, ready for a new owner.",
    detail:
      "A takeaway already on SellBizOnline, in a prime spot on Tong Street, Bradford. The published asking price is £29,500. Revenue, profit and what is included in the sale were not on the public summary — message the owner and ask.",
    asking: { amount: 29_500, currency: "gbp" },
    revenue: null,
    profit: null,
    established: null,
    art: "chicken",
    kind: "live",
    featured: true,
    order: 3,
    published: ["Asking price £29,500", "Prime location on Tong Street, Bradford", "Established takeaway"],
    included: [],
  },
  {
    slug: "northshore-fragrance",
    name: "Northshore Home Fragrance",
    category: "ecommerce",
    location: "Austin, Texas",
    country: "USA",
    summary:
      "Example direct-to-consumer fragrance brand with a short product line and a mix of online and wholesale orders.",
    detail:
      "Example listing, for judging the layout only. It is not on the live marketplace. Imagine a small home-fragrance brand: a handful of SKUs, repeat wholesale accounts, and a store the owner runs without a big team. Use it to see how revenue, profit and an asking price should read.",
    asking: { amount: 186_000, currency: "usd" },
    revenue: { amount: 410_000, currency: "usd" },
    profit: { amount: 96_000, currency: "usd" },
    established: "2019",
    art: "fragrance",
    kind: "example",
    featured: false,
    order: 10,
    published: [],
    included: ["Online store", "Formulas", "Wholesale accounts", "Remaining stock"],
  },
  {
    slug: "harbour-and-rye",
    name: "Harbour & Rye",
    category: "hospitality",
    location: "Manchester",
    country: "UK",
    summary: "Example neighbourhood restaurant: a known room, a working kitchen, and a weekly rhythm a buyer can inspect.",
    detail:
      "Example listing, for judging the layout only. It is not on the live marketplace. A 48-cover restaurant, open five evenings, with a head chef in place. The point of the card is that a buyer can see price, revenue and profit without hunting, then ask the owner for the accounts.",
    asking: { amount: 145_000, currency: "gbp" },
    revenue: { amount: 520_000, currency: "gbp" },
    profit: { amount: 78_000, currency: "gbp" },
    established: "2016",
    art: "restaurant",
    kind: "example",
    featured: false,
    order: 11,
    published: [],
    included: ["Lease", "Kitchen equipment", "Brand", "Staff, subject to transfer"],
  },
  {
    slug: "lane-and-co",
    name: "Lane & Co. Scheduling",
    category: "tech",
    location: "London",
    country: "UK",
    summary: "Example scheduling tool for independent clinics. Subscription revenue, a small team, and a clear monthly profit.",
    detail:
      "Example listing, for judging the layout only. It is not on the live marketplace. A focused software product sold to clinics on a monthly plan. Shown so a tech business doesn’t have to borrow a shop photo to look credible.",
    asking: { amount: 240_000, currency: "gbp" },
    revenue: { amount: 180_000, currency: "gbp" },
    profit: { amount: 72_000, currency: "gbp" },
    established: "2021",
    art: "saas",
    kind: "example",
    featured: false,
    order: 12,
    published: [],
    included: ["Codebase", "Customer contracts", "Domain and brand"],
  },
  {
    slug: "porth-cottage",
    name: "Porth Cottage",
    category: "property",
    location: "Cornwall",
    country: "UK",
    summary: "Example coastal holiday let. The sale is the cottage and the booking history, not a promise of future summers.",
    detail:
      "Example listing, for judging the layout only. It is not on the live marketplace. A two-bedroom holiday cottage let for most of the season. Buyers should still ask who owns the bookings, what the council rules are, and what a quiet winter looks like.",
    asking: { amount: 425_000, currency: "gbp" },
    revenue: { amount: 48_000, currency: "gbp" },
    profit: { amount: 21_000, currency: "gbp" },
    established: "Let since 2018",
    art: "cottage",
    kind: "example",
    featured: false,
    order: 13,
    published: [],
    included: ["Cottage", "Furniture", "Booking records"],
  },
  {
    slug: "field-notes-review",
    name: "Field Notes Review",
    category: "digital",
    location: "Denver, Colorado",
    country: "USA",
    summary: "Example review site in one outdoor niche. Revenue is content and affiliates, and the hours are the owner’s.",
    detail:
      "Example listing, for judging the layout only. It is not on the live marketplace. A niche review site with a few years of articles and a single owner. Useful as a reminder that digital assets belong on the same cards as shops — with the same questions about where the traffic comes from.",
    asking: { amount: 42_000, currency: "usd" },
    revenue: { amount: 38_000, currency: "usd" },
    profit: { amount: 22_000, currency: "usd" },
    established: "2020",
    art: "notes",
    kind: "example",
    featured: false,
    order: 14,
    published: [],
    included: ["Site and domain", "Content library", "Email list"],
  },
];

export function draftToListing(d: Draft): Listing {
  const category = CATEGORIES.some((c) => c.id === d.category) ? d.category : "food";
  return {
    slug: `draft-${d.id}`,
    name: d.name,
    category,
    location: d.location,
    country: d.country,
    summary: d.summary,
    detail: d.summary,
    asking: { amount: d.asking, currency: d.currency },
    revenue: null,
    profit: null,
    established: null,
    art: "draft",
    kind: "draft",
    featured: false,
    order: -1,
    published: [],
    included: [],
  };
}

export function askingInView(listing: Listing, view: Currency) {
  if (!listing.asking) return null;
  return inView(listing.asking, view).amount;
}

export function filterListings(source: Listing[], search: BrowseSearch, view: Currency) {
  const q = search.q.trim().toLowerCase();
  const max = Number(search.max);
  const filtered = source.filter((listing) => {
    if (search.category !== "all" && listing.category !== search.category) return false;
    if (search.country !== "all" && listing.country !== search.country) return false;
    if (q) {
      const hay = [listing.name, listing.summary, listing.location, categoryLabel(listing.category)]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (Number.isFinite(max) && max > 0) {
      const price = askingInView(listing, view);
      if (price == null || price > max) return false;
    }
    return true;
  });

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    if (search.sort === "featured") return a.order - b.order;
    const pa = askingInView(a, view);
    const pb = askingInView(b, view);
    if (pa == null && pb == null) return a.order - b.order;
    if (pa == null) return 1;
    if (pb == null) return -1;
    return search.sort === "price-asc" ? pa - pb : pb - pa;
  });
  return sorted;
}

export function brokerFee(sale: number, rate: number) {
  return Math.round((sale * rate) / 100);
}
