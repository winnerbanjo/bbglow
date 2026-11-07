import React from 'react';
import { ShieldCheck, MessageCircle, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { store } = useStore();

  return (
    <footer className="bg-cocoa-950 text-ivory-200 pt-16 pb-12 border-t border-cocoa-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white p-1 border border-gold-400 flex items-center justify-center">
                <img
                  src="https://bbglowskincare.com/cdn/shop/files/1001408077.png"
                  alt="BB Glow"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif tracking-[0.2em] text-xl font-bold text-white">
                B.B. GLOW
              </span>
            </div>
            <p className="text-xs text-ivory-300 max-w-sm leading-relaxed font-normal">
              Medical-grade radiance skincare formulated for hyperpigmentation-prone and delicate skin. Crafted with pride, verified for authenticity, and designed to reveal pure, even-toned luminescence.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-gold-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Guaranteed Authentic Formulation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li><a href="#collection" className="hover:text-gold-300 transition-colors">Face Wash (200ml)</a></li>
              <li><a href="#collection" className="hover:text-gold-300 transition-colors">Body Milk (500ml)</a></li>
              <li><a href="#complete-set" className="hover:text-gold-300 transition-colors">Starter Set</a></li>
              <li><a href="#complete-set" className="hover:text-gold-300 transition-colors">Complete Set</a></li>
            </ul>
          </div>

          {/* Brand & Ritual */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li><a href="#results" className="hover:text-gold-300 transition-colors">Before & After Results</a></li>
              <li><a href="#routine" className="hover:text-gold-300 transition-colors">The 3-Step Protocol</a></li>
              <li><a href="#ingredients" className="hover:text-gold-300 transition-colors">Active Ingredients</a></li>
              <li><a href="#delivery" className="hover:text-gold-300 transition-colors">Delivery Timelines</a></li>
              <li><a href="#reviews" className="hover:text-gold-300 transition-colors">Customer Reviews</a></li>
              <li><a href="#faq" className="hover:text-gold-300 transition-colors">FAQ & Support</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Direct Assistance
            </h4>
            <p className="text-xs text-ivory-300 leading-relaxed">
              Have questions about your skincare routine or order status? Chat directly with a BB Glow specialist:
            </p>
            <a
              href="https://wa.me/2347042061009"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +234 704 2061 009</span>
            </a>
            <p className="text-[11px] text-cocoa-400">
              Email: support@bbglowskincare.com
            </p>
          </div>

        </div>

        {/* Payment Providers & Architecture Credit */}
        <div className="pt-8 border-t border-cocoa-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cocoa-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-cocoa-500 font-semibold">
              Accepted Payment Methods:
            </span>
            <span className="px-2 py-0.5 rounded bg-cocoa-900 border border-cocoa-800 text-[11px] text-ivory-200 font-medium">
              Paystack
            </span>
            <span className="px-2 py-0.5 rounded bg-cocoa-900 border border-cocoa-800 text-[11px] text-ivory-200 font-medium">
              Flutterwave
            </span>
            <span className="px-2 py-0.5 rounded bg-cocoa-900 border border-cocoa-800 text-[11px] text-ivory-200 font-medium">
              Stripe
            </span>
            <span className="px-2 py-0.5 rounded bg-cocoa-900 border border-cocoa-800 text-[11px] text-ivory-200 font-medium">
              Mastercard / Visa
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://bbglowskincare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory-200 flex items-center gap-1"
            >
              <span>bbglowskincare.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-cocoa-900/60 text-center text-[11px] text-cocoa-500">
          <p>© {new Date().getFullYear()} BB Glow Skincare. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};
