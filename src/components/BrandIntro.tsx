import React from 'react';
import { Feather, HeartHandshake, Droplets, ShieldCheck } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  const pillars = [
    {
      icon: Feather,
      title: 'Melanin-Safe Brightening',
      description: 'Formulated specifically to clarify, tone, and enhance your natural glow without harsh bleaching agents, hydroquinone, or mercury.'
    },
    {
      icon: HeartHandshake,
      title: 'Botanical Bio-Actives',
      description: 'Enriched with cold-pressed rosehip seed oil, pure deionized aqua, multi-weight hyaluronic acid, and pharmaceutical-grade niacinamide.'
    },
    {
      icon: Droplets,
      title: '24-Hour Velvet Hydration',
      description: 'Rich whipped emulsions that absorb immediately into the skin barrier, creating a breathable, non-sticky satin radiance.'
    },
    {
      icon: ShieldCheck,
      title: 'Authoritative Nile Commerce',
      description: 'Every order, stock level, price calculation, and payment is processed directly through Nile’s enterprise infrastructure.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-ivory-100 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">
            The BB Glow Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950">
            Skincare Designed for Exceptional Radiance
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-gold-400 mx-auto mt-2 sm:mt-4" />
          <p className="text-cocoa-700 text-sm sm:text-base leading-relaxed pt-2 px-2">
            At BB Glow Skincare, we believe luxury skin wellness begins with respectful, potent formulations. The Flawless Collection is engineered to unify body tone, dissolve dullness, and maintain long-term skin health.
          </p>
        </div>

        {/* 4 Pillars Grid - 1 Col on mobile, 2 Col on tablet, 4 Col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-ivory-50 p-6 sm:p-8 rounded-2xl border border-ivory-200 hover:border-gold-300 transition-all duration-300 hover:shadow-md space-y-3 sm:space-y-4 text-left group"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-champagne-light border border-gold-200 flex items-center justify-center text-gold-700 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-cocoa-900 group-hover:text-gold-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-cocoa-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
