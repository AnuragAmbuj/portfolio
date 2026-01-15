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
          <svg viewBox="0 0 600 500" className="w-full h-full opacity-90 drop-shadow-[0_0_15px_rgba(235,100,220,0.6)]">
            <defs>
                <radialGradient id="mainGradient" cx="40%" cy="50%" r="60%">
                <stop offset="0%" style={{ stopColor: "#FF1493", stopOpacity: 1 }} />
                <stop offset="30%" style={{ stopColor: "#FF69B4", stopOpacity: 1 }} />
                <stop offset="60%" style={{ stopColor: "#DDA0DD", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#BA55D3", stopOpacity: 1 }} />
                </radialGradient>
                <radialGradient id="mainGradientRight" cx="60%" cy="50%" r="60%">
                <stop offset="0%" style={{ stopColor: "#FF1493", stopOpacity: 1 }} />
                <stop offset="30%" style={{ stopColor: "#FF69B4", stopOpacity: 1 }} />
                <stop offset="60%" style={{ stopColor: "#DDA0DD", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#BA55D3", stopOpacity: 1 }} />
                </radialGradient>
                <radialGradient id="accentGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#FFA500", stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: "#FF8C00", stopOpacity: 0.6 }} />
                </radialGradient>
                <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#FFF", stopOpacity: 0.4 }} />
                <stop offset="50%" style={{ stopColor: "#FFF", stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: "#FFF", stopOpacity: 0.3 }} />
                </linearGradient>
                <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
                </filter>
            </defs>
            
            {/* Left Upper Wing */}
            <path d="M 300 260 Q 250 240, 210 220 Q 160 190, 130 170 Q 90 140, 70 130 Q 50 125, 40 135 Q 30 150, 45 175 Q 65 210, 95 235 Q 130 260, 170 275 Q 210 285, 250 285 Q 280 280, 300 270 Z" fill="url(#mainGradient)" stroke="#6B46C1" strokeWidth="3" filter="url(#glow)"/>
            <path d="M 180 240 Q 160 230, 140 215 Q 120 195, 105 180 Q 95 175, 90 180 Q 88 190, 95 200 Q 110 215, 130 225 Q 150 235, 170 242 Z" fill="url(#accentGradient)" opacity="0.7" stroke="#9370DB" strokeWidth="1.5"/>
            <path d="M 210 255 Q 180 245, 155 230 Q 130 210, 115 195 Q 105 190, 100 195 Q 98 205, 110 220 Q 130 240, 160 255 Q 190 265, 220 268 Z" fill="#FFF" opacity="0.5" stroke="#9370DB" strokeWidth="1.5"/>
            <path d="M 250 270 Q 210 260, 175 245 Q 145 225, 130 210 Q 120 205, 118 212 Q 120 225, 140 242 Q 170 260, 210 272 Q 240 278, 265 278 Z" fill="url(#accentGradient)" opacity="0.6" stroke="#9370DB" strokeWidth="1.5"/>
            
            {/* Right Upper Wing */}
            <path d="M 300 260 Q 350 240, 390 220 Q 440 190, 470 170 Q 510 140, 530 130 Q 550 125, 560 135 Q 570 150, 555 175 Q 535 210, 505 235 Q 470 260, 430 275 Q 390 285, 350 285 Q 320 280, 300 270 Z" fill="url(#mainGradientRight)" stroke="#6B46C1" strokeWidth="3" filter="url(#glow)"/>
            <path d="M 420 240 Q 440 230, 460 215 Q 480 195, 495 180 Q 505 175, 510 180 Q 512 190, 505 200 Q 490 215, 470 225 Q 450 235, 430 242 Z" fill="url(#accentGradient)" opacity="0.7" stroke="#9370DB" strokeWidth="1.5"/>
            <path d="M 390 255 Q 420 245, 445 230 Q 470 210, 485 195 Q 495 190, 500 195 Q 502 205, 490 220 Q 470 240, 440 255 Q 410 265, 380 268 Z" fill="#FFF" opacity="0.5" stroke="#9370DB" strokeWidth="1.5"/>
            <path d="M 350 270 Q 390 260, 425 245 Q 455 225, 470 210 Q 480 205, 482 212 Q 480 225, 460 242 Q 430 260, 390 272 Q 360 278, 335 278 Z" fill="url(#accentGradient)" opacity="0.6" stroke="#9370DB" strokeWidth="1.5"/>
            
            {/* Left Lower Wing */}
            <path d="M 300 280 Q 270 300, 245 325 Q 220 355, 210 385 Q 205 410, 215 430 Q 230 445, 255 445 Q 280 440, 300 420 Q 315 395, 320 365 Q 320 335, 310 310 Z" fill="url(#mainGradient)" stroke="#6B46C1" strokeWidth="3" filter="url(#glow)"/>
            
            {/* Right Lower Wing */}
            <path d="M 300 280 Q 330 300, 355 325 Q 380 355, 390 385 Q 395 410, 385 430 Q 370 445, 345 445 Q 320 440, 300 420 Q 285 395, 280 365 Q 280 335, 290 310 Z" fill="url(#mainGradientRight)" stroke="#6B46C1" strokeWidth="3" filter="url(#glow)"/>
            
            {/* Body */}
            <ellipse cx="300" cy="235" rx="10" ry="12" fill="#2C3E50"/>
            <ellipse cx="300" cy="250" rx="12" ry="14" fill="#34495E"/>
            <ellipse cx="300" cy="263" rx="11" ry="12" fill="#34495E"/>
            <ellipse cx="300" cy="275" rx="10" ry="11" fill="#34495E"/>
            <ellipse cx="300" cy="287" rx="9" ry="10" fill="#2C3E50"/>
            <ellipse cx="300" cy="319" rx="7.5" ry="8.5" fill="#2C3E50"/>
            <ellipse cx="300" cy="346" rx="5" ry="6" fill="#2C3E50"/>
            
            {/* Shimmer Overlay */}
            <path d="M 300 260 Q 250 240, 210 220 Q 160 190, 130 170 Q 90 140, 70 130 Q 50 125, 40 135 Q 30 150, 45 175 Q 65 210, 95 235 Q 130 260, 170 275 Q 210 285, 250 285 Q 280 280, 300 270 Z" fill="url(#shimmer)" opacity="0.5"/>
            <path d="M 300 260 Q 350 240, 390 220 Q 440 190, 470 170 Q 510 140, 530 130 Q 550 125, 560 135 Q 570 150, 555 175 Q 535 210, 505 235 Q 470 260, 430 275 Q 390 285, 350 285 Q 320 280, 300 270 Z" fill="url(#shimmer)" opacity="0.5"/>
          </svg>
        </div>
      ))}
    </div>
  );
}
