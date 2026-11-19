import React from 'react';
import { Feather, HeartHandshake, Droplets, ShieldCheck } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  const pillars = [
    {
      icon: Feather,
      title: 'Melanin-Safe Clarifying',
      description: 'Fades dark spots, sun marks, and uneven tone without harsh bleaching chemicals, hydroquinone, or rebound dullness.'
    },
    {
      icon: HeartHandshake,
      title: 'Concentrated Bio-Actives',
      description: 'Supercharged with pure Niacinamide, Glutathione, Alpha Arbutin, and Hyaluronic Acid for deep cellular renewal.'
    },
    {
      icon: Droplets,
      title: '24H Velvet Hydration',
      description: 'Whipped, non-greasy moisture that melts in instantly to seal in an exquisite, all-day satin sheen.'
    },
    {
      icon: ShieldCheck,
      title: 'Dermatologist Approved',
      description: 'Clinically formulated, barrier-safe, non-comedogenic, and crafted for everyday luxury.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory-100 border-b border-ivory-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Editorial Visual Feature */}
          <div className="lg:col-span-5 relative order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(201,164,92,0.2)] border border-gold-300/50 group bg-ivory-200 ring-1 ring-gold-300/30">
              <img
                src="/images/flawless-model-glow.jpg"
                alt="BB Glow Radiance and Texture"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/75 via-cocoa-950/15 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-ivory-200 shadow-xl">
                <p className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold">Clinically Formulated</p>
                <p className="font-serif text-xs sm:text-sm font-bold text-cocoa-950">Pure Luminescence for Every Skin Tone</p>
              </div>
            </div>
          </div>

          {/* Editorial Copy & Compact Pillars */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2 text-left">
            <div className="space-y-2.5">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">
                The BB Glow Standard
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950 tracking-tight leading-tight">
                Designed for Pure, <span className="italic font-normal text-gold-600">Unfiltered Radiance</span>
              </h2>
              <div className="w-12 h-0.5 bg-gold-400 mt-2" />
              <p className="text-cocoa-700 text-xs sm:text-sm md:text-base leading-relaxed pt-2 font-normal">
                Luxury skin wellness begins with potent, barrier-safe care. The Flawless Collection is engineered to unify body tone, dissolve dullness, and maintain long-lasting radiance.
              </p>
            </div>

            {/* 4 Pillars Grid - 2x2 Clean Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-ivory-50 p-4 sm:p-5 rounded-2xl border border-ivory-200 hover:border-gold-300 transition-all duration-300 hover:shadow-md space-y-2 group ring-1 ring-gold-200/20"
                  >
                    <div className="w-9 h-9 rounded-xl bg-champagne-light border border-gold-200 flex items-center justify-center text-gold-700 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-cocoa-900 group-hover:text-gold-700 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-cocoa-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
