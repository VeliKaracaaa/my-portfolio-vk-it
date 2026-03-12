"use client";

import { useState, useEffect } from "react";

interface Post {
  id: string;
  content: string;
  createdAt: string;
  publishedToLinkedIn: boolean;
  linkedInPostId?: string;
  imageBase64?: string;
  imageType?: string;
  videoUrl?: string;
  documentUrl?: string;
  documentName?: string;
}

export default function AdminPage() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [document, setDocument] = useState<File | null>(null);

  useEffect(() => {
    fetchPosts();
    checkLinkedInStatus();
  }, []);

  async function fetchPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts || []);
  }

  async function checkLinkedInStatus() {
    const res = await fetch("/api/linkedin/status");
    const data = await res.json();
    setLinkedInConnected(data.connected);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setVideo(null);
      setVideoPreview(null);
      setDocument(null);
    } else {
      setImagePreview(null);
    }
  }

  function handleRemoveImage() {
    setImage(null);
    setImagePreview(null);
  }

  function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setVideo(file);
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
      setImage(null);
      setImagePreview(null);
      setDocument(null);
    } else {
      setVideoPreview(null);
    }
  }

  function handleRemoveVideo() {
    setVideo(null);
    setVideoPreview(null);
  }

  function handleDocumentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setDocument(file);
    if (file) {
      setImage(null);
      setImagePreview(null);
      setVideo(null);
      setVideoPreview(null);
    }
  }

  function handleRemoveDocument() {
    setDocument(null);
  }

  async function handleSave() {
    if (!content.trim()) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);
    if (document) formData.append("document", document);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setContent("");
      setImage(null);
      setImagePreview(null);
      setVideo(null);
      setVideoPreview(null);
      setDocument(null);
      setMessage({ type: "success", text: "Post sauvegardé !" });
      fetchPosts();
    }
    setLoading(false);
    setTimeout(() => setMessage(null), 3000);
  }

  async function handlePublishToLinkedIn(postId: string) {
    setLoading(true);
    const res = await fetch(`/api/linkedin/publish/${postId}`, {
      method: "POST",
    });
    const data = await res.json();
    if (res.ok) {
      setMessage({ type: "success", text: "Publié sur LinkedIn !" });
      fetchPosts();
    } else {
      setMessage({
        type: "error",
        text: data.error || "Erreur lors de la publication",
      });
    }
    setLoading(false);
    setTimeout(() => setMessage(null), 4000);
  }

  async function handleDelete(postId: string) {
    await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    fetchPosts();
  }

  return (
    <div className="max-w-3xl mx-auto p-8 pt-20">
      <h1 className="text-3xl font-bold mb-2 text-slate-900">
        Admin — Mes Posts
      </h1>
      <p className="text-slate-500 mb-8 text-sm">
        Écris ici → sauvegardé sur ton portfolio → publié sur LinkedIn quand tu
        veux.
      </p>

      {/* Statut LinkedIn */}
      <div
        className={`flex items-center gap-3 p-4 rounded-xl mb-8 border ${
          linkedInConnected
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-amber-50 border-amber-200 text-amber-800"
        }`}
      >
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            linkedInConnected ? "bg-green-500" : "bg-amber-400"
          }`}
        />
        <span className="text-sm font-medium">
          {linkedInConnected ? "LinkedIn connecté ✓" : "LinkedIn non connecté"}
        </span>
        {!linkedInConnected && (
          <a
            href="/api/linkedin/auth"
            className="ml-auto text-xs bg-[#0077b5] text-white px-4 py-1.5 rounded-lg hover:bg-[#005f8e] transition-colors"
          >
            Connecter LinkedIn
          </a>
        )}
      </div>

      {/* Éditeur */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écris ton post ici..."
          rows={6}
          className="w-full resize-none text-slate-800 placeholder-slate-400 text-base leading-relaxed focus:outline-none"
        />

        {/* Upload image */}
        <div className="mt-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-500 hover:text-slate-700 transition-colors w-fit">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Ajouter une image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {imagePreview && (
            <div className="relative mt-2 inline-block">
              <img
                src={imagePreview}
                alt="preview"
                className="max-h-32 rounded-lg border border-slate-200"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Upload vidéo */}
        <div className="mt-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-500 hover:text-slate-700 transition-colors w-fit">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Ajouter une vidéo
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
          </label>
          {videoPreview && (
            <div className="relative mt-2 inline-block">
              <video
                src={videoPreview}
                className="max-h-32 rounded-lg border border-slate-200"
                controls
              />
              <button
                onClick={handleRemoveVideo}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Upload document PDF */}
        <div className="mt-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-500 hover:text-slate-700 transition-colors w-fit">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Ajouter un PDF
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleDocumentChange}
            />
          </label>
          {document && (
            <div className="flex items-center gap-2 mt-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              <svg
                className="w-4 h-4 text-red-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 13h8v1H8v-1zm0 3h8v1H8v-1zm0-6h5v1H8v-1z" />
              </svg>
              <span className="text-xs text-slate-700 truncate max-w-xs">
                {document.name}
              </span>
              <button
                onClick={handleRemoveDocument}
                className="ml-auto text-slate-400 hover:text-red-500 text-xs"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            {content.length} / 3000 caractères
          </span>
          <button
            onClick={handleSave}
            disabled={loading || !content.trim()}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Sauvegarde..." : "Sauvegarder le post"}
          </button>
        </div>
      </div>

      {/* Message de feedback */}
      {message && (
        <div
          className={`p-4 rounded-xl mb-6 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Liste des posts */}
      <div className="space-y-4">
        {posts.length === 0 && (
          <p className="text-center text-slate-400 py-12">
            Aucun post pour l'instant.
          </p>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
          >
            {/* Affichage image */}
            {post.imageBase64 && (
              <img
                src={`data:${post.imageType};base64,${post.imageBase64}`}
                alt="image du post"
                className="w-full max-h-48 object-cover rounded-xl mb-3 border border-slate-100"
              />
            )}

            {/* Affichage vidéo */}
            {post.videoUrl && (
              <video
                src={post.videoUrl}
                className="w-full max-h-48 rounded-xl mb-3 border border-slate-100"
                controls
              />
            )}

            {/* Affichage document PDF */}
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

            <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap mb-4">
              {post.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
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
                {!post.publishedToLinkedIn && linkedInConnected && (
                  <button
                    onClick={() => handlePublishToLinkedIn(post.id)}
                    disabled={loading}
                    className="text-xs bg-[#0077b5] text-white px-4 py-1.5 rounded-lg hover:bg-[#005f8e] disabled:opacity-40 transition-colors"
                  >
                    Publier sur LinkedIn
                  </button>
                )}
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-xs text-slate-400 hover:text-red-500 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
