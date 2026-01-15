"use client";

import React from "react";

const FlowerDefs = () => (
    <svg width="0" height="0" className="absolute">
        <defs>
            <radialGradient id="roseGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: "#FF1744", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#E91E63", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#C2185B", stopOpacity: 1 }} />
            </radialGradient>
            <radialGradient id="rosePink" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: "#FF4081", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#F48FB1", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#EC407A", stopOpacity: 1 }} />
            </radialGradient>
            <linearGradient id="tulipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#FF6F00", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#FF8F00", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#FFA726", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="tulipPurple" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#6A1B9A", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#8E24AA", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#AB47BC", stopOpacity: 1 }} />
            </linearGradient>
            <radialGradient id="daisyYellow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: "#FFF9C4", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#FFF59D", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#FFF176", stopOpacity: 1 }} />
            </radialGradient>
            <radialGradient id="daisyCenter" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: "#FFD54F", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#FFA000", stopOpacity: 1 }} />
            </radialGradient>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#66BB6A", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#4CAF50", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#388E3C", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#558B2F", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#689F38", stopOpacity: 1 }} />
            </linearGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="2" dy="3" result="offsetblur" />
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    </svg>
);

export const Rose = ({ className = "", style = {} }: { className?: string, style?: React.CSSProperties }) => (
    <div className={`relative ${className}`} style={style}>
        {/* Render Defs locally if needed, but best to have once in parent. For simplicity assuming parent has them or we duplicate. 
            Actually, SVGs need shared defs. Let's include defs in each or rely on GlobalFlowerDefs. 
            For safety, I'll assume GlobalFlowerDefs is rendered once. */}
        <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible">
            <g transform="translate(50, 150) scale(0.6)">
                {/* Stem */}
                <path d="M 0 150 Q -5 100, 0 50 Q 2 20, 0 0" stroke="url(#stemGradient)" strokeWidth="5" fill="none" strokeLinecap="round" />
                {/* Leaves */}
                <ellipse cx="-25" cy="100" rx="20" ry="12" fill="url(#leafGradient)" transform="rotate(-30 -25 100)" opacity="0.9" />
                <path d="M -25 100 L -15 105" stroke="#2E7D32" strokeWidth="1" />
                <ellipse cx="20" cy="70" rx="18" ry="11" fill="url(#leafGradient)" transform="rotate(25 20 70)" opacity="0.9" />
                <path d="M 20 70 L 12 73" stroke="#2E7D32" strokeWidth="1" />
                {/* Rose outer petals */}
                <ellipse cx="-15" cy="-10" rx="25" ry="20" fill="url(#roseGradient)" transform="rotate(-30 -15 -10)" filter="url(#shadow)" opacity="0.9" />
                <ellipse cx="15" cy="-10" rx="25" ry="20" fill="url(#roseGradient)" transform="rotate(30 15 -10)" filter="url(#shadow)" opacity="0.9" />
                <ellipse cx="0" cy="-25" rx="25" ry="22" fill="url(#roseGradient)" transform="rotate(0 0 -25)" filter="url(#shadow)" opacity="0.9" />
                <ellipse cx="-20" cy="5" rx="23" ry="18" fill="url(#roseGradient)" transform="rotate(-60 -20 5)" filter="url(#shadow)" opacity="0.9" />
                <ellipse cx="20" cy="5" rx="23" ry="18" fill="url(#roseGradient)" transform="rotate(60 20 5)" filter="url(#shadow)" opacity="0.9" />
                {/* Rose middle petals */}
                <ellipse cx="-8" cy="-5" rx="18" ry="15" fill="url(#rosePink)" transform="rotate(-20 -8 -5)" opacity="0.95" />
                <ellipse cx="8" cy="-5" rx="18" ry="15" fill="url(#rosePink)" transform="rotate(20 8 -5)" opacity="0.95" />
                <ellipse cx="0" cy="-12" rx="18" ry="16" fill="url(#rosePink)" transform="rotate(0 0 -12)" opacity="0.95" />
                <ellipse cx="0" cy="5" rx="18" ry="14" fill="url(#rosePink)" transform="rotate(0 0 5)" opacity="0.95" />
                {/* Rose center */}
                <ellipse cx="-5" cy="0" rx="10" ry="8" fill="#FF1744" transform="rotate(-30 -5 0)" />
                <ellipse cx="5" cy="0" rx="10" ry="8" fill="#FF1744" transform="rotate(30 5 0)" />
                <ellipse cx="0" cy="-3" rx="10" ry="9" fill="#D81B60" />
                <circle cx="0" cy="0" r="6" fill="#C2185B" />
                <circle cx="0" cy="0" r="3" fill="#AD1457" />
            </g>
        </svg>
    </div>
);

