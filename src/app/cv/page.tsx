import { Metadata } from "next";
import { getActiveCVProfile } from "@/modules/portfolio/dal";
import { CVTemplateRenderer } from "@/modules/portfolio/templates";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getActiveCVProfile();
  return {
    title: `CV & Parcours — ${profile.data.profile.name}`,
    description: `${profile.data.profile.title} • Expériences, compétences et formation.`,
  };
}

export default async function CvPage() {
  const activeProfile = await getActiveCVProfile();

  return <CVTemplateRenderer profile={activeProfile} isPreview={false} />;
}
