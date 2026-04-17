"use client";

import { useState, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitInspirationAction, verifyRessourcesPassword } from "../actions/inspirations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ArrowLeft, CheckCircle2, Sparkles, Wand2, PaintBucket, Globe2, Link as LinkIcon, Palette, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// --- DONNÉES DU FORMULAIRE ---

const COLORS = [
  { id: "Rouge", label: "Rouge", desc: "Pouvoir, passion et enthousiasme", hex: "#ef4444" },
  { id: "Orange", label: "Orange", desc: "Bonheur, gaieté et créativité", hex: "#f97316" },
  { id: "Jaune", label: "Jaune", desc: "Joie, luminosité et intelligence", hex: "#facc15" },
  { id: "Vert", label: "Vert", desc: "Harmonie, nature, croissance et santé", hex: "#22c55e" },
  { id: "Bleu", label: "Bleu", desc: "Paix, fiabilité et professionnalisme", hex: "#3b82f6" },
  { id: "Violet", label: "Violet", desc: "Richesse, sagesse et magie", hex: "#a855f7" },
  { id: "Rose", label: "Rose", desc: "Romance, soins et affection", hex: "#ec4899" },
  { id: "Marron", label: "Marron", desc: "Nature, durabilité et confort", hex: "#8b5cf6" }, 
  { id: "Noir", label: "Noir", desc: "Pouvoir, élégance et minimalisme", hex: "#0f172a", textWhite: true },
];

const PERSONALITIES = [
  { id: "Serieux", label: "Sérieux / Élégant", desc: "Luxe, élégance, polices à empattement, or/pastel, images HD." },
  { id: "Audacieux", label: "Audacieux / Confiant", desc: "Impact puissant, typographie grande, blocs de couleurs vives." },
  { id: "Calme", label: "Calme / Paisible", desc: "Apaisant, pastel, titres doux, illustrations douces." },
  { id: "Startup", label: "Startup / Upbeat", desc: "Sans empattement, fond gris clair, éléments arrondis." },
  { id: "Ludique", label: "Ludique / Amusant", desc: "Coloré, éléments ronds, illustrations, animations." },
  { id: "Minimaliste", label: "Minimaliste / Simple", desc: "Centré sur le contenu, noir et blanc ou neutre, épuré." },
  { id: "Neutre", label: "Uni / Neutre", desc: "Corporate, tons neutres, très structuré." },
];

const INSPIRATION_LINKS = [
  {
    category: "Design & UI",
    links: [
      { name: "Lapa Ninja", url: "https://www.lapa.ninja/" },
      { name: "Land-Book", url: "https://land-book.com/" },
      { name: "Dribbble", url: "https://dribbble.com/" },
      { name: "Awwwards", url: "https://www.awwwards.com/" },
      { name: "OnePageLove", url: "https://onepagelove.com/" },
      { name: "Screenlane", url: "https://screenlane.com/" },
    ]
  },
  {
    category: "Polices (Fonts)",
    links: [
      { name: "FontPair", url: "https://www.fontpair.co/" },
      { name: "DaFont", url: "https://www.dafont.com/fr/" },
      { name: "FontSquirrel", url: "https://www.fontsquirrel.com/" },
      { name: "MyFonts (WhatTheFont)", url: "https://www.myfonts.com/pages/whatthefont" },
    ]
  },
  {
    category: "Images & Icônes",
    links: [
      { name: "Unsplash", url: "https://unsplash.com/images" },
      { name: "Pexels", url: "https://www.pexels.com/" },
      { name: "Freepik", url: "https://fr.freepik.com/" },
      { name: "TheNounProject", url: "https://thenounproject.com/" },
    ]
  }
];

// --- COMPOSANT PRINCIPAL ---

