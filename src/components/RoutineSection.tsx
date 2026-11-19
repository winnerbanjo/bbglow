import React from 'react';
import { ArrowRight, Droplets, Sparkles, Sun, Moon, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MOCK_PRODUCTS } from '../services/mockData';

export const RoutineSection: React.FC = () => {
  const { setSelectedProduct, products } = useStore();

  const faceWash =
    products.find((p) => p.slug?.includes('face-wash') || p.name?.toLowerCase().includes('face wash') || p.name?.toLowerCase().includes('cleanser')) ||
    products[0] ||
    MOCK_PRODUCTS[0];
  const toner =
    products.find((p) => p.slug?.includes('toner') || p.name?.toLowerCase().includes('toner')) ||
    MOCK_PRODUCTS[2];
  const faceCream =
    products.find((p) => p.slug?.includes('face-cream') || p.name?.toLowerCase().includes('cream')) ||
    MOCK_PRODUCTS[3];
  const bodyMilk =
    products.find((p) => p.slug?.includes('body-milk') || p.name?.toLowerCase().includes('milk') || p.name?.toLowerCase().includes('lotion')) ||
    MOCK_PRODUCTS[1];

  const steps = [
    {
      step: '01',
      title: 'Cleanse',
      productName: 'Flawless Face Wash (200ml)',
      time: 'AM & PM',
      icon: Droplets,
      description: 'Gently lifts impurities while nourishing with Niacinamide, Glutathione, and Vitamin E.',
      product: faceWash,
      image: '/images/flawless-face-wash-front.jpg'
    },
    {
      step: '02',
      title: 'Tone',
      productName: 'Flawless Face Toner (120ml)',
      time: 'Post-Cleanse',
      icon: Sparkles,
      description: 'Refines pore texture, balances pH, and primes the skin for deep active absorption.',
      product: toner,
      image: '/images/flawless-toner-cream-duo.jpg'
    },
    {
      step: '03',
      title: 'Moisturise',
      productName: 'Flawless Face Cream (50g)',
      time: 'Daily Radiance',
      icon: Sun,
      description: 'Infuses cellular hydration to fade dark spots and deliver an illuminating glass finish.',
      product: faceCream,
      image: '/images/flawless-trio-vanity.jpg'
    },
    {
      step: '04',
      title: 'Nourish',
      productName: 'Flawless Body Milk (500ml)',
      time: 'Body Protocol',
      icon: Moon,
      description: 'Rich velvet body hydration that clarifies and tones from shoulders to heels.',
      product: bodyMilk,
      image: '/images/flawless-body-milk-front.jpg'
    }
  ];

  return (
    <section id="routine" className="py-16 sm:py-24 bg-gradient-to-b from-ivory-50 to-champagne-light/50 border-b border-ivory-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
            <span>The Daily Protocol</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950">
            The 4-Step Flawless Ritual
          </h2>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-2" />
          <p className="text-cocoa-700 text-xs sm:text-sm md:text-base leading-relaxed pt-1">
            Four targeted steps designed to work in synergy for clear, luminous, healthy skin.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-ivory-50 rounded-3xl p-5 sm:p-6 border border-ivory-200 relative flex flex-col justify-between hover:border-gold-300 transition-all duration-300 hover:shadow-lg group"
              >
                {/* Large Step Number */}
                <span className="font-serif text-4xl sm:text-5xl font-black text-ivory-200/90 absolute top-4 right-5 select-none group-hover:text-gold-200/60 transition-colors">
                  {s.step}
                </span>

                <div className="space-y-3 sm:space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-champagne-light border border-gold-200 flex items-center justify-center text-gold-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cocoa-500 bg-white px-2.5 py-0.5 rounded-full border border-ivory-200">
                      {s.time}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="font-serif text-xl font-bold text-cocoa-950">
                      {s.title}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-gold-700">
                      {s.productName}
                    </p>
                  </div>

                  {s.image && (
                    <div className="aspect-[4/3] bg-white rounded-2xl p-2.5 flex items-center justify-center border border-ivory-200/80 overflow-hidden shadow-inner">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <p className="text-xs text-cocoa-600 leading-relaxed font-normal">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-ivory-200/80 mt-4">
                  {s.product ? (
                    <button
                      onClick={() => setSelectedProduct(s.product)}
                      className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-cocoa-900 group-hover:text-gold-600 transition-colors py-0.5"
                    >
                      <span>Explore Formula</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Routine Visual Feature Banner with Vanity Mirror Image */}
        <div className="mt-12 sm:mt-16 bg-white rounded-3xl border border-ivory-200 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-5 h-64 md:h-full relative overflow-hidden bg-ivory-200">
            <img
              src="/images/flawless-ritual-mirror.jpg"
              alt="BB Glow Daily Skincare Ritual"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="md:col-span-7 p-6 sm:p-10 space-y-4 text-left">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold">
                The Complete System
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-950 leading-snug">
                One Cohesive Protocol. Real-World Glow.
              </h3>
              <p className="text-xs sm:text-sm text-cocoa-600 leading-relaxed pt-1">
                Combining all 4 essentials ensures uninterrupted skin barrier balance, accelerated clarity, and daily luminosity.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#complete-set"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cocoa-900 text-ivory-100 hover:bg-gold-600 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors shadow-md"
              >
                <span>Shop The 4-Piece Set</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
