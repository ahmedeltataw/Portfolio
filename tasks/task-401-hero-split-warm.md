<!-- status: pending -->
# Hero Redesign — Split Layout + Profile Photo + Warm Dark

task_id: task-401
priority: 🔴 critical
scope: medium (4 files)
project: portfolio-2026

## 🎯 الهدف
إعادة تصميم الـ Hero عشان يبقى زي Tamara Sredojevic ولكن بالـ dark theme:
- **متوازن**: content يسار + صورة/profile يمين (بدل الفراغ)
- **دافئ**: مش أسود قاتم — charcoal دافئ
- **ممتلئ بصرياً**: مش فاضي مع كمية محتوى مناسبة

## 🔍 تحليل الفجوة (Gap Analysis from Tamara)

| العنصر | Tamara | أحمد حالياً | المطلوب |
|--------|--------|------------|---------|
| **التوازن** | Split (نص+صورة) | Left-aligned + 50% فاضي | Split layout |
| **الخلفية** | كريمي دافئ (F8F5F0) | أسود قاتم (#000) | Charcoal دافئ (#0a0a0f) |
| **صورة** | صورة شخصية محترفة | مفيش | Profile placeholder |
| **الألوان** | Mint green accent | Blue فقط | Warm accent (أصفر/ذهبي/نحاسي) |
| **الـ Blobs** | مش موجودة | CSS blobs مش مظبوطة | Blobs محسّنة + نظيفة |
| **الإحساس** | دافئ، مرحّب | بارد، تقيل | دافئ، ترحيبي |

## 📐 التصميم الجديد — تفاصيل دقيقة

### A. Layout — Split (الكود الجديد لـ hero.tsx)
```
┌──────────────────────────────────────┐
│  [Navbar]                            │
│                                      │
│  ┌──────────────┐  ┌──────────────┐  │
│  │ AVAILABLE    │  │  [Profile    │  │
│  │ FOR WORK ●   │  │   Photo /    │  │
│  │              │  │   Visual]    │  │
│  │ Ahmed        │  │              │  │
│  │ Eltatawy     │  │  ●●●●●●●●●  │  │
│  │              │  │              │  │
│  │ UI/UX...     │  │  [Tech       │  │
│  │ Developer_   │  │   Badges]   │  │
│  │              │  │              │  │
│  │ Bio text...  │  └──────────────┘  │
│  │              │                     │
│  │ [View] [Get] │                     │
│  └──────────────┘                     │
│  [Scroll ???]                         │
└──────────────────────────────────────┘
```

### B. الخلفية — Warm Dark Charcoal
```tsx
// في hero.tsx — بدل pure black
<div className="absolute inset-0" style={{
  background: `
    radial-gradient(ellipse at 80% 50%, hsl(45 100% 50% / 0.03) 0%, transparent 70%),
    radial-gradient(ellipse at 20% 80%, hsl(30 100% 50% / 0.02) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0f0f1a 100%)
  `
}} />
```

### C. الـ Profile Photo — Placeholder
```tsx
// على اليمين، في إطار مقوس (Arch shape) — زي Tamara بالظبط
<div className="relative w-[400px] h-[500px] hidden lg:block">
  {/* Arch/قوس الخلفية — زي Tamara */}
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" fill="none">
    <path d="M0 500 C0 200, 100 0, 200 0 C300 0, 400 200, 400 500 Z"
      fill="hsl(45 100% 50% / 0.08)" />
  </svg>
  
  {/* الـ placeholder للصورة — صورة رمزية أو initials */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20
      flex items-center justify-center">
      <span className="text-7xl font-serif text-amber-500/40">AE</span>
    </div>
  </div>
  
  {/* Floating tech badges حوالين الصورة — زي */}
  <div className="absolute -top-4 right-10">
    {/* Badge: TypeScript — زي Tamara badge */}
  </div>
</div>
```

### D. الـ Blobs محسّنة وألوان دافئة
```tsx
// canvas-3d.tsx — بدل الـ blobs المزرقة، blobs ذهبية/نحاسية
<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
  {/* Blob 1 — ذهبي كبير على اليمين (ورا الصورة) */}
  <div className="absolute -top-[10%] -right-[5%] w-[700px] h-[700px] rounded-full
    bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent
    animate-blob-slow blur-[80px]"
  />
  
  {/* Blob 2 — دافئ في النص */}
  <div className="absolute top-[40%] left-[10%] w-[300px] h-[300px] rounded-full
    bg-gradient-to-tr from-rose-500/8 via-amber-500/5 to-transparent
    animate-blob-slower blur-[60px]"
  />
  
  {/* Blob 3 — خفيف تحت */}
  <div className="absolute -bottom-[5%] right-[20%] w-[500px] h-[400px] rounded-full
    bg-gradient-to-tl from-amber-500/8 via-transparent to-transparent
    animate-blob-slowest blur-[100px]"
  />
  
  {/* Warm glow تحت الصورة */}
  <div className="absolute top-1/2 right-[15%] -translate-y-1/2
    w-[500px] h-[500px] rounded-full
    bg-[radial-gradient(ellipse_at_center,_hsl(45_100%_50%/0.06)_0%,_transparent_70%)]"
  />
  
  {/* Grid خفيف — مقارب لـ Tamara (ظاهر أكثر) */}
  <div className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E")`,
    }}
  />
