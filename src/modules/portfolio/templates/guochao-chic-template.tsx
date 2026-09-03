"use client";

import React from "react";
import Image from "next/image";
import { Award, GraduationCap } from "lucide-react";
import { CVTemplateProps } from "../types";
import { CVHeaderActions } from "../components/cv-header-actions";
import { CVSocialLinks, getContactIcon } from "../components/cv-contact-badges";
import { CVFormattedText } from "../components/cv-formatted-text";

export function GuochaoChicTemplate({ data, isPreview = false }: CVTemplateProps) {
  const { profile, contact, experiences, complementaryExperiences, stack, education, hobbies } = data;
  const hasComplementary = Boolean(complementaryExperiences && complementaryExperiences.length > 0);

  return (
    <main
      data-template="guochao-chic"
      className={`min-h-screen bg-[#F7F4EE] text-[#1F1D1A] font-sans ${
        isPreview ? "p-3 sm:p-6" : "p-4 md:p-12"
      } relative selection:bg-red-800 selection:text-amber-100 print:min-h-0 print:h-auto print:p-0 print:m-0 print:bg-[#F7F4EE]`}
    >
      <div className="max-w-6xl mx-auto space-y-8 print:space-y-3 print:max-w-full print:p-0">
        
        {/* BOUTONS D'ACTION (Masqués à l'impression) */}
        <div className="flex justify-end no-print print:hidden" data-no-print>
          <CVHeaderActions isPreview={isPreview} />
        </div>

        {/* LIGNE 1 : PROFIL + COORDONNÉES */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-stretch print:flex print:flex-col print:gap-5">
          
          {/* CARTE PROFIL GUOCHAO */}
          <header className="lg:col-span-7 bg-[#FFFDF9] p-7 sm:p-8 rounded-[2.5rem] border-2 border-red-900/20 shadow-md shadow-red-950/5 flex flex-col justify-between gap-6 relative overflow-hidden print:w-full print:p-4 print:rounded-2xl print:justify-start print:gap-2 print:shadow-none print:border print:border-red-900/20">
            {/* MOTIF DE FOND ORNEMENTAL CHINOIS */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-red-900/10 via-amber-500/5 to-transparent rounded-bl-full pointer-events-none print:hidden" />
            
            {/* HAUT : AVATAR AVEC SCEAU ROUGE + NOM + BADGE GUOCHAO */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start relative z-10 print:gap-3 print:flex-row">
              {profile.avatar && (
                <div
                  data-testid="cv-avatar"
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-amber-600/40 ring-4 ring-red-900/10 shadow-lg shrink-0 print:w-16 print:h-16 print:rounded-xl print:border-2 print:ring-1 print:shadow-none"
                >
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    priority
                    sizes="112px"
                    className="object-cover"
                  />
                  {/* SCEAU ROUGE TRADITIONNEL (CHOP SEAL) */}
                  <div className="absolute bottom-1 right-1 bg-red-700 text-amber-100 font-serif font-black text-[9px] px-1.5 py-0.5 rounded border border-amber-300 shadow-sm leading-none tracking-widest print:text-[7.5px] print:px-1 print:py-0.5 print:shadow-none">
                    印
                  </div>
                </div>
              )}

              <div className="flex-1 text-center sm:text-left space-y-2 w-full min-w-0 print:space-y-1.5 print:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2.5 print:justify-start print:gap-1.5">
                  <h1 className="text-3xl sm:text-4xl font-black text-[#1C1917] tracking-tight font-serif print:text-[19px] print:leading-tight">
                    {profile.name}
                  </h1>
                  <span className="text-xs px-2 py-0.5 bg-red-900 text-amber-200 rounded font-serif font-bold tracking-widest border border-amber-500/30 print:text-[7px] print:px-1.5 print:py-0.5">
                    国潮
                  </span>
                </div>

                {/* ROLE & BADGE D'OBJECTIF IMPÉRIAL */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5 print:gap-1 print:justify-start">
                  {profile.title.includes("•") ? (
                    <>
                      <span className="text-red-950 font-bold text-xs sm:text-sm uppercase tracking-wider print:text-[9px]">
                        {profile.title.split("•")[0].trim()}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gradient-to-r from-red-800 via-red-700 to-amber-700 text-amber-50 text-xs sm:text-sm font-black rounded-full border border-amber-400/40 shadow-sm print:px-1.5 print:py-0.5 print:text-[7.5px] print:shadow-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse print:w-1 print:h-1" />
                        <span>{profile.title.split("•")[1].trim()}</span>
                      </span>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-red-800 to-amber-700 text-amber-50 text-xs sm:text-sm font-black rounded-full border border-amber-400/40 shadow-sm print:px-1.5 print:py-0.5 print:text-[7.5px] print:shadow-none">
                      <span>🏮</span>
                      <span>{profile.title}</span>
                    </span>
                  )}
                </div>

                <div className="pt-1 flex justify-center sm:justify-start print:hidden">
                  <CVSocialLinks links={profile.links} />
                </div>
              </div>
            </div>

            {/* BAS : MOTIVATION DANS CADRE DE SOIE / CALLIGRAPHIE */}
            {profile.bio && (
              <div className="w-full p-4 sm:p-5 bg-[#FAF6F0] rounded-2xl border-l-4 border-red-800 border-t border-r border-b border-amber-900/10 text-xs sm:text-sm text-[#38332E] leading-relaxed text-left relative z-10 shadow-2xs print:p-2.5 print:mt-1.5 print:rounded-xl print:text-[9.5px] print:leading-snug print:shadow-none">
                <p className="flex items-start gap-2.5 print:gap-1.5">
                  <span className="text-red-800 text-base shrink-0 font-serif font-black print:text-[10px]">“</span>
                  <CVFormattedText text={profile.bio} />
                </p>
              </div>
            )}
          </header>

          {/* BANDEAU COORDONNÉES ÉPURÉ (HORIZONTAL EN PRINT) */}
          {contact.length > 0 && (
            <div className="lg:col-span-5 bg-[#FFFDF9] p-6 sm:p-7 rounded-[2.5rem] border-2 border-amber-900/20 shadow-md shadow-red-950/5 flex flex-col justify-center print:w-full print:p-3 print:rounded-xl print:shadow-none print:border print:border-amber-900/20">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-red-900 mb-3 flex items-center gap-2 print:hidden">
                <span className="w-2 h-2 rounded-full bg-red-700" />
                <span>Coordonnées</span>
              </h2>
              <div className="flex flex-col gap-2.5 print:flex-row print:flex-wrap print:justify-center print:gap-4">
                {contact.map((info, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3 bg-[#FAF6F0] hover:bg-red-50/60 border border-amber-900/10 rounded-2xl transition-all print:p-0 print:gap-1.5 print:rounded-none print:border-none print:bg-transparent print:shadow-none"
                  >
                    <div className="text-amber-100 bg-red-900 p-2.5 rounded-xl shrink-0 shadow-2xs print:p-0 print:bg-transparent print:text-red-800 print:shadow-none">
                      {getContactIcon(info.icon || info.label, 11)}
                    </div>
                    <div className="min-w-0 flex-1 print:flex print:items-center">
                      <p className="text-[10px] font-black text-amber-900/70 uppercase tracking-widest print:hidden">
                        {info.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-[#1C1917] break-words leading-tight mt-0.5 print:text-[8px] print:mt-0 print:font-semibold">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* LIGNE 2 : EXPÉRIENCES & ACTIVITÉS COMPLÉMENTAIRES AU MÊME NIVEAU */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start print:grid-cols-2 print:gap-4">
          
          {/* EXPÉRIENCES PROFESSIONNELLES */}
          <section className="bg-[#FFFDF9] p-8 rounded-[2.5rem] border-2 border-red-900/20 shadow-md shadow-red-950/5 h-full flex flex-col justify-start print:p-4.5 print:rounded-2xl print:h-auto print:shadow-none print:border print:border-red-900/20">
            <h2 className="text-lg sm:text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-slate-900 font-serif print:text-[11px] print:mb-3">
              <span className="w-8 h-1 bg-red-800 rounded-full print:w-4 print:h-0.5" />
              <span>{data.customization?.experiencesTitle || "Expériences Professionnelles"}</span>
            </h2>
            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-red-900/15 print:space-y-5 print:before:left-[4px] print:before:w-[1px]">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="relative pl-10 print:pl-4">
                  {/* PUCE SUBTILE & ÉLÉGANTE (FIN PERLE VERMILLON EN PRINT) */}
                  <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-red-800 rounded-full z-10 flex items-center justify-center shadow-xs print:w-2.5 print:h-2.5 print:left-0 print:top-1 print:border-none print:bg-transparent print:shadow-none">
                    <div className="w-2 h-2 bg-amber-600 rounded-full print:w-2 print:h-2 print:bg-red-800 print:rounded-full print:shadow-none" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 print:gap-2 print:flex-row">
                    {exp.date && (
                      <span className="text-xs font-black text-red-800 uppercase tracking-tighter print:text-[8.5px]">
                        {exp.date}
                      </span>
                    )}
                    {exp.date && <span className="hidden sm:block text-amber-300 print:inline">•</span>}
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest print:text-[8.5px]">
                      {exp.company}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1C1917] mt-1 print:text-[9.5px] print:mt-0.5 print:leading-tight">{exp.title}</h3>
                  <ul className="mt-3 space-y-1.5 print:mt-1.5 print:space-y-1.5">
                    {exp.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="text-xs text-[#38332E] flex gap-2 leading-relaxed print:text-[9px] print:leading-snug print:gap-1.5">
                        <span className="text-red-700 mt-1.5 text-xs shrink-0 print:text-[7px] print:mt-[3px]">✦</span>
                        <CVFormattedText text={task} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ACTIVITÉ PROFESSIONNELLE COMPLÉMENTAIRE / POLYVALENCE */}
          {hasComplementary ? (
            <section className="bg-[#FFFDF9] p-8 rounded-[2.5rem] border-2 border-amber-900/20 shadow-md shadow-red-950/5 h-full flex flex-col justify-start print:p-4.5 print:rounded-2xl print:h-auto print:shadow-none print:border print:border-amber-900/20">
              <h2 className="text-lg sm:text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-slate-900 font-serif print:text-[11px] print:mb-3">
                <span className="w-8 h-1 bg-amber-700 rounded-full print:w-4 print:h-0.5" />
                <span>{data.customization?.stackTitle || "Activité professionnelle complémentaire"}</span>
              </h2>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-amber-900/15 print:space-y-5 print:before:left-[4px] print:before:w-[1px]">
                {complementaryExperiences?.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative pl-10 print:pl-4">
                    {/* PUCE SUBTILE & ÉLÉGANTE (FIN PERLE AMBRÉE EN PRINT) */}
                    <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-amber-700 rounded-full z-10 flex items-center justify-center shadow-xs print:w-2.5 print:h-2.5 print:left-0 print:top-1 print:border-none print:bg-transparent print:shadow-none">
                      <div className="w-2 h-2 bg-red-800 rounded-full print:w-2 print:h-2 print:bg-amber-700 print:rounded-full print:shadow-none" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 print:gap-2 print:flex-row">
                      <span className="text-xs font-black text-amber-800 uppercase tracking-widest print:text-[8.5px]">
                        {exp.company}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1C1917] mt-0.5 print:text-[9.5px] print:mt-0 print:leading-tight">{exp.title}</h3>
                    {exp.tasks && exp.tasks.length > 0 && (
                      <ul className="mt-2 space-y-1.5 print:mt-1 print:space-y-0.5">
                        {exp.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="text-xs text-[#38332E] flex gap-2 leading-relaxed print:text-[9px] print:leading-snug print:gap-1.5">
                            <span className="text-amber-700 mt-1.5 text-xs shrink-0 print:text-[7px] print:mt-[3px]">✦</span>
                            <CVFormattedText text={task} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : (
            /* STACK TECHNIQUE SI PRÉSENTE */
            stack.length > 0 && (
              <section className="bg-[#1C1917] text-[#FAF7F2] p-8 rounded-[2.5rem] border border-amber-500/30 shadow-xl print:p-4 print:rounded-2xl print:shadow-none">
                <h2 className="text-lg font-black mb-6 uppercase tracking-widest text-amber-400 flex items-center gap-2 print:text-[11px] print:mb-2">
                  <span>🏮</span>
                  <span>Compétences & Maîtrise</span>
                </h2>
                <div className="space-y-6 print:space-y-1.5">
                  {stack.map((group, idx) => (
                    <div key={idx}>
                      <h3 className="text-xs font-bold text-amber-200/80 uppercase tracking-wider mb-2 print:text-[8.5px] print:mb-1">
                        {group.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 print:gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 bg-white/10 border border-amber-400/20 rounded-xl text-xs font-semibold text-amber-100 print:px-2 print:py-0.5 print:text-[8px] print:rounded-lg print:shadow-none"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          )}

        </div>

        {/* LIGNE 3 : FORMATIONS & DIPLÔMES / CERTIFICATIONS AU MÊME NIVEAU */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch print:grid-cols-2 print:gap-4">
          
          {/* DIPLÔMES */}
          {education.length > 0 && (
            <section className="bg-[#FFFDF9] p-8 rounded-[2.5rem] border-2 border-red-900/20 shadow-md shadow-red-950/5 flex flex-col justify-between print:p-4.5 print:rounded-2xl print:h-auto print:shadow-none print:border print:border-red-900/20">
              <div>
                <h2 className="text-lg font-black mb-6 text-slate-900 flex items-center gap-2 font-serif print:text-[11px] print:mb-3">
                  <GraduationCap className="text-red-800" size={14} />
                  <span>Diplômes & Formations</span>
                </h2>
                <div className="space-y-5 print:space-y-3">
                  {education.map((edu, idx) => (
                    <div
                      key={idx}
                      className={`relative pl-4 border-l-2 print:pl-2.5 print:border-l ${
                        edu.accent ? "border-red-800 text-red-900" : "border-amber-900/20 text-[#38332E]"
                      }`}
                    >
                      <h3 className="text-sm font-bold leading-tight print:text-[9.5px]">{edu.title}</h3>
                      <p className="text-xs text-amber-900/60 mt-1 print:text-[8px] print:mt-1">
                        {edu.date} • {edu.school}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* DIPLÔMES ET CERTIFICATIONS COMPLÉMENTAIRES */}
          {hobbies.length > 0 && (
            <section className="bg-[#FFFDF9] p-8 rounded-[2.5rem] border-2 border-red-900/20 shadow-md shadow-red-950/5 flex flex-col justify-between print:p-4.5 print:rounded-2xl print:h-auto print:shadow-none print:border print:border-red-900/20">
              <div>
                <h2 className="text-lg font-black mb-6 text-slate-900 flex items-center gap-2 font-serif print:text-[11px] print:mb-3">
                  <Award className="text-red-800" size={14} />
                  <span>{data.customization?.hobbiesTitle || "Diplômes et certifications complémentaires"}</span>
                </h2>
                <ul className="space-y-4 text-sm text-slate-700 font-medium print:space-y-2.5 print:text-[9px]">
                  {hobbies.map((hobby, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start print:gap-1.5">
                      <span className="text-red-800 mt-0.5 print:text-[7px]">✦</span>
                      <span className="font-semibold text-slate-800">{hobby}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

        </div>

      </div>
    </main>
  );
}
