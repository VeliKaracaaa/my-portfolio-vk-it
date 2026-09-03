"use client";

import React from "react";
import Image from "next/image";
import { Code2, ChevronRight, Award, GraduationCap } from "lucide-react";
import { CVTemplateProps } from "../types";
import { CVHeaderActions } from "../components/cv-header-actions";
import { CVContactCard, CVSocialLinks, getContactIcon } from "../components/cv-contact-badges";
import { CVFormattedText } from "../components/cv-formatted-text";

export function ClassicSlateTemplate({ data, isPreview = false }: CVTemplateProps) {
  const { profile, contact, experiences, complementaryExperiences, stack, education, hobbies } = data;
  const hasComplementary = Boolean(complementaryExperiences && complementaryExperiences.length > 0);

  // =========================================================================
  // LAYOUT 1 : DOUBLE COLONNE ALIGNÉE (POUR CV POLYVALENT / TEMPS PARTIEL)
  // =========================================================================
  if (hasComplementary) {
    return (      <main
        data-template="classic-slate"
        className={`min-h-screen bg-[#FBFBFE] text-[#1E293B] font-sans ${
          isPreview ? "p-3 sm:p-6" : "p-4 md:p-12"
        } relative print:min-h-0 print:h-auto print:p-0 print:m-0`}
      >
        <div className="max-w-6xl mx-auto space-y-8 print:space-y-3 print:max-w-full print:p-0">
          
          {/* BARRE D'ACTIONS TOP */}
          <div className="flex justify-end no-print print:hidden" data-no-print>
            <CVHeaderActions isPreview={isPreview} className="w-full sm:w-auto" />
          </div>

          {/* LIGNE 1 : PROFIL & COORDONNÉES */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-stretch print:flex print:flex-col print:gap-5">
            
            {/* CARTE PROFIL */}
            <header className="lg:col-span-7 bg-white p-7 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between gap-6 print:w-full print:p-4 print:rounded-xl print:justify-start print:gap-2 print:shadow-none print:border-slate-300">
              {/* HAUT : AVATAR ET TITRE */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start print:gap-3 print:flex-row">
                {profile.avatar && (
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0 print:w-16 print:h-16 print:rounded-lg print:shadow-none">
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      priority
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 text-center sm:text-left space-y-2 w-full min-w-0 print:space-y-1.5 print:text-left">
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight print:text-[19px] print:leading-tight">
                    {profile.name}
                  </h1>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5 print:gap-1.5 print:justify-start">
                    {profile.title.includes("•") ? (
                      <>
                        <span className="text-slate-600 font-medium text-sm sm:text-base print:text-[10px]">
                          {profile.title.split("•")[0].trim()}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-full border border-slate-200 print:px-1.5 print:py-0.5 print:text-[7.5px] print:bg-white print:border-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 print:w-1 print:h-1" />
                          <span>{profile.title.split("•")[1].trim()}</span>
                        </span>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-full border border-slate-200 print:px-1.5 print:py-0.5 print:text-[7.5px] print:bg-white print:border-slate-300">
                        <span>{profile.title}</span>
                      </span>
                    )}
                  </div>

                  <div className="pt-1 flex justify-center sm:justify-start print:hidden">
                    <CVSocialLinks links={profile.links} />
                  </div>
                </div>
              </div>

              {/* BAS : BIO */}
              {profile.bio && (
                <div className="w-full text-sm text-slate-600 leading-relaxed print:text-[9.5px] print:leading-snug print:mt-1.5">
                  <CVFormattedText text={profile.bio} />
                </div>
              )}
            </header>

            {/* BANDEAU COORDONNÉES ÉPURÉ (HORIZONTAL EN PRINT) */}
            {contact.length > 0 && (
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-center print:w-full print:p-3 print:rounded-xl print:shadow-none print:border-slate-300">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 print:hidden">
                  Coordonnées
                </h2>
                <div className="flex flex-col gap-3 print:flex-row print:flex-wrap print:justify-center print:gap-4">
                  {contact.map((info, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-colors print:p-0 print:gap-1.5 print:rounded-none print:border-none print:bg-transparent print:shadow-none"
                    >
                      <div className="text-slate-400 bg-white border border-slate-100 p-2 rounded-lg shrink-0 shadow-sm print:p-0 print:bg-transparent print:border-none print:text-slate-600 print:shadow-none">
                        {getContactIcon(info.icon || info.label, 13)}
                      </div>
                      <div className="min-w-0 flex-1 print:flex print:items-center">
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider print:hidden">
                          {info.label}
                        </p>
                        <p className="text-sm font-medium text-slate-900 break-words leading-tight mt-0.5 print:text-[8px] print:mt-0 print:font-semibold">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* LIGNE 2 : EXPÉRIENCES PRO (GAUCHE) & ACTIVITÉS COMPLÉMENTAIRES (DROITE) AU MÊME NIVEAU */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start print:grid-cols-2 print:gap-4">
            
            {/* EXPÉRIENCES PROFESSIONNELLES */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-full flex flex-col justify-start print:p-4.5 print:rounded-2xl print:h-auto print:shadow-none print:border print:border-slate-200">
              <h2 className="text-lg sm:text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-[#0F172A] print:text-[11px] print:mb-3">
                <span className="w-8 h-1 bg-blue-600 rounded-full print:w-4 print:h-0.5" /> {data.customization?.experiencesTitle || "Expériences Professionnelles"}
              </h2>
              <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 print:space-y-5 print:before:left-[4px] print:before:w-[1px]">
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative pl-10 print:pl-4">
                    {/* PUCE SUBTILE & ÉLÉGANTE (FIN PERLE BLEUE EN PRINT) */}
                    <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-blue-600 rounded-full z-10 flex items-center justify-center shadow-sm print:w-2.5 print:h-2.5 print:left-0 print:top-1 print:border-none print:bg-transparent print:shadow-none">
                      <div className="w-2 h-2 bg-blue-600 rounded-full print:w-2 print:h-2 print:bg-blue-600 print:rounded-full print:shadow-none" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 print:gap-2 print:flex-row">
                      {exp.date && (
                        <span className="text-xs font-black text-blue-500 uppercase tracking-tighter print:text-[8.5px]">
                          {exp.date}
                        </span>
                      )}
                      {exp.date && <span className="hidden sm:block text-slate-300 print:inline">•</span>}
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest print:text-[8.5px]">
                        {exp.company}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 print:text-[9.5px] print:mt-0.5 print:leading-tight">{exp.title}</h3>
                    <ul className="mt-3 space-y-1.5 print:mt-1.5 print:space-y-1.5">
                      {exp.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="text-xs text-slate-600 flex gap-2 leading-relaxed print:text-[9px] print:leading-snug print:gap-1.5">
                          <span className="text-blue-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 print:w-1 print:h-1 print:mt-[3px]" />
                          <CVFormattedText text={task} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ACTIVITÉS PROFESSIONNELLES COMPLÉMENTAIRES */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-full flex flex-col justify-start print:p-4.5 print:rounded-2xl print:h-auto print:shadow-none print:border print:border-slate-200">
              <h2 className="text-lg sm:text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-[#0F172A] print:text-[11px] print:mb-3">
                <span className="w-8 h-1 bg-indigo-600 rounded-full print:w-4 print:h-0.5" /> {data.customization?.stackTitle || "Activité professionnelle complémentaire"}
              </h2>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 print:space-y-5 print:before:left-[4px] print:before:w-[1px]">
                {complementaryExperiences.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative pl-10 print:pl-4">
                    {/* PUCE SUBTILE & ÉLÉGANTE (FIN PERLE INDIGO EN PRINT) */}
                    <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-indigo-600 rounded-full z-10 flex items-center justify-center shadow-sm print:w-2.5 print:h-2.5 print:left-0 print:top-1 print:border-none print:bg-transparent print:shadow-none">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full print:w-2 print:h-2 print:bg-indigo-600 print:rounded-full print:shadow-none" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 print:gap-2 print:flex-row">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest print:text-[8.5px]">
                        {exp.company}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 print:text-[9.5px] print:mt-0 print:leading-tight">{exp.title}</h3>
                    {exp.tasks && exp.tasks.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5 print:mt-1 print:space-y-0.5">
                        {exp.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="text-xs text-slate-600 flex gap-2 leading-relaxed print:text-[9px] print:leading-snug print:gap-1.5">
                            <span className="text-indigo-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 print:w-1 print:h-1 print:mt-[3px]" />
                            <CVFormattedText text={task} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* LIGNE 3 : DIPLÔMES (GAUCHE) & CERTIFICATIONS COMPLÉMENTAIRES (DROITE) AU MÊME NIVEAU */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch print:grid-cols-2 print:gap-4">
            
            {/* DIPLÔMES */}
            {education.length > 0 && (
              <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between print:p-4.5 print:rounded-2xl print:h-auto print:shadow-none print:border print:border-slate-200">
                <div>
                  <h2 className="text-lg font-black mb-6 text-[#0F172A] flex items-center gap-2 print:text-[11px] print:mb-3">
                    <GraduationCap className="text-blue-600" size={14} />
                    <span>Diplômes & Formations</span>
                  </h2>
                  <div className="space-y-5 print:space-y-3">
                    {education.map((edu, idx) => (
                      <div
                        key={idx}
                        className={`relative pl-4 border-l-2 print:pl-2.5 print:border-l ${
                          edu.accent ? "border-blue-600 text-blue-600" : "border-slate-200 text-slate-900"
                        }`}
                      >
                        <h3 className="text-sm font-bold leading-tight print:text-[9.5px]">{edu.title}</h3>
                        <p className="text-xs text-slate-500 mt-1 print:text-[8px] print:mt-1">
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
              <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between print:p-4.5 print:rounded-2xl print:h-auto print:shadow-none print:border print:border-slate-200">
                <div>
                  <h2 className="text-lg font-black mb-6 text-[#0F172A] flex items-center gap-2 print:text-[11px] print:mb-3">
                    <Award className="text-blue-600" size={14} />
                    <span>{data.customization?.hobbiesTitle || "Diplômes et certifications complémentaires"}</span>
                  </h2>
                  <ul className="space-y-4 text-sm text-slate-700 font-medium print:space-y-2.5 print:text-[9px]">
                    {hobbies.map((hobby, idx) => (
                      <li key={idx} className="flex gap-3 print:gap-1.5">
                        <span className="text-blue-600 shrink-0 print:mt-[2px]">✦</span>
                        <span>{hobby}</span>
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

  return (
    <main
      data-template="classic-slate"
      className={`min-h-screen bg-slate-50 text-slate-900 font-sans ${
        isPreview ? "p-3 sm:p-6" : "p-4 md:p-12"
      } relative selection:bg-blue-200 selection:text-blue-900 print:min-h-0 print:h-auto print:p-0 print:m-0 print:bg-white`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-x-10 gap-y-6 lg:gap-y-10 print:grid-cols-[2fr_1fr] print:gap-3 print:max-w-full print:p-0">
        
        {/* BOUTONS D'ACTION */}
        <div className="lg:col-start-2 lg:row-start-1 no-print print:hidden" data-no-print>
          <CVHeaderActions isPreview={isPreview} />
        </div>

        {/* COLONNE GAUCHE */}
        <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 space-y-10 print:space-y-3">
          
          {/* HEADER PROFIL */}
          <header className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center print:p-3.5 print:rounded-2xl print:gap-3 print:flex-row print:shadow-none">
            {profile.avatar && (
              <div
                data-testid="cv-avatar"
                className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-md shrink-0 print:w-16 print:h-16 print:rounded-xl print:border-2 print:shadow-none"
              >
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  priority
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left print:text-left">
              <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter print:text-xl print:leading-tight">
                {profile.name}
              </h1>
              <p className="text-blue-600 font-bold tracking-widest text-sm uppercase mt-1 print:text-[9.5px] print:mt-0">
                {profile.title}
              </p>
              {profile.bio && (
                <p className="text-xs text-slate-500 mt-2 max-w-md print:text-[8.5px] print:mt-1 print:leading-tight">
                  {profile.bio}
                </p>
              )}
              <div className="mt-6 flex justify-center md:justify-start print:hidden">
                <CVSocialLinks links={profile.links} />
              </div>
            </div>
          </header>

          {/* INFORMATIONS DE CONTACT */}
          {contact.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2 print:shadow-none">
              {contact.map((info, idx) => (
                <CVContactCard key={idx} item={info} />
              ))}
            </section>
          )}

          {/* EXPÉRIENCES PROFESSIONNELLES */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm print:p-3.5 print:rounded-2xl print:shadow-none">
            <h2 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-[#0F172A] print:text-xs print:mb-2.5">
              <span className="w-8 h-1 bg-blue-600 rounded-full print:w-4 print:h-0.5" /> {data.customization?.experiencesTitle || "Expériences Professionnelles"}
            </h2>
            <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 print:space-y-3.5 print:before:left-[4px] print:before:w-[1px]">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="relative pl-10 print:pl-4">
                  {/* PUCE SUBTILE & ÉLÉGANTE (FIN PERLE BLEUE EN PRINT) */}
                  <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-blue-600 rounded-full z-10 flex items-center justify-center shadow-sm print:w-2.5 print:h-2.5 print:left-0 print:top-1 print:border-none print:bg-transparent print:shadow-none">
                    <div className="w-2 h-2 bg-blue-600 rounded-full print:w-2 print:h-2 print:bg-blue-600 print:rounded-full print:shadow-none" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 print:gap-2 print:flex-row">
                    <span className="text-xs font-black text-blue-500 uppercase tracking-tighter print:text-[8.5px]">
                      {exp.date}
                    </span>
                    <span className="hidden md:block text-slate-300 print:inline">•</span>
                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest print:text-[8.5px]">
                      {exp.company}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 print:text-[10px] print:mt-0">{exp.title}</h3>
                  <ul className="mt-4 space-y-2 print:mt-1 print:space-y-1">
                    {exp.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="text-sm text-slate-600 flex gap-2 leading-relaxed print:text-[9px] print:leading-snug print:gap-1.5">
                        <span className="text-blue-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 print:w-1 print:h-1 print:mt-0.5" />
                        <CVFormattedText text={task} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COLONNE DROITE */}
        <div className="lg:col-start-2 lg:row-start-2 space-y-8 print:space-y-3">
          
          {/* STACK TECHNIQUE */}
          {stack.length > 0 && (
            <section className="bg-[#0F172A] text-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/10 print:p-3.5 print:rounded-2xl print:shadow-none">
              <h2 className="text-lg font-black mb-6 uppercase tracking-widest text-blue-400 flex items-center gap-2 print:text-xs print:mb-2.5">
                <Code2 size={16} /> Stack Technique
              </h2>
              <div className="space-y-8 print:space-y-2.5">
                {stack.map((group, idx) => (
                  <div key={idx}>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 print:text-[8px] print:mb-1">
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 print:gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium print:px-2 print:py-0.5 print:text-[8px] print:shadow-none"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* DIPLÔMES */}
          {education.length > 0 && (
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm print:p-3.5 print:rounded-2xl print:shadow-none">
              <h2 className="text-lg font-black mb-6 text-[#0F172A] print:text-xs print:mb-2">Diplômes</h2>
              <div className="space-y-6 print:space-y-1.5">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className={`relative pl-4 border-l-2 print:pl-2.5 print:border-l ${
                      edu.accent ? "border-blue-600 text-blue-600" : "border-slate-200 text-slate-900"
                    }`}
                  >
                    <h3 className="text-sm font-bold leading-tight print:text-[9px]">{edu.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 print:text-[8px] print:mt-0.5">
                      {edu.date} • {edu.school}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* HORS-CODE / CENTRES D'INTÉRÊT */}
          {hobbies.length > 0 && (
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm print:p-3.5 print:rounded-2xl print:shadow-none print:border-slate-200">
              <h2 className="text-lg font-black mb-4 text-[#0F172A] print:text-xs print:mb-2">
                {data.customization?.hobbiesTitle || "Hors-Code"}
              </h2>
              <ul className="space-y-3 text-sm text-slate-700 font-medium print:space-y-1.5 print:text-[9px]">
                {hobbies.map((hobby, idx) => (
                  <li key={idx} className="flex gap-2 items-start print:gap-1.5">
                    <span className="text-blue-600 shrink-0 print:mt-[2px]">✦</span>
                    <span>{hobby}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
