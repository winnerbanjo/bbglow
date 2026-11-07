import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    isCartLoading,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    currency,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  const items = cart?.items || [];
  const isEmpty = items.length === 0;

  const formatPrice = (val: number) => {
    if (currency === 'NGN') return `₦${val.toLocaleString()}`;
    if (currency === 'USD') return `$${val.toLocaleString()}`;
    if (currency === 'GBP') return `£${val.toLocaleString()}`;
    if (currency === 'EUR') return `€${val.toLocaleString()}`;
    if (currency === 'CAD') return `CA$${val.toLocaleString()}`;
    return `${currency} ${val.toLocaleString()}`;
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-cocoa-950/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory-50 border-l border-ivory-200 shadow-2xl flex flex-col justify-between animate-drawer">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-ivory-200/80 bg-white/70 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-700">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-cocoa-950">
                    Your Shopping Bag
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider text-cocoa-500 font-medium">
                    {cart?.itemCount || 0} {cart?.itemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-cocoa-400 hover:text-cocoa-900 rounded-full hover:bg-ivory-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 py-1.5 px-3 bg-champagne-light rounded-lg border border-gold-200 flex items-center justify-between text-[11px] text-cocoa-700">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                <span>100% Genuine Skincare Guaranteed</span>
              </span>
            </div>
          </div>

          {/* Drawer Body: Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isEmpty ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-ivory-200 flex items-center justify-center text-cocoa-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-cocoa-900">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-cocoa-600 max-w-xs mx-auto">
                    Explore the Flawless collection to discover your personalized brightening and glow ritual.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-cocoa-900 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-gold-600 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId || 'default'}`}
                    className="bg-white rounded-2xl p-4 border border-ivory-200 shadow-sm flex gap-4 items-center group"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-xl bg-champagne-light p-1.5 flex items-center justify-center shrink-0 border border-ivory-200 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-serif text-sm font-bold text-cocoa-950 truncate">
                        {item.name}
                      </h4>
                      {item.size && (
                        <p className="text-[11px] text-cocoa-500 font-medium">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="text-xs font-bold text-cocoa-900">
                        {formatPrice(item.discountedUnitPrice || item.unitPrice)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center border border-ivory-300 rounded-lg bg-ivory-50 px-2 py-0.5">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.productId, item.quantity - 1, item.variantId)
                            }
                            className="p-0.5 text-cocoa-600 hover:text-gold-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-cocoa-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.productId, item.quantity + 1, item.variantId)
                            }
                            className="p-0.5 text-cocoa-600 hover:text-gold-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-cocoa-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Item Subtotal */}
                    <div className="text-right">
                      <span className="font-serif text-sm font-bold text-cocoa-950">
                        {formatPrice(item.subtotal)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <div className="pt-2 text-right">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-cocoa-500 hover:text-rose-600 underline font-medium"
                  >
                    Empty Bag
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer: Authoritative Totals & Checkout */}
          {!isEmpty && (
            <div className="p-6 bg-white border-t border-ivory-200/90 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-cocoa-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart?.subtotal || 0)}</span>
                </div>
                {(cart?.totalDiscount || 0) > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promotional Discount</span>
                    <span>-{formatPrice(cart?.totalDiscount || 0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-cocoa-600">
                  <span>Shipping</span>
                  <span className="text-emerald-700 font-semibold">Calculated at Checkout</span>
                </div>
                <div className="pt-2 border-t border-ivory-200 flex justify-between text-sm sm:text-base font-bold text-cocoa-950 font-serif">
                  <span>Estimated Total</span>
                  <span className="text-lg text-gold-700">{formatPrice(cart?.total || 0)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleProceedToCheckout}
                disabled={isCartLoading}
                className="w-full py-4 px-6 rounded-2xl bg-cocoa-900 text-ivory-100 hover:bg-gold-600 font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-[10px] text-center text-cocoa-400">
                🔒 256-Bit SSL Encrypted Checkout
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
