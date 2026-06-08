import type { Metadata } from "next";
import { ContactClient } from "./client";

export const metadata: Metadata = {
  title: "تواصل معي",
  description: "يسعدني التواصل معك",
};

export default function ContactPage() {
  return <ContactClient />;
}
