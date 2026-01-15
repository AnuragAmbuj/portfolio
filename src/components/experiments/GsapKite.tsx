"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

export default function GsapKite() {
  const container = useRef<HTMLDivElement>(null);
  const kiteRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      if (!kiteRef.current || !pathRef.current) return;

      // Animate the kite along the path
      gsap.to(kiteRef.current, {
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
      });

      // Add some internal scaling/wobble to the kite for realism
      gsap.to(kiteRef.current, {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="w-full h-96 bg-sky-100 dark:bg-slate-900 border rounded-xl overflow-hidden relative">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* The motion path (made visible for demo purposes, can be hidden) */}
        <path
          ref={pathRef}
          d="M -50,200 C 150,50 300,350 450,150 S 700,0 850,200"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="opacity-30"
        />

        {/* The Kite Group */}
        <g ref={kiteRef} id="kite">
            {/* Thread */}
            <path d="M 0,20 L 0,100" stroke="currentColor" strokeWidth="1" className="text-slate-400" />
            
            {/* Kite Body */}
            <path d="M 0,0 L 15,20 L 0,40 L -15,20 Z" fill="#ef4444" />
            
            {/* Kite Highlight */}
            <path d="M 0,0 L 15,20 L 0,20 Z" fill="#b91c1c" className="opacity-20" />
            
            {/* Tail */}
            <path
                d="M 0,40 Q 5,50 0,60 T 0,80"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
            />
        </g>
      </svg>
      
      <div className="absolute bottom-4 left-4 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-lg text-sm text-slate-600 dark:text-slate-300">
        <p className="font-bold mb-1">GSAP MotionPath Plugin</p>
        <p>The kite follows the dotted SVG path with auto-rotation.</p>
      </div>
    </div>
  );
}
