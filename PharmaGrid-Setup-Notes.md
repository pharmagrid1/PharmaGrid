# PharmaGrid — Full Project Notes
**Team:** Anjeza Murati & Merita Aliu | **Company:** Desoft | **Date:** June 2026 | **Budget:** €1,000

---

## 1. Licensing
- No special AI license needed — code written with Claude is fully owned by us
- All dependencies (Angular, Express, JWT, pg) are **MIT licensed** — safe for commercial use
- No licensing blockers for production deployment
- If Claude API is ever called at runtime inside PharmaGrid, an Anthropic API key is required

---

## 2. Database — Move from Supabase to Neon
**Supabase free tier is not suitable for production** — auto-pauses after 7 days of inactivity.

**Recommended: Neon** — drop-in PostgreSQL replacement, zero code changes needed.

| | Supabase | Neon (recommended) |
|---|---|---|
| Price (prod) | €25/mo | €19/mo |
| Auto-pause | Yes (free tier) | No |
| Backups | Daily (Pro) | Daily (Pro) |
| Migration effort | — | Zero (same pg client) |

> If patient/health data (PHI) is ever stored, switch to AWS RDS + HIPAA BAA. Decision deferred.

---

## 3. Budget Breakdown (€1,000)

### Tech & Infrastructure
| Item | Cost |
|---|---|
| Hosting — Render/Railway (6 months) | €120 |
| Database — Neon Pro (6 months) | €114 |
| Domain (1 year) | €15 |
| **Subtotal** | **€249** |

### Partnership Materials
| Item | Cost |
|---|---|
| Printed proposals (15 copies) | €30 |
| Business cards (200 cards) | €25 |
| Logo/brand kit | €0 (already prepared) |
| **Subtotal** | **€55** |

### Packaging (initial batch ~50-100 units)
| Item | Cost |
|---|---|
| Kraft boxes — white or teal (50 units) | €45 |
| Wrapping paper sheets | €15 |
| Custom logo stamp | €35 |
| Customized bow roll | €20 |
| Logo stickers (100 units) | €30 |
| **Subtotal** | **€145** |

### Marketing
| Item | Cost |
|---|---|
| Instagram & Facebook ads (launch campaign) | €300 |
| **Subtotal** | **€300** |

### Product Stock
| Item | Cost |
|---|---|
| Initial inventory from partner brands | €200 |
| **Subtotal** | **€200** |

### Buffer
| Item | Cost |
|---|---|
| Misc / unexpected | **€51** |

### **TOTAL: €1,000**
> Ongoing after launch: ~€50/mo (hosting + DB)
> **Tip:** Negotiate consignment agreements with brands — they provide stock, you pay only after selling. This frees the €200 product budget for more marketing.

---

## 4. JIRA Project Setup
> **Note:** Atlassian had an active incident on June 23 — retry account creation if it failed.

**Setup:** jira.atlassian.com → Create Project → Scrum → Name: `PharmaGrid`

### Epics & Timeline
| Epic | Timeline | Goal |
|---|---|---|
| Brand Research & Outreach | Weeks 1–3 | Identify 3-5 local MK brands |
| Platform Finalization | Weeks 3–6 | Frontend, catalog, ordering, COD flow, delivery tracking |
| Brand Onboarding | Weeks 6–8 | Catalogs, pricing, brand profiles |
| Pilot Launch | Weeks 8–10 | Live ordering + feedback |
| Optimization & Growth | Ongoing | Refine, expand |

### Stories — Brand Research & Outreach
- Research local pharma/wellness brands in North Macedonia
- Prepare partnership proposal document
- Contact 10+ brand founders
- Secure agreements with 3-5 brands

### Stories — Platform Finalization
- Finalize product catalog UI
- Implement ordering flow end-to-end (COD only — no online payment)
- Build delivery status tracking (visible to both user and admin)
- Email/message notifications for delivery status updates
- Admin panel for products/orders
- Deploy to production

### Stories — Brand Onboarding
- Upload product catalogs per partner brand
- Set up pricing and stock management
- Create brand profile pages
- Internal end-to-end testing

### Stories — Pilot Launch
- Soft launch with partner brands
- Monitor orders and consumer feedback
- Bug fixes and UX improvements

---

## 5. Business Model Canvas

| Block | Content |
|---|---|
| **Customer Segments** | Local pharma/wellness brands (3-5 to start) — small, newly founded or growing brands in North Macedonia that lack a structured distribution channel. End consumers in North Macedonia. Future: brands and consumers in neighboring Balkan markets (Kosovo, Albania, etc.) |
| **Value Proposition** | For brands: First professional digital distributor giving small local brands a credible, structured path to market — no need to build their own e-commerce. For consumers: One trusted platform to discover and order local pharma/wellness products with full transparency and simplicity |
| **Channels** | PharmaGrid web platform (main ordering & discovery channel) · Direct outreach to brand founders via email, LinkedIn, phone · Instagram & Facebook paid ads · Word of mouth through brand partner networks · Future: SEO, influencers |
| **Customer Relationships** | Brands: Personal 1-on-1 onboarding, dedicated pilot support, regular check-ins, transparent communication, no hidden fees. Consumers: Self-service ordering, clear product info, responsive support, post-order feedback loops |
| **Revenue Streams** | Phase 1: 10-15% commission per order · Phase 2: Monthly brand listing fee (€50-100/mo per brand) · Phase 3: Premium brand profiles & featured placement · Future: Regional expansion (Kosovo, Albania) |
| **Key Resources** | Tech: Angular frontend, Node/Express backend, Neon PostgreSQL, Stripe, Render/Railway hosting. Human: Anjeza + Merita. Brand partnerships. Product content from brands |
| **Key Activities** | Platform development & maintenance · Brand outreach & negotiations · Order management · Customer support · Social media marketing · Feedback collection & iteration |
| **Key Partners** | 3-5 local pharma/wellness brands · Stripe (payments) · Neon/Render (infrastructure) · Desoft (company backing) · Future: logistics & delivery partners |
| **Cost Structure** | Tech €249 · Partnership materials €55 · Packaging €145 · Marketing €300 · Product stock €200 · Buffer €51 = **Total €1,000** · Ongoing: ~€50/mo |

