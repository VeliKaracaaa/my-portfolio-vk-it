import { pgTable, text, timestamp, uuid, real, jsonb } from "drizzle-orm/pg-core";

/**
 * ============================================================
 * MODULE MEDIA-STUDIO — SCHEMA DRIZZLE
 * ============================================================
 * Préparation du schéma pour la génération vidéo / trailers (Unreal / ElevenLabs).
 * Intègre Idempotency-Key, gestion des statuts, timestamps et URLs.
 */

export const mediaGenerationJobs = pgTable("media_generation_jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  idempotencyKey: text("idempotency_key").notNull().unique(),
  title: text("title"),
  scriptContent: text("script_content").notNull(),
  voiceId: text("voice_id"),
  audioUrl: text("audio_url"),
  videoUrl: text("video_url"),
  wordTimestamps: jsonb("word_timestamps"),
  durationSeconds: real("duration_seconds"),
  formatType: text("format_type").default("9:16"),
  status: text("status").default("pending").notNull(), // 'pending', 'processing', 'completed', 'failed', 'AUDIO_READY'
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InsertMediaJob = typeof mediaGenerationJobs.$inferInsert;
export type SelectMediaJob = typeof mediaGenerationJobs.$inferSelect;

