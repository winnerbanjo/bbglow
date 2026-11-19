import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setSelectedProduct, products } = useStore();

  const completeSet = products.find((p) => p.isBundle) || products[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-champagne-light via-ivory-100 to-ivory-50 pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 border-b border-ivory-200">
      {/* Subtle Luxury Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gold-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-champagne-dark/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Campaign Copy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
            {/* Minimal Luxury Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100/95 border border-gold-300 text-gold-900 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold-600 animate-pulse" />
              <span>The Prestige Brightening Protocol</span>
            </div>

            {/* Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-7xl font-bold text-cocoa-950 tracking-tight leading-[1.12]">
                Flawless{' '}
                <span className="italic font-normal bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 bg-clip-text text-transparent">
                  Radiance
                </span>
              </h1>
              <p className="font-serif italic text-lg sm:text-2xl text-cocoa-800 tracking-wide">
                The Art of Pure Luminescence
              </p>
            </div>

            {/* Description - Irresistible, sensory, concise */}
            <p className="text-cocoa-700 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Medical-grade botanical bio-actives, niacinamide, and velvet body hydration — formulated to clarify stubborn hyperpigmentation, restore barrier balance, and reveal your most luminous complexion.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-3">
              <a
                href="#complete-set"
                className="w-full sm:w-auto px-8 py-4 bg-cocoa-900 text-ivory-100 hover:bg-gold-600 active:scale-[0.98] rounded-full font-semibold tracking-wider uppercase text-xs transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group text-center"
              >
                <span>Shop The Complete Set</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#collection"
                className="w-full sm:w-auto px-8 py-4 bg-white/90 border border-cocoa-800/25 hover:border-gold-600 text-cocoa-900 hover:text-gold-700 active:scale-[0.98] rounded-full font-semibold tracking-wider uppercase text-xs transition-all duration-300 flex items-center justify-center text-center shadow-sm"
              >
                Explore Collection
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 sm:pt-6 border-t border-ivory-300/80 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs text-cocoa-800 font-medium leading-snug">
                  0% Hydroquinone
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs text-cocoa-800 font-medium leading-snug">
                  Dermatologist Approved
                </span>
              </div>
              <div className="flex items-start gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs text-cocoa-800 font-medium leading-snug">
                  Complimentary Shipping
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork with High-Fashion Photoshoot */}
          <div className="lg:col-span-5 relative flex justify-center w-full">
            <div className="relative w-full max-w-xs sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(201,164,92,0.25)] border border-gold-300/50 group bg-ivory-200 ring-1 ring-gold-300/30">
              <img
                src="/images/flawless-model-facewash.jpg"
                alt="Flawless by BB Glow Skincare Campaign"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Corner Gold Accent */}
              <div className="absolute top-4 left-4 z-10 bg-ivory-50/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-300 text-[10px] sm:text-[11px] font-serif tracking-widest uppercase text-cocoa-900 shadow-md">
                Official Campaign
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 inset-x-4 z-10 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-ivory-200 shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold">Flawless Protocol</p>
                  <p className="text-xs sm:text-sm font-serif font-bold text-cocoa-950">Pure Skin Luminescence</p>
                </div>
                {completeSet && (
                  <button
                    onClick={() => setSelectedProduct(completeSet)}
                    className="px-3.5 py-2 bg-cocoa-900 hover:bg-gold-600 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm shrink-0"
                  >
                    View Set
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
