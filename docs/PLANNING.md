# Project Planning & Roadmap — NextStore

## Overview
A high-performance, full-stack e-commerce application built with JavaScript/TypeScript.
The application consumes the external **DummyJSON API** to power a rich product catalog while leveraging a custom backend infrastructure to manage user data, shopping carts, and financial transactions via **Stripe**.

---

## Tech Stack & Architecture

* **Frontend Framework:** Next.js (App Router) + React + TypeScript
* **Styling & UI:** Tailwind CSS + Shadcn/ui + Lucide Icons
* **Relational Database:** PostgreSQL (Neon Serverless)
* **ORM:** Drizzle ORM
* **Payment Processing:** Stripe API (Test Mode)
* **Product API:** DummyJSON API

---

## Development Roadmap (Phases)

### Phase 1: Setup & Documentation
- [x] Initialize Next.js project with App Router and TypeScript
- [x] Configure Shadcn/ui for Design System
- [x] Folder structure organization (`src/types`, `src/services`, `src/components`, etc.)

### Phase 2: Interface & External API Consumption (Frontend)
- [x] Define TypeScript `interfaces` for DummyJSON products
- [x] Build Header and Product Card components
- [x] Implement `CartContext` with `localStorage` persistence
- [x] Slide-over Cart Drawer (`CartSheet`) with quantity controls and subtotal calculation (Hydration fixed via `useSyncExternalStore`)
- [x] Real-time **Debounced Autocomplete** search bar
- [x] Add `<Suspense>` wrapper to fix SSG page prerendering
- [x] Sidebar for **Product Category Filtering**
- [x] Homepage showcase integrating search and category filters
- [x] Dynamic Product Details page (`/product/[id]`) with image gallery and quantity picker

### Phase 3: Persistence & Database (Backend)
- [x] PostgreSQL database setup (Neon DB)
- [x] Drizzle ORM schema configuration and database connection

### Phase 4: Financial Integration & Checkout Flow
- [x] Configure Stripe SDK in Next.js (`src/lib/stripe.ts`)
- [x] Create API Route `/api/checkout` for Stripe Checkout Session creation
- [x] Frontend checkout redirection handling
- [x] Success page (`/checkout/success`) with automatic cart clearing
- [x] Implement Stripe Webhooks (`/api/webhooks/stripe`) for asynchronous order fulfillment

### Phase 5: Refinement & Deployment
- [x] Deploy Frontend and Database connection on Vercel
- [x] Add visual Feedback Toasts using `sonner` for cart actions
- [ ] Skeletons & Loading States with Tailwind/Shadcn
- [ ] Final README documentation update with live production link