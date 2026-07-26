# 🛒 E-Commerce Fullstack (Nome Provisório)

## 📌 Visão Geral
Aplicação de e-commerce moderna e performática desenvolvida com a stack Fullstack JavaScript/TypeScript.
O projeto consome a API externa **DummyJSON** para exibir um catálogo rico em produtos, e utiliza uma infraestrutura própria no backend para gerenciar contas de usuários, carrinhos e checkout com **Stripe**.

---

## 🛠️ Tech Stack & Arquitetura

* **Frontend Framework:** Next.js (App Router) + React + TypeScript
* **Estilização & UI:** Tailwind CSS + Shadcn/ui
* **Banco de Dados Relacional:** PostgreSQL
* **ORM:** Drizzle ORM
* **Processamento de Pagamentos:** Stripe API (Test Mode)
* **API de Produtos:** DummyJSON API

---

## 🗺️ Roadmap de Desenvolvimento (Fases)

### Fase 1: Setup & Documentação (Atual)
- [x] Criação do projeto Next.js com App Router e TypeScript
- [x] Configuração do Shadcn/ui para o Design System
- [x] Estruturação de pastas (`src/types`, `src/services`, `src/components`, etc.)

### Fase 2: Interface & Consumo da DummyJSON (Frontend)
- [x] Definição das `interfaces` TypeScript para os produtos da DummyJSON
- [x] Criação dos componentes de Header, Footer e Product Card
- [ ] Implementação da Vitrine Principal (Home) com busca e filtros por categoria
- [ ] Criação da página de Detalhes do Produto (`/product/[id]`)

### Fase 3: Persistência & Banco de Dados (Backend)
- [ ] Configuração do PostgreSQL local/nuvem
- [ ] Definição dos Schemas do Drizzle (`users`, `cart_items`, `orders`)
- [ ] Criação do `CartContext` integrado com rotas do servidor para salvar o carrinho

### Fase 4: Integração Financeira & Webhooks
- [ ] Configuração da SDK do Stripe no Next.js
- [ ] Criação da Rota de API para gerar a Checkout Session
- [ ] Implementação do Webhook do Stripe para confirmar pagamentos e salvar pedidos

### Fase 5: Refinamento & Deploy
- [ ] Skeletons e Loading States com Tailwind/Shadcn
- [ ] Deploy do Banco de Dados no Supabase/Neon
- [ ] Deploy do Frontend/Backend na Vercel
- [ ] Atualização do `README.md` final com fotos e links