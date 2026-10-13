import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { BoteqLogo } from './BoteqLogo';
import { CategoryId } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategory: (cat: CategoryId) => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenWhatsApp,
}) => {
  return (
    <footer id="contact" className="bg-[#09060C] text-[#E8DDD5] pt-16 pb-20 border-t border-[#B96A73]/20 relative overflow-hidden">
      {/* Background Ambient Radial Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#731E1B]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Col with Footer B/Q Lotus Crest */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <BoteqLogo variant="footer" onClick={() => onNavigate('home')} />
            <p className="text-xs text-[#9E9CA8] leading-relaxed max-w-sm font-light mt-2">
              BOTEQ pioneers the confluence of generational Indian handloom weaving and computational neural fashion synthesis. Engineered with love for visionary patrons worldwide.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] text-white font-semibold text-xs shadow-[0_0_15px_rgba(185,106,115,0.4)] hover:shadow-[0_0_25px_rgba(235,184,192,0.7)] transition-all cursor-pointer"
              >
                <span>WhatsApp VIP Concierge</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.24em] font-mono font-bold text-[#EBB8C0]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E9CA8]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#EBB8C0] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#EBB8C0] transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#EBB8C0] transition-colors cursor-pointer"
                >
                  About Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#EBB8C0] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.24em] font-mono font-bold text-[#EBB8C0]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E9CA8]">
              <li>
                <button
                  onClick={() => onSelectCategory('sarees')}
                  className="hover:text-[#EBB8C0] transition-colors cursor-pointer"
                >
                  Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('kurtis')}
                  className="hover:text-[#EBB8C0] transition-colors cursor-pointer"
                >
                  Kurtis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ethnic-wear')}
                  className="hover:text-[#EBB8C0] transition-colors cursor-pointer"
                >
                  Ethnic Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bridal-wear')}
                  className="hover:text-[#EBB8C0] transition-colors cursor-pointer"
                >
                  Bridal Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('party-wear')}
                  className="hover:text-[#EBB8C0] transition-colors cursor-pointer"
                >
                  Party Drapes
                </button>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.24em] font-mono font-bold text-[#EBB8C0]">
              Atelier Coordinates
            </h4>
            <div className="space-y-3 text-xs text-[#9E9CA8]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EBB8C0]" />
                <span>concierge@boteq.ai</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#EBB8C0]" />
                <span>+91 98765 43210 (VIP Hotline)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#EBB8C0]" />
                <span>Atelier: Jubilee Hills, Hyderabad & Indiranagar, Bangalore</span>
              </div>
            </div>

            {/* Follow Us social links */}
            <div className="pt-3">
              <span className="text-[10px] uppercase tracking-wider text-[#EBB8C0] font-mono block mb-2 font-semibold">
                Global Network
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="#instagram"
                  className="w-8 h-8 rounded-full bg-[#18111D] hover:bg-[#731E1B] border border-[#B96A73]/30 flex items-center justify-center transition-all text-white hover:shadow-[0_0_12px_rgba(235,184,192,0.6)]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  className="w-8 h-8 rounded-full bg-[#18111D] hover:bg-[#731E1B] border border-[#B96A73]/30 flex items-center justify-center transition-all text-white hover:shadow-[0_0_12px_rgba(235,184,192,0.6)]"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#youtube"
                  className="w-8 h-8 rounded-full bg-[#18111D] hover:bg-[#731E1B] border border-[#B96A73]/30 flex items-center justify-center transition-all text-white hover:shadow-[0_0_12px_rgba(235,184,192,0.6)]"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8896] font-mono gap-2">
          <p>© 2026 BOTEQ. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EBB8C0] animate-pulse" />
            AI-Engineered Indian Haute Couture
          </p>
        </div>
      </div>
    </footer>
  );
};