</div>
```

### E. الـ Badges — Floating tech stack حوالين الصورة (زي Tamara)
```tsx
// زي Tamara بالظبط — badges طافية حوالين الصورة
// بدل ما تكون تحت الاسم زي دلوقتي

// Badge 1 — فوق الصورة (يمين)
<div className="absolute -top-3 right-12 bg-white/5 backdrop-blur-xl rounded-full
  px-4 py-2 border border-white/10 flex items-center gap-2">
  <span className="w-2 h-2 rounded-full bg-amber-400" />
  <span className="text-xs text-white/70 font-mono">Next.js 14</span>
</div>

// Badge 2 — جنب الصورة (شمال)
<div className="absolute top-1/3 -left-8 bg-white/5 backdrop-blur-xl rounded-full
  px-4 py-2 border border-white/10 flex items-center gap-2">
  <span className="w-2 h-2 rounded-full bg-emerald-400" />
  <span className="text-xs text-white/70 font-mono">TypeScript</span>
</div>

// Badge 3 — تحت الصورة (يمين)
<div className="absolute bottom-8 -right-4 bg-white/5 backdrop-blur-xl rounded-full
  px-4 py-2 border border-white/10 flex items-center gap-2">
  <span className="w-2 h-2 rounded-full bg-sky-400" />
  <span className="text-xs text-white/70 font-mono">Tailwind CSS</span>
</div>
```

### F. الـ Color Palette الجديدة (Warm Dark)
```css
/* من الأسود القاتم → charcoal دافئ مع لمسات ذهبية */
/* الألوان الأساسية */
--background: #0a0a0f;    /* charcoal دافئ بدل #000 */
--foreground: #f0ede8;    /* أبيض دافئ (creamy white) */
--primary: 45 100% 50%;   /* ذهبي/أصفر دافئ بدل الأزرق */
--secondary: 30 100% 50%; /* برتقالي دافئ */
--accent: 350 80% 60%;    /* rose/muted red دافئ */

/* الـ accent colors للـ badges */
--badge-blue: 200 100% 50%;
--badge-purple: 280 60% 60%;
--badge-green: 160 80% 45%;
--badge-amber: 45 100% 50%;
```

## ✅ الـ Acceptance Criteria

- [ ] الـ Layout متوازن — content يسار + صورة/visual يمين (مفيش فراغ على اليمين)
- [ ] الخلفية مش أسود قاتم — charcoal دافئ (#0a0a0f)
- [ ] Blobs ألوانها دافئة (ذهبي/نحاسي/وردي) مش أزرق
- [ ] Profile placeholder على اليمين في إطار Arch (زي Tamara)
- [ ] Badges طافية حوالين الصورة مش تحت الاسم
- [ ] الـ color balance مريح للعين
- [ ] Grid pattern ظاهر (opacity 0.04 بدل 0.03)
- [ ] Warm glow خلف الصورة
- [ ] Scroll سلس — الموقع مش تقيل
- [ ] npm run build — 0 errors

## 📂 Files to Modify

| File | Action |
|------|--------|
| `src/components/sections/hero.tsx` | **REWRITE** — split layout + profile photo |
| `src/components/shared/canvas-3d.tsx` | **MODIFY** — warm colors + grid + glow |
| `src/app/globals.css` | **MODIFY** — warm palette (gold/amber accents) |
| `tailwind.config.ts` | **MODIFY** — new colors if needed |
