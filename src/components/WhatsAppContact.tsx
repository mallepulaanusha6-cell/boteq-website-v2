import React, { useState } from 'react';
import { Phone, MessageSquare, ExternalLink, Settings, X, Check } from 'lucide-react';

interface WhatsAppContactProps {
  phoneNumber: string;
  onUpdatePhone: (num: string) => void;
  isOpen: boolean;
  onClose: () => void;
  prefilledMessage?: string;
}

export const WhatsAppModal: React.FC<WhatsAppContactProps> = ({
  phoneNumber,
  onUpdatePhone,
  isOpen,
  onClose,
  prefilledMessage = 'Hello BOTEQ! I would like to inquire about your Indian ethnic fashion collection.',
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [tempPhone, setTempPhone] = useState<string>(phoneNumber);
  const [customMsg, setCustomMsg] = useState<string>(prefilledMessage);

  if (!isOpen) return null;

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePhone(tempPhone.trim());
    setEditing(false);
  };

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMsg)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#140D18] text-[#FAF6F0] rounded-3xl max-w-md w-full shadow-2xl border border-[#B96A73]/40 overflow-hidden">
        {/* Header */}
        <div className="bg-[#19111E] text-white p-4 flex items-center justify-between border-b border-[#B96A73]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#731E1B]/30 border border-[#EBB8C0] flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#EBB8C0]" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-white">BOTEQ VIP Concierge</h3>
              <p className="text-[11px] text-[#9E9CA8] font-mono">Boutique styling & bespoke maggam stitching link</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#9E9CA8] hover:text-white p-1 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Phone Config bar */}
          <div className="bg-[#1A1220] p-3 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#9E9CA8]">Direct Number:</span>
              <span className="font-mono text-xs font-semibold text-[#EBB8C0]">{phoneNumber}</span>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="text-[11px] text-[#EBB8C0] hover:underline flex items-center gap-1 font-mono cursor-pointer"
            >
              <Settings className="w-3 h-3" />
              {editing ? 'Close' : 'Change'}
            </button>
          </div>

          {editing && (
            <form onSubmit={handleSavePhone} className="space-y-2 p-3 bg-[#130E18] rounded-xl border border-[#B96A73]/30">
              <label className="text-[11px] text-[#9E9CA8] block">Update WhatsApp Number (International format)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#0D0A10] border border-[#B96A73]/40 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#EBB8C0] font-mono"
                  placeholder="+91 98765 43210"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-gradient-to-r from-[#731E1B] to-[#B96A73] text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Save
                </button>
              </div>
            </form>
          )}

          {/* Prefilled message preview and edit */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#E8DDD5]">Inquiry Message</label>
            <textarea
              rows={3}
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full p-3 bg-[#1C1220] border border-[#B96A73]/30 rounded-2xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#EBB8C0] leading-relaxed resize-none"
              placeholder="Type your message to the concierge..."
            />
          </div>

          {/* Open WhatsApp CTA */}
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Launch Chat on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          <p className="text-[11px] text-center text-[#9E9CA8] font-mono pt-1">
            Available 10 AM – 9 PM IST · Typical response under 5 minutes
          </p>
        </div>
      </div>
    </div>
  );
};
