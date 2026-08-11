import { pgTable, text, timestamp, integer, decimal, serial, jsonb } from "drizzle-orm/pg-core";

// Tabela de Usuários (para checkout e histórico)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabela de Pedidos
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  stripeSessionId: text("stripe_session_id").unique(),
  status: text("status").notNull().default("pending"), // pending, paid, cancelled
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  
  // Endereço recebido diretamente do Stripe Checkout (objeto estruturado)
  shippingAddress: jsonb("shipping_address"), 

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabela de Itens do Pedido
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").notNull(),
  productTitle: text("product_title").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
});