export default function RessourcesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [isDone, setIsDone] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    colorPersonality: "",
    websitePersonality: "",
    likedElements: "",
  });

  const [isAuthPending, startAuthTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  // Vérifier si la session est déjà validée dans le localStorage au montage
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth_ressources");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleVerifyPass = () => {
    startAuthTransition(async () => {
      const res = await verifyRessourcesPassword(password);
      if (res.success) {
        setIsAuthenticated(true);
        localStorage.setItem("auth_ressources", "true");
        toast.success("Mot de passe correct !");
      } else {
        toast.error(res.error || "Mot de passe incorrect");
      }
    });
  };

  const handleSubmitForm = () => {
    startSubmitTransition(async () => {
      const res = await submitInspirationAction(formData);
      if (res.success) {
        setIsDone(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success("Inspiration envoyée avec succès !");
      } else {
        toast.error(res.error || "Une erreur est survenue lors de l'envoi.");
      }
    });
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.colorPersonality && formData.websitePersonality;

  // Empêcher l'hydration mismatch / afficher du blanc pendant qu'on vérifie localstorage
  if (isCheckingAuth) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  // --- RENDUS DES VUES ---

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">
        <Button asChild variant="ghost" className="absolute top-6 left-6 text-slate-500 hover:text-slate-900">
          <Link href="/">
            <ArrowLeft size={16} className="mr-2" /> Retour à l'accueil
          </Link>
        </Button>
        <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-violet-500" />
          <CardContent className="pt-8 px-6 pb-6 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Zone Réservée</h1>
            <p className="text-slate-500 mb-6 text-sm">
              Veuillez entrer le mot de passe fourni pour accéder aux ressources d'inspiration de votre projet.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); handleVerifyPass(); }} className="space-y-4">
              <Input
                type="password"
                placeholder="Mot de passe..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-center"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isAuthPending}>
                {isAuthPending ? "Vérification..." : "Accéder aux ressources"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isDone) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 text-center p-8">
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Merci pour vos idées !</h1>
          <p className="text-slate-600 mb-6">
            Vos inspirations ont bien été partagées. Nous les utiliserons pour façonner un projet qui vous ressemble parfaitement.
          </p>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* EN TÊTE */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Sparkles className="text-blue-500" />
              Atelier Inspirations
            </h1>
            <p className="text-slate-500 mt-2">Guide complet et direct pour explorer et trouver le design de vos rêves.</p>
          </div>
          <Button asChild variant="ghost" className="text-slate-500 hover:text-slate-900 bg-white shadow-sm border border-slate-200">
            <Link href="/">
              <ArrowLeft size={16} className="mr-2" /> Retour à l'accueil
            </Link>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* SECTION 1 : CONTACT */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                  <Wand2 size={20} />
                </div>
                <h2 className="text-xl font-semibold">1. Commençons avec vous</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prénom *</label>
                  <Input 
                    value={formData.firstName} 
                    onChange={e => setFormData({...formData, firstName: e.target.value})} 
                    placeholder="John" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom *</label>
                  <Input 
                    value={formData.lastName} 
                    onChange={e => setFormData({...formData, lastName: e.target.value})} 
                    placeholder="Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input 
                    type="email"
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Téléphone (Optionnel)</label>
                  <Input 
                    type="tel"
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    placeholder="+33 6 00 00 00 00" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 2 : COULEURS */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                  <PaintBucket size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">2. Couleur dominante *</h2>
                  <p className="text-sm text-slate-500 font-normal">Choisissez la combinaison qui reflète le mieux l'âme de votre projet.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setFormData({...formData, colorPersonality: color.label})}
                    className={`text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${
                      formData.colorPersonality === color.label
                        ? "border-blue-500 bg-blue-50/50 shadow-sm"
                        : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-6 h-6 rounded-full shadow-sm border border-black/10" 
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-semibold text-slate-800">{color.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{color.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SECTION 3 : PERSONNALITÉ DU SITE */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 bg-violet-50 rounded-full flex items-center justify-center text-violet-500">
                  <Palette size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">3. L'attitude du design *</h2>
                  <p className="text-sm text-slate-500 font-normal">Laquelle de ces approches définit le mieux votre site web ?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PERSONALITIES.map((perso) => (
                  <button
                    key={perso.id}
                    onClick={() => setFormData({...formData, websitePersonality: perso.label})}
                    className={`text-left p-5 rounded-xl border-2 transition-all ${
                      formData.websitePersonality === perso.label
                        ? "border-violet-500 bg-violet-50/50 shadow-sm"
                        : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block font-semibold text-slate-900 mb-1">{perso.label}</span>
                    <p className="text-sm text-slate-600">{perso.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SECTION 4 : LIENS D'INSPIRATION */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                  <Globe2 size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">4. Ressources de la galerie (Optionnel)</h2>
                  <p className="text-sm text-slate-500 font-normal">Prenez le temps d'explorer ces sites pour récolter des idées visuelles.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {INSPIRATION_LINKS.map((section, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <LinkIcon size={16} className="text-slate-400" />
                      {section.category}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {section.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-lg bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors shadow-sm"
                        >
                          {link.name}
                          <ArrowRight size={14} className="ml-auto opacity-50" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SECTION 5 : SOUMISSION */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden border-t-4 border-t-blue-500">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold">5. Le verdict final</h2>
                <p className="text-slate-500 text-sm mt-1">Dites-nous ce qui a attiré votre œil sur la galerie !</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <label className="text-sm font-medium text-slate-700 block">
                  Qu'avez-vous particulièrement aimé ? (Polices, animations, etc.) - <span className="text-slate-400 font-normal">Optionnel</span>
                </label>
                <Textarea 
                  placeholder="J'aime bien le site Apple.com car il est épuré. Sur dribbble, j'ai vu un design pastel avec des coins ronds pour des photos..."
                  className="min-h-32 resize-none text-base"
                  value={formData.likedElements}
                  onChange={(e) => setFormData({...formData, likedElements: e.target.value})}
                />
              </div>

              <div className="flex flex-col items-center justify-center pt-6 border-t border-slate-100">
                {!isFormValid && (
                  <p className="text-sm text-red-500 mb-4 bg-red-50 px-4 py-2 rounded-lg">
                    Veuillez remplir votre nom, prénom, email, choisir une couleur et une personnalité de site avant de valider.
                  </p>
                )}
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-md shadow-lg shadow-blue-500/20"
                  disabled={!isFormValid || isSubmitPending}
                  onClick={handleSubmitForm}
                >
                  {isSubmitPending ? "Envoi de votre projet..." : "Valider mon projet d'inspiration"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
