import React from 'react';
import { Truck, Globe2, ShieldCheck, Clock } from 'lucide-react';

export const DeliverySection: React.FC = () => {
  const zones = [
    {
      icon: Clock,
      region: 'Lagos Metropolitan Area',
      timeframe: 'Same Day to 24 Hours',
      description: 'Dedicated courier direct from our climate-controlled Victoria Island fulfillment center.'
    },
    {
      icon: Truck,
      region: 'Nationwide Nigeria',
      timeframe: '2 – 3 Business Days',
      description: 'Doorstep delivery across Abuja, Port Harcourt, Ibadan, Kano, and all 36 states.'
    },
    {
      icon: Globe2,
      region: 'International Shipping',
      timeframe: '4 – 7 Business Days',
      description: 'Priority courier dispatch via DHL Express & FedEx to the United Kingdom, United States, Canada, and Europe.'
    }
  ];

  return (
    <section id="delivery" className="py-24 bg-ivory-100 border-b border-ivory-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
            <Truck className="w-3.5 h-3.5" />
            <span>Reliable Logistics</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950">
            Delivery & Global Dispatch
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
          <p className="text-cocoa-700 text-sm sm:text-base leading-relaxed pt-2">
            Every bottle is individually sealed and dispatched in custom gold-embossed protective packaging to preserve botanical potency.
          </p>
        </div>

        {/* Delivery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {zones.map((zone, idx) => {
            const Icon = zone.icon;
            return (
              <div
                key={idx}
                className="bg-ivory-50 rounded-2xl p-8 border border-ivory-200 hover:border-gold-300 transition-all duration-300 hover:shadow-lg space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-champagne-light border border-gold-200 flex items-center justify-center text-gold-700">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-cocoa-950">
                    {zone.region}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-700 pt-1">
                    {zone.timeframe}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-cocoa-600 leading-relaxed font-normal">
                  {zone.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security & Verification Banner */}
        <div className="mt-12 bg-cocoa-950 text-ivory-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-cocoa-800">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white">
                Tamper-Proof Guarantee & Live Tracking
              </h4>
              <p className="text-xs text-ivory-300">
                You will receive real-time SMS & email tracking as soon as your order is packaged by BB Glow.
              </p>
            </div>
          </div>
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold bg-cocoa-900 px-4 py-2 rounded-full border border-gold-400/30 whitespace-nowrap">
            Direct Brand Dispatch
          </span>
        </div>

      </div>
    </section>
  );
};
