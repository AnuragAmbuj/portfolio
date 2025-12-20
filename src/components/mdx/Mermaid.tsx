"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
    fontFamily: "inherit",
});

interface MermaidProps {
    chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const renderChart = async () => {
            if (!ref.current) return;

            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
                setError("");
            } catch (err) {
                console.error("Mermaid diagram rendering failed:", err);
                setError("Failed to render diagram");
            }
        };

        renderChart();
    }, [chart]);

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
