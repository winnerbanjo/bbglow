import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setSelectedProduct, products } = useStore();

  const completeSet = products.find((p) => p.isBundle) || products[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-champagne-light via-ivory-100 to-ivory-50 pt-8 pb-16 lg:pt-20 lg:pb-32 border-b border-ivory-200">
      {/* Subtle Luxury Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gold-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-champagne-dark/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Campaign Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Minimal Luxury Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-100/90 border border-gold-300/80 text-gold-900 text-[11px] sm:text-xs tracking-widest uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
              <span>The Prestige Brightening Protocol</span>
            </div>

            {/* Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold text-cocoa-950 tracking-tight leading-[1.12]">
                Flawless <span className="italic font-normal text-gold-600">Radiance</span>
              </h1>
              <p className="font-serif italic text-lg sm:text-2xl text-cocoa-700 tracking-wide">
                The Art of Pure Luminescence
              </p>
            </div>

            {/* Description */}
            <p className="text-cocoa-700 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience the definitive luxury skincare campaign by BB Glow. Powered by concentrated botanical bio-actives, niacinamide, and velvet body hydration — engineered to clarify, balance, and reveal your most luminous complexion.
            </p>

            {/* CTA Buttons - Full Width on Mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#complete-set"
                className="w-full sm:w-auto px-8 py-4 bg-cocoa-900 text-ivory-100 hover:bg-gold-600 rounded-full font-medium tracking-wider uppercase text-xs transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group text-center"
              >
                <span>Shop The Complete Set</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#collection"
                className="w-full sm:w-auto px-8 py-4 bg-white/80 border border-cocoa-800/30 hover:border-gold-600 text-cocoa-900 hover:text-gold-700 rounded-full font-medium tracking-wider uppercase text-xs transition-all duration-300 flex items-center justify-center text-center"
              >
                Explore Collection
              </a>
            </div>

            {/* Trust Highlights - Clean 2-column or 3-column wrap */}
            <div className="pt-4 sm:pt-6 border-t border-ivory-300/70 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs text-cocoa-800 font-medium leading-snug">
                  Zero Harsh Hydroquinone
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
                  Global Express Dispatch
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="lg:col-span-5 relative flex justify-center w-full">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-tr from-champagne via-ivory-100 to-ivory-200 p-6 sm:p-8 shadow-2xl border border-gold-200/50 flex flex-col items-center justify-between group">
              
              {/* Gold Corner Accents */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-gold-400" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-gold-400" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-gold-400" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-gold-400" />

              {/* Tag on image */}
              <div className="z-10 bg-ivory-50/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold-300 text-[10px] sm:text-[11px] font-serif tracking-widest uppercase text-cocoa-900 shadow-sm">
                BB Glow Signature Series
              </div>

              {/* Product Visual Montage */}
              <div className="relative flex items-center justify-center h-full w-full py-4 sm:py-6">
                {/* Body Milk Bottle */}
                <div className="relative w-40 sm:w-52 transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl">
                  <img
                    src="/images/flawless-body-milk-front.jpg"
                    alt="Flawless Body Milk"
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                </div>
                {/* Face Wash Overlap */}
                <div className="absolute -bottom-2 -left-2 w-28 sm:w-36 transition-transform duration-500 group-hover:-translate-y-2 drop-shadow-xl">
                  <img
                    src="/images/flawless-face-wash-front.jpg"
                    alt="Flawless Face Wash"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <div className="z-10 w-full bg-white/95 backdrop-blur-sm p-3 sm:p-3.5 rounded-2xl border border-ivory-200 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-cocoa-500 font-semibold">Flagship Set</p>
                  <p className="text-xs sm:text-sm font-serif font-bold text-cocoa-950">Flawless Complete Protocol</p>
                </div>
                {completeSet && (
                  <button
                    onClick={() => setSelectedProduct(completeSet)}
                    className="px-3 sm:px-3.5 py-1.5 bg-gold-500 hover:bg-gold-600 text-white rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm shrink-0"
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
