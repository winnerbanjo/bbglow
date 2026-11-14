import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Check, ShoppingBag, Gift, Truck } from 'lucide-react';

export const FeaturedCompleteSet: React.FC = () => {
  const { products, addToCart, setSelectedProduct, currency } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Find the complete set or flagship bundle from Nile products
  const completeSet =
    products.find((p) => p.slug === 'flawless-complete-set') ||
    products.find((p) => p.isBundle) ||
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
    const success = await addToCart(completeSet.uuid, completeSet.variants[0]?.uuid, 1);
    setIsAdding(false);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2500);
    }
  };

  return (
    <section id="complete-set" className="py-16 sm:py-24 bg-gradient-to-tr from-champagne-light via-ivory-100 to-champagne/40 border-b border-ivory-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-cocoa-950 via-cocoa-900 to-cocoa-950 text-ivory-100 rounded-3xl p-6 sm:p-12 lg:p-16 shadow-2xl border border-gold-400/30 overflow-hidden relative">
          
          {/* Subtle Golden Glow */}
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-gold-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-[11px] sm:text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>Flagship Skincare Experience</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 sm:space-y-3">
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                  Flawless Radiance <span className="italic font-normal text-gold-400">4-Piece Set</span>
                </h2>
                <p className="font-serif italic text-base sm:text-xl text-ivory-200">
                  Four Essentials. One Beautiful Glow. • Complete Face & Body Collection
                </p>
              </div>

              {/* Value Proposition Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gold-500/10 border border-gold-400/30 backdrop-blur-sm">
                <p className="font-serif italic text-sm sm:text-base text-gold-200 leading-relaxed">
                  The Flawless Set offers incredible value by combining your essential routine into one complete, long-lasting system that protects their skin barrier.
                </p>
              </div>

              {/* Description */}
              <p className="text-ivory-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal">
                Your journey to beautiful, radiant-looking skin starts with the right routine. Designed by BB Glow to cleanse, tone, moisturise and enhance your natural radiance from morning to evening.
              </p>

              {/* Bundle Highlights - 4 Pieces */}
              <div className="space-y-2 sm:space-y-2.5 pt-1">
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-ivory-200">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>1. Flawless Face Wash (200ml):</strong> Enriched with Niacinamide, Glutathione & Vitamin E</span>
                </div>
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-ivory-200">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>2. Flawless Toner (200ml):</strong> Refreshes, tones and promotes brighter-looking skin</span>
                </div>
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-ivory-200">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>3. Flawless Face Cream (50g):</strong> Moisturising cream supporting clear, radiant skin</span>
                </div>
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-ivory-200">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>4. Flawless Body Milk (500ml):</strong> Jumbo 500ml lotion for velvety, soft, glowing skin</span>
                </div>
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-gold-300 pt-1">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Complimentary Dispatch:</strong> Fast shipping across Nigeria & International</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 sm:pt-6 border-t border-cocoa-800 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gold-400 font-semibold">
                    Exclusive Set Value
                  </p>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
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
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] rounded-3xl bg-gradient-to-tr from-cocoa-800 to-cocoa-900 border border-gold-500/30 p-6 sm:p-8 flex flex-col items-center justify-center shadow-2xl group">
                <div className="absolute top-4 right-4 bg-gold-400 text-cocoa-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Prestige Set
                </div>

                {/* Imagery Montage */}
                <div className="relative w-full h-full flex items-center justify-center py-4">
                  <img
                    src="/images/flawless-body-milk-front.jpg"
                    alt="Flawless Body Milk"
                    className="w-36 sm:w-44 object-contain rounded-2xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <img
                    src="/images/flawless-face-wash-front.jpg"
                    alt="Flawless Face Wash"
                    className="w-24 sm:w-28 absolute -bottom-2 -left-2 object-contain rounded-xl drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-2"
                  />
                </div>

                <div className="text-center pt-2 sm:pt-4">
                  <p className="text-[11px] sm:text-xs uppercase tracking-widest text-gold-400 font-semibold">
                    100% Guaranteed Authentic
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
