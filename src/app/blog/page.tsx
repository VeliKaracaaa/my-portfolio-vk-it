// import { createClient } from "redis";
// import { Card, CardContent } from "@/components/ui/card";

// async function getLinkedInPosts() {
//   const redis = createClient({ url: process.env.REDIS_URL });
//   await redis.connect();
//   const token = await redis.get("linkedin_token");
//   let userUrn = await redis.get("linkedin_user_urn");
//   await redis.disconnect();

//   if (!token || !userUrn) return null;

//   // Nettoyage de l'URN au cas où il y aurait des doublons de préfixe
//   // On s'assure qu'il commence bien par urn:li:person: une seule fois
//   const cleanUrn = userUrn.includes("urn:li:")
//     ? userUrn
//     : `urn:li:person:${userUrn}`;

//   // Tentative avec l'API /posts (version la plus récente)
//   const res = await fetch(
//     `https://api.linkedin.com/v2/posts?author=${encodeURIComponent(cleanUrn)}&q=author&count=10`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "X-Restli-Protocol-Version": "2.0.0",
//       },
//       next: { revalidate: 3600 },
//     },
//   );

//   const data = await res.json();
//   console.log("URN UTILISÉ:", cleanUrn);
//   console.log("RÉPONSE LINKEDIN:", data);

//   return data;
// }
// export default async function BlogPage() {
//   const data = await getLinkedInPosts();

//   return (
//     <div className="max-w-4xl mx-auto p-8 pt-20">
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Mes Posts LinkedIn
//       </h1>

//       {!data || data.serviceErrorCode ? (
//         <div className="p-4 bg-red-50 text-red-600 rounded-lg">
//           <p>Aucun post trouvé ou erreur API.</p>
//           <p className="text-sm mt-2">
//             Assure-toi d'être bien synchronisé via l'admin.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-6">
//           <p className="text-sm text-gray-500 mb-4 italic">
//             Contenu brut récupéré de LinkedIn :
//           </p>
//           <pre className="bg-slate-900 text-green-400 p-6 rounded-xl text-xs overflow-auto shadow-lg border border-slate-700">
//             {JSON.stringify(data, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

import { createClient } from "redis";

interface Post {
  id: string;
  content: string;
  createdAt: string;
  publishedToLinkedIn: boolean;
  linkedInPostId?: string;
}

async function getPosts(): Promise<Post[]> {
  const redis = createClient({ url: process.env.REDIS_URL });
  try {
    await redis.connect();
    const keys = await redis.keys("post:*");
    const posts = await Promise.all(
      keys.map(async (key) => {
        const raw = await redis.get(key);
        return raw ? JSON.parse(raw) : null;
      }),
    );
    return posts
      .filter(Boolean)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  } finally {
    await redis.disconnect();
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

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
            <article key={post.id} className="group">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
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
