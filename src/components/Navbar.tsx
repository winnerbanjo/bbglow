import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, User, Menu, X, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cart, setIsCartOpen, setIsAuthModalOpen, customer, setIsDevDrawerOpen, lastRequestId } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart?.itemCount || 0;

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Results', href: '#results' },
    { label: 'The Ritual', href: '#routine' },
    { label: 'Complete Sets', href: '#complete-set' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Delivery', href: '#delivery' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-ivory-50/95 backdrop-blur-md border-b border-ivory-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-cocoa-800 hover:text-gold-500 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo Brand Title */}
          <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-gold-300/60 overflow-hidden flex items-center justify-center bg-white shadow-sm p-1">
                <img
                  src="https://bbglowskincare.com/cdn/shop/files/1001408077.png"
                  alt="BB Glow Skincare"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to monogram if image link fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif tracking-[0.2em] text-lg font-bold text-cocoa-900 group-hover:text-gold-600 transition-colors">
                  B.B. GLOW
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold-600 font-semibold">
                  Flawless Skincare
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] font-medium text-cocoa-800 hover:text-gold-600 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">


            {/* Customer Account Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="p-2 text-cocoa-800 hover:text-gold-600 transition-colors relative"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
              {customer && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-cocoa-900 text-ivory-100 hover:bg-gold-600 rounded-full transition-all duration-300 shadow-sm flex items-center justify-center group"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-500 text-cocoa-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-ivory-50 animate-fade-in shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-ivory-200 py-4 px-2 space-y-3 bg-ivory-50 animate-slide-down">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm uppercase tracking-wider font-medium text-cocoa-800 hover:text-gold-600 hover:bg-ivory-100 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-ivory-200 flex items-center justify-between px-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-2 text-sm text-cocoa-800 hover:text-gold-600"
              >
                <User className="w-4 h-4 text-gold-500" />
                <span>{customer ? customer.firstName || 'My Account' : 'Customer Sign In'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
