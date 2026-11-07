import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const ingredients = [
    {
      name: 'Niacinamide (Vitamin B3)',
      role: 'Skin Barrier Restoration & Texture Refinement',
      description: 'Strengthens epidermal moisture retention, regulates sebum balance, and fades stubborn dark spots for refined pores.'
    },
    {
      name: 'Alpha Arbutin',
      role: 'Melanin Clarification & Tone Unification',
      description: 'A scientifically validated, gentle brightening active that inhibits tyrosinase activity to diminish uneven hyperpigmentation safely.'
    },
    {
      name: 'Pure Shea Butter (Butyrospermum Parkii)',
      role: 'Lipid Replenishment & 24h Softness',
      description: 'Sourced naturally to infuse body skin with essential fatty acids, smoothing rough knees, elbows, and dry patches.'
    },
    {
      name: 'Glutathione',
      role: 'Master Antioxidant & Cellular Defense',
      description: 'Neutralizes oxidative environmental stressors, shields against dullness, and promotes continuous healthy skin radiance.'
    },
    {
      name: 'Glycolic Acid (Micro-AHA)',
      role: 'Gentle Epidermal Resurfacing',
      description: 'Micro-exfoliates dead corneocyte cells, unclogging pores and maximizing cellular turnover for an instant luminous sheen.'
    },
    {
      name: 'Licorice Root Extract',
      role: 'Botanical Soothing & Redness Relief',
      description: 'A calming natural phytocompound that suppresses inflammatory discoloration and protects sensitized skin.'
    }
  ];

  return (
    <section id="ingredients" className="py-20 sm:py-28 bg-ivory-100 border-b border-ivory-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
            <span>Formulation Transparency</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950">
            The Bio-Active Ingredients
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-gold-400 mx-auto mt-2 sm:mt-4" />
          <p className="text-cocoa-700 text-xs sm:text-sm md:text-base leading-relaxed pt-2 px-2">
            Every ingredient in the Flawless by BB Glow portfolio is chosen with medical-grade precision. Zero harmful bleaching chemicals, zero compromises on skin vitality.
          </p>
        </div>

        {/* 6 Ingredients Grid - 1 Col on mobile, 2 Col on tablet, 3 Col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ingredients.map((ing, idx) => (
            <div
              key={idx}
              className="bg-ivory-50 rounded-2xl p-6 sm:p-7 border border-ivory-200 hover:border-gold-300 transition-all duration-300 hover:shadow-lg space-y-2.5 sm:space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-gold-700 font-semibold bg-champagne-light px-2.5 py-1 rounded-md">
                  Key Active 0{idx + 1}
                </span>
                <CheckCircle2 className="w-4 h-4 text-gold-600" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-cocoa-950 group-hover:text-gold-700 transition-colors">
                {ing.name}
              </h3>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-cocoa-500">
                {ing.role}
              </p>
              <p className="text-xs text-cocoa-700 leading-relaxed font-normal pt-1">
                {ing.description}
              </p>
            </div>
          ))}
        </div>

        {/* Clinical Clean Formulation Promise Bar */}
        <div className="mt-10 sm:mt-14 bg-white rounded-2xl border border-ivory-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4 text-left">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-cocoa-950">
                Dermatologically Formulated & Non-Comedogenic
              </h4>
              <p className="text-xs text-cocoa-600">
                Formulated without parabens, synthetic sulfates, harsh hydroquinone, or mercury.
              </p>
            </div>
          </div>
          <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-gold-700 bg-champagne-light px-4 py-2 rounded-full border border-gold-200 whitespace-nowrap">
            Pure Skincare Standard
          </span>
        </div>

      </div>
    </section>
  );
};
