import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { PageTransition } from "@/components/shared/page-transition";
import "@/lib/gsap-register";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <main className="min-h-screen pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
      </SmoothScroll>
      <Footer />
    </>
  );
}
