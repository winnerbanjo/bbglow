import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-ivory-50 via-champagne-light/60 to-champagne/40 relative overflow-hidden border-b border-ivory-200">
      {/* Ambient Radial Luxury Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gold-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-7 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100/90 border border-gold-300 text-gold-900 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-pulse" />
          <span>Start Your Transformation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-cocoa-950 tracking-tight leading-tight">
          Unveil Your Skin’s{' '}
          <span className="italic font-normal bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 bg-clip-text text-transparent">
            Purest Glow
          </span>
        </h2>

        <p className="text-cocoa-700 text-xs sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-normal px-2">
          Experience the Flawless Ritual today. Medical-grade clarity, pore refinement, and 24-hour velvet hydration delivered directly to your doorstep.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
          <a
            href="#complete-set"
            className="w-full sm:w-auto px-9 py-4 bg-cocoa-900 text-ivory-100 hover:bg-gold-600 active:scale-[0.98] rounded-full font-semibold uppercase tracking-wider text-xs transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group text-center"
          >
            <span>Claim The Complete Set</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="https://wa.me/2347042061009?text=Hello%20BB%20Glow%2C%20I%20would%20like%20to%20order%20the%20Flawless%20Collection."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold uppercase tracking-wider text-xs transition-colors shadow-md flex items-center justify-center gap-2.5 text-center active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Order via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
