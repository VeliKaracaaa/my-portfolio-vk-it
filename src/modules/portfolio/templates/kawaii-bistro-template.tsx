"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Utensils, Heart, Award, GraduationCap, ChevronRight } from "lucide-react";
import { CVTemplateProps } from "../types";
import { CVHeaderActions } from "../components/cv-header-actions";
import { CVSocialLinks, getContactIcon } from "../components/cv-contact-badges";
import { CVFormattedText } from "../components/cv-formatted-text";

export function KawaiiBistroTemplate({ data, isPreview = false }: CVTemplateProps) {
  const { profile, contact, experiences, complementaryExperiences, stack, education, hobbies } = data;
  const hasComplementary = Boolean(complementaryExperiences && complementaryExperiences.length > 0);

  return (
    <main
      data-template="kawaii-bistro"
      className={`min-h-screen bg-[#FDFBF7] text-[#2D2A26] font-sans ${
        isPreview ? "p-3 sm:p-6" : "p-4 md:p-12"
      } relative selection:bg-rose-200 selection:text-rose-900 print:min-h-0 print:h-auto print:p-0 print:m-0`}
    >
      <div className="max-w-6xl mx-auto space-y-8 print:space-y-2 print:max-w-full print:p-0">
        
        {/* TOP BAR ACTIONS */}
        <div className="flex justify-end no-print print:hidden" data-no-print>
          <CVHeaderActions isPreview={isPreview} className="w-full sm:w-auto" />
        </div>

        {/* LIGNE 1 : PROFIL KAWAII (GAUCHE) & COORDONNÉES PASTEL (DROITE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CARTE PROFIL KAWAII */}
          <header className="lg:col-span-7 bg-white p-7 sm:p-8 rounded-[2.5rem] border-2 border-rose-100 shadow-sm shadow-rose-100/40 flex flex-col justify-between gap-6 relative overflow-hidden">
            {/* DÉCORATION PASTEL */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-rose-50 rounded-bl-full pointer-events-none -z-0" />
            
            {/* HAUT : AVATAR + TITRE + BADGE */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start relative z-10">
              {profile.avatar && (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-rose-200 shadow-md shadow-rose-200/50 shrink-0">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    priority
                    sizes="112px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-xs text-xs">
                    🥟
                  </div>
                </div>
              )}

              <div className="flex-1 text-center sm:text-left space-y-2 w-full min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {profile.name}
                  </h1>
                  <span className="text-xl">✨</span>
                </div>

                {/* ROLE & BADGE RESTO KAWAII */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                  {profile.title.includes("•") ? (
                    <>
                      <span className="text-slate-600 font-bold text-xs sm:text-sm uppercase tracking-wider">
                        {profile.title.split("•")[0].trim()}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs sm:text-sm font-extrabold rounded-full shadow-xs">
                        <span>🥢</span>
                        <span>{profile.title.split("•")[1].trim()}</span>
                      </span>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-rose-500 text-white text-xs sm:text-sm font-extrabold rounded-full shadow-xs">
                      <span>🥢</span>
                      <span>{profile.title}</span>
                    </span>
                  )}
                </div>

                <div className="pt-1 flex justify-center sm:justify-start">
                  <CVSocialLinks links={profile.links} />
                </div>
              </div>
            </div>

            {/* BAS : MESSAGE MOTIVATION DANS BULLE DOUCE */}
            {profile.bio && (
              <div className="w-full p-4 sm:p-5 bg-[#FFF9F6] rounded-2xl border border-rose-100/80 text-xs sm:text-sm text-slate-700 leading-relaxed text-left relative z-10">
                <p className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5 text-base shrink-0">🌸</span>
                  <CVFormattedText text={profile.bio} />
                </p>
              </div>
            )}
          </header>

          {/* CARTE COORDONNÉES */}
          {contact.length > 0 && (
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-[2.5rem] border-2 border-amber-100 shadow-sm shadow-amber-100/40 flex flex-col justify-center">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-amber-600/80 mb-3 flex items-center gap-2">
                <span>🏮</span>
                <span>Coordonnées & Disponibilité</span>
              </h2>
              <div className="flex flex-col gap-2.5">
                {contact.map((info, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3 bg-[#FFFDF9] hover:bg-rose-50/50 border border-amber-100/80 rounded-2xl transition-all"
                  >
                    <div className="text-rose-500 bg-rose-50 p-2.5 rounded-xl shrink-0">
                      {getContactIcon(info.icon || info.label, 16)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {info.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 break-words leading-tight mt-0.5">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* LIGNE 2 : EXPÉRIENCES & POLYVALENCE TERRAIN AU MÊME NIVEAU */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* EXPÉRIENCES PROFESSIONNELLES */}
          <section className="bg-white p-8 rounded-[2.5rem] border-2 border-rose-100 shadow-sm shadow-rose-100/30 h-full flex flex-col justify-start">
            <h2 className="text-lg sm:text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-slate-900">
              <span className="p-1.5 bg-rose-100 text-rose-600 rounded-xl text-xs">💼</span>
              <span>{data.customization?.experiencesTitle || "Expériences Professionnelles"}</span>
            </h2>
            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-rose-100">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-rose-400 rounded-full z-10 flex items-center justify-center shadow-xs">
                    <div className="w-2 h-2 bg-rose-500 rounded-full" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    {exp.date && (
                      <span className="text-xs font-black text-rose-500 uppercase tracking-tighter">
                        {exp.date}
                      </span>
                    )}
                    {exp.date && <span className="hidden sm:block text-slate-300">•</span>}
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      {exp.company}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">{exp.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {exp.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="text-xs text-slate-600 flex gap-2 leading-relaxed">
                        <span className="text-rose-400 mt-1.5 text-xs shrink-0">✦</span>
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
            <section className="bg-white p-8 rounded-[2.5rem] border-2 border-amber-100 shadow-sm shadow-amber-100/30 h-full flex flex-col justify-start">
              <h2 className="text-lg sm:text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-slate-900">
                <span className="p-1.5 bg-amber-100 text-amber-700 rounded-xl text-xs">🥟</span>
                <span>{data.customization?.stackTitle || "Activité professionnelle complémentaire"}</span>
              </h2>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-amber-100">
                {complementaryExperiences?.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-amber-400 rounded-full z-10 flex items-center justify-center shadow-xs">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-xs font-black text-amber-600 uppercase tracking-widest">
                        {exp.company}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">{exp.title}</h3>
                    {exp.tasks && exp.tasks.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {exp.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="text-xs text-slate-600 flex gap-2 leading-relaxed">
                            <span className="text-amber-500 mt-1.5 text-xs shrink-0">✦</span>
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
            /* STACK TECHNIQUE CLASSIQUE SI PRÉSENTE */
            stack.length > 0 && (
              <section className="bg-white p-8 rounded-[2.5rem] border-2 border-rose-100 shadow-sm">
                <h2 className="text-lg font-black mb-6 text-slate-900 flex items-center gap-2">
                  <span>🍵</span>
                  <span>Compétences</span>
                </h2>
                <div className="space-y-6">
                  {stack.map((group, idx) => (
                    <div key={idx}>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {group.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 bg-rose-50 border border-rose-100 rounded-xl text-xs font-semibold text-rose-700"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* DIPLÔMES */}
          {education.length > 0 && (
            <section className="bg-white p-8 rounded-[2.5rem] border-2 border-rose-100 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-black mb-6 text-slate-900 flex items-center gap-2">
                  <GraduationCap className="text-rose-500" size={20} />
                  <span>Diplômes & Formations</span>
                </h2>
                <div className="space-y-5">
                  {education.map((edu, idx) => (
                    <div
                      key={idx}
                      className={`relative pl-4 border-l-2 ${
                        edu.accent ? "border-rose-500 text-rose-600" : "border-slate-200 text-slate-900"
                      }`}
                    >
                      <h3 className="text-sm font-bold leading-tight">{edu.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {edu.date} • {edu.school}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* DIPLÔMES & CERTIFICATIONS COMPLÉMENTAIRES */}
          {hobbies.length > 0 && (
            <section className="bg-[#FFFDF9] p-8 rounded-[2.5rem] border-2 border-amber-100 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-black mb-6 text-amber-900 flex items-center gap-2">
                  <Award className="text-amber-500" size={20} />
                  <span>{data.customization?.hobbiesTitle || "Diplômes et certifications complémentaires"}</span>
                </h2>
                <ul className="space-y-4 text-sm text-slate-700 font-medium">
                  {hobbies.map((hobby, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <span className="text-amber-500 mt-0.5">🌸</span>
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
