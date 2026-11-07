import React from 'react';
import { ArrowRight, Droplets, Sun, Moon } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const RoutineSection: React.FC = () => {
  const { setSelectedProduct, products } = useStore();

  const faceWash = products.find((p) => p.slug.includes('face-wash')) || products[0];
  const bodyMilk = products.find((p) => p.slug.includes('body-milk')) || products[1];

  const steps = [
    {
      step: '01',
      title: 'Purify & Clarify',
      productName: 'Flawless Face Wash (200ml)',
      time: 'Morning & Night',
      icon: Droplets,
      description: 'Lather a nickel-sized amount with lukewarm water. Dissolves micro-pollutants and dead cells without disturbing the delicate skin barrier.',
      product: faceWash,
      image: '/images/flawless-face-wash-front.jpg'
    },
    {
      step: '02',
      title: 'Damp Skin Activation',
      productName: 'Thermal Skin Mist or Soft Pat',
      time: 'Immediate Post-Shower',
      icon: Sun,
      description: 'Leave body skin slightly damp after showering. Hydrated epidermal cells absorb lipid bio-actives with 300% greater efficiency.',
      product: null,
      image: null
    },
    {
      step: '03',
      title: 'Illuminate & Seal',
      productName: 'Flawless Body Milk (500ml)',
      time: 'Daily Body Protocol',
      icon: Moon,
      description: 'Smooth generously over the body in upward motions. Alpha arbutin and whipped shea nourish dry zones, locking in golden luminescence.',
      product: bodyMilk,
      image: '/images/flawless-body-milk-lifestyle.webp'
    }
  ];

  return (
    <section id="routine" className="py-20 sm:py-28 bg-gradient-to-b from-ivory-50 to-champagne-light/50 border-b border-ivory-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
            <span>The Daily Protocol</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950">
            The 3-Step Flawless Ritual
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-gold-400 mx-auto mt-2 sm:mt-4" />
          <p className="text-cocoa-700 text-xs sm:text-sm md:text-base leading-relaxed pt-2 px-2">
            Formulated to work synergistically. Consistent application over 21 days creates a unified, luminous skin transformation.
          </p>
        </div>

        {/* Steps Grid - Stacked on Mobile, 3 Cols on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-ivory-50 rounded-3xl p-6 sm:p-8 border border-ivory-200 relative flex flex-col justify-between hover:border-gold-300 transition-all duration-300 hover:shadow-xl group"
              >
                {/* Large Background Step Number */}
                <span className="font-serif text-5xl sm:text-6xl font-black text-ivory-200/90 absolute top-4 right-6 select-none group-hover:text-gold-200/50 transition-colors">
                  {s.step}
                </span>

                <div className="space-y-4 sm:space-y-6 relative z-10">
                  {/* Step Icon & Time */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-champagne-light border border-gold-200 flex items-center justify-center text-gold-700">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-cocoa-500 bg-white px-3 py-1 rounded-full border border-ivory-200">
                      {s.time}
                    </span>
                  </div>

                  {/* Title & Product Name */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-950">
                      {s.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider font-semibold text-gold-700">
                      {s.productName}
                    </p>
                  </div>

                  {/* Visual if product step */}
                  {s.image && (
                    <div className="aspect-[16/10] bg-gradient-to-tr from-champagne-light to-ivory-100 rounded-2xl p-4 flex items-center justify-center border border-ivory-200/80 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-cocoa-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 sm:pt-6 border-t border-ivory-200/80 mt-6">
                  {s.product ? (
                    <button
                      onClick={() => setSelectedProduct(s.product)}
                      className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-cocoa-900 group-hover:text-gold-600 transition-colors py-1"
                    >
                      <span>Explore Step Formula</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <span className="text-xs text-cocoa-400 italic">
                      Essential skin preparation step
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
