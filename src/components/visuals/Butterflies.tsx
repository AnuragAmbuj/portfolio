"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Butterflies() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const butterflies = gsap.utils.toArray<HTMLElement>(".butterfly");

      butterflies.forEach((bf) => {
        // Initial random position
        gsap.set(bf, {
          x: gsap.utils.random(0, window.innerWidth),
          y: gsap.utils.random(0, window.innerHeight),
          scale: gsap.utils.random(0.2, 0.5),
          rotation: gsap.utils.random(-15, 15),
        });

        // Wandering motion
        const wander = () => {
          gsap.to(bf, {
            x: `+=${gsap.utils.random(-200, 200)}`,
            y: `+=${gsap.utils.random(-100, 100)}`,
            rotation: gsap.utils.random(-30, 30),
            duration: gsap.utils.random(3, 8),
            ease: "sine.inOut",
            onComplete: wander,
          });
        };

        // Flutter effect (fast scaling/opacity changes)
        gsap.to(bf, {
            scaleX: 0.2, // Wing flap simulation
            yoyo: true,
            repeat: -1,
            duration: 0.15,
            ease: "power1.inOut"
        });

        wander();
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="butterfly absolute text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]"
          style={{ width: "40px", height: "40px" }}
        >
          {/* Detailed Butterfly SVG */}
          <svg viewBox="0 0 600 500" className="w-full h-full opacity-100 drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">
            <defs>
                {/* Neon Gradient 1: Neon Yellow to Electric Lime */}
                <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#FFFF00", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#CCFF00", stopOpacity: 1 }} />
                </linearGradient>

                {/* Neon Gradient 2: Yellow to Cyan (High Voltage) */}
                <linearGradient id="neonGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "#FFFF33", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#00F3FF", stopOpacity: 1 }} />
                </linearGradient>

                {/* Intense Glow Filter */}
                <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            {/* Left Upper Wing - Cyan/Purple */}
            <path d="M 300 260 Q 250 240, 210 220 Q 160 190, 130 170 Q 90 140, 70 130 Q 50 125, 40 135 Q 30 150, 45 175 Q 65 210, 95 235 Q 130 260, 170 275 Q 210 285, 250 285 Q 280 280, 300 270 Z" 
                fill="url(#neonGradient1)" stroke="#FFFFFF" strokeWidth="2" filter="url(#neonGlow)" opacity="0.9" />
            
            <path d="M 180 240 Q 160 230, 140 215 Q 120 195, 105 180 Q 95 175, 90 180 Q 88 190, 95 200 Q 110 215, 130 225 Q 150 235, 170 242 Z" 
                fill="#FF00FF" opacity="0.8" />

            {/* Right Upper Wing - Cyan/Purple */}
            <path d="M 300 260 Q 350 240, 390 220 Q 440 190, 470 170 Q 510 140, 530 130 Q 550 125, 560 135 Q 570 150, 555 175 Q 535 210, 505 235 Q 470 260, 430 275 Q 390 285, 350 285 Q 320 280, 300 270 Z" 
                fill="url(#neonGradient1)" stroke="#FFFFFF" strokeWidth="2" filter="url(#neonGlow)" opacity="0.9" />

            <path d="M 420 240 Q 440 230, 460 215 Q 480 195, 495 180 Q 505 175, 510 180 Q 512 190, 505 200 Q 490 215, 470 225 Q 450 235, 430 242 Z" 
                fill="#FF00FF" opacity="0.8" />
            
            {/* Left Lower Wing - Pink/Green */}
            <path d="M 300 280 Q 270 300, 245 325 Q 220 355, 210 385 Q 205 410, 215 430 Q 230 445, 255 445 Q 280 440, 300 420 Q 315 395, 320 365 Q 320 335, 310 310 Z" 
                fill="url(#neonGradient2)" stroke="#FFFFFF" strokeWidth="2" filter="url(#neonGlow)" opacity="0.9" />
            
            {/* Right Lower Wing - Pink/Green */}
            <path d="M 300 280 Q 330 300, 355 325 Q 380 355, 390 385 Q 395 410, 385 430 Q 370 445, 345 445 Q 320 440, 300 420 Q 285 395, 280 365 Q 280 335, 290 310 Z" 
                fill="url(#neonGradient2)" stroke="#FFFFFF" strokeWidth="2" filter="url(#neonGlow)" opacity="0.9" />
            
            {/* Body - Deep Dark */}
            <ellipse cx="300" cy="235" rx="10" ry="12" fill="#111"/>
            <ellipse cx="300" cy="250" rx="12" ry="14" fill="#222"/>
            <ellipse cx="300" cy="263" rx="11" ry="12" fill="#222"/>
            <ellipse cx="300" cy="275" rx="10" ry="11" fill="#222"/>
            <ellipse cx="300" cy="287" rx="9" ry="10" fill="#111"/>
            <ellipse cx="300" cy="319" rx="7.5" ry="8.5" fill="#111"/>
            <ellipse cx="300" cy="346" rx="5" ry="6" fill="#111"/>
            
            {/* Shimmer Overlay */}
            <path d="M 300 260 Q 250 240, 210 220 Q 160 190, 130 170 Q 90 140, 70 130 Q 50 125, 40 135 Q 30 150, 45 175 Q 65 210, 95 235 Q 130 260, 170 275 Q 210 285, 250 285 Q 280 280, 300 270 Z" fill="url(#shimmer)" opacity="0.5"/>
            <path d="M 300 260 Q 350 240, 390 220 Q 440 190, 470 170 Q 510 140, 530 130 Q 550 125, 560 135 Q 570 150, 555 175 Q 535 210, 505 235 Q 470 260, 430 275 Q 390 285, 350 285 Q 320 280, 300 270 Z" fill="url(#shimmer)" opacity="0.5"/>
          </svg>
        </div>
      ))}
    </div>
  );
}