export const Tulip = ({ className = "", style = {}, variant = "orange" }: { className?: string, style?: React.CSSProperties, variant?: "orange" | "purple" }) => {
    const fill = variant === "orange" ? "url(#tulipGradient)" : "url(#tulipPurple)";
    const highlight = variant === "orange" ? "#FFB74D" : "#BA68C8";
    
    return (
        <div className={`relative ${className}`} style={style}>
            <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible">
                <g transform="translate(50, 150) scale(0.6)">
                    <path d="M 0 120 Q -3 80, 0 40 Q 1 15, 0 0" stroke="url(#stemGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M -15 80 Q -35 85, -40 100 Q -35 115, -20 110 Q -15 95, -15 80" fill="url(#leafGradient)" opacity="0.9" />
                    <path d="M -15 80 L -25 95" stroke="#2E7D32" strokeWidth="0.8" />
                    <path d="M 12 60 Q 30 62, 38 75 Q 35 90, 18 88 Q 12 75, 12 60" fill="url(#leafGradient)" opacity="0.9" />
                    <path d="M 12 60 L 22 72" stroke="#2E7D32" strokeWidth="0.8" />
                    {/* Petals */}
                    <ellipse cx="-15" cy="-10" rx="12" ry="35" fill={fill} transform="rotate(-15 -15 -10)" filter="url(#shadow)" />
                    <ellipse cx="15" cy="-10" rx="12" ry="35" fill={fill} transform="rotate(15 15 -10)" filter="url(#shadow)" />
                    <ellipse cx="0" cy="-15" rx="14" ry="38" fill={fill} filter="url(#shadow)" />
                    {/* Highlights */}
                    <ellipse cx="-15" cy="-15" rx="5" ry="15" fill={highlight} opacity="0.6" transform="rotate(-15 -15 -15)" />
                    <ellipse cx="15" cy="-15" rx="5" ry="15" fill={highlight} opacity="0.6" transform="rotate(15 15 -15)" />
                    <ellipse cx="0" cy="-20" rx="6" ry="18" fill={highlight} opacity="0.6" />
                    <line x1="0" y1="-30" x2="0" y2="-40" stroke="#795548" strokeWidth="1.5" />
                    <circle cx="0" cy="-41" r="2.5" fill="#4E342E" />
                </g>
            </svg>
        </div>
    );
};

export const Daisy = ({ className = "", style = {} }: { className?: string, style?: React.CSSProperties }) => (
    <div className={`relative ${className}`} style={style}>
        <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible">
            <g transform="translate(50, 150) scale(0.6)">
                <path d="M 0 100 Q 2 65, 0 30 Q -1 10, 0 0" stroke="url(#stemGradient)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <ellipse cx="-18" cy="70" rx="15" ry="9" fill="url(#leafGradient)" transform="rotate(-25 -18 70)" opacity="0.9" />
                <path d="M -18 70 L -10 73" stroke="#2E7D32" strokeWidth="0.8" />
                <ellipse cx="15" cy="50" rx="14" ry="8" fill="url(#leafGradient)" transform="rotate(20 15 50)" opacity="0.9" />
                <path d="M 15 50 L 9 52" stroke="#2E7D32" strokeWidth="0.8" />
                <g filter="url(#glow)">
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
                        <ellipse key={angle} cx="0" cy="-25" rx="8" ry="18" fill="#FFF" stroke="#F5F5F5" strokeWidth="0.5" transform={`rotate(${angle} 0 0)`} />
                    ))}
                </g>
                <circle cx="0" cy="0" r="12" fill="url(#daisyCenter)" filter="url(#shadow)" />
                <circle cx="0" cy="0" r="10" fill="#FFD54F" />
            </g>
        </svg>
    </div>
);

export default FlowerDefs;
