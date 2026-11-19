import React, { useState } from 'react';
import { NileProduct } from '../types/nile';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: NileProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, currency } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Authoritative Nile pricing
  const currentPrice = product.discountedPrice !== null ? product.discountedPrice : product.price;
  const hasDiscount = product.discountedPrice !== null && product.discountedPrice < product.price;
  const isOutOfStock = product.stock <= 0 || product.status === 'OUT_OF_STOCK';

  // Currency Formatter
  const formatPrice = (val: number) => {
    if (currency === 'NGN') return `₦${val.toLocaleString()}`;
    if (currency === 'USD') return `$${val.toLocaleString()}`;
    if (currency === 'GBP') return `£${val.toLocaleString()}`;
    if (currency === 'EUR') return `€${val.toLocaleString()}`;
    if (currency === 'CAD') return `CA$${val.toLocaleString()}`;
    return `${currency} ${val.toLocaleString()}`;
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock || isAdding) return;

    setIsAdding(true);
    const success = await addToCart(product.uuid, product.variants?.[0]?.uuid, 1);
    setIsAdding(false);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="bg-ivory-50 rounded-2xl border border-ivory-200/90 overflow-hidden hover:border-gold-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group flex flex-col cursor-pointer ring-1 ring-gold-200/30 hover:ring-gold-400/60"
    >
      {/* Image Container with Badges & Interactive Overlays */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-champagne-light via-ivory-100 to-ivory-200 overflow-hidden p-2 sm:p-5 flex items-center justify-center">
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-cocoa-900 text-gold-300 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm z-10">
            Special Offer
          </div>
        )}

        {/* Bundle Tag */}
        {product.isBundle && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gold-600 text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm z-10">
            Curated Set
          </div>
        )}

        {/* Stock Tag */}
        {isOutOfStock ? (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-20 flex items-center justify-center">
            <span className="bg-cocoa-900 text-white text-[10px] sm:text-xs uppercase tracking-widest font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              Sold Out
            </span>
          </div>
        ) : product.stock <= 5 ? (
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-amber-100 text-amber-900 text-[8px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full z-10">
            {product.stock} left
          </div>
        ) : null}

        {/* Interactive Quick Add Floating Button on Image (Mobile) */}
        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`absolute bottom-2 right-2 z-10 w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-all duration-300 active:scale-90 sm:hidden ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-white/95 text-cocoa-950 hover:bg-gold-500 hover:text-white'
            }`}
            aria-label="Quick Add to Bag"
          >
            {justAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Product Image */}
        <img
          src={product.images?.[0] || 'https://bbglowskincare.com/cdn/shop/files/1001408077.png'}
          alt={product.name}
          className="w-full h-full object-contain max-h-36 sm:max-h-60 transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://bbglowskincare.com/cdn/shop/files/1001408077.png';
          }}
        />

        {/* Quick Hover / Tap Action Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-cocoa-950/70 via-cocoa-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="px-3 py-1.5 bg-ivory-50/95 text-cocoa-900 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-500 hover:text-white transition-all shadow-md active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information & Integrated Button */}
      <div className="p-2.5 sm:p-4 space-y-1.5 sm:space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category & Size */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-cocoa-500 uppercase tracking-wider font-medium">
            <span className="truncate">{product.categories?.[0]?.name || 'Flawless Routine'}</span>
            {product.size && (
              <span className="text-gold-700 font-semibold shrink-0 ml-1 bg-champagne-light/90 px-1.5 py-0.5 rounded text-[8px] sm:text-[10px]">
                {product.size}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-xs sm:text-base lg:text-lg font-bold text-cocoa-950 line-clamp-1 group-hover:text-gold-700 transition-colors">
            {product.name}
          </h3>

          {/* Authoritative Pricing */}
          <div className="pt-0.5 flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-serif text-sm sm:text-base lg:text-lg font-bold text-cocoa-950">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-[10px] sm:text-xs text-cocoa-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Action Button - Moved UP right inside the card info */}
        <div className="pt-1.5">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
            className={`w-full py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl font-semibold uppercase tracking-wider text-[10px] sm:text-xs transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.97] ${
              isOutOfStock
                ? 'bg-ivory-200 text-cocoa-400 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-cocoa-900 text-ivory-100 hover:bg-gold-600 hover:shadow-md'
            }`}
          >
            {isAdding ? (
              <span>Adding...</span>
            ) : justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
