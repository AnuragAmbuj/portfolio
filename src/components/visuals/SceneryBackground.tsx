"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SceneryBackground() {
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (pathname?.startsWith("/blog")) return null;

    return (
        <div className="fixed inset-0 overflow-hidden z-[-1] pointer-events-none">
            {/* Clean Base Surface */}
            <div className="absolute inset-0 bg-background transition-colors duration-300" />
            
            {/* Subtle ambient glow in Prussian Navy & Crimson */}
            <div
                className="absolute inset-0 opacity-60 pointer-events-none transition-opacity duration-500"
                style={{
                    background: resolvedTheme === "dark"
                        ? "radial-gradient(circle at 50% 0%, rgba(193, 18, 31, 0.08) 0%, transparent 70%)"
                        : "radial-gradient(circle at 50% 0%, rgba(193, 18, 31, 0.04) 0%, transparent 60%)"
                }}
            />
        </div>
    );
}
