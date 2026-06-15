import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3rem, 8vw, 6rem)", { lineHeight: "1" }],
        "display-sm": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.05" }],
        h1: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1" }],
        h2: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.2" }],
        h3: ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.3" }],
        "body-lg": ["clamp(1rem, 2vw, 1.125rem)", { lineHeight: "1.7" }],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-down": "slideDown 0.6s ease-out forwards",
        "bounce-slow": "bounceSlow 2s infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "floatDelayed 8s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "float-slower": "float-slower 16s ease-in-out infinite",
        "float-slowest": "float-slowest 20s ease-in-out infinite",
        "scroll-bounce": "scrollBounce 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(5px) rotate(-0.5deg)" },
        },
        floatDelayed: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(-0.5deg)" },
          "66%": { transform: "translateY(4px) rotate(1deg)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          "33%": { transform: "translate(15px, -15px) rotate(2deg) scale(1.05)" },
          "66%": { transform: "translate(-10px, 10px) rotate(-1deg) scale(0.95)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(-20px, -10px) rotate(3deg)" },
        },
        "float-slowest": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(10px, -20px)" },
          "66%": { transform: "translate(-15px, 5px)" },
        },
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(6px)", opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
