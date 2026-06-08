import type { Metadata } from "next";
import { AboutClient } from "./client";

export const metadata: Metadata = {
  title: "عنّي",
  description: "تعرف على مسيرتي المهنية في UI/UX Design و Frontend Development",
};

export default function AboutPage() {
  return <AboutClient />;
}
