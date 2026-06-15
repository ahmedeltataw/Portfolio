<!-- status: pending -->
# Hero & Sections Polish — Light Mode + Responsive + Section Heights

task_id: task-501
priority: 🔴 critical
scope: large (8 files)
project: portfolio-2026

## 🎯 الهدف
إصلاح 4 مشاكل رئيسية دفعة واحدة:
1. **Light mode مش مظبوط** — الألوان مش متطابقة مع Dark
2. **Hero responsive مكسور** — الـ split layout مش شغال على موبايل
3. **كل Section تاخد 100% Screen** — لازم Hero بس تكون full-height
4. **Hero يحتاج صقل عام** — ألوان، مسافات، alignments

---

## 1️⃣ Light Mode Fix — globals.css

**المشكلة:** الـ CSS variables للـ light mode زرقاء، بينما الـ dark mode ذهبية/نحاسية
```css
/* حالياً - غلط: */
--primary: 221.2 83.2% 53.3%;  /* أزرق في light */
--primary: 45 100% 50%;        /* ذهبي في dark */
```

**الحل:** نفس الألوان الدافئة في الوضعين:
```css
/* Light mode دافئ - same palette */
:root {
  --background: 40 30% 98%;      /* كريمي فاتح */
  --foreground: 25 25% 15%;      /* بني داكن مش أسود */
  --card: 0 0% 100%;             /* أبيض */
  --card-foreground: 25 25% 15%;
  --primary: 45 100% 50%;        /* ذهبي — نفس الـ dark */
  --primary-foreground: 25 25% 15%;
  --secondary: 30 80% 95%;       /* برتقالي فاتح جداً */
  --secondary-foreground: 25 25% 15%;
  --accent: 45 60% 90%;
  --accent-foreground: 25 25% 15%;
  --muted: 45 30% 90%;
  --muted-foreground: 25 15% 45%;
  --border: 45 20% 85%;
  --ring: 45 100% 50%;
}

.dark {
  /* نفس الألوان الداكنة الحالية — صحيحة */
  --background: 240 33% 4%;
  --foreground: 40 20% 94%;
  --primary: 45 100% 50%;
  /* ... باقي الـ dark variables */
}
```

---

## 2️⃣ Hero Responsive Fix — hero.tsx

**المشاكل الحالية:**
- `order-2 lg:order-1` على اليسار + `order-1 lg:order-2` على اليمين = على موبايل الصورة تيجي **فوق** النص (مش تحت)
- `min-h-screen` على الـ hero بس ده صح بس الـ layout مكسور
- الفجوات كبيرة جداً على موبايل

**الحل — Stack order صحيح:**
```tsx
// على موبايل: النص أولاً، الصورة ثانياً (col-reverse أو order طبيعي)
// على ديسكتوب: يسار/يمين
<div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-screen max-w-7xl mx-auto">
  {/* Left content — دائماً أول على موبايل */}
  <div className="flex flex-col justify-center lg:pr-8 order-1">
    {/* Content هنا */}
  </div>

  {/* Right profile — ثاني على موبايل، يمين على ديسكتوب */}
  <div className="relative flex items-center justify-center min-h-[50vh] lg:min-h-screen order-2 lg:order-2">
    {/* Profile visual هنا */}
  </div>
</div>
```

**Mobile-specific spacing:**
```tsx
// تقليل الـ padding على موبايل
<div className="relative flex flex-col justify-center lg:pr-8 order-1 pb-8 lg:pb-0">
  {/* المحتوى */}
  
  {/* hide scroll indicator on mobile since there's content below */}
  <div className="hero-scroll lg:block hidden absolute bottom-8 left-1/2 -translate-x-1/2 ...">
```

---

## 3️⃣ Section Heights Fix — إزالة min-h-screen من كل Section عدا Hero

| Section | حالياً | الجديد |
|---------|--------|--------|
| **Hero** | `min-h-screen` | ✅ `min-h-screen` (keep) |
| **StatsSection** | `min-h-[70vh]` | ❌ `py-24 lg:py-32` (natural height) |
| **FeaturedProjects** | `min-h-screen` | ❌ `py-24 lg:py-32` |
| **SkillsSnapshot** | `min-h-screen` | ❌ `py-24 lg:py-32` |
| **Testimonials** | `min-h-[70vh]` | ❌ `py-24 lg:py-32` |
| **CTASection** | `min-h-screen` | ❌ `py-24 lg:py-32` |

