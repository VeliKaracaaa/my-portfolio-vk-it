"use client";

import { 
  getPostsAction, 
  createPostAction, 
  updatePostAction, 
  deletePostAction 
} from "@/app/actions/posts";
import { 
  checkLinkedInStatusAction, 
  publishToLinkedInAction, 
  logoutLinkedInAction 
} from "@/app/actions/linkedin";
import type { SelectPost as Post } from "@/lib/schema";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";

// ─────────────────────────────────────────────────────────────────────────────
// INFORMATIONS ADMIN
// Pour ajouter une nouvelle info, ajoute simplement un objet dans ce tableau.
// ─────────────────────────────────────────────────────────────────────────────
const ADMIN_INFOS = [
  {
    emoji: "✏️",
    title: "Modifier un post",
    description: (
      <>
        La modification du texte est appliquée sur ton portfolio (blog)
        uniquement. Si le post a déjà été publié sur LinkedIn, il{" "}
        <span className="font-semibold text-amber-600">
          ne sera pas mis à jour sur LinkedIn
        </span>{" "}
        car l&apos;API LinkedIn réserve la modification de posts aux partenaires
        certifiés — inaccessible aux développeurs indépendants. Pour corriger un
        post LinkedIn, tu dois le supprimer et le republier.
      </>
    ),
  },
  {
    emoji: "🗑️",
    title: "Supprimer un post",
    description: (
      <>
        La suppression efface le post de ton blog{" "}
        <span className="font-semibold text-slate-700">et de LinkedIn</span>{" "}
        automatiquement si le post y avait été publié.
      </>
    ),
  },
  {
    emoji: "🔑",
    title: "Token LinkedIn",
    description: (
      <>
        La connexion LinkedIn expire après{" "}
        <span className="font-semibold text-slate-700">2 mois</span>. Si le
        statut passe à &quot;non connecté&quot;, clique sur &quot;Connecter
        LinkedIn&quot; pour renouveler l&apos;accès.
      </>
    ),
  },
  {
    emoji: "📄",
    title: "Publication PDF sur LinkedIn",
    description: (
      <>
        Les PDFs sont partagés sur LinkedIn sous forme de{" "}
        <span className="font-semibold text-slate-700">lien cliquable</span>{" "}
        dans le texte du post. Le carousel de documents LinkedIn est réservé aux
        partenaires certifiés — inaccessible aux développeurs indépendants.
      </>
    ),
  },
  {
    emoji: "🎬",
    title: "Vidéos volumineuses",
    description: (
      <>
        Les vidéos sont uploadées directement depuis ton navigateur vers Vercel
        Blob (stockage cloud), sans passer par le serveur. Cela permet de
        dépasser la limite de 4,5 Mo imposée par Vercel sur les fonctions
        serverless. Taille max :{" "}
        <span className="font-semibold text-slate-700">500 Mo</span>.
      </>
    ),
  },
];
// ─────────────────────────────────────────────────────────────────────────────

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
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    fetchPosts();
    checkLinkedInStatus();
  }, []);

  async function fetchPosts() {
    const data = await getPostsAction();
    setPosts(data);
  }

  async function checkLinkedInStatus() {
    const result = await checkLinkedInStatusAction();
    if (result.success) {
      setLinkedInConnected(result.data.connected);
    } else {
      setLinkedInConnected(false);
    }
  }

  async function handleLogoutLinkedIn() {
    if (!confirm("Se déconnecter de LinkedIn ?")) return;
    const result = await logoutLinkedInAction();
    if (result.success) {
      setLinkedInConnected(false);
      toast.success("Déconnecté de LinkedIn");
    } else {
      toast.error(result.error);
    }
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

  function handleStartEdit(post: Post) {
    setEditingPostId(post.id);
    setEditingContent(post.content);
  }

  function handleCancelEdit() {
    setEditingPostId(null);
    setEditingContent("");
  }

  async function handleSaveEdit(postId: string) {
    if (!editingContent.trim()) return;
    setLoading(true);
    
    const result = await updatePostAction(postId, editingContent);
    
    if (result.success) {
      setMessage({ type: "success", text: "Post modifié !" });
      setEditingPostId(null);
      setEditingContent("");
      fetchPosts();
    } else {
      setMessage({ type: "error", text: result.error });
    }
    
    setLoading(false);
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleSave() {
    if (!content.trim()) return;
    setLoading(true);
    try {
      let videoUrl: string | null = null;
      let documentUrl: string | null = null;
      let documentName: string | null = null;

      // Upload des fichiers volumineux via le client (Vercel Blob)
      if (video) {
        const blob = await upload(`videos/${Date.now()}-${video.name}`, video, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
        });
        videoUrl = blob.url;
      }

      if (document) {
        const blob = await upload(
          `documents/${Date.now()}-${document.name}`,
          document,
          { access: "public", handleUploadUrl: "/api/blob/upload" },
        );
        documentUrl = blob.url;
        documentName = document.name;
      }

      // Préparation du FormData pour l'Action
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);
      if (videoUrl) formData.append("videoUrl", videoUrl);
      if (documentUrl) formData.append("documentUrl", documentUrl);
      if (documentName) formData.append("documentName", documentName);

      const result = await createPostAction(formData);

      if (result.success) {
        setContent("");
        setImage(null);
        setImagePreview(null);
        setVideo(null);
        setVideoPreview(null);
        setDocument(null);
        setMessage({ type: "success", text: "Post sauvegardé !" });
        fetchPosts();
      } else {
        setMessage({ type: "error", text: result.error });
      }
    } catch (err) {
      console.error("Erreur upload:", err);
      setMessage({ type: "error", text: "Erreur lors de l'upload du fichier" });
    }
    setLoading(false);
    setTimeout(() => setMessage(null), 3000);
  }

  async function handlePublishToLinkedIn(postId: string) {
    setLoading(true);
    const result = await publishToLinkedInAction(postId);
    
    if (result.success) {
      toast.success("Publié sur LinkedIn !");
      fetchPosts();
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  }

  async function handleDelete(postId: string) {
    if (!confirm("Es-tu sûr de vouloir supprimer ce post ?")) return;
    
    const result = await deletePostAction(postId);
    if (result.success) {
      toast.success("Post supprimé");
      fetchPosts();
    } else {
      toast.error(result.error);
    }
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
        className={`flex items-center gap-3 p-4 rounded-xl mb-4 border ${
          linkedInConnected
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-amber-50 border-amber-200 text-amber-800"
        }`}
      >
        <div
          className={`w-2.5 h-2.5 rounded-full ${linkedInConnected ? "bg-green-500" : "bg-amber-400"}`}
        />
        <span className="text-sm font-medium">
          {linkedInConnected ? "LinkedIn connecté ✓" : "LinkedIn non connecté"}
        </span>
        {linkedInConnected ? (
          <button
            onClick={handleLogoutLinkedIn}
            className="ml-auto text-xs text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            Déconnecter
          </button>
        ) : (
          <a
            href="/api/linkedin/auth"
            className="ml-auto text-xs bg-[#0077b5] text-white px-4 py-1.5 rounded-lg hover:bg-[#005f8e] transition-colors"
          >
            Connecter LinkedIn
          </a>
        )}
      </div>

      {/* Bloc informations — généré depuis ADMIN_INFOS */}
      <details className="bg-slate-50 border border-slate-200 rounded-xl mb-8 group">
        <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors select-none list-none">
          <svg
            className="w-4 h-4 text-blue-500 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Informations importantes
          <svg
            className="w-4 h-4 ml-auto text-slate-400 group-open:rotate-180 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>

        <div className="px-4 pb-4 space-y-4 border-t border-slate-200 pt-4">
          {ADMIN_INFOS.map((info, index) => (
            <div key={index} className="flex gap-3">
              <span className="text-lg flex-shrink-0">{info.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-1">
                  {info.title}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </details>

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

            {editingPostId === post.id ? (
              <div className="mb-4">
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
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
                    onClick={() => handleSaveEdit(post.id)}
                    disabled={loading || !editingContent.trim()}
                    className="text-xs bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-40 transition-colors"
                  >
                    {loading ? "Sauvegarde..." : "Sauvegarder"}
                  </button>
                  <button
                    onClick={handleCancelEdit}
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
                {editingPostId !== post.id && (
                  <button
                    onClick={() => handleStartEdit(post)}
                    className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    ✏️ Modifier
                  </button>
                )}
                {!post.publishedToLinkedIn &&
                  linkedInConnected &&
                  editingPostId !== post.id && (
                    <button
                      onClick={() => handlePublishToLinkedIn(post.id)}
                      disabled={loading}
                      className="text-xs bg-[#0077b5] text-white px-4 py-1.5 rounded-lg hover:bg-[#005f8e] disabled:opacity-40 transition-colors"
                    >
                      Publier sur LinkedIn
                    </button>
                  )}
                {editingPostId !== post.id && (
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-xs text-slate-400 hover:text-red-500 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
