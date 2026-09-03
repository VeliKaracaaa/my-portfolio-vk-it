import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * ============================================================
 * MODULE MEDIA-STUDIO — SCHEMA DRIZZLE
 * ============================================================
 * Préparation du schéma pour la génération vidéo / trailers (Unreal / ElevenLabs).
 * Intègre Idempotency-Key et gestion de statuts asynchrones.
 */

export const mediaGenerationJobs = pgTable("media_generation_jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  idempotencyKey: text("idempotency_key").notNull().unique(),
  scriptContent: text("script_content").notNull(),
  voiceId: text("voice_id"),
  audioUrl: text("audio_url"),
  videoUrl: text("video_url"),
  status: text("status").default("pending").notNull(), // 'pending', 'processing', 'completed', 'failed'
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InsertMediaJob = typeof mediaGenerationJobs.$inferInsert;
export type SelectMediaJob = typeof mediaGenerationJobs.$inferSelect;
