import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as symbol, c as brokerFee, h as listings, i as PLAN, o as QUESTIONS, p as formatMoney, r as CATEGORIES, s as SALE_STEPS, t as BROKER_RATES, u as defaultBrowseSearch, v as usePreview } from "./market-Zpszcjqc.mjs";
import { i as Page, n as ListingCard, o as buttonClass, s as cn } from "./site-oGK8lRGm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-cfY7jE8j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SavingsCalculator() {
	const { currency } = usePreview();
	const [index, setIndex] = (0, import_react.useState)(SALE_STEPS.indexOf(2e5));
	const [rate, setRate] = (0, import_react.useState)(10);
	const sale = SALE_STEPS[index] ?? 2e5;
	const broker = brokerFee(sale, rate);
	const saved = broker - PLAN.year;
	const max = Math.max(broker, PLAN.year, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "savings",
		className: "rounded-2xl border border-line bg-surface p-5 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-widest text-primary uppercase",
				children: "Savings calculator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-2xl font-extrabold text-fg",
				children: "What a broker would keep"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Twelve months here is ",
					formatMoney(PLAN.year, currency),
					". The ",
					formatMoney(PLAN.start, currency),
					" start is separate. Move the sale price — the fee does not change with it."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-4xl font-extrabold text-fg tabular-nums",
				children: formatMoney(sale, currency)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block text-sm text-muted",
				children: ["Sale price", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "mt-2",
					type: "range",
					min: 0,
					max: SALE_STEPS.length - 1,
					step: 1,
					value: index,
					"aria-valuetext": formatMoney(sale, currency),
					onChange: (event) => setIndex(Number(event.target.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				role: "group",
				"aria-label": "Broker rate",
				children: BROKER_RATES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": rate === item,
					onClick: () => setRate(item),
					className: cn("min-h-11 rounded-xl border text-sm font-semibold", rate === item ? "border-primary bg-primary text-on-primary" : "border-line bg-bg text-muted hover:text-fg"),
					children: [item, "%"]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: `${rate}% broker`,
					amount: formatMoney(broker, currency),
					width: broker / max * 100,
					tone: "line"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: "SellBizOnline, 12 months",
					amount: formatMoney(PLAN.year, currency),
					width: Math.max(PLAN.year / max * 100, 2),
					tone: "primary"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-5 font-display text-3xl font-extrabold tabular-nums", saved > 0 ? "text-accent" : "text-fg"),
				children: saved > 0 ? formatMoney(saved, currency) : formatMoney(broker, currency)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: saved > 0 ? `more stays with you than a ${rate}% fee. Add ${formatMoney(PLAN.start, currency)} to start, then ${formatMoney(PLAN.month, currency)} a month. Cancel anytime.` : `is the broker fee at ${rate}% — less than ${formatMoney(PLAN.year, currency)} for a year here. The flat price is built for ordinary sales, not tiny ones.`
			})
		]
	});
}
function Bar({ label, amount, width, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-baseline justify-between gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold text-fg tabular-nums",
			children: amount
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 overflow-hidden rounded-full bg-raised",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full", tone === "primary" ? "bg-primary" : "bg-muted"),
			style: { width: `${Math.min(100, Math.max(width, 2))}%` }
		})
	})] });
}
function Comparison() {
	const { currency } = usePreview();
	const mark = symbol(currency);
	const rows = [
		[
			"Cost to sell",
			`Flat ${mark}30 a month`,
			"Typically 5–15% of the sale price"
		],
		[
			"Commission",
			"0%",
			"Often thousands in fees"
		],
		[
			"Upfront cost",
			`${mark}5 to start`,
			"Often retainers or listing fees"
		],
		[
			"Who you deal with",
			"Buyers, directly",
			"A go-between"
		],
		[
			"Commitment",
			"Cancel anytime",
			"Often a fixed-term agreement"
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCard, {
				title: "SellBizOnline",
				emphasis: true,
				rows: rows.map(([label, ours]) => [label, ours])
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCard, {
				title: "Traditional brokers",
				rows: rows.map(([label, , theirs]) => [label, theirs])
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden overflow-hidden rounded-2xl border border-line md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-4 font-medium text-muted",
							scope: "col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Item"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-4 font-display text-base font-bold text-primary",
							scope: "col",
							children: "SellBizOnline"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-4 font-display text-base font-bold text-fg",
							scope: "col",
							children: "Traditional brokers"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map(([label, ours, theirs]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "bg-raised px-4 py-4 font-medium text-muted",
							scope: "row",
							children: label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-surface px-4 py-4 font-semibold text-fg",
							children: ours
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-bg px-4 py-4 text-muted",
							children: theirs
						})
					]
				}, label)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				"Selling for ",
				formatMoney(2e5, currency),
				"? A broker at 10% keeps ",
				formatMoney(2e4, currency),
				". A year here is ",
				formatMoney(PLAN.year, currency),
				". Try another price in the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#savings",
					className: "font-semibold text-primary",
					children: "calculator"
				}),
				"."
			]
		})
	] });
}
function CompareCard({ title, rows, emphasis = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `rounded-2xl border p-5 ${emphasis ? "border-primary/50 bg-surface" : "border-line bg-surface"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: `text-lg font-bold ${emphasis ? "text-primary" : "text-fg"}`,
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-4 space-y-3",
			children: rows.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs font-semibold tracking-widest text-muted uppercase",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 text-sm font-semibold text-fg",
				children: value
			})] }, label))
		})]
	});
}
function Home() {
	const { currency } = usePreview();
	const mark = symbol(currency);
	const featured = listings.filter((listing) => listing.featured);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-8 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-primary uppercase",
							children: "USA · UK · Worldwide"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 text-4xl font-extrabold text-fg sm:text-5xl",
							children: [
								"List your business for ",
								mark,
								"5. Keep 100% of the sale."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base text-muted",
							children: "Reach buyers in the USA, UK and worldwide. Start with £5 / $5, then £30 / $30 a month. We never take commission when you sell. Buyers contact you directly. Cancel anytime."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/sell",
								className: buttonClass(),
								children: [
									"List my business for ",
									mark,
									"5"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/browse",
								search: defaultBrowseSearch,
								className: buttonClass({ variant: "surface" }),
								children: "Browse businesses"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsCalculator, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4",
				children: [
					{
						k: "0%",
						v: "Commission when you sell",
						emphasis: true
					},
					{
						k: `${mark}5`,
						v: "To start",
						emphasis: false
					},
					{
						k: `${mark}30`,
						v: "Then each month",
						emphasis: false
					},
					{
						k: "Direct",
						v: "You deal with the owner",
						emphasis: false
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "bg-surface px-4 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `font-display text-3xl font-extrabold tabular-nums ${item.emphasis ? "text-primary" : "text-fg"}`,
						children: item.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: item.v
					})]
				}, item.v))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeSearch, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold text-fg",
						children: "Businesses of the week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted",
						children: "Three businesses taken from the public marketplace. The other cards are examples, so the layout can be judged before anything goes live."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/browse",
						search: defaultBrowseSearch,
						className: "hidden text-sm font-semibold text-primary sm:inline",
						children: "See all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 md:grid-cols-3",
					children: featured.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "how",
				className: "mt-16 scroll-mt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold text-fg",
						children: "Buy a business in three steps"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-muted",
						children: "Find it, ask the right questions, and agree the deal with the owner."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-6 grid gap-4 md:grid-cols-3",
						children: [
							[
								"01",
								"Search and shortlist",
								"Use the search and filters to find businesses that fit your budget and interests. Open a listing to see the details."
							],
							[
								"02",
								"Contact the owner",
								"Send a message and ask for what you need: accounts, traffic, customers, reasons for selling."
							],
							[
								"03",
								"Agree the deal",
								"Negotiate directly. We never take a cut, so the price you agree is the price you pay the seller."
							]
						].map(([n, title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-line bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-sm font-bold text-primary",
									children: n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 text-xl font-bold text-fg",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: body
								})
							]
						}, n))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-extrabold text-fg",
					children: "Looking to buy a business? Start here."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2",
					children: [
						["Deal direct", "Message sellers straight from the listing and get first-hand answers."],
						["Every kind of business", "Online, e-commerce, shops, restaurants, tech, digital assets and property."],
						["Search your way", "Filter by category, location, asking price, revenue and profit."],
						["Fresh listings", "New businesses are added regularly, so check back often."]
					].map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-fg",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: body
						})]
					}, title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-3xl text-3xl font-extrabold text-fg md:text-4xl",
						children: "Why pay a broker 5–15% when you don’t have to?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: [
							"Traditional brokers take a share of your sale price. We charge one flat monthly rate —",
							" ",
							formatMoney(PLAN.month, currency),
							" — and nothing when the business sells."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comparison, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "questions",
				className: "mt-16 scroll-mt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold text-fg",
						children: "Questions worth asking any seller"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: "Buying directly means you lead the conversation. These help you decide with confidence."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-2xl border border-line bg-surface px-5",
						children: QUESTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "border-b border-line py-4 last:border-b-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								className: "flex min-h-11 items-center justify-between gap-4 font-display text-base font-bold text-fg",
								children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									"aria-hidden": "true",
									children: "+"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pt-2 text-sm text-muted",
								children: item.a
							})]
						}, item.q))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "General guidance only. Always do your own due diligence and take professional advice before buying."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 rounded-2xl border border-line bg-surface px-5 py-8 md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold text-fg",
						children: "Buy. Sell. Grow."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-muted",
						children: "Deal direct, with no commission and no broker in the middle. The same plan on either side of the Atlantic: £5 / $5 to start, then £30 / $30 a month."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/sell",
							className: buttonClass(),
							children: [
								"Start my ",
								mark,
								"5 listing"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/browse",
							search: defaultBrowseSearch,
							className: buttonClass({ variant: "surface" }),
							children: "Start searching"
						})]
					})
				]
			})
		]
	}) });
}
function HomeSearch() {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-extrabold text-fg",
					children: "Businesses, brands and digital assets for sale"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 grid gap-3 md:grid-cols-12",
				onSubmit: (event) => {
					event.preventDefault();
					navigate({
						to: "/browse",
						search: {
							...defaultBrowseSearch,
							q,
							category
						}
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "md:col-span-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Search businesses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: q,
							onChange: (event) => setQ(event.target.value),
							placeholder: "Search by name, place or trade"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "md:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "field",
							value: category,
							onChange: (event) => setCategory(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All categories"
							}), CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: buttonClass({ className: "md:col-span-3" }),
						type: "submit",
						children: "Search"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: CATEGORIES.map((item) => {
					const count = listings.filter((listing) => listing.category === item.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/browse",
						search: {
							...defaultBrowseSearch,
							category: item.id
						},
						className: "inline-flex min-h-11 items-center rounded-full border border-line px-3 text-sm text-muted hover:border-primary hover:text-fg",
						children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-fg/60",
							children: count
						})]
					}, item.id);
				})
			})
		]
	});
}
//#endregion
export { Home as component };
