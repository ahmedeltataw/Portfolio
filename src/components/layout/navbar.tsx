"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { useLanguage } from "@/contexts/language-context";

export function Navbar() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const NAV_LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/projects", label: t.nav.projects },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b border-primary/15 bg-background/95 backdrop-blur-xl transition-transform duration-300 shadow-lg shadow-black/20",
        !isVisible && "-translate-y-full"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label={t.nav_menu_open}>
        <Link
          href="/"
          className="font-display text-xl tracking-tight hover:text-primary transition-colors"
          aria-label={t.nav.home}
        >
          {siteConfig.name}
        </Link>

        <div className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                role="listitem"
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-2 flex items-center gap-1">
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="flex h-9 w-9 items-center justify-center rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label={t.lang_switch}
            >
              {locale === "ar" ? "EN" : "AR"}
            </button>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="flex h-9 w-9 items-center justify-center rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label={t.lang_switch}
          >
            {locale === "ar" ? "EN" : "AR"}
          </button>
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
            aria-label={isMenuOpen ? t.nav_menu_close : t.nav_menu_open}
            aria-expanded={isMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="flex flex-col px-4 py-3 gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2.5 text-sm rounded-md transition-colors",
                    isActive
                      ? "text-foreground font-medium bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
