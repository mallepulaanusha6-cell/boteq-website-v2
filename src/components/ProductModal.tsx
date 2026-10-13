import React, { useState } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Sparkles, Check, ShieldCheck, Truck, Ruler, Layers } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onOpenWhatsApp: (customMsg: string) => void;
  onOpen3DInspect?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenWhatsApp,
  onOpen3DInspect,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Free Size');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleWhatsAppEnquiry = () => {
    const msg = `Hello BOTEQ! I am interested in inquiring about "${product.name}" (Price: ₹${product.price.toLocaleString('en-IN')}, Fabric: ${product.fabric}, Size: ${selectedSize}). Could you share more details or availability?`;
    onOpenWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-[#140D18] text-[#FAF6F0] rounded-3xl max-w-4xl w-full shadow-[0_0_50px_rgba(115,30,27,0.35)] border border-[#B96A73]/30 overflow-hidden max-h-[92vh] flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#0D0A10]/80 hover:bg-[#731E1B] text-[#EBB8C0] hover:text-white border border-[#B96A73]/30 flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Imagery */}
        <div className="md:w-1/2 relative bg-[#0D0A10] min-h-[300px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top max-h-[460px] md:max-h-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140D18] via-transparent to-transparent opacity-60 md:hidden" />

          {/* 3D Hologram Button */}
          {onOpen3DInspect && (
            <button
              onClick={() => onOpen3DInspect(product)}
              className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-[#0D0A10]/80 hover:bg-[#731E1B] text-white text-xs backdrop-blur-md border border-[#B96A73]/40 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(185,106,115,0.4)] cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#EBB8C0]" />
              <span>3D Hologram Drape</span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#0D0A10]/80 hover:bg-[#731E1B] text-[#EBB8C0] hover:text-white border border-[#B96A73]/30 flex items-center justify-center shadow-md transition-colors cursor-pointer"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-[#EBB8C0] text-[#EBB8C0]' : ''}`} />
          </button>
        </div>

        {/* Right Side: Product Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-[85vh] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-[#EBB8C0]">
                {product.category.replace('-', ' ')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-1 leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold font-mono text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-[#8A8896] font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-mono font-semibold text-[#EBB8C0] bg-[#731E1B]/30 px-2 py-0.5 rounded-full border border-[#B96A73]/30">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#E8DDD5] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs">
              <div>
                <span className="text-[#9E9CA8] block text-[11px]">Fabric Composition</span>
                <span className="font-semibold text-white">{product.fabric}</span>
              </div>
              <div>
                <span className="text-[#9E9CA8] block text-[11px]">Occasion</span>
                <span className="font-semibold text-white">{product.occasion}</span>
              </div>
              <div>
                <span className="text-[#9E9CA8] block text-[11px]">Workmanship</span>
                <span className="font-semibold text-white">{product.workType}</span>
              </div>
              <div>
                <span className="text-[#9E9CA8] block text-[11px]">Artisan Certification</span>
                <span className="font-semibold text-[#EBB8C0]">Silk Mark Certified</span>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#9E9CA8]">Select Size</span>
                <span className="text-[#EBB8C0] flex items-center gap-1 font-mono text-[11px]">
                  <Ruler className="w-3 h-3" /> Size Guide
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#731E1B] text-white border border-[#EBB8C0] shadow-[0_0_12px_rgba(185,106,115,0.4)] font-semibold'
                        : 'bg-[#1C1220] text-[#E8DDD5] border border-[#B96A73]/30 hover:border-[#EBB8C0]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 text-xs pt-1">
              <span className="text-[#9E9CA8]">Quantity:</span>
              <div className="flex items-center border border-[#B96A73]/30 rounded-full bg-[#1C1220]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-7 flex items-center justify-center text-white hover:text-[#EBB8C0] cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-7 flex items-center justify-center text-white hover:text-[#EBB8C0] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-3">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] hover:from-[#5C1614] hover:via-[#A25861] hover:to-[#D89EA7] text-white rounded-full font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(185,106,115,0.4)] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedNotice ? 'Added to Bag!' : 'Add to Shopping Bag'}</span>
              {addedNotice && <Check className="w-4 h-4 animate-in zoom-in" />}
            </button>

            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-3 bg-[#1C1220] hover:bg-[#731E1B] text-[#EBB8C0] hover:text-white border border-[#B96A73]/40 rounded-full font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Direct Concierge Enquiry</span>
            </button>

            {/* Assurance Pills */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#9E9CA8]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#EBB8C0]" />
                <span>Express Insured Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EBB8C0]" />
                <span>Verified Handloom Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
