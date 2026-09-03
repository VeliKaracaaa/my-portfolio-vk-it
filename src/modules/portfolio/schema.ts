import { pgTable, text, timestamp, uuid, boolean, jsonb } from "drizzle-orm/pg-core";
import type { CVData } from "./types";

/**
 * ============================================================
 * MODULE PORTFOLIO — SCHEMA DRIZZLE
 * ============================================================
 * Schéma pour stocker les demandes d'inspiration et ressources clients.
 */

export const clientInspirations = pgTable("client_inspirations", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  colorPersonality: text("color_personality").notNull(),
  websitePersonality: text("website_personality").notNull(),
  likedElements: text("liked_elements").notNull(),
  status: text("status").default("pending").notNull(), // 'pending', 'reviewed', 'archived'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertClientInspiration = typeof clientInspirations.$inferInsert;
export type SelectClientInspiration = typeof clientInspirations.$inferSelect;

/**
 * Schéma pour stocker les briefs / cahiers des charges clients.
 */
export const briefs = pgTable("briefs", {
  id: uuid("id").defaultRandom().primaryKey(),
  isRead: boolean("is_read").default(false).notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  description: text("description").notNull(),
  clients: jsonb("clients").$type<string[]>().default([]).notNull(),
  channels: jsonb("channels").$type<string[]>().default([]).notNull(),
  process: text("process").default("").notNull(),
  painPoints: text("pain_points").default("").notNull(),
  tools: jsonb("tools").$type<string[]>().default([]).notNull(),
  toolsDetails: text("tools_details").default("").notNull(),
  goal: text("goal").notNull(),
  references: text("references").default("").notNull(),
  constraints: jsonb("constraints").$type<string[]>().default([]).notNull(),
  featuresV1: text("features_v1").default("").notNull(),
  featuresV2: text("features_v2").default("").notNull(),
  integrations: jsonb("integrations").$type<string[]>().default([]).notNull(),
  successMetrics: text("success_metrics").default("").notNull(),
  budget: text("budget").notNull(),
  deadline: text("deadline").default("").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertBrief = typeof briefs.$inferInsert;
export type SelectBrief = typeof briefs.$inferSelect;

/**
 * Schéma pour stocker les profils et variantes de CV multi-templates.
 */
export const cvProfiles = pgTable("cv_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  templateId: text("template_id").default("classic-slate").notNull(),
  isActive: boolean("is_active").default(false).notNull(),
  data: jsonb("data").$type<CVData>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export type InsertCVProfile = typeof cvProfiles.$inferInsert;
export type SelectCVProfile = typeof cvProfiles.$inferSelect;

