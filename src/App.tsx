/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { ProductSection } from './components/ProductSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsAndGallery } from './components/TestimonialsAndGallery';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { BoteqChatbot } from './components/BoteqChatbot';
import { WhatsAppModal } from './components/WhatsAppContact';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CustomCursor } from './components/CustomCursor';
import { Interactive3DViewer } from './components/3d/Interactive3DViewer';
import { CategoryId, Product, CartItem } from './types';
import { PRODUCTS } from './data/products';

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState<string>('home');

  // Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');

  // Interactive Modals and Drawers State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productFor3DInspect, setProductFor3DInspect] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);
  const [waPrefilledMsg, setWaPrefilledMsg] = useState<string>(
    'Hello BOTEQ! I would like to inquire about your Indian ethnic fashion collection.'
  );

  // Configurable Boutique WhatsApp Number
  const [boutiquePhone, setBoutiquePhone] = useState<string>(() => {
    return localStorage.getItem('boteq_phone') || '+91 98765 43210';
  });

  // Shopping Bag Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('boteq_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Background Music State
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  const handleToggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('boteq_wishlist');
      return saved ? JSON.parse(saved) : ['boteq-01', 'boteq-04'];
    } catch {
      return ['boteq-01', 'boteq-04'];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('boteq_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('boteq_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('boteq_phone', boutiquePhone);
  }, [boutiquePhone]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // WhatsApp Concierge Trigger
  const handleOpenWhatsApp = (customMsg?: string) => {
    if (customMsg) {
      setWaPrefilledMsg(customMsg);
    } else {
      setWaPrefilledMsg('Hello BOTEQ! I would like to inquire about your Indian ethnic fashion collection.');
    }
    setIsWhatsAppOpen(true);
  };

  // Navigation Handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSelectCategory = (categoryId: CategoryId | 'all') => {
    setSelectedCategory(categoryId);
    const collectionsEl = document.getElementById('collections');
    if (collectionsEl) {
      collectionsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0A10] flex flex-col text-[#FAF6F0] selection:bg-[#731E1B] selection:text-[#FAF6F0]">
      {/* Top Header matching reference */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section matching reference with 3D interactions */}
        <HeroSection
          onExplore={() => handleNavigate('collections')}
          onOpenWhatsApp={() => handleOpenWhatsApp()}
          onOpen3DInspect={() => setProductFor3DInspect(PRODUCTS[0])}
        />

        {/* 2. Shop by Category ("Our Fashion Collections") with 3D perspective */}
        <CategorySection
          onSelectCategory={(id) => handleSelectCategory(id)}
          selectedCategory={selectedCategory}
        />

        {/* 3. Featured Products ("Handpicked Just for You") with 3D cards */}
        <ProductSection
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenWhatsApp={handleOpenWhatsApp}
          onOpen3DInspect={(p) => setProductFor3DInspect(p)}
        />

        {/* 4. About BOTEQ ("Style That Celebrates You") with 3D portal */}
        <AboutSection
          onExploreCollections={() => handleNavigate('collections')}
          onOpenWhatsApp={() => handleOpenWhatsApp()}
        />

        {/* 5. Client Praise & Instagram Showcase Gallery */}
        <TestimonialsAndGallery onOpenWhatsApp={handleOpenWhatsApp} />
      </main>

      {/* Footer matching reference dark plum layout and lotus crest */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={(cat) => handleSelectCategory(cat)}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
      />

      {/* Luxury Trailing Cursor */}
      <CustomCursor />

      {/* Bottom-Left Floating Music Player (YouTube background audio with 1-click & autoplay handling) */}
      <MusicPlayer
        isPlaying={isMusicPlaying}
        onTogglePlay={handleToggleMusic}
        onStateChange={(playing) => setIsMusicPlaying(playing)}
      />

      {/* Bottom-Right Floating Fashion Assistant Chatbot */}
      <BoteqChatbot
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Interactive 3D Fabric Drape Viewer */}
      <Interactive3DViewer
        product={productFor3DInspect}
        isOpen={Boolean(productFor3DInspect)}
        onClose={() => setProductFor3DInspect(null)}
        onAddToCart={handleAddToCart}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onOpenWhatsApp={handleOpenWhatsApp}
        onOpen3DInspect={(p) => setProductFor3DInspect(p)}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenWhatsApp={handleOpenWhatsApp}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* WhatsApp Concierge Modal */}
      <WhatsAppModal
        phoneNumber={boutiquePhone}
        onUpdatePhone={(num) => setBoutiquePhone(num)}
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        prefilledMessage={waPrefilledMsg}
      />
    </div>
  );
}
