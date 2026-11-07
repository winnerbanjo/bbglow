import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BeforeAfterSection: React.FC = () => {
  const { setSelectedProduct, products } = useStore();
  const [activeCase, setActiveCase] = useState<number>(0);

  const completeSet = products.find((p) => p.isBundle) || products[0];

  const caseStudies = [
    {
      title: 'Dark Blemishes & Hyperpigmentation Clearance',
      image: '/images/before-after-2.jpg',
      author: 'Chioma D. (Lagos, Nigeria)',
      age: '26 Years Old',
      concern: 'Post-inflammatory hyperpigmentation, uneven tone, texture',
      timeline: '28-Day Protocol',
      routineUsed: 'Flawless Face Wash (200ml) + Flawless Body Milk (500ml)',
      quote: 'I had severe dark spots across my cheeks and forehead that refused to fade with ordinary cleansers. Within 3 weeks of the Flawless protocol, the discoloration completely dissolved into a healthy, glass-like radiance. No bleaching, no harsh peeling.'
    },
    {
      title: 'Skin Texture Refinement & Golden Radiance',
      image: '/images/before-after-1.jpg',
      author: 'Halima B. (Abuja, Nigeria)',
      age: '31 Years Old',
      concern: 'Sun damage, dullness, rough epidermal texture',
      timeline: '4-Week Transformation',
      routineUsed: 'The Flawless Complete Set (Face Wash + Body Milk Duo)',
      quote: 'My skin barrier was compromised from sun exposure. The Flawless Body Milk and Face Wash deeply hydrated and balanced my oil levels. My complexion has a smooth, radiant glow from morning until evening.'
    }
  ];

  const metrics = [
    { value: '94%', label: 'Noticeable reduction in dark marks within 21 days' },
    { value: '98%', label: 'Reported 24-hour hydration without greasy heaviness' },
    { value: '91%', label: 'Observed clearer, unified tone without rebound pigmentation' },
    { value: '100%', label: 'Hydroquinone-free & NAFDAC A2-030 verified' }
  ];

  return (
    <section id="results" className="py-20 sm:py-28 bg-gradient-to-b from-ivory-50 via-champagne-light/40 to-ivory-100 border-b border-ivory-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">
            <Award className="w-3.5 h-3.5 text-gold-600" />
            <span>Proven Real-World Transformations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa-950 tracking-tight">
            Visible Results. <span className="italic font-normal text-gold-600">Pure Radiance.</span>
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-gold-400 mx-auto mt-2 sm:mt-4" />
          <p className="text-cocoa-700 text-sm sm:text-base leading-relaxed pt-2 px-2">
            Real customers, unfiltered progress. See how the medical-grade bio-actives in Flawless by BB Glow restore skin clarity, smooth texture, and unlock true luminescence.
          </p>
        </div>

        {/* Clinical Metrics Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white/90 p-5 sm:p-6 rounded-2xl border border-ivory-200 shadow-sm text-center space-y-1.5"
            >
              <span className="font-serif text-3xl sm:text-4xl font-black text-cocoa-950 block">
                {m.value}
              </span>
              <p className="text-[11px] sm:text-xs text-cocoa-600 font-medium leading-snug">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Case Study Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-ivory-200 shadow-xl overflow-hidden">
          
          {/* Case Study Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 pb-8 mb-8 border-b border-ivory-200 overflow-x-auto text-xs">
            {caseStudies.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveCase(i)}
                className={`px-5 py-2.5 rounded-full font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  activeCase === i
                    ? 'bg-cocoa-900 text-white shadow-md'
                    : 'bg-ivory-100 text-cocoa-700 hover:bg-gold-100'
                }`}
              >
                Case Study 0{i + 1}: {c.author.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Active Case Study Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Before & After Split Image Frame */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-ivory-300 shadow-lg bg-ivory-100">
                <img
                  src={caseStudies[activeCase].image}
                  alt={caseStudies[activeCase].title}
                  className="w-full h-auto object-cover max-h-[480px] mx-auto"
                />

                {/* Floating "Before" & "After" Labels */}
                <div className="absolute top-4 left-4 bg-cocoa-950/85 backdrop-blur-sm text-ivory-100 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  Before (Day 0)
                </div>
                <div className="absolute top-4 right-4 bg-gold-600/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  After ({caseStudies[activeCase].timeline})
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-cocoa-500 font-medium px-1">
                <span>Verified Client Case Study</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Documented Skin Transformation</span>
                </span>
              </div>
            </div>

            {/* Right: Detailed Journey & Testimonial */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700 bg-champagne-light px-3 py-1 rounded-full border border-gold-200">
                  {caseStudies[activeCase].timeline}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-950 leading-tight">
                  {caseStudies[activeCase].title}
                </h3>
              </div>

              {/* Story Quote */}
              <div className="p-5 rounded-2xl bg-ivory-50 border border-ivory-200/90 relative">
                <p className="text-xs sm:text-sm text-cocoa-800 leading-relaxed italic">
                  "{caseStudies[activeCase].quote}"
                </p>
                <div className="pt-3 mt-3 border-t border-ivory-200 flex items-center justify-between text-xs font-semibold text-cocoa-900">
                  <span>{caseStudies[activeCase].author}</span>
                  <span className="text-gold-700 text-[11px] font-normal">{caseStudies[activeCase].age}</span>
                </div>
              </div>

              {/* Protocol Specs */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-cocoa-700">
                  <span className="font-semibold text-cocoa-900 min-w-[100px]">Skin Concern:</span>
                  <span>{caseStudies[activeCase].concern}</span>
                </div>
                <div className="flex items-start gap-2 text-cocoa-700">
                  <span className="font-semibold text-cocoa-900 min-w-[100px]">Routine Used:</span>
                  <span className="font-medium text-gold-800">{caseStudies[activeCase].routineUsed}</span>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="pt-2">
                <a
                  href="#complete-set"
                  className="w-full sm:w-auto px-8 py-4 bg-cocoa-900 text-ivory-100 hover:bg-gold-600 rounded-full font-semibold uppercase tracking-wider text-xs transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 group"
                >
                  <span>Start Your Own Transformation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
