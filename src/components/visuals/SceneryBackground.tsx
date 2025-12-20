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
    const [snowflakes, setSnowflakes] = useState<{ id: number; x: number; delay: number; duration: number; size: number }[]>([]);
    const [birds, setBirds] = useState<{ id: number; y: number; delay: number; duration: number; scale: number }[]>([]);

    // Mouse Parallax Motion Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Parallax Transforms for different layers (Multiplier determines depth)
    // Layer 1 (Back) - Moves least
    const layer1X = useTransform(springX, [-1, 1], [-10, 10]);
    const layer1Y = useTransform(springY, [-1, 1], [-5, 5]);

    // Layer 2 (Middle) - Moves moderate
    const layer2X = useTransform(springX, [-1, 1], [-20, 20]);
    const layer2Y = useTransform(springY, [-1, 1], [-10, 10]);

    // Layer 3 (Front) - Moves most
    const layer3X = useTransform(springX, [-1, 1], [-40, 40]);
    const layer3Y = useTransform(springY, [-1, 1], [-15, 15]);

    // Celestial Body Parallax - Subtle opposite shift
    const celestialX = useTransform(springX, [-1, 1], [5, -5]);
    const celestialY = useTransform(springY, [-1, 1], [5, -5]);

    useEffect(() => {
        setMounted(true);
        const generateElements = () => {
            // Stars for dark mode - More magical count
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

            // Falling Snow (Christmas Vibe)
            const snowCount = 50;
            const newSnow = Array.from({ length: snowCount }).map((_, i) => ({
                id: i,
                x: Math.random() * 100, // Random Horizontal
                delay: Math.random() * 5, // Random start time
                duration: Math.random() * 5 + 5, // Random fall speed (5-10s)
                size: Math.random() * 3 + 2, // Random size
            }));
            setSnowflakes(newSnow);

            // Birds for light mode
            const birdCount = 5;
            const newBirds = Array.from({ length: birdCount }).map((_, i) => ({
                id: i,
                y: Math.random() * 30 + 10, // Top 10-40% of screen
                delay: Math.random() * 10,
                duration: Math.random() * 10 + 15, // Slow, distant flight
                scale: Math.random() * 0.4 + 0.3, // Small, distant birds
            }));
            setBirds(newBirds);
        };

        generateElements();

        const handleMouseMove = (e: MouseEvent) => {
            // Use globalThis window check or just ensure hydration
            if (typeof window !== "undefined") {
                // Normalize mouse position from -1 to 1
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
            {/* Sky Gradient */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-100" : "opacity-0"}`}
                style={{
                    background: "linear-gradient(to bottom, #0f172a, #1e293b, #1B3C53)",
                }}
            />
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${!isDark ? "opacity-100" : "opacity-0"}`}
                style={{
                    background: "linear-gradient(to bottom, #bae6fd, #e0f2fe, #E3E3E3)",
                }}
            />

            <AnimatePresence>
                {/* Dark Mode Elements: Stars, Shooting Stars & Snow */}
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
                                    boxShadow: `0 0 ${star.size + 2}px white`, // Glow effect
                                }}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0.2, 1, 0.2], // Sharper twinkle
                                    scale: [0.8, 1.2, 0.8],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: Math.random() * 1.5 + 1, // Faster twinkle
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                        {/* Shooting Stars */}
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={`shooting-star-${i}`}
                                className="absolute h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
                                style={{
                                    width: "100px",
                                    left: "50%",
                                    top: "20%",
                                }}
                                initial={{ x: 0, y: 0, opacity: 0, rotate: -45 }}
                                animate={{
                                    x: [-100, 300], // Move across
                                    y: [0, 300],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: Math.random() * 8 + 5,
                                    delay: Math.random() * 5,
                                    ease: "linear",
                                }}
                            />
                        ))}
                    </>
                )}

                {/* Falling Snow (Any Mode or just Dark - keeping both for winter vibe) */}
                {snowflakes.map((flake) => (
                    <motion.div
                        key={`snow-${flake.id}`}
                        className="absolute bg-white rounded-full opacity-60"
                        style={{
                            left: `${flake.x}%`,
                            top: -20, // Start above screen
                            width: flake.size,
                            height: flake.size,
                            filter: "blur(0.5px)",
                        }}
                        animate={{
                            y: ["0vh", "110vh"], // Fall way past bottom
                            x: [0, Math.random() * 50 - 25], // Drift left/right
                        }}
                        transition={{
                            duration: flake.duration,
                            repeat: Infinity,
                            delay: flake.delay,
                            ease: "linear",
                        }}
                    />
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
                                    y: [`${bird.y}%`, `${bird.y + (Math.random() * 5 - 2.5)}%`, `${bird.y}%`] // Slight vertical undulation
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
                className={`absolute top-[10%] right-[15%] w-24 h-24 rounded-full transition-all duration-1000 ${isDark ? "bg-slate-200 shadow-[0_0_60px_rgba(255,255,255,0.3)]" : "bg-yellow-100 shadow-[0_0_80px_rgba(253,186,116,0.6)]"
                    }`}
                animate={{
                    y: isDark ? 0 : [0, -10, 0], // Subtle float for sun
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    x: celestialX,
                    y: celestialY,
                }}
            >
                {!isDark && (
                    <>
                        {/* Pulsing Sun Glow */}
                        <motion.div
                            className="absolute inset-[-40%] rounded-full bg-orange-300 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Sun Body Gradient */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-80" />
                    </>
                )}
            </motion.div>

            {/* Mountains - Theme Aware Colors with Snow Caps */}

            {/* Layer 1 (Back) */}
            <motion.div
                className="absolute bottom-0 left-[-10%] w-[120%] h-[50%]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ x: layer1X, y: layer1Y }}
            >
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="snowGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="15%" stopColor="white" />
                            <stop offset="15%" stopColor={isDark ? "#234C6A" : "#cbd5e1"} style={{ transition: "stop-color 1s" }} />
                            <stop offset="100%" stopColor={isDark ? "#234C6A" : "#cbd5e1"} style={{ transition: "stop-color 1s" }} />
                        </linearGradient>
                    </defs>
                    <path
                        className="transition-colors duration-1000"
                        fill="url(#snowGradient1)"
                        fillOpacity="1"
                        d="M0,320 L0,180 L80,140 L160,200 L240,120 L350,180 L480,90 L600,160 L750,100 L900,190 L1050,110 L1200,170 L1300,130 L1440,190 L1440,320 Z"
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
                    <defs>
                        <linearGradient id="snowGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="10%" stopColor="white" />
                            <stop offset="10%" stopColor={isDark ? "#1B3C53" : "#94a3b8"} style={{ transition: "stop-color 1s" }} />
                            <stop offset="100%" stopColor={isDark ? "#1B3C53" : "#94a3b8"} style={{ transition: "stop-color 1s" }} />
                        </linearGradient>
                    </defs>
                    <path
                        className="transition-colors duration-1000"
                        fill="url(#snowGradient2)"
                        fillOpacity="1"
                        d="M0,320 L0,240 L60,220 L140,260 L240,210 L360,250 L500,200 L650,240 L800,190 L950,250 L1100,200 L1250,240 L1380,210 L1440,250 L1440,320 Z"
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
                    <defs>
                        <linearGradient id="snowGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="5%" stopColor="white" />
                            <stop offset="5%" stopColor={isDark ? "#0f172a" : "#64748b"} style={{ transition: "stop-color 1s" }} />
                            <stop offset="100%" stopColor={isDark ? "#0f172a" : "#64748b"} style={{ transition: "stop-color 1s" }} />
                        </linearGradient>
                    </defs>
                    <path
                        className="transition-colors duration-1000"
                        fill="url(#snowGradient3)"
                        fillOpacity="1"
                        d="M0,320 L0,290 L100,270 L220,300 L350,260 L500,290 L650,250 L850,300 L1000,260 L1200,290 L1350,270 L1440,300 L1440,320 Z"
                    ></path>
                </svg>
            </motion.div>
        </div>
    );
}
