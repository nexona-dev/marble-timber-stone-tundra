import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CategoryId, Country, Currency, Draft } from "@/lib/market";

const KEY = "sbo-preview-v1";

export type Thread = {
  id: string;
  listingSlug: string;
  listingName: string;
  from: string;
  email: string;
  body: string;
  at: string;
};

type State = {
  currency: Currency;
  saved: string[];
  drafts: Draft[];
  threads: Thread[];
};

const initial: State = { currency: "gbp", saved: [], drafts: [], threads: [] };

type Api = State & {
  setCurrency: (currency: Currency) => void;
  toggleSaved: (slug: string) => void;
  addDraft: (draft: Omit<Draft, "id" | "createdAt">) => string;
  removeDraft: (id: string) => void;
  addThread: (thread: Omit<Thread, "id" | "at">) => void;
};

const PreviewContext = createContext<Api | null>(null);

function isCurrency(value: unknown): value is Currency {
  return value === "gbp" || value === "usd";
}

function isCountry(value: unknown): value is Country {
  return value === "UK" || value === "USA";
}

function isCategory(value: unknown): value is CategoryId {
  return (
    value === "food" ||
    value === "ecommerce" ||
    value === "hospitality" ||
    value === "tech" ||
    value === "property" ||
    value === "digital"
  );
}

function isDraft(value: unknown): value is Draft {
  if (!value || typeof value !== "object") return false;
  const d = value as Draft;
  return (
    typeof d.id === "string" &&
    typeof d.name === "string" &&
    typeof d.asking === "number" &&
    isCurrency(d.currency) &&
    isCountry(d.country) &&
    isCategory(d.category)
  );
}

function isThread(value: unknown): value is Thread {
  if (!value || typeof value !== "object") return false;
  const t = value as Thread;
  return typeof t.id === "string" && typeof t.body === "string" && typeof t.listingName === "string";
}

function sanitize(raw: unknown): State {
  if (!raw || typeof raw !== "object") return initial;
  const v = raw as Partial<State>;
  return {
    currency: isCurrency(v.currency) ? v.currency : "gbp",
    saved: Array.isArray(v.saved) ? v.saved.filter((item) => typeof item === "string") : [],
    drafts: Array.isArray(v.drafts) ? v.drafts.filter(isDraft) : [],
    threads: Array.isArray(v.threads) ? v.threads.filter(isThread) : [],
  };
}

export function PreviewStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(sanitize(JSON.parse(raw)));
    } catch {
      /* ignore unreadable preview data */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const api = useMemo<Api>(
    () => ({
      ...state,
      setCurrency: (currency) => setState((current) => ({ ...current, currency })),
      toggleSaved: (slug) =>
        setState((current) => ({
          ...current,
          saved: current.saved.includes(slug)
            ? current.saved.filter((id) => id !== slug)
            : [slug, ...current.saved],
        })),
      addDraft: (draft) => {
        const id = crypto.randomUUID();
        setState((current) => ({
          ...current,
          drafts: [{ ...draft, id, createdAt: new Date().toISOString() }, ...current.drafts],
        }));
        return id;
      },
      removeDraft: (id) =>
        setState((current) => ({
          ...current,
          drafts: current.drafts.filter((draft) => draft.id !== id),
          saved: current.saved.filter((slug) => slug !== `draft-${id}`),
        })),
      addThread: (thread) =>
        setState((current) => ({
          ...current,
          threads: [
            { ...thread, id: crypto.randomUUID(), at: new Date().toISOString() },
            ...current.threads,
          ],
        })),
    }),
    [state],
  );

  return <PreviewContext.Provider value={api}>{children}</PreviewContext.Provider>;
}

export function usePreview() {
  const value = useContext(PreviewContext);
  if (!value) throw new Error("Preview state is missing");
  return value;
}
