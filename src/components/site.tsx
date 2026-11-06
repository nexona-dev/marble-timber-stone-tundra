import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { defaultBrowseSearch, type Currency } from "@/lib/market";
import { usePreview } from "@/lib/preview-state";

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-fg">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-primary" />
        <path d="M8 22h16M10 22V15M16 22V10M22 22V13" className="stroke-on-primary" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      SellBiz<span className="text-primary">Online</span>
    </Link>
  );
}

function CurrencySwitch() {
  const { currency, setCurrency } = usePreview();
  return (
    <div className="flex rounded-full border border-line p-1" role="group" aria-label="Currency">
      {(
        [
          ["gbp", "£"],
          ["usd", "$"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          aria-pressed={currency === id}
          onClick={() => setCurrency(id as Currency)}
          className={cn(
            "min-h-11 min-w-11 rounded-full text-sm font-bold",
            currency === id ? "bg-primary text-on-primary" : "text-muted",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg">
      <div className="h-0.5 bg-primary" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Wordmark />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink to="/browse" path={path}>
            Browse
          </NavLink>
          <NavLink to="/sell" path={path}>
            Pricing
          </NavLink>
          <NavLink to="/dashboard" path={path}>
            Dashboard
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <CurrencySwitch />
          <Link to="/sell" className={cn(buttonClass(), "hidden sm:inline-flex")}>
            List your business
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-line text-fg md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden" aria-label="Mobile">
          <Link to="/browse" search={defaultBrowseSearch} className="flex min-h-11 items-center text-fg">
            Browse
          </Link>
          <Link to="/sell" className="flex min-h-11 items-center text-fg">
            Pricing
          </Link>
          <Link to="/dashboard" className="flex min-h-11 items-center text-fg">
            Dashboard
          </Link>
          <Link to="/sell" className={cn(buttonClass(), "mt-2")}>
            List your business
          </Link>
        </nav>
      )}
    </header>
  );
}

function NavLink({ to, path, children }: { to: "/browse" | "/sell" | "/dashboard"; path: string; children: ReactNode }) {
  const active = path === to || path.startsWith(`${to}/`);
  if (to === "/browse") {
    return (
      <Link
        to="/browse"
        search={defaultBrowseSearch}
        className={cn("inline-flex min-h-11 items-center px-3 text-sm font-semibold", active ? "text-fg" : "text-muted hover:text-fg")}
        aria-current={active ? "page" : undefined}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      to={to}
      className={cn("inline-flex min-h-11 items-center px-3 text-sm font-semibold", active ? "text-fg" : "text-muted hover:text-fg")}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold text-fg">SellBizOnline</p>
          <p className="mt-2 text-sm text-muted">
            Businesses, brands and digital assets for sale in the USA, UK and worldwide. No broker in the middle.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
          <Link to="/browse" search={defaultBrowseSearch} className="min-h-11 text-muted hover:text-fg md:min-h-0">
            Browse businesses
          </Link>
          <Link to="/sell" className="min-h-11 text-muted hover:text-fg md:min-h-0">
            List your business
          </Link>
          <Link to="/dashboard" className="min-h-11 text-muted hover:text-fg md:min-h-0">
            Dashboard
          </Link>
          <a href="/#how" className="min-h-11 text-muted hover:text-fg md:min-h-0">
            How a deal works
          </a>
        </nav>
        <p className="text-sm text-muted">
          £5 / $5 to start, then £30 / $30 a month. 0% commission. Cancel anytime. General guidance only — do your own
          due diligence and take professional advice before you buy or sell. This preview does not take payment, and
          messages stay in your browser.
        </p>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="content">{children}</main>
      <Footer />
    </div>
  );
}

export function Shell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <Page>
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {eyebrow && <p className="text-xs font-semibold tracking-widest text-primary uppercase">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-4xl font-extrabold text-fg md:text-5xl">{title}</h1>
        {lede && <p className="mt-4 max-w-2xl text-base text-muted">{lede}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </Page>
  );
}
