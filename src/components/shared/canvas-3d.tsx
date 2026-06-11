"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─────────── Lightweight 3D Scene ─────────── */

function MainKnot({ scrollProgress, cursorRef }: { scrollProgress: number; cursorRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialY = useRef(0);

  useEffect(() => {
    initialY.current = Math.random() * 0.4 - 0.2;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.06;
    meshRef.current.rotation.y = t * 0.09;
    meshRef.current.rotation.z = t * 0.03;

    const targetX = cursorRef.current.x * 1.2;
    const targetY = -cursorRef.current.y * 1.2;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.04;
    meshRef.current.position.y += (targetY + initialY.current - meshRef.current.position.y) * 0.04;

    const scrollOffset = scrollProgress * 2;
    meshRef.current.position.y += (initialY.current + scrollOffset - meshRef.current.position.y) * 0.02;
    meshRef.current.rotation.y += scrollProgress * 0.01;

    const scale = 1 + Math.sin(t * 0.4) * 0.025;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* lighter geometry: fewer segments */}
      <torusKnotGeometry args={[1.6, 0.5, 100, 20]} />
      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.25}
        metalness={0.4}
        emissive="#1d4ed8"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

function SmallOrbiter({ color, speed, scale, offset }: { color: string; speed: number; scale: number; offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(offset);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    angleRef.current = offset + t * speed;

    meshRef.current.position.x = Math.cos(angleRef.current) * 2.8;
    meshRef.current.position.z = Math.sin(angleRef.current) * 2.8;
    meshRef.current.position.y = Math.sin(t * 0.25 + offset) * 0.6;

    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.6}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

function SoftOrbs({ scrollProgress }: { scrollProgress: number }) {
  const orbRef1 = useRef<THREE.Mesh>(null!);
  const orbRef2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orbRef1.current) {
      orbRef1.current.position.x = Math.sin(t * 0.2) * 2.5;
      orbRef1.current.position.y = Math.cos(t * 0.15) * 1.6 + scrollProgress * 0.5;
      orbRef1.current.position.z = -1.5 + scrollProgress * 0.4;
    }
    if (orbRef2.current) {
      orbRef2.current.position.x = Math.cos(t * 0.25) * 2;
      orbRef2.current.position.y = Math.sin(t * 0.18) * 1.4 - scrollProgress * 0.3;
      orbRef2.current.position.z = -1.8 - scrollProgress * 0.2;
    }
  });

  return (
    <>
      <mesh ref={orbRef1} position={[2.4, 1.2, -1.5]}>
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.3} metalness={0.2} emissive="#8b5cf6" emissiveIntensity={0.25} />
      </mesh>
      <mesh ref={orbRef2} position={[-2, -0.6, -1.8]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.2} emissive="#06b6d4" emissiveIntensity={0.25} />
      </mesh>
    </>
  );
}

function CursorTracker({ cursorRef }: { cursorRef: React.MutableRefObject<{ x: number; y: number }> }) {
  useFrame(({ pointer }) => {
    cursorRef.current.x = pointer.x;
    cursorRef.current.y = pointer.y;
  });
  return null;
}

function Scene({
  scrollProgress: sp,
  reducedMotion,
  cursorRef,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
  cursorRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  if (reducedMotion) return null;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#3b82f6" />
      <pointLight position={[-4, -2, 4]} intensity={0.9} color="#8b5cf6" />
      <pointLight position={[0, 3, -4]} intensity={0.7} color="#06b6d4" />

      <CursorTracker cursorRef={cursorRef} />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <MainKnot scrollProgress={sp} cursorRef={cursorRef} />
      </Float>

      <SmallOrbiter color="#8b5cf6" speed={0.35} scale={0.45} offset={0} />
      <SmallOrbiter color="#22d3ee" speed={0.28} scale={0.35} offset={2.1} />

      <SoftOrbs scrollProgress={sp} />

      {/* lighter sparkles */}
      <Sparkles count={60} scale={10} size={0.5} speed={0.25} color="#60a5fa" opacity={0.45} />
    </>
  );
}

export function Canvas3D() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const handleScroll = () => {
      const hero = document.querySelector("[data-hero-section]") as HTMLElement | null;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / heroHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 55 }}
        dpr={[1, 1.2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene scrollProgress={scrollProgress} reducedMotion={reducedMotion} cursorRef={cursorRef} />
      </Canvas>
    </div>
  );
}
