"use client";
import { useEffect, useRef } from "react";

const COLORS = ["#ec4899", "#ffd23f", "#a3e635", "#38bdf8", "#a78bfa"];
const GRID = 8; // pixels snap to this grid for a chunky retro feel

interface Pixel {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

/** Field of drifting square "pixels" that scatter away from the cursor. */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let pixels: Pixel[] = [];
    let animationId = 0;

    const mouse = { x: -9999, y: -9999, active: false };
    const mouseRadius = 120;

    const createPixels = () => {
      const area = width * height;
      const count = Math.min(70, Math.max(20, Math.floor(area / 18000)));
      pixels = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: GRID * (Math.random() > 0.7 ? 1.5 : 1),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createPixels();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of pixels) {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          p.x = Math.min(Math.max(p.x, 0), width);
          p.y = Math.min(Math.max(p.y, 0), height);

          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius && dist > 0) {
              const force = (mouseRadius - dist) / mouseRadius;
              p.x += (dx / dist) * force * 2;
              p.y += (dy / dist) * force * 2;
            }
          }
        }

        // snap to grid so movement reads as chunky pixel steps
        const gx = Math.round(p.x / GRID) * GRID;
        const gy = Math.round(p.y / GRID) * GRID;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
        ctx.fillRect(gx, gy, p.size, p.size);
      }

      ctx.globalAlpha = 1;
      if (!reducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
