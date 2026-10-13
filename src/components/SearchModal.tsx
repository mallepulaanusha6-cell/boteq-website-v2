import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.occasion.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="glass-panel-futuristic rounded-3xl max-w-xl w-full shadow-2xl border border-[#B96A73]/40 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 bg-[#19111E] border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#EBB8C0]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sarees, designer kurtis, bridal lehengas, silk..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#9E9CA8] focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#9E9CA8] hover:text-white rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter suggestions */}
        <div className="px-4 py-2 bg-[#130E18] border-b border-white/10 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#9E9CA8] text-[11px] whitespace-nowrap font-mono">Suggested:</span>
          {['Banarasi Silk', 'Kurti', 'Bridal', 'Organza', 'Chanderi', 'Maggam Blouse'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-0.5 bg-[#1C1220] border border-[#B96A73]/30 rounded-full text-[#EBB8C0] hover:border-[#EBB8C0] hover:text-white whitespace-nowrap font-mono transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto p-4 space-y-2 bg-[#130E18]/95">
          {filtered.length === 0 ? (
            <p className="text-xs text-[#9E9CA8] text-center py-6 font-mono">
              No creations found for "{searchTerm}".
            </p>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#201426] transition-colors cursor-pointer group border border-transparent hover:border-[#B96A73]/30"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-14 object-cover rounded-xl shrink-0 border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white group-hover:text-[#EBB8C0] transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#9E9CA8] font-mono">
                    {product.fabric} · {product.occasion}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#EBB8C0]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9E9CA8] group-hover:text-[#EBB8C0] ml-auto mt-1 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
