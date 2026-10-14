import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, Layers } from 'lucide-react';
import { SilkCanvas3D } from './3d/SilkCanvas3D';
import { PerspectiveCard } from './3d/PerspectiveCard';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenWhatsApp: () => void;
  onOpen3DInspect: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onOpenWhatsApp,
  onOpen3DInspect,
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-b from-[#0D0A10] via-[#160E18] to-[#0D0A10] py-12 sm:py-16 lg:py-20">
      {/* 1. Interactive Three.js 3D Undulating Cyber Silk Canvas in Royal Wine & Rose Gold */}
      <SilkCanvas3D interactive={true} />

      {/* Cyber Ambient Radial Blooms with Imperial Wine & Rose Tones */}
      <div className="absolute top-1/4 right-1/6 w-[500px] h-[500px] bg-[#731E1B]/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#B96A73]/20 rounded-full blur-[110px] pointer-events-none" />

      {/* Futuristic Background Coordinate Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(235,184,192,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(235,184,192,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Asymmetrical Futuristic Typography & AI Narrative Panel */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
            {/* Eyebrow Label with Dusty Rose Pulse */}
            <div className="inline-flex items-center gap-2.5 w-fit px-4 py-1.5 rounded-full bg-[#1C1220]/80 backdrop-blur-md border border-[#B96A73]/35 shadow-[0_0_15px_rgba(185,106,115,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#EBB8C0] animate-ping" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#EBB8C0] font-mono">
                AI-SYNTHESIZED HAUTE COUTURE
              </span>
              <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-[#EBB8C0] to-transparent" />
            </div>

            {/* Oversized Architectural Typography */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl text-[#FAF6F0] font-normal tracking-tight leading-[1.08] font-sans">
                Elegance Reimagined
              </h1>
              <h2 className="rose-text-gradient text-4xl sm:text-6xl xl:text-7xl font-serif-luxury italic leading-[1.12]">
                for the Quantum Era
              </h2>
            </div>

            {/* Futuristic Glass Narrative Panel */}
            <div className="glass-panel-futuristic p-5 sm:p-6 rounded-3xl max-w-xl relative overflow-hidden border border-[#B96A73]/25">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#731E1B]/20 rounded-full blur-2xl pointer-events-none" />
              <p className="text-sm sm:text-base text-[#E8DDD5] leading-relaxed font-light">
                Discover the fusion of timeless Indian handloom artistry and next-generation AI textile engineering. From algorithm-optimized Banarasi drapes to precision-cut royal bridal lehengas, each creation is tailored to sovereign perfection.
              </p>

              {/* High-Tech Telemetry Strip */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 mt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EBB8C0]" />
                  <span className="text-[#9E9CA8] text-[11px]">Neural Weave:</span>
                  <span className="font-semibold text-[#FAF6F0]">Banarasi Rose Zari</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B96A73]" />
                  <span className="text-[#9E9CA8] text-[11px]">Precision:</span>
                  <span className="font-semibold text-[#EBB8C0]">99.8% Drape Accuracy</span>
                </div>
              </div>
            </div>

            {/* Action Buttons with Imperial Wine & Dusty Rose Gradient */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
              <button
                onClick={onExplore}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] hover:from-[#5C1614] hover:via-[#A25861] hover:to-[#D89EA7] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_25px_rgba(185,106,115,0.45)] hover:shadow-[0_0_35px_rgba(235,184,192,0.7)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2.5 bg-[#1C1220]/80 hover:bg-[#251829] text-[#FAF6F0] border border-[#B96A73]/40 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-[0_0_20px_rgba(185,106,115,0.3)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                </div>
                <span>Enquire on WhatsApp</span>
              </button>

              <button
                onClick={onOpen3DInspect}
                className="inline-flex items-center gap-2 bg-[#140D18] hover:bg-[#221528] text-[#EBB8C0] border border-[#B96A73]/50 px-4 py-3.5 rounded-full text-xs font-medium shadow-xs transition-all duration-300 hover:shadow-[0_0_15px_rgba(235,184,192,0.4)] cursor-pointer"
                title="Launch 3D Hologram Drape Studio"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#EBB8C0]" />
                <span className="hidden sm:inline">3D Hologram Studio</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Perspective Floating Cyber Saree Showcase */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center relative">
            <PerspectiveCard
              maxTilt={12}
              glareOpacity={0.4}
              className="w-full max-w-[480px]"
            >
              {/* Outer Cybernetic Floating Frame */}
              <div className="relative rounded-3xl p-3 sm:p-4 bg-[#1B1221]/85 backdrop-blur-xl border border-[#B96A73]/30 shadow-[0_20px_60px_rgba(10,5,12,0.85),0_0_30px_rgba(115,30,27,0.25)] preserve-3d">
                {/* Photographic High-Res Canvas */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/12] shadow-2xl border border-white/10 group">
                  <img
                    src="/images/hero_indian_saree_model_1791899599685.jpg"
                    alt="BOTEQ Signature Handloom Saree"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Cinematic Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A10]/80 via-transparent to-transparent pointer-events-none" />

                  {/* 3D Inspect Trigger button inside image */}
                  <button
                    onClick={onOpen3DInspect}
                    className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-[#0D0A10]/85 hover:bg-[#731E1B] text-white text-xs backdrop-blur-md border border-[#B96A73]/40 flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(185,106,115,0.4)] active:scale-95 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#EBB8C0]" />
                    <span>3D Hologram View</span>
                  </button>
                </div>

                {/* Layer 2: "Wear your story ✦" Cyber Badge floating in Z-space */}
                <div
                  className="absolute -top-5 -right-3 sm:-top-7 sm:-right-5 glass-panel-futuristic px-5 py-2.5 rounded-2xl border border-[#B96A73]/40 shadow-xl rotate-3 select-none pointer-events-none transition-transform duration-300"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  <span className="font-editorial italic text-2xl sm:text-3xl text-white font-medium leading-none flex items-center gap-1.5">
                    Wear your story <span className="text-base text-[#EBB8C0]">✦</span>
                  </span>
                </div>

                {/* Layer 3: AI Zari Telemetry Badge floating in Z-space */}
                <div
                  className="absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-5 glass-panel-futuristic px-4 py-3 rounded-2xl border border-[#B96A73]/40 shadow-xl flex items-center gap-3 transition-transform duration-300"
                  style={{ transform: 'translateZ(55px)' }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#EBB8C0] ring-4 ring-[#731E1B]/40 animate-pulse" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9E9CA8] font-mono font-semibold leading-none">
                      AI Neural Weave
                    </p>
                    <p className="text-xs font-sans font-semibold text-white mt-0.5">
                      Banarasi Silk Edition
                    </p>
                  </div>
                </div>
              </div>
            </PerspectiveCard>
          </div>
        </div>
      </div>
    </section>
  );
};
