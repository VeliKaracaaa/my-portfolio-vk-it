"use client";

import type { SelectPost as Post } from "@/modules/publishing/schema";

interface PostItemProps {
  post: Post;
  isEditing: boolean;
  editingContent: string;
  loading: boolean;
  linkedInConnected: boolean;
  onStartEdit: (post: Post) => void;
  onCancelEdit: () => void;
  onSaveEdit: (postId: string) => void;
  onContentChange: (content: string) => void;
  onDelete: (postId: string) => void;
  onPublishToLinkedIn: (postId: string) => void;
}

export function PostItem({
  post,
  isEditing,
  editingContent,
  loading,
  linkedInConnected,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onContentChange,
  onDelete,
  onPublishToLinkedIn,
}: PostItemProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="image du post"
          className="w-full max-h-48 object-cover rounded-xl mb-3 border border-slate-100"
        />
      )}
      {post.videoUrl && (
        <video
          src={post.videoUrl}
          className="w-full max-h-48 rounded-xl mb-3 border border-slate-100"
          controls
        />
      )}
      {post.documentUrl && (
        <a
          href={post.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-3 hover:bg-red-100 transition-colors"
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

      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editingContent}
            onChange={(e) => onContentChange(e.target.value)}
            rows={5}
            className="w-full resize-none text-slate-800 text-sm leading-relaxed border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          {post.publishedToLinkedIn && (
            <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Ce post est déjà publié sur LinkedIn — la modification ne
              s&apos;y répercutera pas.
            </p>
          )}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onSaveEdit(post.id)}
              disabled={loading || !editingContent.trim()}
              className="text-xs bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-40 transition-colors"
            >
              {loading ? "Sauvegarde..." : "Sauvegarder"}
            </button>
            <button
              onClick={onCancelEdit}
              className="text-xs text-slate-500 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap mb-4">
          {post.content}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            {new Date(post.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {post.updatedAt && (
              <span className="ml-1 text-slate-300">(modifié)</span>
            )}
          </span>
          {post.publishedToLinkedIn && (
            <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Publié
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <button
              onClick={() => onStartEdit(post)}
              className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              ✏️ Modifier
            </button>
          )}
          {!post.publishedToLinkedIn &&
            linkedInConnected &&
            !isEditing && (
              <button
                onClick={() => onPublishToLinkedIn(post.id)}
                disabled={loading}
                className="text-xs bg-[#0077b5] text-white px-4 py-1.5 rounded-lg hover:bg-[#005f8e] disabled:opacity-40 transition-colors"
              >
                Publier sur LinkedIn
              </button>
            )}
          {!isEditing && (
            <button
              onClick={() => onDelete(post.id)}
              className="text-xs text-slate-400 hover:text-red-500 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
