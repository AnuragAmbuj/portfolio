"use client";

import React from "react";

export default function Flowers() {
  return (
    <div className="absolute bottom-0 w-full h-full pointer-events-none opacity-90">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        className="w-full h-full object-cover object-bottom"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* Gradients for roses */}
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

          {/* Gradients for tulips */}
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

          {/* Gradients for daisies */}
          <radialGradient id="daisyYellow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "#FFF9C4", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#FFF59D", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#FFF176", stopOpacity: 1 }} />
          </radialGradient>

          <radialGradient id="daisyCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "#FFD54F", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#FFA000", stopOpacity: 1 }} />
          </radialGradient>

          {/* Leaf gradient */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#66BB6A", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#4CAF50", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#388E3C", stopOpacity: 1 }} />
          </linearGradient>

          {/* Stem gradient */}
          <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#558B2F", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#689F38", stopOpacity: 1 }} />
          </linearGradient>

          {/* Shadow filter */}
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

          {/* Soft glow */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Removed Background Rect to allow transparency */}

        {/* ROSE 1 (Left) */}
        <g transform="translate(150, 200)">
          {/* Stem */}
          <path
            d="M 0 150 Q -5 100, 0 50 Q 2 20, 0 0"
            stroke="url(#stemGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <ellipse
            cx="-25"
            cy="100"
            rx="20"
            ry="12"
            fill="url(#leafGradient)"
            transform="rotate(-30 -25 100)"
            opacity="0.9"
          />
          <path d="M -25 100 L -15 105" stroke="#2E7D32" strokeWidth="1" />

          <ellipse
            cx="20"
            cy="70"
            rx="18"
            ry="11"
            fill="url(#leafGradient)"
            transform="rotate(25 20 70)"
            opacity="0.9"
          />
          <path d="M 20 70 L 12 73" stroke="#2E7D32" strokeWidth="1" />

          {/* Rose outer petals */}
          <ellipse
            cx="-15"
            cy="-10"
            rx="25"
            ry="20"
            fill="url(#roseGradient)"
            transform="rotate(-30 -15 -10)"
            filter="url(#shadow)"
            opacity="0.9"
          />
          <ellipse
            cx="15"
            cy="-10"
            rx="25"
            ry="20"
            fill="url(#roseGradient)"
            transform="rotate(30 15 -10)"
            filter="url(#shadow)"
            opacity="0.9"
          />
          <ellipse
            cx="0"
            cy="-25"
            rx="25"
            ry="22"
            fill="url(#roseGradient)"
            transform="rotate(0 0 -25)"
            filter="url(#shadow)"
            opacity="0.9"
          />
          <ellipse
            cx="-20"
            cy="5"
            rx="23"
            ry="18"
            fill="url(#roseGradient)"
            transform="rotate(-60 -20 5)"
            filter="url(#shadow)"
            opacity="0.9"
          />
          <ellipse
            cx="20"
            cy="5"
            rx="23"
            ry="18"
            fill="url(#roseGradient)"
            transform="rotate(60 20 5)"
            filter="url(#shadow)"
            opacity="0.9"
          />

          {/* Rose middle petals */}
          <ellipse
            cx="-8"
            cy="-5"
            rx="18"
            ry="15"
            fill="url(#rosePink)"
            transform="rotate(-20 -8 -5)"
            opacity="0.95"
          />
          <ellipse
            cx="8"
            cy="-5"
            rx="18"
            ry="15"
            fill="url(#rosePink)"
            transform="rotate(20 8 -5)"
            opacity="0.95"
          />
          <ellipse
            cx="0"
            cy="-12"
            rx="18"
            ry="16"
            fill="url(#rosePink)"
            transform="rotate(0 0 -12)"
            opacity="0.95"
          />
          <ellipse
            cx="0"
            cy="5"
            rx="18"
            ry="14"
            fill="url(#rosePink)"
            transform="rotate(0 0 5)"
            opacity="0.95"
          />

          {/* Rose center */}
          <ellipse
            cx="-5"
            cy="0"
            rx="10"
            ry="8"
            fill="#FF1744"
            transform="rotate(-30 -5 0)"
          />
          <ellipse
            cx="5"
            cy="0"
            rx="10"
            ry="8"
            fill="#FF1744"
            transform="rotate(30 5 0)"
          />
          <ellipse cx="0" cy="-3" rx="10" ry="9" fill="#D81B60" />
          <circle cx="0" cy="0" r="6" fill="#C2185B" />
          <circle cx="0" cy="0" r="3" fill="#AD1457" />
        </g>

        {/* TULIP 1 (Center-left) */}
        <g transform="translate(300, 250)">
          {/* Stem */}
          <path
            d="M 0 120 Q -3 80, 0 40 Q 1 15, 0 0"
            stroke="url(#stemGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <path
            d="M -15 80 Q -35 85, -40 100 Q -35 115, -20 110 Q -15 95, -15 80"
            fill="url(#leafGradient)"
            opacity="0.9"
          />
          <path d="M -15 80 L -25 95" stroke="#2E7D32" strokeWidth="0.8" />

          <path
            d="M 12 60 Q 30 62, 38 75 Q 35 90, 18 88 Q 12 75, 12 60"
            fill="url(#leafGradient)"
            opacity="0.9"
          />
          <path d="M 12 60 L 22 72" stroke="#2E7D32" strokeWidth="0.8" />

          {/* Tulip petals */}
          <ellipse
            cx="-15"
            cy="-10"
            rx="12"
            ry="35"
            fill="url(#tulipGradient)"
            transform="rotate(-15 -15 -10)"
            filter="url(#shadow)"
          />
          <ellipse
            cx="15"
            cy="-10"
            rx="12"
            ry="35"
            fill="url(#tulipGradient)"
            transform="rotate(15 15 -10)"
            filter="url(#shadow)"
          />
          <ellipse
            cx="0"
            cy="-15"
            rx="14"
            ry="38"
            fill="url(#tulipGradient)"
            filter="url(#shadow)"
          />

          {/* Tulip highlights */}
          <ellipse
            cx="-15"
            cy="-15"
            rx="5"
            ry="15"
            fill="#FFB74D"
            opacity="0.6"
            transform="rotate(-15 -15 -15)"
          />
          <ellipse
            cx="15"
            cy="-15"
            rx="5"
            ry="15"
            fill="#FFB74D"
            opacity="0.6"
            transform="rotate(15 15 -15)"
          />
          <ellipse
            cx="0"
            cy="-20"
            rx="6"
            ry="18"
            fill="#FFB74D"
            opacity="0.6"
          />

          {/* Stamen */}
          <line
            x1="0"
            y1="-30"
            x2="0"
            y2="-40"
            stroke="#795548"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="-41" r="2.5" fill="#4E342E" />
        </g>

        {/* DAISY 1 (Center) */}
        <g transform="translate(450, 280)">
          {/* Stem */}
          <path
            d="M 0 100 Q 2 65, 0 30 Q -1 10, 0 0"
            stroke="url(#stemGradient)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <ellipse
            cx="-18"
            cy="70"
            rx="15"
            ry="9"
            fill="url(#leafGradient)"
            transform="rotate(-25 -18 70)"
            opacity="0.9"
          />
          <path d="M -18 70 L -10 73" stroke="#2E7D32" strokeWidth="0.8" />

          <ellipse
            cx="15"
            cy="50"
            rx="14"
            ry="8"
            fill="url(#leafGradient)"
            transform="rotate(20 15 50)"
            opacity="0.9"
          />
          <path d="M 15 50 L 9 52" stroke="#2E7D32" strokeWidth="0.8" />

          {/* Daisy petals (white) */}
          <g filter="url(#glow)">
            {[
              0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330,
            ].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-25"
                rx="8"
                ry="18"
                fill="#FFF"
                stroke="#F5F5F5"
                strokeWidth="0.5"
                transform={`rotate(${angle} 0 0)`}
              />
            ))}
          </g>

          {/* Daisy center */}
          <circle
            cx="0"
            cy="0"
            r="12"
            fill="url(#daisyCenter)"
            filter="url(#shadow)"
          />
          <circle cx="0" cy="0" r="10" fill="#FFD54F" />

          {/* Center texture */}
          <g opacity="0.4">
            <circle cx="-3" cy="-3" r="1" fill="#F57F17" />
            <circle cx="3" cy="-2" r="1" fill="#F57F17" />
            <circle cx="-2" cy="2" r="1" fill="#F57F17" />
            <circle cx="2" cy="3" r="1" fill="#F57F17" />
            <circle cx="0" cy="-4" r="0.8" fill="#F57F17" />
            <circle cx="4" cy="1" r="0.8" fill="#F57F17" />
            <circle cx="-4" cy="1" r="0.8" fill="#F57F17" />
          </g>
        </g>

        {/* TULIP 2 (Center-right) */}
        <g transform="translate(580, 240)">
          {/* Stem */}
          <path
            d="M 0 130 Q 3 85, 0 45 Q -1 18, 0 0"
            stroke="url(#stemGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <path
            d="M -18 85 Q -40 88, -48 105 Q -42 122, -25 118 Q -18 100, -18 85"
            fill="url(#leafGradient)"
            opacity="0.9"
          />
          <path d="M -18 85 L -30 100" stroke="#2E7D32" strokeWidth="0.8" />

          <path
            d="M 15 65 Q 35 68, 42 82 Q 38 98, 20 94 Q 15 80, 15 65"
            fill="url(#leafGradient)"
            opacity="0.9"
          />
          <path d="M 15 65 L 26 78" stroke="#2E7D32" strokeWidth="0.8" />

          {/* Tulip petals (purple) */}
          <ellipse
            cx="-16"
            cy="-12"
            rx="13"
            ry="38"
            fill="url(#tulipPurple)"
            transform="rotate(-18 -16 -12)"
            filter="url(#shadow)"
          />
          <ellipse
            cx="16"
            cy="-12"
            rx="13"
            ry="38"
            fill="url(#tulipPurple)"
            transform="rotate(18 16 -12)"
            filter="url(#shadow)"
          />
          <ellipse
            cx="0"
            cy="-18"
            rx="15"
            ry="42"
            fill="url(#tulipPurple)"
            filter="url(#shadow)"
          />

          {/* Tulip highlights */}
          <ellipse
            cx="-16"
            cy="-18"
            rx="6"
            ry="18"
            fill="#BA68C8"
            opacity="0.5"
            transform="rotate(-18 -16 -18)"
          />
          <ellipse
            cx="16"
            cy="-18"
            rx="6"
            ry="18"
            fill="#BA68C8"
            opacity="0.5"
            transform="rotate(18 16 -18)"
          />
          <ellipse
            cx="0"
            cy="-24"
            rx="7"
            ry="20"
            fill="#BA68C8"
            opacity="0.5"
          />

          {/* Stamen */}
          <line
            x1="0"
            y1="-35"
            x2="0"
            y2="-45"
            stroke="#795548"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="-46" r="2.5" fill="#4E342E" />
        </g>

        {/* ROSE 2 (Right) */}
        <g transform="translate(680, 220)">
          {/* Stem */}
          <path
            d="M 0 140 Q 5 95, 0 52 Q -2 22, 0 0"
            stroke="url(#stemGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <ellipse
            cx="25"
            cy="95"
            rx="20"
            ry="12"
            fill="url(#leafGradient)"
            transform="rotate(30 25 95)"
            opacity="0.9"
          />
          <path d="M 25 95 L 15 100" stroke="#2E7D32" strokeWidth="1" />

          <ellipse
            cx="-22"
            cy="68"
            rx="18"
            ry="11"
            fill="url(#leafGradient)"
            transform="rotate(-28 -22 68)"
            opacity="0.9"
          />
          <path d="M -22 68 L -13 71" stroke="#2E7D32" strokeWidth="1" />

          {/* Rose outer petals (pink) */}
          <ellipse
            cx="-15"
            cy="-12"
            rx="26"
            ry="21"
            fill="url(#rosePink)"
            transform="rotate(-32 -15 -12)"
            filter="url(#shadow)"
            opacity="0.9"
          />
          <ellipse
            cx="15"
            cy="-12"
            rx="26"
            ry="21"
            fill="url(#rosePink)"
            transform="rotate(32 15 -12)"
            filter="url(#shadow)"
            opacity="0.9"
          />
          <ellipse
            cx="0"
            cy="-28"
            rx="26"
            ry="23"
            fill="url(#rosePink)"
            transform="rotate(0 0 -28)"
            filter="url(#shadow)"
            opacity="0.9"
          />
          <ellipse
            cx="-22"
            cy="3"
            rx="24"
            ry="19"
            fill="url(#rosePink)"
            transform="rotate(-62 -22 3)"
            filter="url(#shadow)"
            opacity="0.9"
          />
          <ellipse
            cx="22"
            cy="3"
            rx="24"
            ry="19"
            fill="url(#rosePink)"
            transform="rotate(62 22 3)"
            filter="url(#shadow)"
            opacity="0.9"
          />

          {/* Rose middle petals */}
          <ellipse
            cx="-9"
            cy="-6"
            rx="19"
            ry="16"
            fill="#F8BBD0"
            transform="rotate(-22 -9 -6)"
            opacity="0.95"
          />
          <ellipse
            cx="9"
            cy="-6"
            rx="19"
            ry="16"
            fill="#F8BBD0"
            transform="rotate(22 9 -6)"
            opacity="0.95"
          />
          <ellipse
            cx="0"
            cy="-14"
            rx="19"
            ry="17"
            fill="#F8BBD0"
            transform="rotate(0 0 -14)"
            opacity="0.95"
          />
          <ellipse
            cx="0"
            cy="4"
            rx="19"
            ry="15"
            fill="#F8BBD0"
            transform="rotate(0 0 4)"
            opacity="0.95"
          />

          {/* Rose center */}
          <ellipse
            cx="-5"
            cy="0"
            rx="11"
            ry="9"
            fill="#F48FB1"
            transform="rotate(-28 -5 0)"
          />
          <ellipse
            cx="5"
            cy="0"
            rx="11"
            ry="9"
            fill="#F48FB1"
            transform="rotate(28 5 0)"
          />
          <ellipse cx="0" cy="-4" rx="11" ry="10" fill="#EC407A" />
          <circle cx="0" cy="0" r="6" fill="#E91E63" />
          <circle cx="0" cy="0" r="3" fill="#D81B60" />
        </g>

        {/* Small accent flowers and foliage */}
        <g transform="translate(220, 400)" opacity="0.8">
          <circle cx="0" cy="0" r="8" fill="#FFF" />
          <circle cx="0" cy="0" r="4" fill="#FFD54F" />
        </g>

        <g transform="translate(380, 420)" opacity="0.8">
          <circle cx="0" cy="0" r="7" fill="#FFF" />
          <circle cx="0" cy="0" r="3.5" fill="#FFA000" />
        </g>

        <g transform="translate(520, 410)" opacity="0.8">
          <circle cx="0" cy="0" r="8" fill="#F8BBD0" />
          <circle cx="0" cy="0" r="3" fill="#E91E63" />
        </g>

        {/* Additional leaves for ground cover */}
        <ellipse
          cx="180"
          cy="480"
          rx="30"
          ry="18"
          fill="url(#leafGradient)"
          transform="rotate(-15 180 480)"
          opacity="0.7"
        />
        <ellipse
          cx="350"
          cy="500"
          rx="35"
          ry="20"
          fill="url(#leafGradient)"
          transform="rotate(10 350 500)"
          opacity="0.7"
        />
        <ellipse
          cx="520"
          cy="490"
          rx="32"
          ry="19"
          fill="url(#leafGradient)"
          transform="rotate(-8 520 490)"
          opacity="0.7"
        />
        <ellipse
          cx="650"
          cy="510"
          rx="28"
          ry="16"
          fill="url(#leafGradient)"
          transform="rotate(20 650 510)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
