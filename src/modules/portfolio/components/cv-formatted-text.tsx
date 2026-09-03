import React from "react";

interface CVFormattedTextProps {
  text: string;
  className?: string;
}

/**
 * Composant de rendu de texte sécurisé.
 * Parse les balises de mise en valeur markdown (ex: **texte en gras**)
 * sans jamais recourir à dangerouslySetInnerHTML (Protection XSS).
 */
export function CVFormattedText({ text, className = "" }: CVFormattedTextProps) {
  if (!text) return null;

  // Découpe le texte selon les segments **gras**
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const boldContent = part.slice(2, -2);
          return (
            <strong key={index} className="font-bold text-slate-900">
              {boldContent}
            </strong>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
