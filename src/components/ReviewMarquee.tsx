import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const ReviewMarquee: React.FC = () => {
  const marqueeReviews = [
    {
      author: 'Amina O.',
      location: 'Lagos',
      quote: 'The glow after 2 weeks is unbelievable! Absorbs like a dream in Lagos heat.',
      product: 'Flawless Body Milk'
    },
    {
      author: 'Dr. Kemi A.',
      location: 'Victoria Island',
      quote: 'Medical-grade bio-actives with verified NAFDAC A2-030. Impressive formulation.',
      product: 'Complete Protocol'
    },
    {
      author: 'Ngozi E.',
      location: 'London, UK',
      quote: 'Dispatched to the UK in 4 days. Keeps my skin luminous even in winter.',
      product: 'Flawless Body Milk'
    },
    {
      author: 'Chiamaka N.',
      location: 'Enugu',
      quote: 'Face Wash doesn’t strip my barrier. Dark acne blemishes have noticeably faded.',
      product: 'Flawless Face Wash'
    },
    {
      author: 'Stephanie & Tolu',
      location: 'Ibadan',
      quote: 'The gold presentation box is luxury. Skin has never looked so uniform and radiant.',
      product: 'Complete Set'
    },
    {
      author: 'Blessing M.',
      location: 'Atlanta, USA',
      quote: 'Ordered via Nile with Stripe. 100% authentic formula with visible tone unification.',
      product: 'Flawless Body Milk'
    },
    {
      author: 'Folake T.',
      location: 'Abuja',
      quote: 'Bridal glow prep sorted! Everyone asked what I used on my skin.',
      product: 'Starter Set'
    },
    {
      author: 'Halima S.',
      location: 'Port Harcourt',
      quote: 'Faded stubborn sun tan lines within 3 weeks. Extremely gentle.',
      product: 'Flawless Face Wash'
    }
  ];

  // Duplicate for seamless infinite loop
  const list = [...marqueeReviews, ...marqueeReviews];

  return (
    <div className="py-6 bg-cocoa-950 text-ivory-100 overflow-hidden border-y border-cocoa-800/80 relative select-none">
      {/* Gradient edge masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cocoa-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cocoa-950 to-transparent z-10 pointer-events-none" />

      {/* Ribbon 1: Moving Left */}
      <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
        {list.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-cocoa-900/80 border border-cocoa-800 px-5 py-3 rounded-2xl shrink-0"
          >
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-ivory-200 italic max-w-xs truncate">
              "{r.quote}"
            </p>
            <span className="text-cocoa-500 text-xs">•</span>
            <span className="text-xs font-semibold text-gold-300 whitespace-nowrap">
              {r.author} ({r.location})
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
              <CheckCircle className="w-2.5 h-2.5" />
              <span>Verified</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
