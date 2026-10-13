import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onOpenWhatsApp: (customMsg: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenWhatsApp,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal - discount + shipping;
  const freeShippingThreshold = 3000;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'BOTEQ10' || couponCode.trim().toUpperCase() === 'ROYAL10') {
      setCouponApplied(true);
    } else {
      alert('Use promo code BOTEQ10 for 10% boutique discount!');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill in your delivery details.');
      return;
    }
    const orderId = `BTQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderConfirmed(orderId);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#130E18] text-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#B96A73]/30">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#19111E] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#EBB8C0]" />
              <h3 className="font-sans font-bold text-lg text-white">
                Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#9E9CA8] hover:text-[#EBB8C0] p-1.5 rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderConfirmed ? (
            /* Order Placed Success View */
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-[#731E1B]/30 border border-[#EBB8C0] text-[#EBB8C0] flex items-center justify-center shadow-[0_0_20px_rgba(235,184,192,0.4)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-sans font-bold text-white">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-[#9E9CA8] mt-1 font-mono">
                  Order ID: <span className="font-bold text-[#EBB8C0]">{orderConfirmed}</span>
                </p>
              </div>
              <p className="text-xs text-[#E8DDD5] leading-relaxed max-w-xs font-light">
                Thank you for selecting BOTEQ. Our concierge team has logged your order and will contact you on <span className="font-semibold text-white">{formData.phone}</span> for dispatch verification and tracking.
              </p>

              <button
                onClick={() => {
                  const msg = `Hi BOTEQ! I just placed order ${orderConfirmed} for ${formData.name}. Please confirm dispatch details.`;
                  onOpenWhatsApp(msg);
                }}
                className="py-2.5 px-5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Track Order via WhatsApp
              </button>

              <button
                onClick={() => {
                  setOrderConfirmed(null);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="text-xs text-[#EBB8C0] underline hover:text-white pt-2 font-mono cursor-pointer"
              >
                Continue Exploring Collections
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form View */
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="font-sans font-bold text-base text-white">
                  Delivery Details & Payment
                </h4>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#EBB8C0] hover:underline font-mono cursor-pointer"
                >
                  ← Back to Bag
                </button>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#9E9CA8] font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Priya Sharma"
                    className="w-full px-3 py-2 bg-[#1C1220] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#9E9CA8] font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-[#1C1220] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#9E9CA8] font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="priya@example.com"
                      className="w-full px-3 py-2 bg-[#1C1220] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#9E9CA8] font-medium mb-1">Delivery Address *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Flat No., Apartment, Street name"
                    className="w-full px-3 py-2 bg-[#1C1220] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#9E9CA8] font-medium mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Hyderabad"
                      className="w-full px-3 py-2 bg-[#1C1220] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#9E9CA8] font-medium mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="500081"
                      className="w-full px-3 py-2 bg-[#1C1220] border border-[#B96A73]/30 text-white rounded-xl focus:ring-1 focus:ring-[#EBB8C0] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="pt-2">
                  <label className="block text-[#9E9CA8] font-medium mb-1.5">Payment Method</label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'upi', label: 'UPI / Google Pay / PhonePe / QR', desc: 'Instant zero-fee boutique verification' },
                      { id: 'cod', label: 'Cash on Delivery (COD)', desc: 'Pay when delivered to your address' },
                      { id: 'card', label: 'Credit / Debit Card / Netbanking', desc: 'Secure 256-bit encrypted gateway' },
                    ].map((pm) => (
                      <label
                        key={pm.id}
                        className={`flex items-start gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                          formData.paymentMethod === pm.id
                            ? 'border-[#EBB8C0] bg-[#25182D]'
                            : 'border-white/10 bg-[#1A1220]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === pm.id}
                          onChange={() => setFormData({ ...formData, paymentMethod: pm.id })}
                          className="mt-0.5 text-[#EBB8C0] focus:ring-[#EBB8C0]"
                        />
                        <div>
                          <p className="font-semibold text-white">{pm.label}</p>
                          <p className="text-[10px] text-[#9E9CA8]">{pm.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Order Summary Strip */}
                <div className="bg-[#1A1220] p-3 rounded-xl border border-white/10 space-y-1 text-xs">
                  <div className="flex justify-between text-[#9E9CA8]">
                    <span>Total Amount:</span>
                    <span className="font-mono font-bold text-base text-[#EBB8C0]">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] hover:from-[#5C1614] hover:via-[#A25861] hover:to-[#D89EA7] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(185,106,115,0.4)] transition-all mt-3 cursor-pointer"
                >
                  Confirm & Place Order
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* Items in Cart View */
            <>
              {/* Free Shipping Meter */}
              <div className="bg-[#19111E] px-4 py-2.5 border-b border-white/10 text-xs">
                {neededForFreeShipping > 0 ? (
                  <p className="text-[#E8DDD5]">
                    Add <span className="font-semibold font-mono text-[#EBB8C0]">₹{neededForFreeShipping.toLocaleString('en-IN')}</span> more for <span className="font-semibold text-white">Free Express Shipping</span>!
                  </p>
                ) : (
                  <p className="text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    You unlocked Complimentary Express Global Shipping!
                  </p>
                )}
                <div className="w-full h-1.5 bg-[#0D0A10] rounded-full mt-1.5 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#9E9CA8] space-y-3">
                    <ShoppingBag className="w-12 h-12 stroke-1 text-[#5D5C68]" />
                    <p className="font-sans font-bold text-base text-white">Your shopping bag is empty</p>
                    <p className="text-xs max-w-xs font-light">Explore our curated collection of sarees, kurtis, and bridal couture.</p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer"
                    >
                      Start Exploring
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-3 bg-[#1A1220] p-3 rounded-2xl border border-white/10 shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-18 h-22 object-cover rounded-xl shrink-0 border border-white/10"
                      />
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-sans text-xs font-bold text-white truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                              className="text-[#9E9CA8] hover:text-[#EBB8C0] p-1 transition-colors cursor-pointer"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#9E9CA8] mt-0.5 font-mono">
                            Size: <span className="font-medium text-white">{item.selectedSize}</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#B96A73]/30 rounded-lg bg-[#0D0A10] overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                              className="px-2 py-0.5 text-xs text-[#EBB8C0] hover:bg-[#25182D] cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono font-medium text-white">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                              className="px-2 py-0.5 text-xs text-[#EBB8C0] hover:bg-[#25182D] cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-mono text-sm font-bold text-[#EBB8C0]">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary */}
              {items.length > 0 && (
                <div className="p-4 sm:p-5 bg-[#19111E] border-t border-white/10 space-y-3">
                  {/* Coupon Code Form */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#EBB8C0]" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Promo Code (try BOTEQ10)"
                        className="w-full pl-8 pr-2 py-1.5 text-xs bg-[#0D0A10] border border-[#B96A73]/30 text-white rounded-xl uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#EBB8C0]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#1C1220] border border-[#B96A73] text-[#EBB8C0] hover:bg-[#731E1B] hover:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-[#9E9CA8] border-t border-white/10 pt-2 font-mono">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-400">
                        <span>VIP Discount (10%)</span>
                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span>{shipping === 0 ? <span className="text-emerald-400 font-medium">Free</span> : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white border-t border-white/10 pt-1.5">
                      <span>Total</span>
                      <span className="text-[#EBB8C0]">₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3 bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] hover:from-[#5C1614] hover:via-[#A25861] hover:to-[#D89EA7] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(185,106,115,0.4)] transition-all cursor-pointer"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#9E9CA8] font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#EBB8C0]" />
                    <span>Safe 256-Bit Encrypted Payment Matrix</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
