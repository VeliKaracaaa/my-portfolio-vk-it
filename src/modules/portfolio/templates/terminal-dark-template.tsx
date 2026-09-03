"use client";

import React from "react";
import Image from "next/image";
import { Terminal, Cpu, ShieldCheck } from "lucide-react";
import { CVTemplateProps } from "../types";
import { CVHeaderActions } from "../components/cv-header-actions";
import { CVSocialLinks } from "../components/cv-contact-badges";
import { CVFormattedText } from "../components/cv-formatted-text";

export function TerminalDarkTemplate({ data, isPreview = false }: CVTemplateProps) {
  const { profile, contact, experiences, stack, education, hobbies } = data;

  return (
    <main
      data-template="terminal-dark"
      className={`min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono ${
        isPreview ? "p-3 sm:p-6" : "p-4 md:p-10"
      } selection:bg-emerald-500 selection:text-black print:min-h-0 print:h-auto print:p-0 print:m-0`}
    >
      <div className="max-w-5xl mx-auto space-y-6 print:space-y-2 print:max-w-full print:p-0">
        
        {/* BOUTONS D'ACTION */}
        <div className="flex justify-end no-print print:hidden" data-no-print>
          <CVHeaderActions isPreview={isPreview} />
        </div>

        {/* TERMINAL SHELL WINDOW */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden">
          
          {/* WINDOW TITLE BAR */}
          <div className="bg-[#090d13] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="text-xs text-slate-400 font-mono ml-2">veli@mainframe:~ (zsh)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck size={14} />
              <span>ONLINE</span>
            </div>
          </div>

          {/* TERMINAL CONTENT */}
          <div className="p-6 md:p-8 space-y-8">
            
            {/* $ whoami / PROFILE */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <span>➜</span>
                <span className="text-cyan-400">~</span>
                <span className="font-bold text-white">$ whoami --verbose</span>
              </div>

              <div className="p-4 bg-[#0d1117] rounded-xl border border-[#30363d] flex flex-col md:flex-row items-center md:items-start gap-6">
                {profile.avatar && (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-emerald-500/40 shrink-0">
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      sizes="96px"
                      className="object-cover contrast-125"
                    />
                  </div>
                )}
                <div className="space-y-1.5 text-center md:text-left flex-1">
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                    {profile.name}
                  </h1>
                  <p className="text-sm font-bold text-cyan-300">
                    [ROLE]: {profile.title}
                  </p>
                  {profile.bio && (
                    <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                      // {profile.bio}
                    </p>
                  )}
                  <div className="pt-3">
                    <CVSocialLinks links={profile.links} />
                  </div>
                </div>
              </div>
            </div>

            {/* $ cat contacts.env */}
            {contact.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <span>➜</span>
                  <span className="text-cyan-400">~</span>
                  <span className="font-bold text-white">$ cat contacts.env</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-[#0d1117] rounded-xl border border-[#30363d] text-xs">
                  {contact.map((c, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-slate-500 uppercase text-[10px]">{c.label}</span>
                      <span className="text-slate-200 font-semibold truncate">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* $ ./list_experiences.sh */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <span>➜</span>
                <span className="text-cyan-400">~</span>
                <span className="font-bold text-white">$ ./list_experiences.sh --all</span>
              </div>

              <div className="space-y-6">
                {experiences.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="p-5 bg-[#0d1117] rounded-xl border border-[#30363d] hover:border-emerald-500/50 transition-colors space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#30363d] pb-2">
                      <span className="text-emerald-400 font-bold text-sm">
                        {exp.title} <span className="text-slate-500">@ {exp.company}</span>
                      </span>
                      <span className="px-2 py-0.5 bg-[#161b22] text-cyan-400 border border-[#30363d] rounded text-xs">
                        {exp.date}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                      {exp.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">$</span>
                          <CVFormattedText text={task} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* $ cat skills.json */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <span>➜</span>
                <span className="text-cyan-400">~</span>
                <span className="font-bold text-white">$ cat skills.json</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stack.map((group, idx) => (
                  <div key={idx} className="p-4 bg-[#0d1117] rounded-xl border border-[#30363d] space-y-2">
                    <p className="text-xs text-cyan-300 font-bold flex items-center gap-1.5">
                      <Cpu size={14} /> &quot;{group.title}&quot;:
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 bg-[#161b22] text-emerald-300 border border-emerald-500/20 rounded text-[11px]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DIPLOMES & HOBBIES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#30363d]">
              <div>
                <p className="text-xs text-slate-400 font-bold mb-3">$ head -n 4 diplomas.log</p>
                <div className="space-y-2">
                  {education.map((edu, idx) => (
                    <div key={idx} className="text-xs p-2.5 bg-[#0d1117] rounded border border-[#30363d]">
                      <p className="text-white font-semibold">{edu.title}</p>
                      <p className="text-slate-400 text-[11px]">{edu.school} • {edu.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {hobbies.length > 0 && (
                <div>
                  <p className="text-xs text-slate-400 font-bold mb-3">$ cat hobbies.txt</p>
                  <div className="p-3 bg-[#0d1117] rounded border border-[#30363d] space-y-1.5 text-xs text-slate-300">
                    {hobbies.map((h, i) => (
                      <p key={i} className="flex items-center gap-2">
                        <span className="text-cyan-400">#</span>
                        <span>{h}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
