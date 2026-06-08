"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 600, color = "#3b82f6" }: { count?: number; color?: string }) {
  const mesh = useRef<THREE.Points>(null!);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.02;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
      mesh.current.position.x += (mouse.x * 0.2 - mesh.current.position.x) * 0.02;
      mesh.current.position.y += (mouse.y * 0.2 - mesh.current.position.y) * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

function Scene({ color }: { color: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles count={600} color={color} />
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
  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene color={themeColor} />
      </Canvas>
    </div>
  );
}
