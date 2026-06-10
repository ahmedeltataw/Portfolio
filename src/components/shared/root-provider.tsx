"use client";

import { useState, ReactNode } from "react";
import { Preloader } from "./preloader";
import { LanguageProvider } from "@/contexts/language-context";
import { CustomCursor } from "./custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "./smooth-scroll";
import { PageTransition } from "./page-transition";

export function RootProvider({ children }: { children: ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} minimumDuration={2800} />
      )}
      <div style={{ opacity: preloaderDone ? 1 : 0, transition: "opacity 0.3s" }}>
        <LanguageProvider>
          <CustomCursor />
          <Navbar />
          <SmoothScroll>
            <main className="min-h-screen pt-16">
              <PageTransition>{children}</PageTransition>
            </main>
          </SmoothScroll>
          <Footer />
        </LanguageProvider>
      </div>
    </>
  );
}
