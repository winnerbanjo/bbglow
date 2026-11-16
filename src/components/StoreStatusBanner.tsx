import React from 'react';
import { useStore } from '../context/StoreContext';
import { AlertTriangle, Clock, AlertCircle } from 'lucide-react';

export const StoreStatusBanner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status, store, refetchStore, originNotice, setIsDevDrawerOpen } = useStore();

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://www.bbglowskincare.shop';

  const renderOriginNotice = originNotice ? (
    <div className="bg-amber-900 text-amber-100 text-xs px-4 py-2.5 shadow-inner border-b border-amber-800 flex items-center justify-between gap-3 z-50 relative">
      <div className="flex items-center gap-2 max-w-4xl mx-auto text-left">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>Nile Dashboard Setup Required:</strong> Domain <code className="bg-black/30 px-1.5 py-0.5 rounded text-gold-300 font-mono text-[11px]">{currentOrigin}</code> must be added to <strong>Allowed Origins</strong> for your API key on the Nile Dashboard so live products sync directly.
        </span>
      </div>
      <button
        onClick={() => setIsDevDrawerOpen(true)}
        className="px-2.5 py-1 bg-amber-800 hover:bg-amber-700 text-white rounded text-[10px] font-semibold uppercase tracking-wider shrink-0 transition-colors"
      >
        Diagnostics
      </button>
    </div>
  ) : null;
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
  return (
    <>
      {renderOriginNotice}
      {children}
    </>
  );
};
