<!-- status: completed -->
# Hero 3D Fix — إزالة TorusKnot + استبدال بـ CSS Blob خفيف

task_id: task-301
priority: 🔴 critical
scope: small (4 files)
project: portfolio-2026

## 🎯 الهدف
إصلاح مشكلة الـ 3D الثقيل اللي مش شغال صح ويبطّل الموقع.

## 🔴 المشاكل الحالية (مؤكدة)
1. الـ TorusKnot + Bloom + Sparkles + Environment = **2MB+ bundle** و **GPU heavy**
2. الـ 3D مش شغال ولا باين على الموقع الحي
3. الموقع تقيل جداً (load takes too long, FPS dropping)
4. الحل المبالغ فيه بيخرب التجربة بدل ما يحسّنها

## 📐 الحل: CSS Blob سائل + Grid خفيف + Glow

**إزالة كل Three.js من الـ Hero.** استبداله بـ CSS animated blobs:
- لا Three.js → لا bundle ثقيل
- لا Bloom → لا post-processing
- لا Environment → لا تحميل صور HDR
- كل حاجة CSS خالص → GPU accelerated

### A. canvas-3d.tsx — إعادة كتابة كـ CSS Blob
```tsx
// canvas-3d.tsx بالكامل يتغير من Three.js إلى CSS Blobs
// اقتراح: احذف كل محتوى R3F واستبدله بـ:

"use client"

import { useEffect, useState } from "react"

export function Canvas3D() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Blob 1 — كبير، دائرية، primary */}
      <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full 
        bg-gradient-to-br from-primary/20 via-primary/5 to-transparent 
        animate-blob-slow blur-3xl" 
      />
      
      {/* Blob 2 — في الوسط، small، بنفسجي */}
      <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full 
        bg-gradient-to-tr from-purple-500/15 via-fuchsia-500/5 to-transparent 
        animate-blob-slower blur-3xl" 
      />
      
      {/* Blob 3 — تحت، متوسط، أزرق */}
      <div className="absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full 
        bg-gradient-to-tl from-sky-500/10 via-primary/5 to-transparent 
        animate-blob-slowest blur-3xl" 
      />
      
      {/* Grid pattern خفيف جداً فوق الـ blobs */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow في المنتصف */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[600px] h-[600px] rounded-full 
        bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.06)_0%,_transparent_70%)]" 
      />
    </div>
  )
}
```

### B. globals.css — Keyframes للـ Blobs
```css
/* Blob animations */
@keyframes blob-slow {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  }
  25% {
    transform: translate(30px, -40px) scale(1.05) rotate(5deg);
    border-radius: 40% 60% 50% 50% / 60% 40% 60% 40%;
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95) rotate(-3deg);
    border-radius: 50% 50% 40% 60% / 40% 50% 50% 60%;
  }
  75% {
    transform: translate(15px, 30px) scale(1.02) rotate(4deg);
    border-radius: 70% 30% 60% 40% / 50% 70% 30% 50%;
  }
}

@keyframes blob-slower {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    border-radius: 50% 50% 60% 40% / 50% 40% 60% 50%;
  }
  50% {
    transform: translate(-30px, 20px) scale(1.1);
    border-radius: 40% 60% 50% 50% / 60% 50% 50% 40%;
  }
}

@keyframes blob-slowest {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    border-radius: 40% 60% 50% 50% / 60% 40% 60% 40%;
  }
  50% {
    transform: translate(25px, -35px) scale(1.08);
    border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%;
  }
}

.animate-blob-slow {
  animation: blob-slow 20s ease-in-out infinite;
}

.animate-blob-slower {
  animation: blob-slower 16s ease-in-out infinite;
}

.animate-blob-slowest {
  animation: blob-slowest 24s ease-in-out infinite;
}
```

### C. hero.tsx — تعديل الـ Hero Layout
```tsx
// الـ hero.tsx الحالي:
// 1. Canvas3D بيتحط بدل (يعني الـ CSS blobs)
// 2. الـ floating shapes القديمة تشال (عشان الـ blobs أحلى)
// 3. الـ hero section نفسه يفضل dark مع gradient خفيف

// أضف في hero.tsx:
{/* الخلفية التدرجية الأساسية */}
<div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />

{/* الـ Canvas3D (اللي بقى CSS Blobs) */}
<Canvas3D />

{/* المحتوى الأساسي */}
<div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
  مش محتاج تغيير كبير
</div>
```

### D. layout.tsx — إزالة إعدادات Three.js
```tsx
// اتأكد إن مفيش dynamic imports لـ R3F أو three في layout
// الـ Canvas3D بقى بسيط جداً، مش محتاج dynamic import حتى
// لو عايز dynamic import عشان performance: ممكن مع ssr: false
```

### E. package.json — إزالة three.js و @react-three/*
```json
{
  "dependencies": {
    // أزل هذه من package.json:
    "three": "^0.160.0",              // ← اشيل
    "@react-three/fiber": "^8.15.0",  // ← اشيل
    "@react-three/drei": "^9.88.0",   // ← اشيل
    "@react-three/postprocessing": "^2.15.0", // ← اشيل
  }
}
// بعد الإزالة، شغل npm install
```

## ✅ الـ Acceptance Criteria

- [ ] **الموقع يفتح بسرعة** — مش تقيل، LCP تحت 1.5s (مقارنة بـ 3s+ حالياً)
- [ ] **الـ Hero عنده خلفية جميلة** — 3 CSS blobs بتتحرك وتتمورف ببطء
- [ ] **مفيش delay في تحميل الصفحة** — preloader لا يعلق
- [ ] **مفيش console errors** — ولا Three.js errors
- [ ] **الـ dark theme يظبط مع الـ blobs** — الألوان تبقى متناسقة
- [ ] **npm run build — 0 errors**
- [ ] بعد الإزالة، حجم الـ bundle يقل بشكل ملحوظ (من 2MB إلى <500KB)

## ✅ الـ Definition of Done

1. `npm run build` — 0 errors
2. افتح الموقع الحي — يشوف blobs متحركة بتتمورف في الخلفية
3. الـ scroll سلس (60fps) بدون تقطيع
4. صفحة التحميل (preloader) تظهر وتختفي بسرعة (<2s)
5. لا يوجد أي أثر لـ three.js أو R3F في الـ bundle

## ⚠️ تحذير مهم
تأكد إن canvas-3d.tsx مش مستورد في أي مكان تاني غير hero.tsx (وإلا كان هيجيب three.js تاني).

## 📂 Files to Modify
| File | Action |
|------|--------|
| `src/components/shared/canvas-3d.tsx` | **REWRITE** (Three.js → CSS Blobs) |
| `src/app/globals.css` | **MODIFY** (add blob keyframes) |
| `src/components/sections/hero.tsx` | **MODIFY** (remove old floating shapes, integrate canvas-3d) |
| `package.json` | **MODIFY** (remove three, @react-three/*) |

## ⚡ Commands
```bash
cd D:/ai-project/profile
npm uninstall three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install
npm run build
```
