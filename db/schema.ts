import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  isEditor: boolean("is_editor").default(false).notNull()
});

export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  path: text("path").unique().notNull(),
  order_index: integer("order_index").notNull()
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  path: text("path").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  authorId: integer("author_id").references(() => users.id),
  sectionId: integer("section_id").references(() => sections.id),
  sentimentScore: real("sentiment_score").default(0).notNull(),
  constitutionalityScore: real("constitutionality_score").default(0).notNull(),
  legalRiskScore: real("legal_risk_score").default(0).notNull(),
  implementationRiskScore: real("implementation_risk_score").default(0).notNull()
});

export const revisions = pgTable("revisions", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id").references(() => articles.id),
  content: text("content").notNull(),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertArticleSchema = createInsertSchema(articles);
export const selectArticleSchema = createSelectSchema(articles);
export const insertSectionSchema = createInsertSchema(sections);
export const selectSectionSchema = createSelectSchema(sections);

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;
export type SelectArticle = typeof articles.$inferSelect;
export type InsertSection = typeof sections.$inferInsert;
export type SelectSection = typeof sections.$inferSelect;