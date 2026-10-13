import React, { useState } from 'react';
import { Heart, MessageCircle, Eye, Layers, Cpu } from 'lucide-react';
import { Product, CategoryId } from '../types';
import { PRODUCTS } from '../data/products';
import { PerspectiveCard } from './3d/PerspectiveCard';

interface ProductSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  onOpenWhatsApp: (customMsg?: string) => void;
  onOpen3DInspect: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  selectedCategory,
  onSelectCategory,
  onOpenWhatsApp,
  onOpen3DInspect,
}) => {
  const [filter, setFilter] = useState<CategoryId | 'all'>(selectedCategory);

  const categoriesFilter: { id: CategoryId | 'all'; label: string }[] = [
    { id: 'all', label: 'All Creations' },
    { id: 'sarees', label: 'Sarees' },
    { id: 'kurtis', label: 'Kurtis' },
    { id: 'ethnic-wear', label: 'Ethnic Sets' },
    { id: 'bridal-wear', label: 'Bridal Couture' },
    { id: 'party-wear', label: 'Party Drape' },
    { id: 'half-sarees', label: 'Half Sarees' },
    { id: 'blouses', label: 'Designer Blouses' },
  ];

  const displayedProducts = PRODUCTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="collections" className="py-16 sm:py-24 bg-[#0D0A10] relative">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-[#731E1B]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Cybernetic Ornament */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C1220] border border-[#B96A73]/30 shadow-[0_0_12px_rgba(185,106,115,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-[#EBB8C0]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#EBB8C0] font-mono">
              CURATED HAUTE COUTURE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Handpicked Just for You
          </h2>

          {/* Futuristic Rose & Wine Divider */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#B96A73]" />
            <div className="w-3 h-3 rotate-45 border border-[#B96A73] bg-[#0D0A10] flex items-center justify-center shadow-[0_0_8px_#B96A73]">
              <div className="w-1.5 h-1.5 bg-[#EBB8C0]" />
            </div>
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#B96A73]" />
          </div>
        </div>

        {/* 3D Segmented Filter Ribbon */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 sm:mb-12 no-scrollbar">
          <div className="p-1.5 rounded-full bg-[#18101E]/80 backdrop-blur-md border border-[#B96A73]/25 shadow-[0_0_15px_rgba(10,5,12,0.8)] flex items-center gap-1.5">
            {categoriesFilter.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilter(cat.id);
                  onSelectCategory(cat.id);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] text-white shadow-[0_0_15px_rgba(185,106,115,0.5)] font-semibold'
                    : 'text-[#9E9CA8] hover:text-[#EBB8C0] hover:bg-[#25182D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Floating Product Panels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {displayedProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <PerspectiveCard
                key={product.id}
                maxTilt={12}
                glareOpacity={0.35}
                className="group"
              >
                <div className="h-full rounded-3xl glass-panel-card overflow-hidden transition-all duration-300 flex flex-col justify-between preserve-3d">
                  {/* Product Image Layer */}
                  <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-[#140D18]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108 cursor-pointer"
                      onClick={() => onSelectProduct(product)}
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A10] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity pointer-events-none" />

                    {/* Floating Wishlist Heart on Z-Plane */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-3.5 right-3.5 w-8.5 h-8.5 rounded-full bg-[#0D0A10]/80 hover:bg-[#731E1B] text-[#EBB8C0] hover:text-white border border-[#B96A73]/30 flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer"
                      style={{ transform: 'translateZ(35px)' }}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-[#EBB8C0] text-[#EBB8C0]' : 'text-[#EBB8C0]'
                        }`}
                      />
                    </button>

                    {/* 3D Hologram Inspect Button on Z-Plane */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen3DInspect(product);
                      }}
                      className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-[#0D0A10]/80 hover:bg-[#731E1B] text-[#EBB8C0] hover:text-white text-[10px] backdrop-blur-md border border-[#B96A73]/40 flex items-center gap-1 shadow-[0_0_10px_rgba(185,106,115,0.3)] transition-all active:scale-95 cursor-pointer font-mono"
                      style={{ transform: 'translateZ(35px)' }}
                      title="Inspect 3D Hologram Drape"
                    >
                      <Layers className="w-3 h-3 text-[#EBB8C0]" />
                      <span>3D Hologram</span>
                    </button>

                    {/* Quick View Button on Hover */}
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#1C1220]/90 hover:bg-[#731E1B] text-[#FAF6F0] border border-[#B96A73]/40 px-4 py-1.5 rounded-full text-xs font-medium shadow-[0_0_15px_rgba(185,106,115,0.4)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#EBB8C0]" />
                      Quick View
                    </button>
                  </div>

                  {/* Card Content & Actions */}
                  <div className="p-4 sm:p-5 bg-[#170F1C]/95 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                        <span className="uppercase tracking-wider font-semibold text-[#EBB8C0]">
                          {product.category.replace('-', ' ')}
                        </span>
                        <span className="text-[#E8DDD5]">★ {product.rating}</span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-sans text-sm sm:text-base font-bold text-white hover:text-[#EBB8C0] transition-colors cursor-pointer truncate"
                      >
                        {product.name}
                      </h3>

                      {/* Price in Rupees */}
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="text-base sm:text-lg font-bold text-white font-mono">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs line-through text-[#8A8896] font-mono">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Enquire on WhatsApp Button with Rose-Wine Palette */}
                    <div className="pt-3.5">
                      <button
                        onClick={() => {
                          const msg = `Hi BOTEQ! I am interested in inquiring about the "${product.name}" priced at ₹${product.price.toLocaleString('en-IN')}. Is this available?`;
                          onOpenWhatsApp(msg);
                        }}
                        className="w-full py-2.5 px-3 bg-[#201426] hover:bg-[#731E1B] text-[#EBB8C0] hover:text-white border border-[#B96A73]/40 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-300 active:scale-98 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Enquire on WhatsApp</span>
                      </button>
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
