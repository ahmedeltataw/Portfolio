"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function GlassTorusKnot({ scrollProgress, cursorRef }: { scrollProgress: number; cursorRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialY = useRef(0);

  useEffect(() => {
    initialY.current = Math.random() * 0.5 - 0.25;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.rotation.z = t * 0.05;

    const targetX = cursorRef.current.x * 1.5;
    const targetY = -cursorRef.current.y * 1.5;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY + initialY.current - meshRef.current.position.y) * 0.05;

    const scrollOffset = scrollProgress * 2.5;
    meshRef.current.position.y += (initialY.current + scrollOffset - meshRef.current.position.y) * 0.02;

    meshRef.current.rotation.y += scrollProgress * 0.015;

    const scale = 1 + Math.sin(t * 0.4) * 0.04;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.8, 0.6, 200, 32]} />
      <meshPhysicalMaterial
        color="#3b82f6"
        transmission={0.85}
        roughness={0.05}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        thickness={0.5}
        envMapIntensity={1.5}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function OrbitingIcosahedron({ color, speed, scale, offset }: { color: string; speed: number; scale: number; offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(offset);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    angleRef.current = offset + t * speed;

    meshRef.current.position.x = Math.cos(angleRef.current) * 3.5;
    meshRef.current.position.z = Math.sin(angleRef.current) * 3.5;
    meshRef.current.position.y = Math.sin(t * 0.3 + offset) * 0.8;

    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshPhysicalMaterial
        color={color}
        wireframe
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function CameraRig({ cursorRef }: { cursorRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 7;
    camera.position.x = Math.sin(t * 0.05) * 0.5 + cursorRef.current.x * 0.3;
    camera.position.y = Math.cos(t * 0.08) * 0.3 - cursorRef.current.y * 0.2;
    camera.position.z = radius;
    camera.lookAt(0, 0, 0);
  });

  return null;
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
  if (reducedMotion) {
    return null;
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#8b5cf6" />
      <pointLight position={[0, 5, -5]} intensity={0.8} color="#06b6d4" />

      <CursorTracker cursorRef={cursorRef} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <GlassTorusKnot scrollProgress={sp} cursorRef={cursorRef} />
      </Float>

      <OrbitingIcosahedron color="#8b5cf6" speed={0.4} scale={0.5} offset={0} />
      <OrbitingIcosahedron color="#06b6d4" speed={0.3} scale={0.35} offset={2.1} />
      <OrbitingIcosahedron color="#10b981" speed={0.5} scale={0.3} offset={4.2} />

      <Sparkles count={100} scale={12} size={0.6} speed={0.4} color="#3b82f6" opacity={0.5} />

      <Environment preset="city" />

      <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.6} />
      </EffectComposer>

      <CameraRig cursorRef={cursorRef} />
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
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
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