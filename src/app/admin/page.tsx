// export default function AdminPage() {
//   // On définit les permissions demandées
//   // openid profile : pour savoir qui tu es
//   // w_member_social : pour publier (déjà actif chez toi)
//   // r_member_social : C'EST CELLE-CI qu'on tente de forcer pour lire tes posts
//   const scopes = ["openid", "profile", "w_member_social", "r_member_social"];

//   const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || "";
//   const redirectUri = encodeURIComponent(
//     process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || "",
//   );
//   const scopeString = encodeURIComponent(scopes.join(" "));

//   const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopeString}`;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50">
//       <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full text-center">
//         <h1 className="text-3xl font-extrabold mb-4 text-slate-900">
//           Admin Panel
//         </h1>
//         <p className="mb-8 text-slate-600">
//           Clique sur le bouton pour forcer la synchronisation des droits de
//           lecture de tes posts.
//         </p>

//         <a
//           href={authUrl}
//           className="inline-flex items-center justify-center w-full bg-[#0077b5] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#005582] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg"
//         >
//           <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
//             <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//           </svg>
//           Forcer la synchronisation
//         </a>

//         <p className="mt-6 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
//           LinkedIn API v2024
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

interface Post {
  id: string;
  content: string;
  createdAt: string;
  publishedToLinkedIn: boolean;
  linkedInPostId?: string;
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

  async function handleSave() {
    if (!content.trim()) return;
    setLoading(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      setContent("");
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
          className={`w-2.5 h-2.5 rounded-full ${linkedInConnected ? "bg-green-500" : "bg-amber-400"}`}
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
