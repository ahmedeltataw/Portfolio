"use client";

export function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-0 ${className}`}>
      <svg className="w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,100 L0,100 Z"
          fill="hsl(var(--background))"
        />
      </svg>
    </div>
  );
}

export function DiagonalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-0 ${className}`}>
      <svg className="w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,60 L1440,0 L1440,100 L0,100 Z"
          fill="hsl(var(--background))"
        />
      </svg>
    </div>
  );
}

export function CurveDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-0 ${className}`}>
      <svg className="w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
          fill="hsl(var(--background))"
        />
      </svg>
    </div>
  );
}