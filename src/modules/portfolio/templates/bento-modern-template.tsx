"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Briefcase, GraduationCap, Heart, Layers, Terminal } from "lucide-react";
import { CVTemplateProps } from "../types";
import { CVHeaderActions } from "../components/cv-header-actions";
import { CVSocialLinks, getContactIcon } from "../components/cv-contact-badges";
import { CVFormattedText } from "../components/cv-formatted-text";

export function BentoModernTemplate({ data, isPreview = false }: CVTemplateProps) {
  const { profile, contact, experiences, stack, education, hobbies } = data;

  return (
    <main
      data-template="bento-modern"
      className={`min-h-screen bg-slate-950 text-slate-100 font-sans ${
        isPreview ? "p-3 sm:p-6" : "p-4 md:p-12"
      } relative selection:bg-indigo-500 selection:text-white print:min-h-0 print:h-auto print:p-0 print:m-0`}
    >
      <div className="max-w-6xl mx-auto space-y-6 print:space-y-2 print:max-w-full print:p-0">
        
        {/* TOP BAR ACTIONS */}
        <div className="flex justify-end no-print print:hidden" data-no-print>
          <CVHeaderActions isPreview={isPreview} className="w-full sm:w-auto" />
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* CARTE 1 : HERO PROFILE (8 Cols) */}
          <div className="md:col-span-8 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
              {profile.avatar && (
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl shrink-0">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-center sm:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full">
                  <Sparkles size={12} />
                  <span>{data.customization?.badgeText || "Portfolio & CV"}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {profile.name}
                </h1>
                <p className="text-base sm:text-lg font-medium text-indigo-300">
                  {profile.title}
                </p>
                {profile.bio && (
                  <p className="text-xs text-slate-400 max-w-lg leading-relaxed pt-1">
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <CVSocialLinks links={profile.links} />
            </div>
          </div>

          {/* CARTE 2 : CONTACT & STATUS (4 Cols) */}
          <div className="md:col-span-4 bg-slate-900/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
              <span>Coordonnées</span>
            </h2>
            <div className="space-y-3">
              {contact.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 text-xs"
                >
                  <div className="text-indigo-400 p-2 bg-indigo-500/10 rounded-lg shrink-0">
                    {getContactIcon(item.icon || item.label, 14)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">{item.label}</p>
                    <p className="font-medium text-slate-200 truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CARTE 3 : EXPÉRIENCES (8 Cols) */}
          <div className="md:col-span-8 bg-slate-900/70 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="text-indigo-400" size={18} />
                <span>Expériences Professionnelles</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">{experiences.length} postes</span>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="space-y-2 relative pl-6 border-l-2 border-indigo-500/30">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-white">{exp.title}</h3>
                    <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-mono">
                      {exp.date}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {exp.company}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-300 leading-relaxed">
                    {exp.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-1">▸</span>
                        <CVFormattedText text={task} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CARTE 4 : STACK TECHNIQUE (4 Cols) */}
          <div className="md:col-span-4 bg-slate-900/70 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Layers className="text-indigo-400" size={18} />
              <span>Stack Technique</span>
            </h2>

            <div className="space-y-6">
              {stack.map((group, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-slate-800/80 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-700/60 rounded-lg text-xs font-mono transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CARTE 5 : DIPLÔMES (6 Cols) */}
          {education.length > 0 && (
            <div className="md:col-span-6 bg-slate-900/70 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <GraduationCap className="text-indigo-400" size={18} />
                <span>Formations & Diplômes</span>
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 text-xs space-y-1"
                  >
                    <p className="font-bold text-white">{edu.title}</p>
                    <p className="text-slate-400">{edu.school} • <span className="font-mono text-indigo-400">{edu.date}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CARTE 6 : PASSIONS & HORS-CODE (6 Cols) */}
          {hobbies.length > 0 && (
            <div className="md:col-span-6 bg-slate-900/70 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Heart className="text-pink-400" size={18} />
                <span>Centres d&apos;intérêt</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hobbies.map((hobby, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 text-xs font-medium text-slate-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full shrink-0" />
                    <span>{hobby}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
