"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface Tracer {
    x: number;
    y: number;
    dx: number;
    dy: number;
    history: { x: number; y: number }[];
    life: number;
    maxLife: number;
    speed: number;
    color: string;
    width: number;
}

export default function SceneryBackground() {
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let tracers: Tracer[] = [];
        let mouseX = -1000;
        let mouseY = -1000;
        let gridGap = 40; // Size of the grid cells

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Adjust grid gap based on screen size, maybe?
            gridGap = Math.max(30, Math.floor(canvas.width / 50));
            initTracers();
        };

        const initTracers = () => {
            tracers = [];
            // Initial burst
            for (let i = 0; i < 20; i++) spawnTracer();
        };

        const spawnTracer = (x?: number, y?: number) => {
             // Snap to grid
            const startX = x !== undefined ? Math.round(x / gridGap) * gridGap : Math.round(Math.random() * (canvas.width / gridGap)) * gridGap;
            const startY = y !== undefined ? Math.round(y / gridGap) * gridGap : Math.round(Math.random() * (canvas.height / gridGap)) * gridGap;

            const isDark = resolvedTheme === "dark";
            
            // Semiconductor Palette (Color Hunt Adapted)
            // Dark Mode: Copper (#B19470), Gold (#D4AF37), Teal Accent (#43766C)
            // Light Mode: Teal (#43766C), Dark Brown (#76453B), Copper (#B19470)
            const colors = isDark 
                ? ["#B19470", "#D4AF37", "#43766C"] 
                : ["#43766C", "#76453B", "#B19470"];

            const chosenColor = colors[Math.floor(Math.random() * colors.length)];

            // Random initial direction (orthogonal)
            const dirs = [{ dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }];
            const dir = dirs[Math.floor(Math.random() * dirs.length)];

            tracers.push({
                x: startX,
                y: startY,
                dx: dir.dx,
                dy: dir.dy,
                history: [],
                life: 0,
                maxLife: Math.random() * 50 + 20, // Steps to take
                speed: 2 + Math.random() * 2, // px per frame? No, let's do grid based movement
                color: chosenColor,
                width: Math.random() > 0.8 ? 2 : 1 // thicker power lines
            });
        };

        const draw = () => {
            if (!ctx) return;
            const isDark = resolvedTheme === "dark";

            // Fade effect for trails (creates the "persistence" look)
            // Use CSS var colors for substrate fade
            ctx.fillStyle = isDark ? "rgba(26, 36, 35, 0.15)" : "rgba(248, 250, 229, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw underlying grid (wafer pattern)
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = isDark ? "rgba(248, 250, 229, 0.05)" : "rgba(118, 69, 59, 0.05)";
            
            // Draw Dots at grid intersections
            ctx.fillStyle = isDark ? "rgba(248, 250, 229, 0.05)" : "rgba(118, 69, 59, 0.05)";
            for (let x = 0; x <= canvas.width; x += gridGap) {
                for (let y = 0; y <= canvas.height; y += gridGap) {
                     // Only draw some dots to look like a sparse BGA array
                     if ((x + y) % (gridGap * 2) === 0) {
                         ctx.fillRect(x - 1, y - 1, 2, 2);
                     }
                }
            }


            // Update and draw tracers
            for (let i = tracers.length - 1; i >= 0; i--) {
                const t = tracers[i];
                
                // Move pixels
                const speed = 4; // px per frame
                t.x += t.dx * speed;
                t.y += t.dy * speed;
                
                t.life++;
                t.history.push({ x: t.x, y: t.y });
                if (t.history.length > 20) t.history.shift(); // Tail length

                // Change direction randomly at grid intersections
                if (t.x % gridGap === 0 && t.y % gridGap === 0) {
                    if (Math.random() < 0.3) {
                         // Turn 90 degrees
                         const turn = Math.random() < 0.5 ? 1 : -1;
                         if (t.dx !== 0) { // Moving horizontal
                             t.dx = 0;
                             t.dy = turn;
                         } else { // Moving vertical
                             t.dx = turn;
                             t.dy = 0;
                         }
                    }
                }

                // Draw Head
                ctx.fillStyle = t.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = t.color;
                ctx.beginPath();
                ctx.arc(t.x, t.y, t.width === 2 ? 3 : 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Draw Tail
                ctx.strokeStyle = t.color;
                ctx.lineWidth = t.width;
                ctx.beginPath();
                if (t.history.length > 0) {
                     ctx.moveTo(t.history[0].x, t.history[0].y);
                     for (let p of t.history) ctx.lineTo(p.x, p.y);
                     ctx.lineTo(t.x, t.y);
                }
                ctx.stroke();

                // Mouse interaction: nearby tracers speed up or glow
                const dx = t.x - mouseX;
                const dy = t.y - mouseY;
                const dist = Math.hypot(dx, dy); // Linter fix: Math.hypot
                
                if (dist < 100) {
                   ctx.lineWidth = t.width + 1;
                   ctx.strokeStyle = isDark ? "#fff" : "#000";
                   ctx.stroke();
                }

                // Remove dead tracers
                if (t.life > t.maxLife || t.x < 0 || t.x > canvas.width || t.y < 0 || t.y > canvas.height) {
                    tracers.splice(i, 1);
                }
            }

            // Spawn new tracers to maintain population
            if (tracers.length < 30 && Math.random() < 0.05) {
                spawnTracer();
            }
            
            // Mouse trails: spawn tracers from mouse
            if (mouseX > 0 && Math.random() < 0.1) {
                spawnTracer(mouseX, mouseY);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        
        const handleMouseLeave = () => {
             mouseX = -1000;
             mouseY = -1000;
        };

        if (globalThis.window) { // Linter fix: globalThis
             globalThis.window.addEventListener("resize", resizeCanvas);
             globalThis.window.addEventListener("mousemove", handleMouseMove);
             globalThis.window.addEventListener("mouseout", handleMouseLeave);
        }
        
        resizeCanvas();
        draw();

        return () => {
            if (globalThis.window) {
                globalThis.window.removeEventListener("resize", resizeCanvas);
                globalThis.window.removeEventListener("mousemove", handleMouseMove);
                globalThis.window.removeEventListener("mouseout", handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted, resolvedTheme, pathname]);

    if (!mounted) return null;
    if (pathname?.startsWith("/blog")) return null;

    return (
        <div className="fixed inset-0 overflow-hidden z-[-1] pointer-events-none transition-colors duration-1000">
             {/* Base Background Color - Wafer Substrate */}
             <div
                className={`absolute inset-0 transition-colors duration-1000 ${resolvedTheme === "dark" 
                    ? "bg-[#1A2423]" // New Dark Teal-Black
                    : "bg-[#F8FAE5]" // New Cream
                }`}
            />
            {/* Gradient Overlay for Vignette/Sheen */}
             <div
                className={`absolute inset-0 transition-opacity duration-1000 opacity-40`}
                style={{
                    background: resolvedTheme === "dark"
                     ? "radial-gradient(circle at 50% 50%, transparent 0%, #000000 100%)"
                     : "radial-gradient(circle at 50% 50%, transparent 0%, #B19470 100%)"
                }}
            />
            
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.8 }}
            />
        </div>
    );
}
