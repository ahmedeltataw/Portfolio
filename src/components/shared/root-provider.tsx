"use client";

import { useState, useCallback, ReactNode } from "react";
import { Preloader } from "./preloader";
import { LanguageProvider } from "@/contexts/language-context";
import { CustomCursor } from "./custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "./smooth-scroll";
import { PageTransition } from "./page-transition";
import { ErrorBoundary } from "./error-boundary";

export function RootProvider({ children }: { children: ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), []);

  return (
    <ErrorBoundary>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
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
    </ErrorBoundary>
  );
}
