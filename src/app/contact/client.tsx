"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/constants";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { useLanguage } from "@/contexts/language-context";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactClient() {
  const { t } = useLanguage();

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
      errors.name = t.validation.name_required;
    }

    if (!data.email.trim()) {
      errors.email = t.validation.email_required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = t.validation.email_invalid;
    }

    if (!data.subject.trim()) {
      errors.subject = t.validation.subject_required;
    }

    if (!data.message.trim()) {
      errors.message = t.validation.message_required;
    } else if (data.message.trim().length < 10) {
      errors.message = t.validation.message_min;
    }

    return errors;
  };
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mailtoLink = `mailto:${siteConfig.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`الاسم: ${formData.name}\nالبريد: ${formData.email}\n\n${formData.message}`)}`;
    try {
      const w = window.open(mailtoLink);
      if (!w || w.closed) {
        window.location.href = mailtoLink;
      }
    } catch {
      window.location.href = mailtoLink;
    }
    setIsSubmitting(false);
    setToast(t.contact.success);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <div className="mb-12 text-center">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight">
          {t.contact.title}
        </h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-5">
        <form
          onSubmit={handleSubmit}
          className="md:col-span-3 flex flex-col gap-5"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              {t.contact.name_label} <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="input-focus-ring h-11 rounded-md border border-border bg-card px-3 text-sm outline-none"
              placeholder={t.contact.name_placeholder}
              aria-required="true"
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="text-xs text-red-500" role="alert">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              {t.contact.email_label} <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="input-focus-ring h-11 rounded-md border border-border bg-card px-3 text-sm outline-none"
              placeholder={t.contact.email_placeholder}
              aria-required="true"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="text-xs text-red-500" role="alert">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-sm font-medium">
              {t.contact.subject_label} <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className="input-focus-ring h-11 rounded-md border border-border bg-card px-3 text-sm outline-none"
              placeholder={t.contact.subject_placeholder}
              aria-required="true"
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && (
              <span id="subject-error" className="text-xs text-red-500" role="alert">{errors.subject}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium">
              {t.contact.message_label} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="input-focus-ring min-h-[120px] rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none resize-y"
              placeholder={t.contact.message_placeholder}
              aria-required="true"
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span id="message-error" className="text-xs text-red-500" role="alert">{errors.message}</span>
            )}
          </div>

          <MagneticButton
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t.contact.sending}
              </span>
            ) : (
              t.contact.send
            )}
          </MagneticButton>
        </form>

        <div className="md:col-span-2 flex flex-col gap-8">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg mb-4">{t.contact.contact_info}</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{siteConfig.availability}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg mb-4">{t.contact.follow_me}</h2>
            <div className="flex gap-3">
              {Object.entries(siteConfig.links).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label={platform}
                >
                  {platform === "github" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {platform === "linkedin" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {platform === "behance" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg animate-slide-up" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
