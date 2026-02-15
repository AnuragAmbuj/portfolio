"use client";

import { useEffect, useState, ReactNode, Children } from "react";
import { motion } from "framer-motion";

interface MasonryGridProps {
    children: ReactNode;
    gap?: number;
    breakpoints?: { [key: number]: number }; // e.g. { 640: 2, 1024: 3 }
}

export default function MasonryGrid({ 
    children, 
    gap = 24, 
    breakpoints = { 640: 1, 768: 2, 1024: 3, 1280: 4 } 
}: MasonryGridProps) {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            let count = 1;
            
            // Sort breakpoints desc
            const sorted = Object.keys(breakpoints)
                .map(Number)
                .sort((a, b) => b - a);

            for (const point of sorted) {
                if (width >= point) {
                    count = breakpoints[point];
                    break;
                }
            }
            // If width is smaller than smallest breakpoint, default to 1 (or specific 0 key if exists)
            // But usually we just say standard is 1 unless hit breakpoint.
            // Actually, let's reverse: standard is min, then verify.
            
            // Simpler logic:
            // Find the largest breakpoint that is <= current width
            // If none found (width < smallest breakpoint), use 1.
            
            // Wait, my logic above:
            // 640: 2 means >= 640 is 2.
            // < 640 is 1.
            
            // Let's stick to: sort keys desc. First one that matches width >= key wins.
            // 1280 (4) -> if width 1300, matches -> 4.
            // 1024 (3) -> if width 1100, matches -> 3.
            // 768 (2) -> if width 800, matches -> 2.
            // 640 (1) -> if width 700, matches -> 1? Wait, 640:1 is usually default mobile?
            // Usually < 768 is 1.
            
            // Let's use standard Tailwind-ish logic passed in props.
            // Default prop: { 640: 1, 768: 2, 1024: 3, 1280: 4 }
            // If width < 640, it fails all checks? I need a default.
            
            // Adjust loop:
            let match = 1; // Default
            for (const point of sorted) {
                if (width >= point) {
                    match = breakpoints[point];
                    break;
                }
            }
            setColumns(match);
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, [breakpoints]);

    const childrenArray = Children.toArray(children);
    
    // Create arrays for each column
    const columnWrapper: ReactNode[][] = Array.from({ length: columns }, () => []);
    
    // Distribute children
    childrenArray.forEach((child, i) => {
        columnWrapper[i % columns].push(child);
    });

    return (
        <div 
            style={{ 
                display: "flex", 
                gap: gap,
                alignItems: "flex-start" // Crucial for masonry
            }}
        >
            {columnWrapper.map((col, i) => (
                <div 
                    key={i} 
                    style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: gap,
                        flex: 1,
                        minWidth: 0 // Prevent flex/grid blowout
                    }}
                >
                    {col.map((item, idx) => (
                        <div key={idx} style={{ width: "100%" }}>
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