**نموذجي לכל الـ sections:**
```tsx
<product لصفحة قسم طبيعي:
<section
  ref={sectionRef}
  className="relative px-4 py-24 lg:py-32 overflow-hidden"
>
  {/* محتوى */}
</section>
```

---

## 4️⃣ Hero Polish — ألوان، مسافات، Details

### A. Text colors للـ Light mode
```tsx
// بدل text-slate-200, text-slate-300/90 اللي بتختفي في light mode
<p className="hero-description mt-6 text-base sm:text-lg text-muted-foreground/80 max-w-lg leading-[1.8] tracking-wide">
```

### B. Badge styling يعمل في الحالتين
```tsx
// Subtitle badge يعمل في light و dark
<p className="hero-badge mb-6 inline-flex items-center gap-2.5 rounded-full glass-strong px-5 py-2 text-xs font-medium tracking-[0.15em] uppercase w-fit border border-border/20">
```

### C. الاسم gradient يعمل في light mode
```tsx
<span className="hero-name block font-display tracking-tight leading-none" style={{
  fontSize: "clamp(2.8rem, 8vw, 6rem)",
  // textShadow للـ dark بس
}}>
  <TextReveal className="font-display tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent" as="span">
    {siteConfig.name}
  </TextReveal>
</span>
```

### D. الـ Profile placeholder —反过来 على موبايل
```tsx
{/* Profile placeholder — مخفي على موبايل عشان مش فاضي، أو صغير جداً */}
<div className="hidden lg:block relative w-[320px] h-[420px] sm:w-[380px] sm:h-[480px] lg:w-[420px] lg:h-[520px]">
  {/* Arch + placeholder + badges */}
</div>

{/* Mobile profile indicator — صغير تحت النص */}
<div className="lg:hidden mt-12 flex items-center justify-center gap-4">
  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/10">
    <span className="text-2xl font-serif text-amber-500/60">AE</span>
  </div>
  {/* 2-3 badges صغيرة */}
  <div className="flex flex-col gap-2">
    <span className="rounded-full bg-white/5 backdrop-blur-xl px-3 py-1 text-xs font-medium border border-white/10">Next.js 14</span>
    <span className="rounded-full bg-white/5 backdrop-blur-xl px-3 py-1 text-xs font-medium border border-white/10">TypeScript</span>
  </div>
</div>
```

---

## 📂 Files to Modify

| File | Action |
|------|--------|
| `src/app/globals.css` | **MODIFY** — Light mode CSS variables (warm palette) |
| `src/components/sections/hero.tsx` | **REWRITE** — Responsive stack order, mobile profile, text colors |
| `src/components/sections/stats-section.tsx` | **MODIFY** — Remove `min-h-[70vh]` → `py-24 lg:py-32` |
| `src/components/sections/featured-projects.tsx` | **MODIFY** — Remove `min-h-screen` → `py-24 lg:py-32` |
| `src/components/sections/skills-snapshot.tsx` | **MODIFY** — Remove `min-h-screen` → `py-24 lg:py-32` |
| `src/components/sections/testimonials.tsx` | **MODIFY** — Remove `min-h-[70vh]` → `py-24 lg:py-32` |
| `src/components/sections/cta-section.tsx` | **MODIFY** — Remove `min-h-screen` → `py-24 lg:py-32` |
| `src/components/shared/canvas-3d.tsx` | **MODIFY** — Ensure blobs visible in light mode too |

---

## ✅ Acceptance Criteria

- [ ] **Light mode** — ألوان دافئة (ذهبي/نحاسي) مش زرقاء، تباين كافي للنصوص
- [ ] **Hero mobile** — النص أولاً، ثم indicator صغير للبروفايل، لا فراغ كبير
- [ ] **Hero desktop** — Split layout: محتوى يسار + صورة/Arch يمين
- [ ] **Section heights** — Hero full screen، باقي الأقسام natural height مع padding
- [ ] **Scroll flow** — الموقع مش "طويل بشكل مبالغ"، التدفق طبيعي
- [ ] **Blobs** — ظاهرة في الحالتين (light/dark) مع ألوان متناسبة
- [ ] **ScrollTrigger** — كل animations تشتغل مع الـ heights الجديدة
- [ ] **npm run build** — 0 errors
- [ ] **npm run lint** — 0 warnings

---

## ⚡ Commands
```bash
cd D:/ai-project/profile
npm run build
npm run lint
# test light/dark toggle manually
```
