import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Check, ShoppingBag, Gift, Truck } from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/mockData';

export const FeaturedCompleteSet: React.FC = () => {
  const { products, addToCart, setSelectedProduct, currency } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Find the complete set or flagship bundle from live Nile products
  const liveBundle =
    products.find((p) => p.isBundle) ||
    products.find((p) => p.uuid === 'prod_flawless_complete_set') ||
    products.find((p) =>
      p.slug?.includes('complete-set') ||
      p.slug?.includes('4-piece') ||
      p.name?.toLowerCase().includes('complete set') ||
      p.name?.toLowerCase().includes('4-piece set') ||
      p.name?.toLowerCase().includes('bundle')
    );

  const completeSet =
    liveBundle ||
    MOCK_PRODUCTS.find((p) => p.uuid === 'prod_flawless_complete_set') ||
    products[0];

  if (!completeSet) return null;

  const currentPrice = completeSet.discountedPrice !== null ? completeSet.discountedPrice : completeSet.price;
  const hasDiscount = completeSet.discountedPrice !== null && completeSet.discountedPrice < completeSet.price;

  const formatPrice = (val: number) => {
    if (currency === 'NGN') return `₦${val.toLocaleString()}`;
    if (currency === 'USD') return `$${val.toLocaleString()}`;
    if (currency === 'GBP') return `£${val.toLocaleString()}`;
    if (currency === 'EUR') return `€${val.toLocaleString()}`;
    if (currency === 'CAD') return `CA$${val.toLocaleString()}`;
    return `${currency} ${val.toLocaleString()}`;
  };

  const handleAddBundle = async () => {
    if (isAdding) return;
    setIsAdding(true);
    const success = await addToCart(completeSet.uuid, completeSet.variants?.[0]?.uuid, 1);
    setIsAdding(false);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2500);
    }
  };

  return (
    <section id="complete-set" className="py-16 sm:py-24 bg-gradient-to-tr from-champagne-light via-ivory-100 to-champagne/40 border-b border-ivory-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-cocoa-950 via-cocoa-900 to-cocoa-950 text-ivory-100 rounded-3xl p-5 sm:p-12 lg:p-16 shadow-2xl border border-gold-400/35 overflow-hidden relative ring-1 ring-gold-400/20">
          
          {/* Subtle Golden Glow */}
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-gold-600/15 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-left">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-[10px] sm:text-xs font-semibold uppercase tracking-widest shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span>Flagship Skincare Experience</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 sm:space-y-3">
                <h2 className="font-serif text-2.5xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                  Flawless Radiance{' '}
                  <span className="italic font-normal bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
                    4-Piece Set
                  </span>
                </h2>
                <p className="font-serif italic text-sm sm:text-xl text-ivory-200">
                  Four Essentials. One Exquisite Glow. • Full Face & Body System
                </p>
              </div>

              {/* Description */}
              <p className="text-ivory-200/90 text-xs sm:text-base leading-relaxed max-w-xl font-normal">
                The definitive 4-piece protocol engineered to purify, clarify, and illuminate skin from head to toe with lasting velvet barrier hydration.
              </p>

              {/* Bundle Highlights - 4 Pieces */}
              <div className="space-y-2 sm:space-y-2.5 pt-1">
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-ivory-200">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>1. Face Wash (200ml):</strong> Niacinamide & Glutathione cleanser</span>
                </div>
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-ivory-200">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>2. Face Toner (120ml):</strong> Pore-tightening & tone clarity</span>
                </div>
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-ivory-200">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>3. Face Cream (50g):</strong> Brightening & dark spot defense</span>
                </div>
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-ivory-200">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>4. Body Milk (500ml):</strong> Deep velvet whole-body glow</span>
                </div>
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-gold-300 pt-1">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Complimentary Nationwide Delivery:</strong> Direct dispatch across Nigeria</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 sm:pt-6 border-t border-cocoa-800 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gold-400 font-semibold">
                    Exclusive Set Value
                  </p>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif text-2.5xl sm:text-4xl font-bold text-white">
                      {formatPrice(currentPrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs sm:text-sm text-cocoa-400 line-through">
                        {formatPrice(completeSet.price)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleAddBundle}
                    disabled={isAdding}
                    className={`w-full sm:w-auto py-4 px-8 rounded-full font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg ${
                      justAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gold-500 text-cocoa-950 hover:bg-gold-400 active:scale-[0.98]'
                    }`}
                  >
                    {isAdding ? (
                      <span>Adding to Cart...</span>
                    ) : justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Complete Set Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Claim The Complete Set</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedProduct(completeSet)}
                    className="w-full sm:w-auto py-3.5 sm:py-4 px-6 rounded-full border border-gold-400/40 text-ivory-200 hover:text-white hover:border-gold-300 font-semibold uppercase tracking-wider text-xs transition-colors text-center"
                  >
                    Set Details
                  </button>
                </div>
              </div>

            </div>

            {/* Right Visual Frame */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-cocoa-900/60 border border-gold-500/30 p-3 sm:p-4 flex flex-col items-center justify-center shadow-2xl group overflow-hidden">
                <div className="absolute top-4 right-4 z-10 bg-gold-400 text-cocoa-950 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Complete Set
                </div>

                {/* Real Flawless Luxury Set Imagery */}
                <div className="relative w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded-2xl bg-cocoa-950/40">
                  <img
                    src="/images/flawless-trio-vanity.jpg"
                    alt="Flawless Radiance Skincare Set by BB Glow"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="text-center pt-3 sm:pt-4">
                  <p className="text-[11px] sm:text-xs uppercase tracking-widest text-gold-400 font-semibold">
                    100% Verified Authentic
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-ivory-300">
                    Handled & Dispatched directly by BB Glow
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
