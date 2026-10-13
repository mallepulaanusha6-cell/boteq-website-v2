import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#130E18] text-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#B96A73]/30">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#19111E] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#EBB8C0] fill-[#EBB8C0]" />
              <h3 className="font-sans font-bold text-lg text-white">
                Saved Wishlist ({wishlistedProducts.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#9E9CA8] hover:text-[#EBB8C0] p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#9E9CA8] space-y-3">
                <Heart className="w-12 h-12 stroke-1 text-[#5D5C68]" />
                <p className="font-sans font-bold text-base text-white">Your wishlist is empty</p>
                <p className="text-xs max-w-xs font-light">Tap the heart on any saree, kurti or bridal dress to save it to your wishlist.</p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 bg-[#1A1220] p-3 rounded-2xl border border-white/10 shadow-xs items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded-xl shrink-0 border border-white/10 cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="font-sans text-xs font-bold text-white hover:text-[#EBB8C0] transition-colors cursor-pointer truncate"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[11px] font-mono text-[#EBB8C0] mt-0.5">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="text-[10px] text-[#EBB8C0] hover:text-white flex items-center gap-1 mt-1 font-mono cursor-pointer"
                    >
                      View Details <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="text-[#9E9CA8] hover:text-[#EBB8C0] p-1.5 transition-colors cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
