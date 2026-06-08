"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateCircleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

function ParticleLayer({
  count,
  size,
  opacity,
  color,
  spread,
  rotSpeed,
  mouseReaction,
  blending,
  sizeVariation = 0,
  hueShift = 0,
  reducedMotion = false,
}: {
  count: number;
  size: number;
  opacity: number;
  color: string;
  spread: number;
  rotSpeed: number;
  mouseReaction: number;
  blending: THREE.Blending;
  sizeVariation?: number;
  hueShift?: number;
  reducedMotion?: boolean;
}) {
  const mesh = useRef<THREE.Points>(null!);
  const targetPos = useRef({ x: 0, y: 0 });
  const circleTexture = useMemo(() => generateCircleTexture(), []);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * spread;
      pos[i3 + 1] = (Math.random() - 0.5) * spread;
      pos[i3 + 2] = (Math.random() - 0.5) * spread * 0.5;
      siz[i] = size * (1 + (Math.random() - 0.5) * sizeVariation);
    }
    return [pos, siz];
  }, [count, size, spread, sizeVariation]);

  const colors = useMemo(() => {
    if (hueShift <= 0) return null;
    const col = new Float32Array(count * 3);
    const baseHsl = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const shift = (Math.random() - 0.5) * hueShift;
      const c = baseHsl.clone();
      const hslObj = { h: 0, s: 0, l: 0 };
      c.getHSL(hslObj);
      c.setHSL(hslObj.h + shift / 360, hslObj.s, hslObj.l);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, [count, color, hueShift]);

  useFrame(({ pointer }) => {
    if (!mesh.current || reducedMotion) return;
    targetPos.current.x += (pointer.x * mouseReaction * 5 - targetPos.current.x) * 0.02;
    targetPos.current.y += (pointer.y * mouseReaction * 5 - targetPos.current.y) * 0.02;
    mesh.current.position.x += (targetPos.current.x - mesh.current.position.x) * 0.05;
    mesh.current.position.y += (targetPos.current.y - mesh.current.position.y) * 0.05;
    mesh.current.rotation.y += rotSpeed;
    mesh.current.rotation.x = Math.sin(Date.now() * 0.0005) * rotSpeed * 2;
  });

  return (
    <points ref={mesh} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        {colors && <bufferAttribute attach="attributes-color" args={[colors, 3]} />}
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        transparent
        opacity={opacity}
        blending={blending}
        depthWrite={false}
        map={circleTexture}
        vertexColors={!!colors}
        toneMapped={false}
      />
    </points>
  );
}

function Scene({ color, reducedMotion }: { color: string; reducedMotion: boolean }) {
  return (
    <>
      <ParticleLayer
        count={800}
        size={0.04}
        opacity={0.25}
        color={color}
        spread={15}
        rotSpeed={0.008}
        mouseReaction={0.1}
        blending={THREE.NormalBlending}
        reducedMotion={reducedMotion}
      />
      <ParticleLayer
        count={300}
        size={0.12}
        opacity={0.5}
        color={color}
        spread={10}
        rotSpeed={0.02}
        mouseReaction={0.25}
        blending={THREE.AdditiveBlending}
        sizeVariation={0.4}
        reducedMotion={reducedMotion}
      />
      <ParticleLayer
        count={50}
        size={0.3}
        opacity={0.7}
        color="#e0f0ff"
        spread={8}
        rotSpeed={0.04}
        mouseReaction={0.5}
        blending={THREE.AdditiveBlending}
        sizeVariation={0.8}
        hueShift={60}
        reducedMotion={reducedMotion}
      />
    </>
  );
}

export function Canvas3D() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [themeColor, setThemeColor] = useState("#3b82f6");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const updateColor = () => {
      const style = getComputedStyle(document.documentElement);
      const h = style.getPropertyValue("--primary").trim().split(" ")[0];
      setThemeColor(`hsl(${h}, 83.2%, 53.3%)`);
    };
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene color={themeColor} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
