"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TorusKnotMesh({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const initialY = useRef(0);

  useEffect(() => {
    initialY.current = Math.random() * 2 - 1;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.z += 0.003;

    meshRef.current.position.x += (pointer.x * 0.3 - meshRef.current.position.x) * 0.02;
    meshRef.current.position.y += (-pointer.y * 0.3 - meshRef.current.position.y) * 0.02;

    const scrollOffset = scrollProgress * 3;
    meshRef.current.position.y += (initialY.current + scrollOffset - meshRef.current.position.y) * 0.01;
    meshRef.current.rotation.y += scrollProgress * 0.02;

    const scale = 1 + Math.sin(t * 0.5) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);

    if (materialRef.current?.uniforms) {
      materialRef.current.uniforms.uTime.value = t;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.8, 0.6, 128, 24]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        wireframe={false}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#3b82f6") },
          uGlowColor: { value: new THREE.Color("#8b5cf6") },
        }}
        vertexShader={`
          varying vec3 vPosition;
          varying vec3 vNormal;
          void main() {
            vPosition = position;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          uniform vec3 uGlowColor;
          varying vec3 vPosition;
          varying vec3 vNormal;

          void main() {
            float pulse = 0.6 + 0.4 * sin(vPosition.x * 2.0 + vPosition.y * 2.0 + uTime * 0.5);
            vec3 color = mix(uColor, uGlowColor, pulse * 0.5);
            float fresnel = 0.3 + 0.7 * pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
            gl_FragColor = vec4(color, 0.15 + fresnel * 0.25);
          }
        `}
      />
    </mesh>
  );
}

function MorphingIcosahedron({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.IcosahedronGeometry>(null!);
  const originalPositions = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (geometryRef.current) {
      const pos = geometryRef.current.attributes.position.array as Float32Array;
      originalPositions.current = new Float32Array(pos);
    }
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !geometryRef.current || !originalPositions.current) return;
    const t = clock.getElapsedTime();
    const positions = geometryRef.current.attributes.position.array as Float32Array;
    const original = originalPositions.current;

    const morphStrength = 0.15 + scrollProgress * 0.3;
    for (let i = 0; i < positions.length; i += 3) {
      const x = original[i];
      const y = original[i + 1];
      const z = original[i + 2];
      const noise = Math.sin(x * 3 + t * 0.5) * Math.cos(y * 3 + t * 0.3) * Math.sin(z * 2 + t * 0.7);
      positions[i] = x + noise * morphStrength;
      positions[i + 1] = y + noise * morphStrength * 0.7;
      positions[i + 2] = z + noise * morphStrength * 0.5;
    }
    geometryRef.current.attributes.position.needsUpdate = true;

    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z += 0.001;

    const scrollOffset = scrollProgress * 2;
    meshRef.current.position.x = 2.5 + scrollProgress * 0.5;
    meshRef.current.position.y = -1 + scrollOffset * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[2.5, -1, -2]}>
      <icosahedronGeometry ref={geometryRef} args={[0.8, 1]} />
      <meshPhysicalMaterial
        color="#8b5cf6"
        wireframe
        transparent
        opacity={0.3}
        emissive="#8b5cf6"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function FloatingParticles({ count = 200, scrollProgress }: { count?: number; scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    return pos;
  }, [count]);

  const circleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += Math.sin(t * 0.3 + i) * 0.001;
      pos[i3] += Math.cos(t * 0.2 + i * 0.5) * 0.001;
      pos[i3 + 1] -= scrollProgress * 0.002;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#3b82f6"
        sizeAttenuation
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={circleTexture}
      />
    </points>
  );
}

function Scene({ scrollProgress: sp, reducedMotion }: { scrollProgress: number; reducedMotion: boolean }) {
  if (reducedMotion) {
    return null;
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <TorusKnotMesh scrollProgress={sp} />
      <MorphingIcosahedron scrollProgress={sp} />
      <FloatingParticles count={200} scrollProgress={sp} />
    </>
  );
}

export function Canvas3D() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
        <Scene scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
