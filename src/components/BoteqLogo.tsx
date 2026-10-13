import React from 'react';

interface BoteqLogoProps {
  variant?: 'header' | 'footer' | 'symbol-only';
  className?: string;
  onClick?: () => void;
}

export const BoteqLogo: React.FC<BoteqLogoProps> = ({
  variant = 'header',
  className = '',
  onClick,
}) => {
  // Custom Futuristic B/Q Fusion Monogram with Imperial Wine, Dusty Rose, and Ivory Silk Accents
  const BQSymbol = () => {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 overflow-visible transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(235,184,192,0.7)]"
        aria-label="BOTEQ B/Q Monogram"
      >
        <defs>
          <linearGradient id="boteqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#E8DDD5" />
            <stop offset="70%" stopColor="#EBB8C0" />
            <stop offset="100%" stopColor="#B96A73" />
          </linearGradient>

          <linearGradient id="wineRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EBB8C0" />
            <stop offset="50%" stopColor="#B96A73" />
            <stop offset="100%" stopColor="#731E1B" />
          </linearGradient>

          <filter id="roseGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#B96A73" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Outer Circular Quantum Orbital Ring (forming the Q perimeter) */}
        <circle
          cx="33"
          cy="34"
          r="23"
          stroke="url(#boteqGrad)"
          strokeWidth="2.2"
          strokeDasharray="140 10"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Inner Futuristic Cyber Conduit Accent */}
        <circle
          cx="33"
          cy="34"
          r="19"
          stroke="#EBB8C0"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.6"
        />

        {/* Stem of the "B" in Ivory Silk */}
        <rect
          x="19"
          y="15"
          width="4.5"
          height="35"
          rx="2.25"
          fill="#FAF6F0"
          filter="url(#roseGlow)"
        />

        {/* Top Loop of the "B" */}
        <path
          d="M 23 16 L 33 16 C 39 16, 42 20, 42 24.5 C 42 29, 38 32.5, 32 32.5 L 23 32.5"
          stroke="#FAF6F0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom Loop of the "B" fusing into the "Q" ring with Rose-Wine Gradient */}
        <path
          d="M 23 32.5 L 34 32.5 C 42 32.5, 46 37, 46 41.5 C 46 46.5, 41 50, 33 50 L 23 50"
          stroke="url(#wineRoseGrad)"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#roseGlow)"
        />

        {/* The Dynamic Diagonal Vector Tail of the "Q" cutting down-right */}
        <path
          d="M 36 39 L 51 53"
          stroke="#EBB8C0"
          strokeWidth="4.5"
          strokeLinecap="round"
          filter="url(#roseGlow)"
        />

        {/* High-tech Quantum Core Nodes */}
        <circle cx="33" cy="24.5" r="1.8" fill="#EBB8C0" />
        <circle cx="34" cy="41.5" r="2.2" fill="#FAF6F0" />
      </svg>
    );
  };

  // Footer Quantum Lotus Crest
  const CyberLotusCrest = () => (
    <svg
      viewBox="0 0 70 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-9 shrink-0 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(235,184,192,0.8)]"
      aria-label="BOTEQ Quantum Crest"
    >
      <defs>
        <linearGradient id="cyberLotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#EBB8C0" />
          <stop offset="100%" stopColor="#731E1B" />
        </linearGradient>
      </defs>
      {/* Central Quantum Bud */}
      <path
        d="M 35 8 C 31 16, 30 28, 35 34 C 40 28, 39 16, 35 8 Z"
        fill="url(#cyberLotusGrad)"
      />
      {/* Inner Wing Left */}
      <path
        d="M 33 14 C 25 19, 24 28, 31 34 C 30 28, 31 22, 33 14 Z"
        fill="#EBB8C0"
        opacity="0.9"
      />
      {/* Inner Wing Right */}
      <path
        d="M 37 14 C 45 19, 46 28, 39 34 C 40 28, 39 22, 37 14 Z"
        fill="#EBB8C0"
        opacity="0.9"
      />
      {/* Outer Wings */}
      <path
        d="M 27 22 C 16 25, 16 35, 26 36 C 25 30, 27 26, 27 22 Z"
        fill="#B96A73"
        opacity="0.8"
      />
      <path
        d="M 43 22 C 54 25, 54 35, 44 36 C 45 30, 43 26, 43 22 Z"
        fill="#B96A73"
        opacity="0.8"
      />
      {/* Base Pedestal Beam */}
      <path
        d="M 20 40 C 27 38, 43 38, 50 40 C 44 42, 26 42, 20 40 Z"
        fill="#EBB8C0"
      />
      <circle cx="35" cy="44" r="1.6" fill="#FAF6F0" />
    </svg>
  );

  if (variant === 'symbol-only') {
    return <BQSymbol />;
  }

  if (variant === 'footer') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center gap-2 cursor-pointer group text-center ${className}`}
      >
        <CyberLotusCrest />
        <div className="flex flex-col items-center">
          <div className="flex items-center tracking-[0.28em] text-2xl font-bold font-sans">
            <span className="text-white group-hover:text-white transition-colors">BOTE</span>
            <span className="text-[#EBB8C0] group-hover:drop-shadow-[0_0_12px_#EBB8C0] transition-all">Q</span>
          </div>
          <span className="text-[9px] tracking-[0.32em] text-[#9E9CA8] font-mono uppercase mt-1">
            NEURAL COUTURE · HIGH CRAFT ETHNIC WEAR
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer group select-none ${className}`}
    >
      <BQSymbol />
      <div className="flex flex-col justify-center">
        <div className="flex items-center text-[1.4rem] sm:text-[1.65rem] font-bold tracking-[0.24em] font-sans leading-tight">
          <span className="text-white group-hover:text-[#FAF6F0] transition-colors">BOTE</span>
          <span className="text-[#EBB8C0] group-hover:text-[#F4DFDE] group-hover:drop-shadow-[0_0_12px_rgba(235,184,192,0.8)] transition-all">
            Q
          </span>
        </div>
        <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.28em] text-[#9E9CA8] font-mono uppercase leading-none mt-1 group-hover:text-[#EBB8C0] transition-colors">
          NEURAL COUTURE · LUXURY ATELIER
        </span>
      </div>
    </div>
  );
};
