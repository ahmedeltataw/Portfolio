import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import { Hero } from "@/components/sections/hero";

export const metadata: Metadata = {
  title: "الرئيسية",
  description: siteConfig.description,
};

export default function HomePage() {
  return <Hero />;
}