### Revenue Viability
- 3 brands × avg order €30 × 10 orders/month = €900 revenue → 12% commission = **~€108/month**
- 5 brands × 20 orders/month = **~€360/month** — covers all ongoing costs and profitable

---

## 6. Value Proposition Canvas

### Customer Profile (right circle)

**Jobs to be Done:**
- Functional: Get products to market without building an own online shop. Manage orders, stock, and product catalog in a structured way.
- Emotional: Be taken seriously and represented professionally as a new local brand. Gain consumer trust without years of market experience.
- Social: Be recognized as an innovative local brand — seen by consumers, partners, and the North Macedonian market as a credible and reliable provider.

**Pains:**
- The primary problem is the stress and frustration of trying to reach consumers as a small local brand — no clear path to market, no professional channel, no support system.
- Fear of losing sales, customers, and visibility because there is no structured system to manage orders, track stock, and ensure products reach buyers reliably.
- Small brands feel lost due to the complexity of building distribution alone — no clear, official channel exists in North Macedonia for newly founded pharma/wellness brands.

**Gains:**
- Ease and Simplicity: A clear, straightforward process for brands to get their products listed and selling — no technical knowledge or complex setup required.
- Emotional Relief and Peace of Mind: Knowing that your brand is professionally represented, orders are managed, and products are reaching real consumers through a trusted platform.
- Time Saving: Avoiding months of building your own distribution, negotiating individual sales channels, and handling logistics alone — PharmaGrid handles it from day one.

### Value Map (left square)

**Products & Services:**
- A verified brand onboarding process where partner brands submit documents, product catalogs, and agreements through a dedicated section of the PharmaGrid platform.
- A secure and stable platform that handles orders, stock management, and payments reliably — built on Angular, Node/Express, and Neon PostgreSQL with professional hosting.
- The ability for brands to authorize a designated account manager to manage their products, orders, and profile on PharmaGrid on their behalf.

**Pain Relievers:**
- PharmaGrid reduces the stress of going to market by providing a clear, structured, and supportive path — brands focus on their products, we handle the distribution.
- No need to negotiate individual sales agreements, set up payment systems, or build logistics from scratch — a simple, ready-to-use online process for everything.
- By guaranteeing a professional and permanent presence on the platform, brands never lose customers due to lack of visibility or an unstructured sales process.

**Gain Creators:**
- First trusted digital distributor for new local MK brands — instant market presence through a ready-built platform, no development costs needed.
- Professional brand profiles build credibility from day one — consumers trust PharmaGrid as a vetted channel.
- Time saving: Brands skip months of setup — PharmaGrid gets them live within days of onboarding.
- Future expansion to Kosovo & Albania opens new markets without extra work from the brand.

---

## 7. Brand Identity

### Logo Suite
- **3 color variants:** Gold, Teal, Black
- **3 formats:** Full logotype, Responsive lockup (wordmark + monogram), Monogram icon only
- **Monogram:** Elegant intertwined "PG" script — premium, botanical feel
- **Taglines:** *"Premium Beauty & Wellness"* / *"Curated Local Wellness"*

### Color Palette
- **Teal** — primary brand color (packaging, bags, tissue paper)
- **Gold** — premium accent (logo, ad campaigns)
- **White/Cream** — clean base for boxes and product cards
- **Warm beige/stone** — background photography tones

### Packaging Vision
- White kraft boxes with teal tissue paper lining and PG monogram
- Teal gift boxes with white ribbon and PharmaGrid sticker seal
- Teal shopping bags with gold monogram
- Stand-up pouches for smaller products

### Social Media Direction (Instagram)
- **Bio:** *"Curated Local Wellness — Curating the best local skincare & wellness brands. Shop local, glow local."*
- **Handle:** @PharmaGrid
- **Content pillars:**
  - Product showcases (*Nourish. Glow. Repeat.*)
  - Local maker spotlights (*Behind the Grid: The Maker Story*)
  - Botanical/nature photography
  - Brand promise (*Local Brands, Global Standards.*)

### Brand Messaging
| Tagline | Use |
|---|---|
| *Nourish. Glow. Repeat.* | Primary campaign slogan |
| *Curated Local Wellness* | Sub-brand descriptor |
| *Local Brands, Global Standards.* | Trust/quality promise |
| *The Grid. Curated for you.* | Platform identity |
| *Shop local, glow local.* | Hashtag + closing line |

---

## 8. Next Steps
1. **JIRA** — retry account creation (Atlassian incident resolved)
2. **Miro** — both canvases complete
3. **Payment** — ~~Stripe~~ **COD (Cash on Delivery) only** — no online payment integration needed
4. **Ordering flow** — implement COD checkout + order confirmation
5. **Delivery tracking** — build delivery status tracker (visible to both user and admin)
6. **Notifications** — email/message alerts for delivery status updates
7. **Production deployment** — migrate DB from Supabase to Neon, deploy backend + frontend
8. **Brand outreach** — begin identifying 3-5 local pharma/wellness brands in North Macedonia; upon deal, provide teal bubble packaging + PharmaGrid logo stickers for order packing
9. **Revenue model** — commission from brand sales; future: featured placement (top of listings, homepage, email ads)
10. **Instagram** — set up @PharmaGrid account and begin content planning
