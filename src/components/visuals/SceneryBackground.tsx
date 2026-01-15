"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

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

            // Kites for Makar Sankranti (Light & Dark Mode)
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
            if (typeof window !== "undefined") {
                const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
                const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
                mouseX.set(normalizedX);
                mouseY.set(normalizedY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Prevent hydration mismatch
    if (!mounted) return null;

    // Disable scenery on blog pages to improve text readability
    if (pathname?.startsWith("/blog")) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="fixed inset-0 overflow-hidden z-[-1] pointer-events-none transition-colors duration-1000">
            {/* Sky Gradient - Warmer for Spring/Basant Panchami */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-100" : "opacity-0"}`}
                style={{
                    background: "linear-gradient(to bottom, #0f172a, #1e293b, #1e1b4b)", // Deep spring night
                }}
            />
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${!isDark ? "opacity-100" : "opacity-0"}`}
                style={{
                    // Sunny spring sky with a hint of warm yellow for Basant Panchami
                    background: "linear-gradient(to bottom, #38bdf8, #7dd3fc, #fef08a)", 
                }}
            />

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
                                    boxShadow: `0 0 ${star.size + 2}px white`,
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

                {/* Flying Kites (Visible in both themes, but maybe subtler in dark?) */}
                {kites.map((kite) => (
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
                className={`absolute top-[10%] right-[15%] w-24 h-24 rounded-full transition-all duration-1000 ${isDark ? "bg-slate-200 shadow-[0_0_60px_rgba(255,255,255,0.3)]" : "bg-yellow-200 shadow-[0_0_80px_rgba(253,224,71,0.6)]"
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
                    <>
                        <motion.div
                            className="absolute inset-[-40%] rounded-full bg-yellow-300 blur-3xl opacity-40"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </>
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
                        fill={isDark ? "#14532d" : "#86efac"} // Dark Green vs Light Green
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
                        fill={isDark ? "#166534" : "#4ade80"} // Slightly darker green
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
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                    <path
                        fill={isDark ? "#15803d" : "#22c55e"} // Vibrant Green
                        fillOpacity="1"
                        d="M0,320 L0,290 L100,270 L220,300 L350,260 L500,290 L650,250 L850,300 L1000,260 L1200,290 L1350,270 L1440,300 L1440,320 Z"
                        className="transition-colors duration-1000"
                    ></path>
                    {/* Basant Panchami Flowers (Mustard - Yellow dots on front hills) */}
                    <circle cx="100" cy="280" r="3" fill="#facc15" className="animate-pulse" />
                    <circle cx="150" cy="290" r="2" fill="#facc15" />
                    <circle cx="500" cy="300" r="3" fill="#facc15" className="animate-pulse" delay-100 />
                    <circle cx="850" cy="310" r="4" fill="#facc15" />
                    <circle cx="1200" cy="300" r="3" fill="#facc15" className="animate-pulse" />
                </svg>
            </motion.div>
        </div>
    );
}
