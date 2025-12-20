"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidProps {
    chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        // Initialize mermaid with the correct theme whenever resolvedTheme changes
        mermaid.initialize({
            startOnLoad: false,
            theme: resolvedTheme === "dark" ? "dark" : "default",
            securityLevel: "loose",
            fontFamily: "inherit",
        });
    }, [resolvedTheme]);

    useEffect(() => {
        const renderChart = async () => {
            if (!ref.current) return;

            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                // We need to re-render when theme changes too, so checking chart AND theme dependency is good,
                // but useEffect dependency below handles chart changes.
                // If theme changes, the first useEffect runs. We might need to trigger re-render of chart?
                // Actually, re-initializing might not automatically update an already rendered SVG string.
                // We typically need to re-run mermaid.render.

                // Let's ensure initialize happens before render by adding resolvedTheme to this effect's dependency too
                // or just relying on React state updates if we want to be safe.
                // But simplest is to just re-run render when theme changes.

                // Note: mermaid.render returns a promise.
                // Also, initialize needs to be called before render.

                // Re-initialize inside here to ensure it uses current theme for this render?
                // Or rely on the other effect. Let's do it here to be sure for this specific render call.
                mermaid.initialize({
                    startOnLoad: false,
                    theme: resolvedTheme === "dark" ? "dark" : "default",
                    securityLevel: "loose",
                    fontFamily: "inherit",
                });

                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
                setError("");
            } catch (err) {
                console.error("Mermaid diagram rendering failed:", err);
                setError("Failed to render diagram");
            }
        };

        renderChart();
    }, [chart, resolvedTheme]);

    if (error) {
        return (
            <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-600 text-sm">
                {error}
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="mermaid-wrapper my-8 flex justify-center overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
