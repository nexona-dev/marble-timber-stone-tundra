import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, Y as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as symbol, d as draftToListing, f as filterListings, h as listings, n as BROWSE_USD_PER_GBP, r as CATEGORIES, u as defaultBrowseSearch, v as usePreview } from "./market-Zpszcjqc.mjs";
import { r as Route$3 } from "./router-BxugoFHj.mjs";
import { a as Shell, n as ListingCard, o as buttonClass } from "./site-oGK8lRGm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/browse-BhlLuJly.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrowsePage() {
	const search = Route$3.useSearch();
	const navigate = useNavigate({ from: "/browse" });
	const { currency, drafts } = usePreview();
	const [q, setQ] = (0, import_react.useState)(search.q);
	const mark = symbol(currency);
	(0, import_react.useEffect)(() => {
		setQ(search.q);
	}, [search.q]);
	const source = (0, import_react.useMemo)(() => [...drafts.map(draftToListing), ...listings], [drafts]);
	const results = filterListings(source, search, currency);
	function update(partial) {
		navigate({
			search: {
				...search,
				...partial
			},
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		eyebrow: "Marketplace",
		title: "Businesses for sale",
		lede: "Browse businesses, brands and digital assets, then talk to the owner yourself. No broker in the middle.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 md:grid-cols-12",
				onSubmit: (event) => {
					event.preventDefault();
					update({ q });
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "md:col-span-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1.5 block text-sm font-medium",
							children: "Search"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: q,
							onChange: (event) => setQ(event.target.value),
							placeholder: "Name, place or trade"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1.5 block text-sm font-medium",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "field",
							value: search.category,
							onChange: (event) => update({ category: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All"
							}), CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1.5 block text-sm font-medium",
							children: "Country"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "field",
							value: search.country,
							onChange: (event) => update({ country: event.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "USA & UK"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "UK",
									children: "UK"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "USA",
									children: "USA"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1.5 block text-sm font-medium",
							children: "Max price"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "field",
							value: search.max,
							onChange: (event) => update({ max: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Any"
							}), [
								5e4,
								1e5,
								25e4,
								5e5
							].map((amount) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: String(amount),
								children: [
									"Up to ",
									mark,
									amount.toLocaleString("en-GB")
								]
							}, amount))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1.5 block text-sm font-medium",
							children: "Sort"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "field",
							value: search.sort,
							onChange: (event) => update({ sort: event.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "featured",
									children: "Featured"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "price-asc",
									children: "Price, low to high"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "price-desc",
									children: "Price, high to low"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						results.length,
						" ",
						results.length === 1 ? "business" : "businesses"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: buttonClass({ variant: "quiet" }),
					onClick: () => void navigate({ search: defaultBrowseSearch }),
					children: "Reset filters"
				})]
			}),
			results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-2xl border border-line bg-surface p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Nothing matches those filters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Widen the price, or clear the search. New businesses are added on the live site regularly."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: results.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm text-muted",
				children: [
					"Prices in the other currency use £1 = $",
					BROWSE_USD_PER_GBP,
					" and are marked ≈. The plan itself is £5 / $5, then £30 / $30 — those are the real prices, not a conversion."
				]
			})
		]
	});
}
//#endregion
export { BrowsePage as component };
