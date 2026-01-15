"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Butterflies from "./Butterflies";
import FlowerDefs, { Rose, Tulip, Daisy } from "./SpringFlowers";

export default function SceneryBackground() {
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
    const [clouds, setClouds] = useState<{ id: number; x: number; y: number; scale: number; opacity: number }[]>([]);
    const [kites, setKites] = useState<{ id: number; x: number; y: number; color: string; scale: number; delay: number; duration: number }[]>([]);
    const [birds, setBirds] = useState<{ id: number; y: number; delay: number; duration: number; scale: number }[]>([]);

    // Mouse Parallax Motion Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Parallax Transforms for different layers (Multiplier determines depth)
    const layer1X = useTransform(springX, [-1, 1], [-10, 10]);
    const layer1Y = useTransform(springY, [-1, 1], [-5, 5]);

    const layer2X = useTransform(springX, [-1, 1], [-20, 20]);
    const layer2Y = useTransform(springY, [-1, 1], [-10, 10]);

    const layer3X = useTransform(springX, [-1, 1], [-40, 40]);
    const layer3Y = useTransform(springY, [-1, 1], [-15, 15]);

    // Celestial Body Parallax - Subtle opposite shift
    const celestialX = useTransform(springX, [-1, 1], [5, -5]);
    const celestialY = useTransform(springY, [-1, 1], [5, -5]);

    useEffect(() => {
        setMounted(true);
        const generateElements = () => {
            // Stars for dark mode
            const starCount = 100;
            const newStars = Array.from({ length: starCount }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 60,
                size: Math.random() * 2 + 1,
            }));
            setStars(newStars);

            // Clouds for light mode
            const cloudCount = 8;
            const newClouds = Array.from({ length: cloudCount }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 40,
                scale: Math.random() * 0.5 + 0.8,
                opacity: Math.random() * 0.3 + 0.4,
            }));
            setClouds(newClouds);

            // Kites for Makar Sankranti (Light Mode Only)
            // Colorful kites
            const kiteColors = ["#ef4444", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#f97316"];
            const kiteCount = 8;
            const newKites = Array.from({ length: kiteCount }).map((_, i) => ({
                id: i,
                x: Math.random() * 90 + 5,
                y: Math.random() * 50 + 5,
                color: kiteColors[Math.floor(Math.random() * kiteColors.length)],
                scale: Math.random() * 0.4 + 0.5,
                delay: Math.random() * 5,
                duration: Math.random() * 5 + 5,
            }));
            setKites(newKites);

            // Birds for light mode
            const birdCount = 5;
            const newBirds = Array.from({ length: birdCount }).map((_, i) => ({
                id: i,
                y: Math.random() * 30 + 10,
                delay: Math.random() * 10,
                duration: Math.random() * 10 + 15,
                scale: Math.random() * 0.4 + 0.3,
            }));
            setBirds(newBirds);
        };

        generateElements();

        const handleMouseMove = (e: MouseEvent) => {
            if (globalThis.window !== undefined) {
                const normalizedX = (e.clientX / globalThis.window.innerWidth) * 2 - 1;
                const normalizedY = (e.clientY / globalThis.window.innerHeight) * 2 - 1;
                mouseX.set(normalizedX);
                mouseY.set(normalizedY);
            }
        };

        globalThis.window.addEventListener("mousemove", handleMouseMove);
        return () => globalThis.window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Prevent hydration mismatch
    if (!mounted) return null;

    // Disable scenery on blog pages to improve text readability
    if (pathname?.startsWith("/blog")) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="fixed inset-0 overflow-hidden z-[-1] pointer-events-none transition-colors duration-1000">
            {/* Sky Gradient */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-100" : "opacity-0"}`}
                style={{
                    // Cold Spring Night: Deep Blues & Cyans
                    background: "linear-gradient(to bottom, #020617, #0f172a, #172554, #1e3a8a)", 
                }}
            />
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-0" : "opacity-100"}`}
                style={{
                    // Sunny spring sky with a hint of warm yellow
                    background: "linear-gradient(to bottom, #38bdf8, #7dd3fc, #fef08a)", 
                }}
            />

            {/* GSAP Butterflies (Dark Mode Only) */}
            {isDark && <Butterflies />}

            <AnimatePresence>
                {/* Dark Mode Elements: Stars */}
                {isDark && (
                    <>
                        {stars.map((star) => (
                            <motion.div
                                key={`star-${star.id}`}
                                className="absolute bg-white rounded-full"
                                style={{
                                    left: `${star.x}%`,
                                    top: `${star.y}%`,
                                    width: star.size,
                                    height: star.size,
                                    boxShadow: `0 0 ${star.size + 4}px rgba(255,255,255,0.8)`, // Increased glow
                                }}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [0.8, 1.2, 0.8],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: Math.random() * 1.5 + 1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </>
                )}

                {/* Flying Kites (Light Mode Only) */}
                {!isDark && kites.map((kite) => (
                    <motion.div
                        key={`kite-${kite.id}`}
                        className="absolute"
                        style={{
                            left: `${kite.x}%`,
                            top: `${kite.y}%`,
                            scale: kite.scale,
                        }}
                        animate={{
                            y: [-15, 15, -15],
                            x: [-10, 10, -10],
                            rotate: [-5, 5, -5],
                        }}
                        transition={{
                            duration: kite.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: kite.delay,
                        }}
                    >
                        {/* Kite Diamond */}
                        <div 
                            className="w-8 h-8 rotate-45 transform origin-center shadow-lg"
                            style={{ 
                                backgroundColor: kite.color,
                                border: '1px solid rgba(255,255,255,0.4)'
                            }} 
                        />
                        {/* Kite Tail */}
                        <div 
                            className="w-1 h-8 absolute top-6 left-1/2 -translate-x-1/2 origin-top"
                            style={{ backgroundColor: kite.color }}
                        />
                        <motion.div 
                             className="w-1 h-3 absolute top-14 left-1/2 -translate-x-1/2 rounded-full"
                             style={{ backgroundColor: kite.color }}
                             animate={{ rotate: [-20, 20, -20] }}
                             transition={{ duration: 0.5, repeat: Infinity }}
                        />
                    </motion.div>
                ))}

                {/* Light Mode Elements: Clouds & Birds */}
                {!isDark && (
                    <>
                        {clouds.map((cloud) => (
                            <motion.div
                                key={`cloud-${cloud.id}`}
                                className="absolute bg-white rounded-full blur-xl"
                                style={{
                                    left: `${cloud.x}%`,
                                    top: `${cloud.y}%`,
                                    width: 120 * cloud.scale,
                                    height: 40 * cloud.scale,
                                    opacity: cloud.opacity,
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    x: [`${cloud.x}%`, `${cloud.x + 5}%`, `${cloud.x}%`],
                                    opacity: cloud.opacity,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: Math.random() * 20 + 20,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}

                        {/* Flying Birds */}
                        {birds.map((bird) => (
                            <motion.div
                                key={`bird-${bird.id}`}
                                className="absolute text-slate-600"
                                style={{
                                    top: `${bird.y}%`,
                                    scale: bird.scale,
                                }}
                                initial={{ x: "-10vw", opacity: 0 }}
                                animate={{
                                    x: "110vw",
                                    opacity: [0, 1, 1, 0],
                                    y: [`${bird.y}%`, `${bird.y + (Math.random() * 5 - 2.5)}%`, `${bird.y}%`]
                                }}
                                transition={{
                                    duration: bird.duration,
                                    repeat: Infinity,
                                    delay: bird.delay,
                                    ease: "linear",
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2,12 Q12,20 22,12" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>

            {/* Celestial Body (Sun/Moon) */}
            <motion.div
                className={`absolute top-[10%] right-[15%] w-24 h-24 rounded-full transition-all duration-1000 ${isDark ? "bg-slate-100 shadow-[0_0_80px_rgba(255,255,255,0.4)]" : "bg-yellow-200 shadow-[0_0_80px_rgba(253,224,71,0.6)]"
                    }`}
                animate={{
                    y: isDark ? 0 : [0, -10, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    x: celestialX,
                    y: celestialY,
                }}
            >
                {!isDark && (
                    <motion.div
                        className="absolute inset-[-40%] rounded-full bg-yellow-300 blur-3xl opacity-40"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}
                {isDark && (
                    <motion.div
                        className="absolute inset-[-40%] rounded-full bg-blue-100 blur-3xl opacity-20"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}
            </motion.div>

            {/* Mountains - Spring Theme (Fresh Greens & Yellows) */}

            {/* Layer 1 (Back) */}
            <motion.div
                className="absolute bottom-0 left-[-10%] w-[120%] h-[50%]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ x: layer1X, y: layer1Y }}
            >
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                    <path
                        fill={isDark ? "#0f172a" : "#86efac"} // Very Dark/Blueish for night
                        fillOpacity="1"
                        d="M0,320 L0,180 L80,140 L160,200 L240,120 L350,180 L480,90 L600,160 L750,100 L900,190 L1050,110 L1200,170 L1300,130 L1440,190 L1440,320 Z"
                        className="transition-colors duration-1000"
                    ></path>
                </svg>
            </motion.div>

            {/* Layer 2 (Middle) */}
            <motion.div
                className="absolute bottom-0 left-[-10%] w-[120%] h-[40%]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{ x: layer2X, y: layer2Y }}
            >
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                    <path
                        fill={isDark ? "#172554" : "#4ade80"} // Dark Blue
                        fillOpacity="1"
                        d="M0,320 L0,240 L60,220 L140,260 L240,210 L360,250 L500,200 L650,240 L800,190 L950,250 L1100,200 L1250,240 L1380,210 L1440,250 L1440,320 Z"
                        className="transition-colors duration-1000"
                    ></path>
                </svg>
            </motion.div>

            {/* Layer 3 (Front) */}
            <motion.div
                className="absolute bottom-0 left-[-10%] w-[120%] h-[30%]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{ x: layer3X, y: layer3Y }}
            >
                {/* Individual Flowers (Foreground) */}
                <FlowerDefs />
                
                {/* Left Group */}
                <Rose className="absolute bottom-[-10%] left-[5%] w-24 h-48 z-10" />
                <Tulip className="absolute bottom-[-5%] left-[15%] w-20 h-40 z-10" variant="orange" />
                <Daisy className="absolute bottom-[-8%] left-[10%] w-20 h-40 z-10 scale-75" />
                
                {/* Center-Left Group */}
                <Tulip className="absolute bottom-[5%] left-[30%] w-20 h-40 z-10" variant="purple" />
                <Rose className="absolute bottom-[-2%] left-[35%] w-24 h-48 z-10 scale-90" />
                
                {/* Center Group */}
                <Daisy className="absolute bottom-[-5%] left-[48%] w-20 h-40 z-10" />
                <Tulip className="absolute bottom-[2%] left-[53%] w-20 h-40 z-10 scale-110" variant="orange" />

                {/* Right Group */}
                <Rose className="absolute bottom-[0%] left-[70%] w-24 h-48 z-10" />
                <Daisy className="absolute bottom-[-6%] left-[78%] w-20 h-40 z-10" />
                <Tulip className="absolute bottom-[-4%] left-[85%] w-20 h-40 z-10" variant="purple" />
                
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                    <path
                        fill={isDark ? "#1e3a8a" : "#22c55e"} // Blue/Green
                        fillOpacity="1"
                        d="M0,320 L0,290 L100,270 L220,300 L350,260 L500,290 L650,250 L850,300 L1000,260 L1200,290 L1350,270 L1440,300 L1440,320 Z"
                        className="transition-colors duration-1000"
                    ></path>
                </svg>
            </motion.div>
        </div>
    );
}
