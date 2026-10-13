import React, { useState } from 'react';
import { ArrowRight, Sparkles, Feather, ShieldCheck, Cpu } from 'lucide-react';
import { PerspectiveCard } from './3d/PerspectiveCard';

interface AboutSectionProps {
  onExploreCollections: () => void;
  onOpenWhatsApp: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreCollections,
  onOpenWhatsApp,
}) => {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-[#0D0A10] via-[#160E18] to-[#0D0A10] relative overflow-hidden">
      {/* Background Cyber Geometry */}
      <div className="absolute -left-12 bottom-4 w-72 h-72 opacity-20 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="none" stroke="#B96A73" strokeWidth="1.5">
          <circle cx="100" cy="100" r="80" strokeDasharray="10 15" />
          <circle cx="100" cy="100" r="50" />
          <path d="M20 100 L 180 100" />
          <path d="M100 20 L 100 180" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Arched 3D Portal with Floating Cyber Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <PerspectiveCard
              maxTilt={12}
              glareOpacity={0.35}
              className="w-full max-w-[380px] sm:max-w-[420px]"
            >
              <div className="relative rounded-t-[190px] rounded-b-3xl p-3 bg-[#1A1220]/80 backdrop-blur-xl border border-[#B96A73]/30 shadow-[0_25px_60px_rgba(10,5,12,0.8),0_0_25px_rgba(115,30,27,0.2)] preserve-3d">
                {/* Arched image container */}
                <div className="relative rounded-t-[180px] rounded-b-2xl overflow-hidden aspect-[3/4] shadow-2xl border border-white/10 group">
                  <img
                    src="/src/assets/images/about_boteq_model_1791899602823.jpg"
                    alt="BOTEQ Heritage Silk & Organza Saree"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A10]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Artisan Badge in Z-Space */}
                <div
                  className="absolute -bottom-4 right-2 sm:-bottom-5 sm:right-4 glass-panel-futuristic px-4 py-2.5 rounded-2xl border border-[#B96A73]/40 shadow-xl flex items-center gap-2.5 transition-transform duration-300"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  <Cpu className="w-4 h-4 text-[#EBB8C0]" />
                  <span className="text-xs font-sans font-bold text-white">
                    Synthesized Heritage
                  </span>
                </div>
              </div>
            </PerspectiveCard>
          </div>

          {/* Right Column: Narrative Content & Glass Slabs */}
          <div className="lg:col-span-7 space-y-7">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C1220] border border-[#B96A73]/30 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#EBB8C0] animate-ping" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#EBB8C0] font-mono">
                  THE BOTEQ ATELIER
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white leading-[1.12]">
                Elegance That Transcends Generations
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#E8DDD5] leading-relaxed font-light">
              BOTEQ pioneers the fusion of Indian textile heritage with futuristic AI design methodologies. From generational master handloom artisans to algorithmic silhouette optimization, we curate attire for visionary celebrations.
            </p>

            <p className="text-xs sm:text-sm text-[#9E9CA8] leading-relaxed">
              Every Banarasi zari thread, Kanchipuram silk motif, and maggam needlepoint is calibrated for supreme drape fluidity, structural lightness, and regal aesthetic sovereignty.
            </p>

            {/* "Discover Our Story ->" Button with Rose & Wine Palette */}
            <div>
              <button
                onClick={() => setShowStoryModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#EBB8C0] text-[#EBB8C0] hover:bg-gradient-to-r hover:from-[#731E1B] hover:to-[#B96A73] hover:text-white transition-all text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(185,106,115,0.25)] hover:shadow-[0_0_25px_rgba(235,184,192,0.5)] active:scale-98 cursor-pointer"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Luxury 3D Glass Trust Slabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl glass-panel-card border border-[#B96A73]/20 shadow-xs hover:border-[#EBB8C0] transition-all">
                <div className="w-9 h-9 rounded-full bg-[#0D0A10] border border-[#B96A73]/35 flex items-center justify-center text-[#EBB8C0] shrink-0 shadow-inner">
                  <Feather className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Purest Silks</h4>
                  <p className="text-[10px] text-[#9E9CA8]">Hand-spun Mulberry & Kora</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl glass-panel-card border border-[#B96A73]/20 shadow-xs hover:border-[#EBB8C0] transition-all">
                <div className="w-9 h-9 rounded-full bg-[#0D0A10] border border-[#B96A73]/35 flex items-center justify-center text-[#EBB8C0] shrink-0 shadow-inner">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Handcrafted Zari</h4>
                  <p className="text-[10px] text-[#9E9CA8]">Master Maggam Artistry</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl glass-panel-card border border-[#B96A73]/20 shadow-xs hover:border-[#EBB8C0] transition-all">
                <div className="w-9 h-9 rounded-full bg-[#0D0A10] border border-[#B96A73]/35 flex items-center justify-center text-[#EBB8C0] shrink-0 shadow-inner">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Silk Mark Certified</h4>
                  <p className="text-[10px] text-[#9E9CA8]">100% Authentic Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="bg-[#140D18] text-[#FAF6F0] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(115,30,27,0.4)] border border-[#B96A73]/35 relative">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 p-2 text-[#9E9CA8] hover:text-white rounded-full hover:bg-[#201426]"
            >
              ✕
            </button>
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#EBB8C0]">
                OUR HERITAGE & INNOVATION
              </span>
              <h3 className="text-2xl font-bold font-sans text-white">The Genesis of BOTEQ</h3>
              <p className="text-sm text-[#E8DDD5] leading-relaxed">
                Founded with a deep reverence for South Asian textile heritage, BOTEQ was born from a singular conviction: that the sacred intimacy of generational handloom weaving can harmonize with vanguard digital precision.
              </p>
              <p className="text-sm text-[#E8DDD5] leading-relaxed">
                Our design collective collaborates directly with master weavers across Varanasi, Kanchipuram, and Telangana, fusing ancient dori embroidery and real gold zari with predictive drape models to create garments of transcendent grace.
              </p>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowStoryModal(false);
                    onExploreCollections();
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] text-white text-xs font-semibold"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
