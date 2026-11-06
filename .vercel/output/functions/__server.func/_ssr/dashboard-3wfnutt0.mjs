import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as draftToListing, h as listings, i as PLAN, p as formatMoney, u as defaultBrowseSearch, v as usePreview } from "./market-Zpszcjqc.mjs";
import { a as Shell, n as ListingCard, o as buttonClass, s as cn } from "./site-oGK8lRGm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-3wfnutt0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { currency, drafts, threads, saved, removeDraft } = usePreview();
	const [tab, setTab] = (0, import_react.useState)("overview");
	const savedListings = saved.map((slug) => listings.find((item) => item.slug === slug) ?? drafts.map(draftToListing).find((item) => item.slug === slug)).filter((item) => item != null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		eyebrow: "Your side of the marketplace",
		title: "Dashboard",
		lede: "The signed-in look: plan, listings, messages and shortlist. Nothing here changes Directorist or WooCommerce.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-start gap-6 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "lg:col-span-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-primary uppercase",
							children: "Plan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-3xl font-extrabold",
							children: [formatMoney(PLAN.month, currency), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-semibold text-muted",
								children: " / month"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "To start",
									v: formatMoney(PLAN.start, currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Commission",
									v: "0%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Commitment",
									v: "Cancel anytime"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1",
					role: "tablist",
					"aria-label": "Dashboard",
					children: [
						["overview", "Overview"],
						["listings", `Listings (${drafts.length})`],
						["messages", `Messages (${threads.length})`],
						["saved", `Saved (${saved.length})`]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": tab === id,
						onClick: () => setTab(id),
						className: cn("min-h-11 rounded-xl border px-3 text-left text-sm font-semibold", tab === id ? "border-primary bg-primary text-on-primary" : "border-line bg-surface text-fg"),
						children: label
					}, id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-8",
				role: "tabpanel",
				children: [
					tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Draft listings",
									value: String(drafts.length)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Messages",
									value: String(threads.length)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Shortlist",
									value: String(saved.length)
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl border border-line bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: "What this screen is for"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "Sellers land here after they sign in: the flat plan, their listings, and replies from buyers. Search, checkout and the real dashboard keep working as they do now. This is only the new colour, type and layout."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/sell",
									className: buttonClass({ className: "mt-4" }),
									children: "Preview a listing"
								})
							]
						})]
					}),
					tab === "listings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: drafts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
							title: "No drafts yet",
							body: "A listing you preview on the pricing page shows up here. Live listings stay on the real site.",
							href: "/sell",
							action: "Create a draft"
						}) : drafts.map((draft) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl border border-line bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold",
										children: draft.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted",
										children: [
											draft.location,
											", ",
											draft.country,
											" · ",
											formatMoney(draft.asking, draft.currency)
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: buttonClass({ variant: "quiet" }),
										onClick: () => removeDraft(draft.id),
										children: "Remove"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted",
									children: draft.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/listing/$slug",
									params: { slug: `draft-${draft.id}` },
									className: "mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary",
									children: "Open listing"
								})
							]
						}, draft.id))
					}),
					tab === "messages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: threads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
							title: "No messages yet",
							body: "Open a listing and write to the owner. It will appear here, still only in this browser.",
							href: "/browse",
							action: "Browse businesses"
						}) : threads.map((thread) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl border border-line bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-widest text-primary uppercase",
									children: thread.listingName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 text-lg font-bold",
									children: thread.from
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: thread.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-fg",
									children: thread.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-muted",
									children: new Date(thread.at).toLocaleString("en-GB")
								})
							]
						}, thread.id))
					}),
					tab === "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: savedListings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						title: "Nothing saved",
						body: "Use the heart on a card to shortlist a business while you compare.",
						href: "/browse",
						action: "Browse businesses"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: savedListings.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.slug))
					}) })
				]
			})]
		})
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-semibold text-fg",
			children: v
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl font-extrabold tabular-nums",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		})]
	});
}
function Empty({ title, body, href, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-surface p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: body
			}),
			href === "/browse" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/browse",
				search: defaultBrowseSearch,
				className: buttonClass({ className: "mt-4" }),
				children: action
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/sell",
				className: buttonClass({ className: "mt-4" }),
				children: action
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
