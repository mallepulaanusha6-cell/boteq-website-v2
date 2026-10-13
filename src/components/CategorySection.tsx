import React from 'react';
import { ArrowRight, Cpu } from 'lucide-react';
import { Category, CategoryId } from '../types';
import { CATEGORIES } from '../data/products';
import { PerspectiveCard } from './3d/PerspectiveCard';

interface CategorySectionProps {
  onSelectCategory: (categoryId: CategoryId) => void;
  selectedCategory: CategoryId | 'all';
}

const CategoryIcon = ({ id }: { id: CategoryId }) => {
  switch (id) {
    case 'sarees':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#EBB8C0]">
          <path d="M6 3 L18 3 C18 9, 14 14, 18 21 L6 21 C10 14, 6 9, 6 3 Z" />
          <path d="M8 8 C11 10, 13 12, 16 12" />
          <path d="M8 14 C11 16, 13 18, 16 18" />
        </svg>
      );
    case 'kurtis':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#EBB8C0]">
          <path d="M8 3 L16 3 L19 7 L16 8 L16 21 L8 21 L8 8 L5 7 L8 3 Z" />
          <path d="M10 3 L12 7 L14 3" />
          <line x1="12" y1="7" x2="12" y2="15" />
        </svg>
      );
    case 'ethnic-wear':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#EBB8C0]">
          <path d="M9 3 L15 3 L17 7 L15 8 L18 21 L6 21 L9 8 L7 7 L9 3 Z" />
          <circle cx="12" cy="11" r="1.5" />
          <path d="M9 16 C11 15, 13 15, 15 16" />
        </svg>
      );
    case 'bridal-wear':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#EBB8C0]">
          <path d="M12 2 L19 9 L17 21 L7 21 L5 9 Z" />
          <path d="M12 6 L12 18" />
          <path d="M8 13 L16 13" />
          <circle cx="12" cy="4" r="1" />
        </svg>
      );
    case 'party-wear':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#EBB8C0]">
          <path d="M8 3 L16 3 L15 9 L20 21 L4 21 L9 9 Z" />
          <path d="M10 9 C11 11, 13 11, 14 9" />
        </svg>
      );
    case 'half-sarees':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#EBB8C0]">
          <path d="M8 4 L16 4 L14 8 L19 20 L5 20 L10 8 Z" />
          <path d="M7 14 L17 10" strokeDasharray="1 1" />
        </svg>
      );
    case 'blouses':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#EBB8C0]">
          <path d="M8 5 L16 5 L19 9 L16 11 L16 19 L8 19 L8 11 L5 9 Z" />
          <circle cx="12" cy="13" r="1.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#EBB8C0]">
          <path d="M6 3 L18 3 L16 12 L20 21 L4 21 L8 12 Z" />
        </svg>
      );
  }
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0D0A10] via-[#160E18] to-[#0D0A10] relative overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#731E1B]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#B96A73]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Cybernetic Ornament */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C1220] border border-[#B96A73]/30 shadow-[0_0_12px_rgba(185,106,115,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-[#EBB8C0]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#EBB8C0] font-mono">
              HAUTE COUTURE ATELIER
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Our Fashion Collections
          </h2>

          {/* Futuristic Rose & Wine Divider */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#B96A73]" />
            <div className="w-3 h-3 rotate-45 border border-[#B96A73] bg-[#0D0A10] flex items-center justify-center shadow-[0_0_8px_#B96A73]">
              <div className="w-1.5 h-1.5 bg-[#EBB8C0]" />
            </div>
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#B96A73]" />
          </div>
          <p className="text-xs sm:text-sm text-[#9E9CA8] max-w-md mx-auto font-light">
            Explore heritage handlooms, custom-stitched designer blouses, and royal bridal drapes.
          </p>
        </div>

        {/* 3D Floating Category Panels */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
          {CATEGORIES.slice(0, 6).map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <PerspectiveCard
                key={cat.id}
                maxTilt={14}
                glareOpacity={0.35}
                onClick={() => onSelectCategory(cat.id)}
                className="cursor-pointer group"
              >
                <div
                  className={`h-full rounded-3xl overflow-hidden glass-panel-card transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#EBB8C0] ring-2 ring-[#EBB8C0]/70 shadow-[0_0_25px_rgba(235,184,192,0.4)]'
                      : 'border-[#B96A73]/20 hover:border-[#EBB8C0]/60'
                  }`}
                >
                  {/* Category Photography (rounded top) */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#140D18]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140D18] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Count Badge */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#0D0A10]/80 backdrop-blur-md text-[9px] font-mono text-[#EBB8C0] font-semibold border border-[#B96A73]/30">
                      {cat.count} designs
                    </div>
                  </div>

                  {/* 3D Elevated Base: Icon + Title + Arrow */}
                  <div className="p-3.5 sm:p-4 bg-[#18101E]/90 backdrop-blur-md flex items-center justify-between gap-2 border-t border-white/10 transition-colors group-hover:bg-[#25182D]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* 3D Elevated Circle Icon */}
                      <div
                        className="w-8 h-8 rounded-full bg-[#0D0A10] border border-[#B96A73]/35 flex items-center justify-center shrink-0 shadow-inner group-hover:border-[#EBB8C0] group-hover:shadow-[0_0_12px_rgba(235,184,192,0.5)] group-hover:scale-110 transition-all duration-300"
                        style={{ transform: 'translateZ(25px)' }}
                      >
                        <CategoryIcon id={cat.id} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-sans text-xs sm:text-sm font-bold text-white group-hover:text-[#EBB8C0] transition-colors truncate">
                          {cat.name}
                        </h3>
                        <p className="text-[10px] text-[#9E9CA8] truncate leading-tight font-mono">
                          {cat.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Circular Wine & Rose Arrow Button */}
                    <div
                      className="w-6 h-6 rounded-full bg-[#731E1B] group-hover:bg-[#EBB8C0] text-white group-hover:text-[#0D0A10] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(115,30,27,0.4)] transition-all duration-300 group-hover:translate-x-1"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </PerspectiveCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
