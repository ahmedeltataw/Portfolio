export type Locale = 'ar' | 'en';

export type Translation = {
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
  };
  hero: {
    availability: string;
    cta_work: string;
    cta_contact: string;
  };
  home: {
    stats_projects: string;
    stats_experience: string;
    stats_tools: string;
    stats_satisfaction: string;
    featured_title: string;
    featured_subtitle: string;
    view_all: string;
    skills_title: string;
    testimonial_quote: string;
    testimonial_author: string;
    testimonial_role: string;
    cta_title: string;
    cta_description: string;
    cta_email: string;
  };
  about: {
    title: string;
    description: string;
    experiences_title: string;
    skills_title: string;
    download_cv: string;
  };
  projects: {
    title: string;
    subtitle: string;
    all: string;
    no_projects: string;
    back: string;
    prev: string;
    next: string;
    role: string;
    timeline: string;
    tools: string;
    highlights: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name_label: string;
    email_label: string;
    subject_label: string;
    message_label: string;
    send: string;
    sending: string;
    success: string;
    contact_info: string;
    follow_me: string;
    name_placeholder: string;
    email_placeholder: string;
    subject_placeholder: string;
    message_placeholder: string;
  };
  footer: {
    built_with: string;
  };
  notFound: {
    title: string;
    description: string;
    back_home: string;
  };
  lang_switch: string;
  nav_menu_open: string;
  nav_menu_close: string;
  validation: {
    name_required: string;
    email_required: string;
    email_invalid: string;
    subject_required: string;
    message_required: string;
    message_min: string;
  };
};
