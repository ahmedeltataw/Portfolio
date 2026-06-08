"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLanguage } from "@/contexts/language-context";

interface ImageGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { dir } = useLanguage();

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        setCurrentIndex(index);
      }
    },
    [images.length]
  );

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goTo]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        if (dir === "rtl") goPrev(); else goNext();
      }
      if (e.key === "ArrowLeft") {
        if (dir === "rtl") goNext(); else goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, goNext, goPrev, dir]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const el = document.querySelector(".lightbox-content");
    if (el) {
      gsap.fromTo(el, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    }
  }, [lightboxOpen, currentIndex]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden rounded-lg aspect-video bg-muted cursor-none"
            style={{ willChange: "transform" }}
          >
            <Image
              src={src}
              alt={`${projectTitle} - ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="lightbox-content relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); if (dir === "rtl") goNext(); else goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points={dir === "rtl" ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
              </svg>
            </button>

            <Image
              src={images[currentIndex]}
              alt={`${projectTitle} - ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              unoptimized
              priority
            />

            <button
              onClick={(e) => { e.stopPropagation(); if (dir === "rtl") goPrev(); else goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points={dir === "rtl" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
              </svg>
            </button>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
