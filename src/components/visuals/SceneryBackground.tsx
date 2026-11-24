"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface Snowflake {
    x: number;
    y: number;
    radius: number;
    speedY: number;
    speedX: number;
    opacity: number;
    swing: number;
    swingSpeed: number;
}

export default function SceneryBackground() {
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Respect reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initFlakes();
        };

        window.addEventListener("resize", handleResize);

        // Faint, sparse snowflakes (around 35-50 across the entire screen)
        const flakeCount = Math.min(50, Math.max(25, Math.floor(width / 35)));
        let flakes: Snowflake[] = [];

        const initFlakes = () => {
            flakes = [];
            for (let i = 0; i < flakeCount; i++) {
                flakes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.8 + 0.8, // small: 0.8px to 2.6px
                    speedY: Math.random() * 0.4 + 0.25, // very slow, gentle descent
                    speedX: (Math.random() - 0.5) * 0.2,
                    opacity: Math.random() * 0.25 + 0.15, // faint: 0.15 - 0.4
                    swing: Math.random() * Math.PI * 2,
                    swingSpeed: Math.random() * 0.015 + 0.005,
                });
            }
        };

        initFlakes();

        const isDark = resolvedTheme === "dark";
        // Warm papyrus / soft snow tone from palette
        const flakeColor = isDark ? "253, 240, 213" : "102, 155, 188";

        let isRunning = true;

        const handleVisibilityChange = () => {
            isRunning = document.visibilityState === "visible";
            if (isRunning) {
                render();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        const render = () => {
            if (!isRunning) return;
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = `rgb(${flakeColor})`;

            for (let i = 0; i < flakes.length; i++) {
                const flake = flakes[i];

                flake.swing += flake.swingSpeed;
                flake.y += flake.speedY;
                flake.x += Math.sin(flake.swing) * 0.35 + flake.speedX;

                // Wrap around edges seamlessly
                if (flake.y > height + 5) {
                    flake.y = -5;
                    flake.x = Math.random() * width;
                }
                if (flake.x > width + 5) {
                    flake.x = -5;
                } else if (flake.x < -5) {
                    flake.x = width + 5;
                }

                ctx.save();
                ctx.globalAlpha = flake.opacity;
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted, resolvedTheme]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 overflow-hidden z-[-1] pointer-events-none">
            {/* Base Surface */}
            <div className="absolute inset-0 bg-background transition-colors duration-300" />

            {/* Subtle holiday ambient glow (Deep Prussian Navy with warm Crimson/Gold hearth highlights) */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{
                    background:
                        resolvedTheme === "dark"
                            ? "radial-gradient(circle at 80% 10%, rgba(193, 18, 31, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 90%, rgba(102, 155, 188, 0.06) 0%, transparent 60%)"
                            : "radial-gradient(circle at 80% 10%, rgba(193, 18, 31, 0.035) 0%, transparent 45%), radial-gradient(circle at 20% 90%, rgba(102, 155, 188, 0.05) 0%, transparent 50%)",
                }}
            />

            {/* Faint, slow-drifting winter snow flurries */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: resolvedTheme === "dark" ? 0.75 : 0.55 }}
            />
        </div>
    );
}
