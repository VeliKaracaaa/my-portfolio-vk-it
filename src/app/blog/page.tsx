export const dynamic = "force-dynamic";

import { getAllPosts } from "@/data/posts";
import type { SelectPost as Post } from "@/lib/schema";

/**
 * ============================================================
 * PAGE BLOG — AFFICHAGE DES ARTICLES
 * ============================================================
 * 
 * Cette page est maintenant connectée au Data Access Layer (DAL).
 * Elle ne sait pas si les données viennent de Redis, Postgres ou d'une API.
 * Elle se contente d'afficher les objets retournés par getAllPosts().
 */

export default async function BlogPage() {
  // Récupération sécurisée via le DAL (Postgres + Drizzle)
  const posts = await getAllPosts();

  return (
    <div className="max-w-2xl mx-auto p-8 pt-20">
      <h1 className="text-3xl font-bold mb-2 text-slate-900">Blog</h1>
      <p className="text-slate-500 mb-10 text-sm">Mes réflexions & pensées</p>

      {posts.length === 0 ? (
        <p className="text-slate-400 text-center py-16">
          Aucun post pour l'instant.
        </p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id}>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">

                {/* Image — Utilise maintenant l'URL directe de Vercel Blob */}
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="image du post"
                    className="w-full max-h-64 object-cover rounded-xl mb-4 border border-slate-100"
                  />
                )}

                {/* Vidéo si présente */}
                {post.videoUrl && (
                  <video
                    src={post.videoUrl}
                    className="w-full max-h-64 rounded-xl mb-4 border border-slate-100"
                    controls
                  />
                )}

                {/* Document PDF si présent */}
                {post.documentUrl && (
                  <a
                    href={post.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 hover:bg-red-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-red-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 13h8v1H8v-1zm0 3h8v1H8v-1zm0-6h5v1H8v-1z" />
                    </svg>
                    <span className="text-sm text-red-700 font-medium truncate">
                      {post.documentName || "Document PDF"}
                    </span>
                    <svg
                      className="w-4 h-4 text-red-400 ml-auto flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}

                <p className="text-slate-800 leading-relaxed whitespace-pre-wrap text-[15px]">
                  {post.content}
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50">
                  <time className="text-xs text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  {post.publishedToLinkedIn && (
                    <span className="flex items-center gap-1.5 text-xs text-blue-600">
                      <svg
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      Publié sur LinkedIn
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}