"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseColor: string;
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
        let particles: Particle[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const isDark = resolvedTheme === "dark";
            
            // Adjust particle count based on screen size
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
            
            const colors = isDark 
                ? ["#B19470", "#43766C", "#ffffff"] 
                : ["#43766C", "#76453B", "#B19470"];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    radius: Math.random() * 1.5 + 0.5,
                    baseColor: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const draw = () => {
            if (!ctx) return;
            const isDark = resolvedTheme === "dark";

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Connection distance threshold
            const connectDistance = 120;
            const mousePushRadius = 150;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse interaction (gentle push)
                const dxMouse = p.x - mouseX;
                const dyMouse = p.y - mouseY;
                const distMouse = Math.hypot(dxMouse, dyMouse);

                if (distMouse < mousePushRadius) {
                    const force = (mousePushRadius - distMouse) / mousePushRadius;
                    p.x += (dxMouse / distMouse) * force * 2;
                    p.y += (dyMouse / distMouse) * force * 2;
                }

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Keep in bounds just in case
                p.x = Math.max(0, Math.min(canvas.width, p.x));
                p.y = Math.max(0, Math.min(canvas.height, p.y));

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.baseColor;
                
                if (isDark) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = p.baseColor;
                } else {
                    ctx.shadowBlur = 0;
                }
                
                ctx.fill();
                
                // Reset shadow for subsequent drawing
                ctx.shadowBlur = 0;

                // Draw Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < connectDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        
                        const opacity = 1 - (dist / connectDistance);
                        const lineColor = isDark 
                            ? `rgba(177, 148, 112, ${opacity * 0.3})`
                            : `rgba(67, 118, 108, ${opacity * 0.3})`;
                            
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Connect to mouse
            if (mouseX > 0) {
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const dx = p.x - mouseX;
                    const dy = p.y - mouseY;
                    const dist = Math.hypot(dx, dy);

                    if (dist < connectDistance * 1.5) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouseX, mouseY);
                        
                        const opacity = 1 - (dist / (connectDistance * 1.5));
                        const lineColor = isDark 
                            ? `rgba(255, 255, 255, ${opacity * 0.4})`
                            : `rgba(67, 118, 108, ${opacity * 0.4})`;
                            
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
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

        if (globalThis.window) {
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
                style={{ opacity: 0.85 }}
            />
        </div>
    );
}
