import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

/**
 * Schéma de la table 'posts'
 * 
 * Ce schéma définit la structure des articles de blog et contenus du portfolio.
 * Nous utilisons pgTable pour la compatibilité avec Vercel Postgres.
 */
export const posts = pgTable("posts", {
  // ID unique généré automatiquement par la base de données
  id: uuid("id").defaultRandom().primaryKey(),
  
  // Contenu textuel du post (Markdown ou texte brut)
  content: text("content").notNull(),
  
  // URL de l'image stockée sur Vercel Blob (remplace le Base64)
  imageUrl: text("image_url"),
  
  // Type MIME de l'image (ex: image/png)
  imageType: text("image_type"),
  
  // URL de la vidéo stockée sur Vercel Blob
  videoUrl: text("video_url"),
  
  // URL du document PDF/Doc stocké sur Vercel Blob
  documentUrl: text("document_url"),
  
  // Nom d'affichage du document
  documentName: text("document_name"),
  
  // État de publication sur les réseaux sociaux
  publishedToLinkedIn: boolean("published_to_linkedin").default(false).notNull(),
  linkedInPostId: text("linkedin_post_id"),
  publishedAt: timestamp("published_at"),
  
  // Horodatage de création
  createdAt: timestamp("created_at").defaultNow().notNull(),
  
  // Horodatage de mise à jour automatique
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Schéma pour stocker les tokens LinkedIn
 * On utilise une table dédiée pour éviter Redis pour les données persistantes.
 */
export const linkedinTokens = pgTable("linkedin_tokens", {
  id: text("id").primaryKey().default("current"), // On ne garde qu'une seule ligne
  accessToken: text("access_token").notNull(),
  userUrn: text("user_urn").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Type pour l'insertion de données
export type InsertPost = typeof posts.$inferInsert;
// Type pour la lecture de données
export type SelectPost = typeof posts.$inferSelect;

export type InsertLinkedinToken = typeof linkedinTokens.$inferInsert;
export type SelectLinkedinToken = typeof linkedinTokens.$inferSelect;

/**
 * Schéma pour stocker les demandes d'inspiration / ressources clients
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
