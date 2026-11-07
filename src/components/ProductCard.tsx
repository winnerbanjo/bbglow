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
    const success = await addToCart(product.uuid, product.variants[0]?.uuid, 1);
    setIsAdding(false);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="bg-ivory-50 rounded-2xl border border-ivory-200 overflow-hidden hover:border-gold-300 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/5] bg-gradient-to-b from-champagne-light via-ivory-100 to-ivory-200 overflow-hidden p-4 sm:p-6 flex items-center justify-center">
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-cocoa-900 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10">
              Special Glow Offer
            </div>
          )}

          {/* Bundle Tag */}
          {product.isBundle && (
            <div className="absolute top-3 right-3 bg-gold-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10">
              Curated Set
            </div>
          )}

          {/* Stock Tag */}
          {isOutOfStock ? (
            <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] z-20 flex items-center justify-center">
              <span className="bg-cocoa-900 text-white text-[11px] sm:text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full">
                Sold Out
              </span>
            </div>
          ) : product.stock <= 5 ? (
            <div className="absolute bottom-3 left-3 bg-amber-100 text-amber-900 text-[10px] font-semibold px-2 py-0.5 rounded-full z-10">
              Only {product.stock} left in stock
            </div>
          ) : null}

          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain max-h-56 sm:max-h-64 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Quick Hover / Tap Action Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-cocoa-950/60 via-cocoa-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              className="px-3.5 py-2 bg-ivory-50 text-cocoa-900 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-500 hover:text-white transition-colors shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3">
          {/* Category & Size */}
          <div className="flex items-center justify-between text-[11px] text-cocoa-500 uppercase tracking-wider font-medium">
            <span>{product.categories[0]?.name || 'Flawless Routine'}</span>
            {product.size && <span className="text-gold-700 font-semibold">{product.size}</span>}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-cocoa-950 line-clamp-1 group-hover:text-gold-700 transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-cocoa-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Authoritative Pricing */}
          <div className="pt-1 flex items-baseline gap-2.5">
            <span className="font-serif text-lg sm:text-xl font-bold text-cocoa-950">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-cocoa-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
          className={`w-full py-3.5 px-4 rounded-xl font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
            isOutOfStock
              ? 'bg-ivory-200 text-cocoa-400 cursor-not-allowed'
              : justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-cocoa-900 text-ivory-100 hover:bg-gold-600 active:scale-[0.98]'
          }`}
        >
          {isAdding ? (
            <span>Adding to Cart...</span>
          ) : justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
