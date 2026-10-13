import React, { useState } from 'react';
import { Send, X, ArrowRight, Cpu } from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { BoteqLogo } from './BoteqLogo';

interface BoteqChatbotProps {
  onSelectProduct: (product: Product) => void;
  onOpenWhatsApp: (customMsg?: string) => void;
}

export const BoteqChatbot: React.FC<BoteqChatbotProps> = ({
  onSelectProduct,
  onOpenWhatsApp,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Greetings. I am the BOTEQ Haute Couture Stylist. How may I assist your wardrobe selection today?',
      timestamp: 'Online',
      suggestions: [
        'Recommend attire for a royal reception',
        'Show me imperial rose silk sarees',
        'Suggest an outfit for a cultural festival',
        'Configure bespoke maggam blouse tailoring',
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = '';
      let recommendedId: string | undefined = undefined;
      let newSuggestions: string[] = [];

      if (lower.includes('wedding') || lower.includes('reception') || lower.includes('bridal') || lower.includes('royal')) {
        replyText = 'For regal celebrations and weddings, our ateliers highlight the Royal Crimson Bridal Lehenga (₹6,499) and the Blush Gold Banarasi Saree (₹3,299) woven with intricate metallic zari.';
        recommendedId = 'boteq-04';
        newSuggestions = ['Inspect 3D hologram drape', 'Show bridal lehengas', 'Connect with head master tailor'];
      } else if (lower.includes('saree') || lower.includes('banarasi') || lower.includes('drape') || lower.includes('rose')) {
        replyText = 'Our signature Saree collection features the Blush Gold Banarasi Saree (₹3,299) and our Mulberry Wine Handloom Silk Saree (₹2,699). Both feature authentic metallic zari on pure organza and katan silks.';
        recommendedId = 'boteq-01';
        newSuggestions = ['Can I get a stitched blouse?', 'Show half sarees', 'Launch 3D drape inspector'];
      } else if (lower.includes('festival') || lower.includes('puja') || lower.includes('diwali') || lower.includes('festive')) {
        replyText = 'For festive gatherings, our Olive Green Festive Silk Set (₹1,799) in Chanderi silk with parametric gold tilla embroidery offers maximum comfort and radiant elegance.';
        recommendedId = 'boteq-03';
        newSuggestions = ['Show size guide', 'View designer kurtis', 'WhatsApp VIP consultation'];
      } else if (lower.includes('blouse') || lower.includes('maggam') || lower.includes('tailor') || lower.includes('stitch')) {
        replyText = 'Our Peacock Blue Maggam Work Blouse (₹1,599) features antique gold embroidery, algorithmic back cutwork, and custom precision tailoring.';
        recommendedId = 'boteq-05';
        newSuggestions = ['Open WhatsApp for measurements', 'Show fusion tops', 'Explore All Sarees'];
      } else {
        replyText = `Understood. BOTEQ combines generational Indian handloom weaving with bespoke precision tailoring. Which occasion are you styling for?`;
        newSuggestions = ['Gala & Reception', 'Bridal Grandeur', 'Contemporary Festive'];
      }

      const botReply: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: 'Just now',
        suggestions: newSuggestions,
        recommendedProductId: recommendedId,
      };

      setMessages((prev) => [...prev, botReply]);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#140D18] hover:bg-[#201426] text-white shadow-[0_0_25px_rgba(115,30,27,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border border-[#B96A73]/50 cursor-pointer"
          title="BOTEQ AI Stylist"
          aria-label="Open BOTEQ AI Stylist"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#EBB8C0]" />
          ) : (
            <div className="relative flex items-center justify-center">
              <BoteqLogo variant="symbol-only" />
              {/* Online Rose Dot */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#EBB8C0] rounded-full border-2 border-[#140D18] animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#EBB8C0] rounded-full border-2 border-[#140D18]" />
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-18 right-3 sm:bottom-22 sm:right-6 z-40 w-[92vw] max-w-[380px] bg-[#140D18] text-[#FAF6F0] rounded-3xl shadow-[0_0_50px_rgba(10,5,12,0.9)] border border-[#B96A73]/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#19111E] text-white flex items-center justify-between border-b border-[#B96A73]/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0D0A10] border border-[#B96A73]/40 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-[#EBB8C0]" />
              </div>
              <div>
                <h4 className="text-sm font-sans font-bold text-white flex items-center gap-1.5">
                  BOTEQ Haute Stylist
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EBB8C0] animate-pulse" />
                  <span className="text-[10px] text-[#EBB8C0] tracking-wider uppercase font-mono">
                    Atelier Engine Active
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9E9CA8] hover:text-white p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-3.5 max-h-[380px] min-h-[260px] overflow-y-auto flex flex-col gap-3 bg-[#140D18]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] text-white rounded-tr-none shadow-md font-medium'
                      : 'bg-[#1C1220] text-[#E8DDD5] rounded-tl-none border border-[#B96A73]/20 shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Recommended Product Snapshot */}
                  {msg.recommendedProductId && (
                    (() => {
                      const recProd = PRODUCTS.find((p) => p.id === msg.recommendedProductId);
                      if (!recProd) return null;
                      return (
                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2 bg-[#0D0A10] p-2 rounded-xl">
                          <img
                            src={recProd.image}
                            alt={recProd.name}
                            className="w-10 h-10 object-cover rounded-lg shrink-0 border border-[#B96A73]/30"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-xs font-bold text-white truncate">
                              {recProd.name}
                            </p>
                            <p className="text-[11px] font-mono text-[#EBB8C0] font-semibold">
                              ₹{recProd.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <button
                            onClick={() => onSelectProduct(recProd)}
                            className="px-2 py-1 text-[10px] bg-gradient-to-r from-[#731E1B] to-[#B96A73] text-white font-semibold rounded-md flex items-center gap-0.5 whitespace-nowrap transition-colors cursor-pointer"
                          >
                            View
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      );
                    })()
                  )}
                </div>

                {/* Quick Suggestion Pills */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-2.5 w-full">
                    {msg.suggestions.map((sugg, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (sugg.includes('WhatsApp')) {
                            onOpenWhatsApp('Hi BOTEQ, I need styling assistance for Indian ethnic wear.');
                          } else {
                            handleSend(sugg);
                          }
                        }}
                        className="text-left text-xs text-[#EBB8C0] bg-[#1C1220] hover:bg-[#731E1B] hover:text-white border border-[#B96A73]/30 rounded-full px-3 py-1.5 transition-all shadow-xs font-mono cursor-pointer"
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-[#19111E] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask BOTEQ stylist..."
              className="flex-1 bg-[#0D0A10] border border-[#B96A73]/30 rounded-full px-3.5 py-1.5 text-xs text-white placeholder:text-[#9E9CA8] focus:outline-none focus:ring-1 focus:ring-[#EBB8C0]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-[#731E1B] to-[#B96A73] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 shadow-md cursor-pointer"
              title="Send"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
