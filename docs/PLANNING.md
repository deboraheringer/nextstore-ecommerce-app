# E-Commerce Fullstack (NextStore)

## Visão Geral
Aplicação de e-commerce moderna e performática desenvolvida com a stack Fullstack JavaScript/TypeScript.
O projeto consome a API externa **DummyJSON** para exibir um catálogo rico em produtos, e utiliza uma infraestrutura própria no backend para gerenciar contas de usuários, carrinhos e checkout com **Stripe**.

---

## Tech Stack & Arquitetura

* **Frontend Framework:** Next.js (App Router) + React + TypeScript
* **Estilização & UI:** Tailwind CSS + Shadcn/ui + Lucide Icons
* **Banco de Dados Relacional:** PostgreSQL
* **ORM:** Drizzle ORM
* **Processamento de Pagamentos:** Stripe API (Test Mode)
* **API de Produtos:** DummyJSON API

---

## Roadmap de Desenvolvimento (Fases)

### Fase 1: Setup & Documentação
- [x] Criação do projeto Next.js com App Router e TypeScript
- [x] Configuração do Shadcn/ui para o Design System
- [x] Estruturação de pastas (`src/types`, `src/services`, `src/components`, etc.)

### Fase 2: Interface & Consumo da DummyJSON (Frontend)
- [x] Definição das `interfaces` TypeScript para os produtos da DummyJSON
- [x] Criação dos componentes de Header e Product Card
- [x] Implementação do `CartContext` com persistência no `localStorage`
- [x] Gaveta lateral do carrinho (`CartSheet`) com controles de quantidade e subtotal
- [x] Barra de pesquisa com **Autocomplete/Sugestões em tempo real** (Debounced)
- [x] Barra lateral esquerda (Sidebar) para **Filtro de Produtos por Categoria**
- [x] Implementação da Vitrine Principal (Home) com integração total de busca e categorias
- [x] Criação da página de Detalhes do Produto (`/product/[id]`) com galeria de imagens e seletor de quantidade

### Fase 3: Persistência & Banco de Dados (Backend - Próxima)
- [ ] Configuração do PostgreSQL local/nuvem
- [ ] Definição dos Schemas do Drizzle (`users`, `cart_items`, `orders`)
- [ ] Migração do carrinho e sessão para persistência via banco de dados

### Fase 4: Integração Financeira & Webhooks
- [ ] Configuração do SDK do Stripe no Next.js
- [ ] Criação da Rota de API para gerar a Checkout Session
- [ ] Implementação do Webhook do Stripe para confirmar pagamentos e salvar pedidos

### Fase 5: Refinamento & Deploy
- [ ] Skeletons e Loading States com Tailwind/Shadcn
- [ ] Deploy do Banco de Dados no Supabase/Neon
- [ ] Deploy do Frontend/Backend na Vercel
- [ ] Atualização do `README.md` final com fotos e links de demonstração