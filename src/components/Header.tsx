import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, ArrowRight, Menu, X, Phone, Volume2, VolumeX, Music } from 'lucide-react';
import { BoteqLogo } from './BoteqLogo';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenWhatsApp: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigate,
  activeSection,
  onOpenWhatsApp,
  isMusicPlaying = false,
  onToggleMusic,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#0D0A10]/90 backdrop-blur-xl border-b border-[#B96A73]/20 transition-all">
      {/* Top micro announcement bar with Imperial Wine & Dusty Rose highlights */}
      <div className="bg-gradient-to-r from-[#170E18] via-[#2A1422] to-[#170E18] border-b border-[#B96A73]/25 text-white text-[11px] py-1.5 px-3 sm:px-4 flex items-center justify-between sm:justify-between relative">
        <div className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EBB8C0] animate-pulse" />
          <span className="font-mono text-[#EBB8C0] text-[10px] tracking-wider uppercase font-semibold">
            HAUTE COUTURE v4.2
          </span>
          <span className="text-[#E8DDD5] truncate hidden md:inline">
            — Complimentary Express Global Shipping on Orders Above ₹3,000 | Custom Neural Fit
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Visible Music On/Off Toggle Button in Announcement Bar */}
          {onToggleMusic && (
            <button
              onClick={onToggleMusic}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                isMusicPlaying
                  ? 'bg-[#731E1B]/40 text-[#EBB8C0] border-[#B96A73]/70 shadow-[0_0_10px_rgba(235,184,192,0.35)]'
                  : 'bg-[#18111D] text-[#9E9CA8] border-white/15 hover:text-[#FAF6F0] hover:border-[#B96A73]/40'
              }`}
              title={isMusicPlaying ? 'Turn Music OFF' : 'Turn Music ON'}
              aria-label="Toggle Background Music"
            >
              <Music className={`w-3 h-3 ${isMusicPlaying ? 'text-[#EBB8C0] animate-bounce' : 'text-[#9E9CA8]'}`} />
              <span>{isMusicPlaying ? 'Music ON' : 'Music OFF'}</span>
              {isMusicPlaying && (
                <span className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-[#EBB8C0] h-2 animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-[#B96A73] h-2.5 animate-[pulse_0.4s_ease-in-out_infinite]" />
                </span>
              )}
            </button>
          )}

          <button
            onClick={onOpenWhatsApp}
            className="hidden sm:inline-flex items-center gap-1.5 text-[#EBB8C0] hover:text-white transition-colors cursor-pointer text-[11px] font-medium"
          >
            <Phone className="w-3 h-3 text-[#EBB8C0]" /> VIP Concierge
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Wordmark with Custom B/Q symbol */}
        <div className="shrink-0">
          <BoteqLogo onClick={() => onNavigate('home')} />
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 text-sm tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#9E9CA8] hover:text-[#EBB8C0] font-normal'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] rounded-full shadow-[0_0_8px_#B96A73]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Music Button, Search, Wishlist, Bag, and Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Visible Music On/Off Button in main bar */}
          {onToggleMusic && (
            <button
              onClick={onToggleMusic}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 cursor-pointer ${
                isMusicPlaying
                  ? 'bg-[#731E1B]/30 text-[#EBB8C0] border-[#B96A73]/60 shadow-[0_0_12px_rgba(235,184,192,0.3)]'
                  : 'bg-[#18111D] text-[#9E9CA8] border-white/10 hover:border-[#B96A73]/40 hover:text-white'
              }`}
              title={isMusicPlaying ? 'Turn Music OFF' : 'Turn Music ON'}
              aria-label="Toggle Background Music"
            >
              {isMusicPlaying ? (
                <Volume2 className="w-3.5 h-3.5 text-[#EBB8C0]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#9E9CA8]" />
              )}
              <span className="font-mono text-[11px] font-semibold tracking-wide">
                {isMusicPlaying ? 'Music ON' : 'Music OFF'}
              </span>
              {isMusicPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#EBB8C0] animate-ping" />
              )}
            </button>
          )}

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#9E9CA8] hover:text-[#EBB8C0] hover:bg-[#1E1424] rounded-full transition-colors cursor-pointer border border-transparent hover:border-[#B96A73]/30"
            title="Search Collections"
            aria-label="Search"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#9E9CA8] hover:text-[#EBB8C0] hover:bg-[#1E1424] rounded-full transition-colors relative cursor-pointer border border-transparent hover:border-[#B96A73]/30"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#731E1B] text-[#FAF6F0] text-[10px] font-mono rounded-full flex items-center justify-center font-bold shadow-[0_0_8px_#731E1B]">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Bag Trigger */}
          <button
            onClick={onOpenCart}
            className="p-2 text-[#9E9CA8] hover:text-[#EBB8C0] hover:bg-[#1E1424] rounded-full transition-colors relative cursor-pointer border border-transparent hover:border-[#B96A73]/30"
            title="Shopping Bag"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#EBB8C0] text-[#0D0A10] text-[10px] font-mono rounded-full flex items-center justify-center font-bold animate-pulse shadow-[0_0_10px_#EBB8C0]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button: Imperial Wine & Rose Gold Gradient */}
          <button
            onClick={() => onNavigate('collections')}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] hover:from-[#5C1614] hover:via-[#A25861] hover:to-[#D89EA7] text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(185,106,115,0.4)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(235,184,192,0.6)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#9E9CA8] hover:text-white hover:bg-[#1E1424] rounded-xl border border-white/10 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#140E18] border-b border-[#B96A73]/20 px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          {/* Mobile Music On/Off Toggle Button */}
          {onToggleMusic && (
            <div className="pb-2 border-b border-white/10">
              <button
                onClick={() => {
                  onToggleMusic();
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-between border transition-all cursor-pointer ${
                  isMusicPlaying
                    ? 'bg-[#731E1B]/30 text-[#EBB8C0] border-[#B96A73]/60 shadow-[0_0_12px_rgba(235,184,192,0.25)]'
                    : 'bg-[#1C1322] text-[#9E9CA8] border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isMusicPlaying ? <Volume2 className="w-4 h-4 text-[#EBB8C0]" /> : <VolumeX className="w-4 h-4 text-[#9E9CA8]" />}
                  <span>Background Music</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isMusicPlaying ? 'bg-[#EBB8C0] text-[#0D0A10] font-bold' : 'bg-white/10 text-white/70'}`}>
                  {isMusicPlaying ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          )}

          <div className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 text-sm font-medium ${
                  activeSection === link.id ? 'text-[#EBB8C0] font-semibold' : 'text-[#E8DDD5]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('collections');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] text-white rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              Explore Collection <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onOpenWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#1C1322] border border-[#B96A73]/40 text-[#EBB8C0] rounded-full text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" /> VIP WhatsApp Concierge
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
