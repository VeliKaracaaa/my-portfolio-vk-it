"use client";

import { 
  getPostsAction, 
  createPostAction, 
  updatePostAction, 
  deletePostAction,
  checkLinkedInStatusAction, 
  publishToLinkedInAction, 
  logoutLinkedInAction,
} from "@/modules/publishing/actions";
import type { SelectPost as Post } from "@/modules/publishing/schema";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { AdminInfoAccordion } from "./_components/admin-info-accordion";
import { PostItem } from "./_components/post-item";

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

      {/* Accordéon d'aide */}
      <AdminInfoAccordion />

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
          <PostItem
            key={post.id}
            post={post}
            isEditing={editingPostId === post.id}
            editingContent={editingContent}
            loading={loading}
            linkedInConnected={linkedInConnected}
            onStartEdit={handleStartEdit}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={handleSaveEdit}
            onContentChange={setEditingContent}
            onDelete={handleDelete}
            onPublishToLinkedIn={handlePublishToLinkedIn}
          />
        ))}
      </div>
    </div>
  );
}
