import React from 'react';
import { useStore } from '../context/StoreContext';
import { Globe, User, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { store, currency, setCurrency, customer, setIsAuthModalOpen } = useStore();

  const currencies = store?.supportedCurrencies || ['NGN', 'GBP', 'USD', 'EUR', 'CAD'];

  return (
    <div className="bg-cocoa-950 text-ivory-200 text-xs py-2 px-3 sm:px-4 border-b border-cocoa-800/60 tracking-wider">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left">
        {/* Left: Security & Backend Authority */}
        <div className="hidden md:flex items-center gap-2 text-gold-300 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span>Official BB Glow Store</span>
          <span className="text-cocoa-500">•</span>
          <span className="text-ivory-300">100% Verified Authentic</span>
        </div>

        {/* Center: Store Notice / Offer */}
        <div className="font-serif italic text-xs sm:text-[13px] text-ivory-100 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
          <span>{store?.storeNotice || 'Experience Flawless by BB Glow — Complimentary Nationwide Delivery on Sets'}</span>
        </div>

        {/* Right: Currency & Account */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs">
          {/* Currency Selector */}
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent border-none text-ivory-200 font-medium focus:ring-0 focus:outline-none cursor-pointer hover:text-gold-300 text-xs p-0 pr-1"
              aria-label="Select Currency"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr} className="bg-cocoa-900 text-ivory-100">
                  {curr}
                </option>
              ))}
            </select>
          </div>

          <span className="text-cocoa-700">|</span>

          {/* Account Login / Profile */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-1 text-ivory-300 hover:text-gold-300 transition-colors font-medium"
          >
            <User className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>{customer ? customer.firstName || 'My Account' : 'Sign In'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
