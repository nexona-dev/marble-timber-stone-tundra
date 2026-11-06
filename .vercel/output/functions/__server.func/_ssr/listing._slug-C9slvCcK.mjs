import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as draftToListing, h as listings, l as categoryLabel, o as QUESTIONS, v as usePreview } from "./market-Zpszcjqc.mjs";
import { i as Heart } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-BxugoFHj.mjs";
import { i as Page, n as ListingCard, o as buttonClass, r as Money, s as cn, t as ListingArt } from "./site-oGK8lRGm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing._slug-C9slvCcK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ListingPage() {
	const { slug } = Route.useParams();
	const { drafts, currency, saved, toggleSaved, addThread } = usePreview();
	const listing = (0, import_react.useMemo)(() => findListing(slug, drafts), [slug, drafts]);
	if (!listing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl font-extrabold",
			children: "That listing is not in this preview"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/browse",
			search: {
				q: "",
				category: "all",
				country: "all",
				sort: "featured",
				max: ""
			},
			className: buttonClass({ className: "mt-6" }),
			children: "Back to businesses"
		})]
	}) });
	const related = listings.filter((item) => item.slug !== listing.slug && item.category === listing.category).slice(0, 3);
	const on = saved.includes(listing.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/browse",
				search: {
					q: "",
					category: "all",
					country: "all",
					sort: "featured",
					max: ""
				},
				className: "text-sm font-semibold text-primary",
				children: "All businesses"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid items-start gap-8 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-2xl border border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingArt, {
								id: listing.art,
								label: categoryLabel(listing.category)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 text-xs font-semibold tracking-widest text-primary uppercase",
							children: [
								listing.kind === "example" ? "Example listing" : listing.kind === "draft" ? "Your draft" : "On the marketplace",
								" · ",
								listing.country
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-4xl font-extrabold text-fg",
							children: listing.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted",
							children: [
								listing.location,
								" · ",
								categoryLabel(listing.category),
								listing.established ? ` · Est. ${listing.established}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base text-muted",
							children: listing.detail
						}),
						listing.kind === "example" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Shown so you can judge the page. It is not a live listing."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
									label: "Asking price",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
										value: listing.asking,
										view: currency,
										empty: "Price on request"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
									label: "Revenue",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
										value: listing.revenue,
										view: currency
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
									label: "Profit",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
										value: listing.profit,
										view: currency
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
									label: "Where",
									children: listing.location
								})
							]
						}),
						listing.published.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold",
								children: "As published"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2 text-sm text-muted",
								children: listing.published.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-l-2 border-primary pl-3",
									children: item
								}, item))
							})]
						}),
						listing.included.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold",
								children: "Included"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex flex-wrap gap-2",
								children: listing.included.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "rounded-full border border-line px-3 py-2 text-sm text-fg",
									children: item
								}, item))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold",
								children: "Worth asking"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-3",
								children: QUESTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-fg",
									children: item.q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: item.a
								})] }, item.q))
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "lg:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Asking price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-4xl font-extrabold text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
									value: listing.asking,
									view: currency,
									empty: "Price on request"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": on,
								onClick: () => toggleSaved(listing.slug),
								className: buttonClass({
									variant: "surface",
									className: "mt-4 w-full"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", on && "fill-accent text-accent") }), on ? "Saved to your shortlist" : "Save to shortlist"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {
								listing,
								onSend: (message) => addThread({
									listingSlug: listing.slug,
									listingName: listing.name,
									from: message.from,
									email: message.email,
									body: message.body
								})
							})
						]
					})
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-2xl font-extrabold",
					children: ["More in ", categoryLabel(listing.category).toLowerCase()]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-4 md:grid-cols-3",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing: item }, item.slug))
				})]
			})
		]
	}) });
}
function Fact({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs font-semibold tracking-widest text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-lg font-bold text-fg",
			children
		})]
	});
}
function ContactForm({ listing, onSend }) {
	const [from, setFrom] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)(`I’m interested in ${listing.name}. Could you share the last 12 months of accounts, and why you are selling?`);
	const [error, setError] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-5 text-sm text-muted",
		role: "status",
		children: "Saved to the dashboard preview in this browser. On the live site this goes to the owner. Nothing was sent from here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-5 space-y-3",
		onSubmit: (event) => {
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
			onSend({
				from: from.trim(),
				email: email.trim(),
				body: body.trim()
			});
			setSent(true);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-bold text-fg",
				children: "Message the owner"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: ["Your name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mt-1.5",
					value: from,
					onChange: (event) => setFrom(event.target.value),
					autoComplete: "name"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mt-1.5",
					type: "email",
					value: email,
					onChange: (event) => setEmail(event.target.value),
					autoComplete: "email"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "field mt-1.5",
					value: body,
					onChange: (event) => setBody(event.target.value)
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-fg",
				role: "alert",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: buttonClass({ className: "w-full" }),
				children: "Send message"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Stays in this browser. This preview does not email anyone."
			})
		]
	});
}
function findListing(slug, drafts) {
	return listings.find((item) => item.slug === slug) ?? drafts.map(draftToListing).find((item) => item.slug === slug) ?? null;
}
//#endregion
export { ListingPage as component };
