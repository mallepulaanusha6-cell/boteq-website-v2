import React, { useState } from 'react';
import { Star, Instagram, Quote, Cpu } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';
import { Testimonial } from '../types';

interface TestimonialsAndGalleryProps {
  onOpenWhatsApp: (customMsg?: string) => void;
}

export const TestimonialsAndGallery: React.FC<TestimonialsAndGalleryProps> = ({
  onOpenWhatsApp,
}) => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    outfit: 'Imperial Rose Zari Saree',
    text: '',
    rating: 5,
  });

  const instagramPosts = [
    {
      id: 1,
      image: '/images/hero_indian_saree_model_1791899599685.jpg',
      tag: '#BoteqAtelier',
      caption: 'Banarasi silk poetry engineered for modern royalty.',
    },
    {
      id: 2,
      image: '/images/product_futuristic_saree_1791909500548.jpg',
      tag: '#ImperialWineDrape',
      caption: 'Rose gold zari striations on deep organza silk.',
    },
    {
      id: 3,
      image: '/images/product_designer_blouse_1791909500299.jpg',
      tag: '#MaggamPrecision',
      caption: 'Precision needlepoint and antique gold dori embellishments.',
    },
    {
      id: 4,
      image: '/images/category_tops_fusion_1791909498342.jpg',
      tag: '#IndoWesternFusion',
      caption: 'Blush satin drape skirt paired with corset blouse.',
    },
    {
      id: 5,
      image: '/images/product_blush_banarasi_1791909499984.jpg',
      tag: '#BlushGoldZari',
      caption: 'Kora Banarasi silk woven with radiant minakari motifs.',
    },
    {
      id: 6,
      image: '/images/about_boteq_model_1791899602823.jpg',
      tag: '#ImperialOrganza',
      caption: 'Ethereal sheer purple organza draped to perfection.',
    },
  ];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const reviewObj: Testimonial = {
      id: `t-${Date.now()}`,
      name: newReview.name,
      location: newReview.location || 'India',
      occasion: 'Gala Celebration',
      outfit: newReview.outfit,
      text: newReview.text,
      rating: newReview.rating,
      date: 'Just now',
    };

    setReviews([reviewObj, ...reviews]);
    setShowReviewForm(false);
    setNewReview({ name: '', location: '', outfit: 'Imperial Rose Zari Saree', text: '', rating: 5 });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0D0A10] border-t border-[#B96A73]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Customer Testimonials Section */}
        <div>
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C1220] border border-[#B96A73]/30 shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-[#EBB8C0]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#EBB8C0] font-mono">
                GLOBAL CLIENT REVIEWS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
              Words of Adornment
            </h2>
            <div className="flex items-center justify-center gap-3 pt-1">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#B96A73]" />
              <div className="w-2.5 h-2.5 rotate-45 bg-[#EBB8C0] shadow-[0_0_8px_#EBB8C0]" />
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#B96A73]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((t) => (
              <div
                key={t.id}
                className="glass-panel-card p-6 sm:p-7 rounded-3xl border border-[#B96A73]/20 flex flex-col justify-between hover:border-[#EBB8C0]/60 hover:shadow-[0_0_30px_rgba(185,106,115,0.25)] transition-all duration-300 relative group"
              >
                <Quote className="w-8 h-8 text-[#B96A73]/25 absolute top-5 right-5 group-hover:text-[#EBB8C0]/40 transition-colors" />
                <div className="space-y-3.5">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EBB8C0] text-[#EBB8C0]" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#E8DDD5] leading-relaxed font-light italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-5 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-sans font-bold text-white">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-[#9E9CA8] font-mono">{t.location}</p>
                  </div>
                  <span className="text-[10px] bg-[#731E1B]/30 text-[#EBB8C0] border border-[#B96A73]/30 px-2.5 py-0.5 rounded-full font-mono">
                    {t.outfit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Review Action */}
          <div className="text-center pt-8">
            <button
              onClick={() => setShowReviewForm(true)}
              className="text-xs font-semibold text-[#EBB8C0] hover:text-white transition-colors cursor-pointer"
            >
              Share your BOTEQ couture experience with us →
            </button>
          </div>
        </div>

        {/* Instagram Gallery Section */}
        <div>
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C1220] border border-[#B96A73]/30 shadow-xs">
              <Instagram className="w-3.5 h-3.5 text-[#EBB8C0]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#EBB8C0] font-mono">
                FOLLOW THE ATELIER
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white">
              @boteqboutique on Instagram
            </h3>
            <p className="text-xs text-[#9E9CA8] font-mono">
              Tag #BoteqAtelier to be featured on our atelier gallery wall
            </p>
          </div>

          {/* 6-column photo wall with unique images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {instagramPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onOpenWhatsApp(`Hi BOTEQ! I loved your Instagram look ${post.tag}. Could you share details?`)}
                className="group relative rounded-2xl overflow-hidden aspect-square border border-[#B96A73]/20 shadow-md cursor-pointer hover:border-[#EBB8C0] transition-all"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0D0A10]/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-white">
                  <Instagram className="w-5 h-5 text-[#EBB8C0] mb-1.5" />
                  <span className="text-[11px] font-bold tracking-wider font-mono text-[#EBB8C0]">
                    {post.tag}
                  </span>
                  <span className="text-[9px] text-[#E8DDD5] mt-1 line-clamp-2">
                    {post.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Modal Form */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel-futuristic rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#B96A73]/40 space-y-4">
            <h3 className="text-xl font-sans font-bold text-white">
              Submit Client Review
            </h3>
            <form onSubmit={handleAddReview} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#9E9CA8] font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Shalini Roy"
                  className="w-full px-3 py-2 bg-[#0D0A10] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#9E9CA8] font-medium mb-1">City, Country</label>
                <input
                  type="text"
                  value={newReview.location}
                  onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  placeholder="e.g. Mumbai, India"
                  className="w-full px-3 py-2 bg-[#0D0A10] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#9E9CA8] font-medium mb-1">Outfit Purchased</label>
                <input
                  type="text"
                  value={newReview.outfit}
                  onChange={(e) => setNewReview({ ...newReview, outfit: e.target.value })}
                  placeholder="e.g. Imperial Rose Zari Saree"
                  className="w-full px-3 py-2 bg-[#0D0A10] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#9E9CA8] font-medium mb-1">Your Review *</label>
                <textarea
                  rows={3}
                  required
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Describe the drape, luxury texture, and fit..."
                  className="w-full px-3 py-2 bg-[#0D0A10] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 border border-white/20 rounded-xl text-xs text-[#9E9CA8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] text-white rounded-xl text-xs font-semibold shadow-md transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
