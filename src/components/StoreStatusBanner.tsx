import React from 'react';
import { useStore } from '../context/StoreContext';
import { AlertTriangle, Clock } from 'lucide-react';

export const StoreStatusBanner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status, store, refetchStore } = useStore();



  // 3. Store Status: PAUSED
  if (status?.status === 'PAUSED') {
    return (
      <div className="min-h-screen bg-ivory-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-lg bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gold-200 space-y-6">
          <div className="w-16 h-16 rounded-full bg-champagne-light text-gold-700 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              {store?.name || 'BB Glow Skincare'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-cocoa-950">
              Under Scheduled Maintenance
            </h2>
            <p className="text-xs sm:text-sm text-cocoa-700 leading-relaxed pt-2">
              {status.notice ||
                status.message ||
                'Our storefront is temporarily paused while we restock and update collection inventory. Please check back shortly.'}
            </p>
          </div>

          <div className="pt-4 border-t border-ivory-200 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/2347042061009"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs uppercase tracking-wider font-semibold hover:bg-emerald-700 transition-colors"
            >
              Contact Support on WhatsApp
            </a>
            <button
              onClick={() => refetchStore()}
              className="px-6 py-3 border border-cocoa-300 text-cocoa-800 rounded-xl text-xs uppercase tracking-wider font-semibold hover:bg-ivory-100 transition-colors"
            >
              Refresh Status
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Store Status: UNAVAILABLE
  if (status?.status === 'UNAVAILABLE') {
    return (
      <div className="min-h-screen bg-cocoa-950 text-ivory-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 sm:p-10 rounded-3xl bg-cocoa-900 border border-cocoa-800 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              {store?.name || 'BB Glow Skincare'}
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">
              Storefront Currently Unavailable
            </h2>
            <p className="text-xs text-ivory-300 leading-relaxed">
              {status.message || 'The storefront is currently offline for maintenance. Please contact support.'}
            </p>
          </div>

          <a
            href="https://wa.me/2347042061009"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gold-500 text-cocoa-950 rounded-xl text-xs uppercase tracking-wider font-semibold hover:bg-gold-400 transition-colors"
          >
            Direct WhatsApp Inquiries
          </a>
        </div>
      </div>
    );
  }

  // 5. Normal ACTIVE status: render child website components
  return <>{children}</>;
};
