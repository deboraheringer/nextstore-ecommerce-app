# NextStore - E-Commerce App

A modern, full-stack e-commerce application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. 

The application consumes product data from the **DummyJSON API** and features interactive catalog navigation, debounced search autocomplete, category filtering, persistent shopping cart, PostgreSQL database integration, and hosted Stripe checkout payment integration.

🌐 **Live Demo (Vercel):** [https://nextstore-ecommerce-app.vercel.app/](https://nextstore-ecommerce-app.vercel.app/)

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** PostgreSQL (Neon Serverless)
- **Payments:** [Stripe API](https://stripe.com/)
- **Product Data:** [DummyJSON API](https://dummyjson.com/)

---

## Status & Roadmap

This project is currently under active development.

- [x] Initial project setup (Next.js + TypeScript + Tailwind)
- [x] UI System setup (Shadcn/ui)
- [x] API Service integration with DummyJSON
- [x] Persistent Shopping Cart (`CartContext` + `localStorage`)
- [x] Slide-over Cart Drawer (`CartSheet`) with quantity controls and SSR Hydration fix
- [x] Search Bar with real-time **Debounced Autocomplete** and `<Suspense>` boundary
- [x] Left Sidebar for **Category Filtering**
- [x] Homepage product grid with dynamic search and category URL params
- [x] Dynamic Product Details page (`/product/[id]`) with image gallery
- [x] Database schema definition (Drizzle ORM + PostgreSQL)
- [x] **Stripe Checkout Integration** (Session creation route + hosted checkout redirect)
- [x] **Post-Checkout Flow** (`/checkout/success` page with automatic cart cleanup)
- [x] **Vercel Deployment**
- [x] Visual Toast Notifications (`sonner`)
- [x] Stripe Webhooks for asynchronous order fulfillment

---

## Getting Started

First, set up your local environment variables in a `.env.local` file:

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Then, run the development server:

```bash
# Install dependencies
npm install 

# Run the development server
npm run dev

# Test the production build locally
npm run build
```
