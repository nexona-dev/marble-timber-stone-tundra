import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, Y as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as symbol, d as draftToListing, i as PLAN, p as formatMoney, r as CATEGORIES, v as usePreview } from "./market-Zpszcjqc.mjs";
import { a as Shell, n as ListingCard, o as buttonClass } from "./site-oGK8lRGm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sell-patigPdu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SellPage() {
	const { currency, addDraft } = usePreview();
	const navigate = useNavigate();
	const mark = symbol(currency);
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("food");
	const [country, setCountry] = (0, import_react.useState)(currency === "usd" ? "USA" : "UK");
	const [location, setLocation] = (0, import_react.useState)("");
	const [asking, setAsking] = (0, import_react.useState)("80000");
	const [summary, setSummary] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const amount = Number(asking);
	const preview = draftToListing({
		id: "preview",
		name: name.trim() || "Your business",
		category,
		location: location.trim() || "Location",
		country,
		asking: Number.isFinite(amount) && amount > 0 ? amount : 0,
		currency,
		summary: summary.trim() || "A short description buyers can read before they message you.",
		createdAt: ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		eyebrow: "For sellers",
		title: `List for ${mark}${PLAN.start}. Then ${mark}${PLAN.month} a month.`,
		lede: "Keep 100% of the sale. Buyers contact you directly. Cancel anytime. No commission, ever.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-start gap-8 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-px overflow-hidden rounded-2xl border border-line bg-line",
						children: [
							[`${mark}${PLAN.start}`, "To start"],
							[`${mark}${PLAN.month}`, "Each month, while the listing is up"],
							["0%", "Taken from the sale price"]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "bg-surface px-5 py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-4xl font-extrabold text-fg tabular-nums",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: v
							})]
						}, v))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-6 space-y-3 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your listing stays up while the plan is active." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Buyers message you from the listing. There is no broker in the thread." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You agree the price. We do not take a cut." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Cancel anytime. A year of the plan is ",
								formatMoney(PLAN.year, currency),
								", before the ",
								formatMoney(PLAN.start, currency),
								" start."
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: [
							"This page does not take payment. On the live site the ",
							mark,
							PLAN.start,
							" start continues to checkout. Staging checkout stays off until you approve the look."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rounded-2xl border border-line bg-surface p-5 md:p-6",
					onSubmit: (event) => {
						event.preventDefault();
						if (name.trim().length < 2) {
							setError("Add the business name.");
							return;
						}
						if (location.trim().length < 2) {
							setError("Add a town or city.");
							return;
						}
						if (!Number.isFinite(amount) || amount <= 0) {
							setError("Add an asking price, or leave it as a round number buyers can read.");
							return;
						}
						if (summary.trim().length < 20) {
							setError("Write at least a sentence buyers can skim.");
							return;
						}
						setError("");
						const id = addDraft({
							name: name.trim(),
							category,
							location: location.trim(),
							country,
							asking: Math.round(amount),
							currency,
							summary: summary.trim()
						});
						navigate({
							to: "/listing/$slug",
							params: { slug: `draft-${id}` }
						});
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-extrabold",
							children: "Preview a listing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Same fields a seller fills in. Saving it only updates this preview — Directorist, WooCommerce and checkout are untouched."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm md:col-span-2",
									children: ["Business name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field mt-1.5",
										value: name,
										onChange: (event) => setName(event.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: ["Category", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "field mt-1.5",
										value: category,
										onChange: (event) => setCategory(event.target.value),
										children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: item.id,
											children: item.label
										}, item.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: ["Country", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "field mt-1.5",
										value: country,
										onChange: (event) => setCountry(event.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "UK",
											children: "United Kingdom"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "USA",
											children: "United States"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: ["Location", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field mt-1.5",
										value: location,
										onChange: (event) => setLocation(event.target.value),
										placeholder: "Town or city"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: [
										"Asking price (",
										mark,
										")",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field mt-1.5",
											inputMode: "decimal",
											value: asking,
											onChange: (event) => setAsking(event.target.value)
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm md:col-span-2",
									children: ["Summary", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										className: "field mt-1.5",
										value: summary,
										onChange: (event) => setSummary(event.target.value),
										placeholder: "What is for sale, and what a buyer should know first."
									})]
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-medium",
							role: "alert",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: buttonClass({ className: "mt-4" }),
							children: "Save draft and view it"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 max-w-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, {
						listing: {
							...preview,
							asking: Number.isFinite(amount) && amount > 0 ? preview.asking : null
						},
						linked: false
					})
				})]
			})]
		})
	});
}
//#endregion
export { SellPage as component };
