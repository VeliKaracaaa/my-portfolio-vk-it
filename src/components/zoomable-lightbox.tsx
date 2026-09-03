"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import Image from "next/image";

const MIN_SCALE = 1;
const MAX_SCALE = 5;

interface ZoomableLightboxProps {
  src: string;
  onClose: () => void;
}

export function ZoomableLightbox({ src, onClose }: ZoomableLightboxProps) {
  const [scale, setScale] = useState(1);
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pinch-to-zoom : distance initiale entre deux doigts
  const lastPinchDistance = useRef<number | null>(null);
  const lastPinchScale = useRef(1);

  // Reset position quand on revient au zoom 1
  const resetTransform = useCallback(() => {
    setScale(MIN_SCALE);
    animate(motionX, 0, { type: "spring", stiffness: 300, damping: 30 });
    animate(motionY, 0, { type: "spring", stiffness: 300, damping: 30 });
  }, [motionX, motionY]);

  // Zoom au scroll molette (desktop)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setScale((prev) => {
        const delta = e.deltaY > 0 ? -0.15 : 0.15;
        const next = Math.min(Math.max(prev + delta, MIN_SCALE), MAX_SCALE);
        if (next === MIN_SCALE) {
          animate(motionX, 0, { type: "spring", stiffness: 300, damping: 30 });
          animate(motionY, 0, { type: "spring", stiffness: 300, damping: 30 });
        }
        return next;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [motionX, motionY]);

  // Pinch-to-zoom (mobile & tablette)
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 2) return;
      e.preventDefault();

      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);

      if (lastPinchDistance.current === null) {
        lastPinchDistance.current = dist;
        lastPinchScale.current = scale;
        return;
      }

      const ratio = dist / lastPinchDistance.current;
      const next = Math.min(
        Math.max(lastPinchScale.current * ratio, MIN_SCALE),
        MAX_SCALE,
      );

      if (next === MIN_SCALE) {
        animate(motionX, 0, { type: "spring", stiffness: 300, damping: 30 });
        animate(motionY, 0, { type: "spring", stiffness: 300, damping: 30 });
      }
      setScale(next);
    },
    [scale, motionX, motionY],
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      lastPinchDistance.current = null;
    }
  }, []);

  // Double-clic / double-tap : toggle zoom 2x / reset
  const handleDoubleClick = useCallback(() => {
    if (scale > MIN_SCALE) {
      resetTransform();
    } else {
      setScale(2);
    }
  }, [scale, resetTransform]);

  // Fermeture par Échap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isDraggable = scale > MIN_SCALE;
  const cursorStyle = isDraggable ? "grab" : "zoom-in";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#1A2F38]/95 backdrop-blur-sm flex items-center justify-center"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 text-white flex items-center gap-2 font-black uppercase italic bg-[#1A2F38] border-2 border-white px-3 py-2 text-sm"
      >
        Fermer <X size={18} />
      </button>

      {/* Contrôles zoom (desktop) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        <button
          onClick={() =>
            setScale((s) => {
              const next = Math.max(s - 0.5, MIN_SCALE);
              if (next === MIN_SCALE) {
                animate(motionX, 0, {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                });
                animate(motionY, 0, {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                });
              }
              return next;
            })
          }
          className="bg-white border-2 border-[#1A2F38] p-2 shadow-[3px_3px_0_0_#1A2F38] font-black"
          aria-label="Dézoomer"
        >
          <ZoomOut size={16} />
        </button>
        <span className="bg-white border-2 border-[#1A2F38] px-3 py-2 font-black text-xs min-w-[56px] text-center shadow-[3px_3px_0_0_#1A2F38]">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale((s) => Math.min(s + 0.5, MAX_SCALE))}
          className="bg-white border-2 border-[#1A2F38] p-2 shadow-[3px_3px_0_0_#1A2F38] font-black"
          aria-label="Zoomer"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={resetTransform}
          className="bg-white border-2 border-[#1A2F38] p-2 shadow-[3px_3px_0_0_#1A2F38] font-black"
          aria-label="Réinitialiser"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Hints */}
      <p className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white/60 text-[11px] font-mono uppercase italic hidden lg:block select-none">
        Molette pour zoomer · Glisser pour naviguer · Double-clic pour reset
      </p>
      <p className="absolute top-4 left-4 z-20 text-white/60 text-[11px] font-mono uppercase italic lg:hidden select-none">
        Pinch pour zoomer · Double-tap reset
      </p>

      {/* Image zoomable + panable */}
      <motion.div
        drag={isDraggable}
        dragMomentum={false}
        dragElastic={0.05}
        style={{
          x: motionX,
          y: motionY,
          scale,
          cursor: cursorStyle,
          touchAction: "none",
        }}
        whileDrag={{ cursor: "grabbing" }}
        onDoubleClick={handleDoubleClick}
        className="relative w-[90vw] h-[80vh] max-w-6xl"
      >
        <div className="w-full h-full relative border-4 border-white overflow-hidden select-none">
          <Image
            src={src}
            alt="Vue agrandie"
            fill
            sizes="90vw"
            className="object-contain pointer-events-none"
            draggable={false}
            priority
          />
        </div>
      </motion.div>

      {/* Overlay de fermeture (uniquement quand zoom = 1) */}
      {!isDraggable && (
        <div
          onClick={onClose}
          className="absolute inset-0 z-[-1] cursor-zoom-out"
        />
      )}
    </motion.div>
  );
}
