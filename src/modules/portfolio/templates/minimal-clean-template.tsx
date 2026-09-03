"use client";

import React from "react";
import Image from "next/image";
import { CVTemplateProps } from "../types";
import { CVHeaderActions } from "../components/cv-header-actions";
import { CVSocialLinks } from "../components/cv-contact-badges";
import { CVFormattedText } from "../components/cv-formatted-text";

export function MinimalCleanTemplate({ data, isPreview = false }: CVTemplateProps) {
  const { profile, contact, experiences, stack, education, hobbies } = data;

  return (
    <main
      data-template="minimal-clean"
      className={`min-h-screen bg-white text-slate-900 font-sans ${
        isPreview ? "p-4 sm:p-8" : "p-6 md:p-16"
      } max-w-4xl mx-auto print:min-h-0 print:h-auto print:p-0 print:m-0 print:max-w-full`}
    >
      {/* BOUTONS D'ACTION */}
      <div className="flex justify-end mb-8 no-print print:hidden" data-no-print>
        <CVHeaderActions isPreview={isPreview} />
      </div>

      {/* HEADER ÉPURÉ */}
      <header className="border-b-2 border-slate-900 pb-8 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-slate-950">
              {profile.name}
            </h1>
            <p className="text-sm font-mono uppercase tracking-widest text-slate-600">
              {profile.title}
            </p>
          </div>
          {profile.avatar && (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-slate-300 shrink-0">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="80px"
                className="object-cover grayscale"
              />
            </div>
          )}
        </div>

        {profile.bio && (
          <p className="text-sm text-slate-700 mt-4 max-w-2xl leading-relaxed italic">
            &ldquo;{profile.bio}&rdquo;
          </p>
        )}

        {/* COORDONNÉES EN LIGNE */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-600">
          {contact.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <strong className="text-slate-900">{c.label}:</strong> {c.value}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <CVSocialLinks links={profile.links} />
        </div>
      </header>

      {/* EXPÉRIENCES */}
      <section className="mb-12">
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 mb-6 border-b border-slate-200 pb-2">
          01. Expériences Professionnelles
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-base font-bold text-slate-950">{exp.title}</h3>
                <span className="text-xs font-mono text-slate-500">{exp.date}</span>
              </div>
              <p className="text-xs font-serif uppercase tracking-wider text-slate-600">
                {exp.company}
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-700 leading-relaxed list-disc list-inside">
                {exp.tasks.map((task, tIdx) => (
                  <li key={tIdx}>
                    <CVFormattedText text={task} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* STACK TECHNIQUE */}
      <section className="mb-12">
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 mb-6 border-b border-slate-200 pb-2">
          02. Compétences & Technologies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stack.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <h3 className="text-xs font-bold text-slate-900">{group.title}</h3>
              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                {group.items.join(" • ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FORMATION & DIPLÔMES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
        <section>
          <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 mb-4">
            03. Formation
          </h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-0.5 text-xs">
                <p className="font-bold text-slate-950">{edu.title}</p>
                <p className="text-slate-600">{edu.school}</p>
                <p className="font-mono text-slate-400 text-[11px]">{edu.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HORS-CODE */}
        {hobbies.length > 0 && (
          <section>
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 mb-4">
              04. Activités & Intérêts
            </h2>
            <ul className="space-y-2 text-xs text-slate-700">
              {hobbies.map((hobby, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-slate-400">—</span>
                  <span>{hobby}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
