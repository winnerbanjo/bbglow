import React from 'react';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const VisualGallery: React.FC = () => {
  const { products, setSelectedProduct } = useStore();

  const faceWash = products.find((p) => p.slug?.includes('face-wash') || p.name?.toLowerCase().includes('face wash')) || products[0];
  const completeSet = products.find((p) => p.isBundle) || products[0];
  const toner = products.find((p) => p.slug?.includes('toner') || p.name?.toLowerCase().includes('toner')) || products[0];

  const galleryItems = [
    {
      image: '/images/flawless-model-facewash.jpg',
      title: 'Flawless Clarifying Protocol',
      caption: 'Pure Botanical Radiance',
      span: 'col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] sm:aspect-[4/5] md:aspect-auto',
      product: faceWash
    },
    {
      image: '/images/flawless-ritual-mirror.jpg',
      title: 'The Daily Vanity Ritual',
      caption: 'Complete 4-Piece Experience',
      span: 'col-span-1 md:col-span-1 md:row-span-1 aspect-[4/5]',
      product: completeSet
    },
    {
      image: '/images/flawless-toner-cream-duo.jpg',
      title: 'Toner & Cream Radiance Duo',
      caption: 'Pore Tightening & Glass Finish',
      span: 'col-span-1 md:col-span-1 md:row-span-1 aspect-[4/5]',
      product: toner
    },
    {
      image: '/images/flawless-model-glow.jpg',
      title: 'All-Day Satin Glow',
      caption: 'Deep Velvet Hydration',
      span: 'col-span-1 md:col-span-1 md:row-span-1 aspect-[4/5]',
      product: faceWash
    },
    {
      image: '/images/flawless-trio-vanity.jpg',
      title: 'Signature Gold Collection',
      caption: 'Authentic BB Glow Luxury',
      span: 'col-span-1 md:col-span-1 md:row-span-1 aspect-[4/5]',
      product: completeSet
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory-50 border-b border-ivory-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14 text-center md:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Visual Campaign</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950">
              Experience The Glow
            </h2>
            <p className="text-cocoa-600 text-xs sm:text-sm max-w-lg">
              Authentic luxury formulations in action. Designed for luminous, healthy skin every day.
            </p>
          </div>

          <a
            href="#collection"
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-cocoa-900 hover:text-gold-600 transition-colors py-2"
          >
            <span>Explore All Formulations</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Editorial Photo Grid - 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => item.product && setSelectedProduct(item.product)}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-ivory-200 bg-ivory-200 ring-1 ring-gold-200/20 ${item.span}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/80 via-cocoa-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white flex items-end justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold block">
                    {item.caption}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 ml-2 group-hover:scale-110">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
