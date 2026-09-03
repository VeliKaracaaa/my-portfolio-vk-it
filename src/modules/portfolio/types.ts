import { z } from "zod";

/**
 * ============================================================
 * INTERFACES & SCHEMAS — MODULE PORTFOLIO (CV MANAGEMENT)
 * ============================================================
 */

export type CVTemplateId =
  | "classic-slate"
  | "bento-modern"
  | "minimal-clean"
  | "terminal-dark"
  | "kawaii-bistro"
  | "guochao-chic";

export const CVContactItemSchema = z.object({
  icon: z.string().default("Mail"),
  label: z.string().min(1, "Le label est requis.").max(50),
  value: z.string().min(1, "La valeur est requise.").max(100),
  className: z.string().optional(),
});
export type CVContactItem = z.infer<typeof CVContactItemSchema>;

export const CVExperienceSchema = z.object({
  id: z.string().optional(),
  date: z.string().max(50).optional().default(""),
  company: z.string().min(1, "L'entreprise ou le contexte est requis.").max(100),
  title: z.string().min(1, "Le titre du poste est requis.").max(120),
  location: z.string().optional(),
  tasks: z.array(z.string().max(600)).default([]),
});
export type CVExperience = z.infer<typeof CVExperienceSchema>;

export const CVSkillGroupSchema = z.object({
  title: z.string().min(1, "Le titre du groupe est requis.").max(80),
  items: z.array(z.string().max(50)).min(1, "Au moins une compétence est requise."),
});
export type CVSkillGroup = z.infer<typeof CVSkillGroupSchema>;

export const CVEducationSchema = z.object({
  title: z.string().min(1, "Le diplôme est requis.").max(120),
  school: z.string().min(1, "L'école ou l'organisme est requis.").max(120),
  date: z.string().max(50).optional().default(""),
  accent: z.boolean().optional(),
});
export type CVEducation = z.infer<typeof CVEducationSchema>;

export const CVSocialLinksSchema = z.object({
  github: z.string().url().or(z.literal("")).default(""),
  linkedin: z.string().url().or(z.literal("")).default(""),
  website: z.string().url().or(z.literal("")).default(""),
  twitter: z.string().url().or(z.literal("")).default(""),
});
export type CVSocialLinks = z.infer<typeof CVSocialLinksSchema>;

export const CVProfileInfoSchema = z.object({
  name: z.string().min(1, "Le nom est requis.").max(80),
  title: z.string().min(1, "Le titre est requis.").max(120),
  avatar: z.string().default("/me.png"),
  bio: z.string().max(500).optional(),
  links: CVSocialLinksSchema.default({
    github: "",
    linkedin: "",
    website: "",
    twitter: "",
  }),
});
export type CVProfileInfo = z.infer<typeof CVProfileInfoSchema>;


export const CVCustomizationSchema = z.object({
  primaryColor: z.string().max(50).optional(),
  accentColor: z.string().max(50).optional(),
  showAvatar: z.boolean().optional(),
  badgeText: z.string().max(80).optional(),
  stackTitle: z.string().max(80).optional(),
  hobbiesTitle: z.string().max(80).optional(),
  experiencesTitle: z.string().max(80).optional(),
});
export type CVCustomization = z.infer<typeof CVCustomizationSchema>;

export const CVDataSchema = z.object({
  profile: CVProfileInfoSchema,
  contact: z.array(CVContactItemSchema).default([]),
  experiences: z.array(CVExperienceSchema).default([]),
  complementaryExperiences: z.array(CVExperienceSchema).optional().default([]),
  stack: z.array(CVSkillGroupSchema).default([]),
  education: z.array(CVEducationSchema).default([]),
  hobbies: z.array(z.string().max(100)).default([]),
  customization: CVCustomizationSchema.optional(),
});
export type CVData = z.infer<typeof CVDataSchema>;

export interface CVProfile {
  id: string;
  title: string;
  templateId: CVTemplateId;
  isActive: boolean;
  data: CVData;
  createdAt: string;
  updatedAt: string;
}

export const SaveCVInputSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Le nom du CV doit comporter au moins 2 caractères.").max(100),
  templateId: z.enum(["classic-slate", "bento-modern", "minimal-clean", "terminal-dark", "kawaii-bistro", "guochao-chic"]).default("classic-slate"),
  isActive: z.boolean().optional().default(false),
  data: CVDataSchema,
});
export type SaveCVInput = z.infer<typeof SaveCVInputSchema>;

export interface CVTemplateProps {
  data: CVData;
  isPreview?: boolean;
}

export interface CVTemplateMeta {
  id: CVTemplateId;
  name: string;
  description: string;
  badge: string;
  accent: string;
}

/**
 * Fonction de normalisation et d'immunisation anti schema-drift.
 * Garantit que même si un vieux CV stocké en base a des champs manquants,
 * il reçoit des valeurs par défaut saines sans jamais faire crasher le rendu React.
 */
export function normalizeCVData(rawData: unknown): CVData {
  if (!rawData || typeof rawData !== "object") {
    return {
      profile: {
        name: "Veli KARACA",
        title: "Développeur Full Stack",
        avatar: "/me.png",
        bio: "",
        links: { github: "", linkedin: "", website: "", twitter: "" },
      },
      contact: [],
      experiences: [],
      complementaryExperiences: [],
      stack: [],
      education: [],
      hobbies: [],
      customization: {},
    };
  }

  const parsed = CVDataSchema.safeParse(rawData);
  if (parsed.success) {
    return parsed.data;
  }

  // Fallback partiel gracieux
  const obj = rawData as Record<string, any>;
  return {
    profile: {
      name: obj.profile?.name || "Veli KARACA",
      title: obj.profile?.title || "Développeur Full Stack",
      avatar: obj.profile?.avatar || "/me.png",
      bio: obj.profile?.bio || "",
      links: {
        github: obj.profile?.links?.github || "",
        linkedin: obj.profile?.links?.linkedin || "",
        website: obj.profile?.links?.website || "",
        twitter: obj.profile?.links?.twitter || "",
      },
    },
    contact: Array.isArray(obj.contact) ? obj.contact : [],
    experiences: Array.isArray(obj.experiences) ? obj.experiences : [],
    complementaryExperiences: Array.isArray(obj.complementaryExperiences) ? obj.complementaryExperiences : [],
    stack: Array.isArray(obj.stack) ? obj.stack : [],
    education: Array.isArray(obj.education) ? obj.education : [],
    hobbies: Array.isArray(obj.hobbies) ? obj.hobbies : [],
    customization: obj.customization || {},
  };
}
