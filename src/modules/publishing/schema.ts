import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

/**
 * ============================================================
 * MODULE PUBLISHING — SCHEMA DRIZZLE
 * ============================================================
 * Définit les tables propres au blog et à la publication sociale.
 */

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  imageType: text("image_type"),
  videoUrl: text("video_url"),
  documentUrl: text("document_url"),
  documentName: text("document_name"),
  publishedToLinkedIn: boolean("published_to_linkedin").default(false).notNull(),
  linkedInPostId: text("linkedin_post_id"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const linkedinTokens = pgTable("linkedin_tokens", {
  id: text("id").primaryKey().default("current"),
  accessToken: text("access_token").notNull(),
  userUrn: text("user_urn").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;

export type InsertLinkedinToken = typeof linkedinTokens.$inferInsert;
export type SelectLinkedinToken = typeof linkedinTokens.$inferSelect;
