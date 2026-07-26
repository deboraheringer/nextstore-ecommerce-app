# NextStore - E-Commerce App

A modern, full-stack e-commerce application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. 

The application consumes product data from the **DummyJSON API** and features interactive catalog navigation, debounced search autocomplete, category filtering, persistent shopping cart, PostgreSQL database management, and Stripe payment integration.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** PostgreSQL
- **Payments:** [Stripe API](https://stripe.com/)
- **Product Data:** [DummyJSON API](https://dummyjson.com/)

---

## Status & Roadmap

This project is currently under active development.

- [x] Initial project setup (Next.js + TypeScript + Tailwind)
- [x] UI System setup (Shadcn/ui)
- [x] API Service integration with DummyJSON
- [x] Persistent Shopping Cart (`CartContext` + `localStorage`)
- [x] Slide-over Cart Drawer (`CartSheet`) with quantity controls
- [x] Search Bar with real-time **Debounced Autocomplete**
- [x] Left Sidebar for **Category Filtering**
- [x] Homepage product grid with dynamic search and category URL params
- [x] Dynamic Product Details page (`/product/[id]`) with image gallery
- [ ] Database schema definition (Drizzle ORM + PostgreSQL)
- [ ] Stripe checkout integration

---

## Getting Started

First, run the development server:

```bash
npm run dev