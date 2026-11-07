import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Check,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  Plus,
  Minus,
  Info
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    currency,
    loadProductReviews,
    reviewsByProduct
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');

  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0);
      setSelectedVariantId(selectedProduct.variants[0]?.uuid);
      setQuantity(1);
      loadProductReviews(selectedProduct.uuid);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const currentPrice = selectedProduct.discountedPrice !== null ? selectedProduct.discountedPrice : selectedProduct.price;
  const hasDiscount = selectedProduct.discountedPrice !== null && selectedProduct.discountedPrice < selectedProduct.price;
  const isOutOfStock = selectedProduct.stock <= 0 || selectedProduct.status === 'OUT_OF_STOCK';
  const reviews = reviewsByProduct[selectedProduct.uuid] || [];

  const formatPrice = (val: number) => {
    if (currency === 'NGN') return `₦${val.toLocaleString()}`;
    if (currency === 'USD') return `$${val.toLocaleString()}`;
    if (currency === 'GBP') return `£${val.toLocaleString()}`;
    if (currency === 'EUR') return `€${val.toLocaleString()}`;
    if (currency === 'CAD') return `CA$${val.toLocaleString()}`;
    return `${currency} ${val.toLocaleString()}`;
  };

  const handleAddToCart = async () => {
    if (isOutOfStock || isAdding) return;
    setIsAdding(true);
    const success = await addToCart(selectedProduct.uuid, selectedVariantId, quantity);
    setIsAdding(false);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  // Dynamic WhatsApp Product Enquiry
  const whatsappUrl = `https://wa.me/2347042061009?text=${encodeURIComponent(
    `Hello BB Glow Skincare, I have a question about ${selectedProduct.name} (Ref: ${selectedProduct.uuid}). Could you assist me with guidance?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-cocoa-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-ivory-50 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-ivory-200 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-ivory-100 hover:bg-gold-100 text-cocoa-800 transition-colors shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-gradient-to-b from-champagne-light to-ivory-200 p-6 flex items-center justify-center border border-ivory-200/80 overflow-hidden relative">
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-cocoa-900 text-gold-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-10">
                  Special Offer
                </div>
              )}
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-contain max-h-80 drop-shadow-xl transition-all duration-300"
              />
            </div>

            {/* Thumbnail Carousel */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl border-2 p-1.5 transition-all bg-white ${
                      activeImageIndex === idx ? 'border-gold-500 scale-105' : 'border-ivory-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* WhatsApp Product Support */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-emerald-600/30 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors text-xs font-semibold tracking-wider uppercase mt-4"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask a BB Glow Skincare Specialist</span>
            </a>
          </div>

          {/* Right Column: Product Detail & Authoritative Controls */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Verified Backend Tag */}
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-widest text-gold-600 font-semibold">
                  {selectedProduct.categories[0]?.name || 'BB Glow Flawless'}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-cocoa-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                  <span>100% Authentic Formula</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-950 leading-tight">
                {selectedProduct.name}
              </h2>

              {/* Reviews Summary */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-cocoa-600">
                  <div className="flex text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                  <span>({reviews.length} Verified Customer Reviews)</span>
                </div>
              )}

              {/* Authoritative Pricing */}
              <div className="flex items-baseline gap-3 py-1">
                <span className="font-serif text-3xl font-bold text-cocoa-950">
                  {formatPrice(currentPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-cocoa-400 line-through">
                    {formatPrice(selectedProduct.price)}
                  </span>
                )}
                {selectedProduct.size && (
                  <span className="text-xs bg-gold-100 text-gold-800 px-2.5 py-1 rounded-md font-medium">
                    {selectedProduct.size}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-cocoa-700 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Bundle Contents List if Set */}
              {selectedProduct.isBundle && selectedProduct.bundleItems && (
                <div className="p-3.5 bg-champagne-light rounded-xl border border-gold-200 text-xs space-y-1.5">
                  <p className="font-semibold text-cocoa-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                    <span>Included in this Set:</span>
                  </p>
                  <ul className="list-disc list-inside text-cocoa-700 space-y-1 pl-1">
                    {selectedProduct.bundleItems.map((item, i) => (
                      <li key={i}>
                        <span className="font-medium text-cocoa-900">{item.quantity}x</span> {item.productName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tabs for Benefits, Ingredients, Usage */}
              <div className="pt-2">
                <div className="flex border-b border-ivory-200 gap-6 text-xs font-semibold uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2 transition-all relative ${
                      activeTab === 'benefits'
                        ? 'text-gold-600 border-b-2 border-gold-600'
                        : 'text-cocoa-500 hover:text-cocoa-900'
                    }`}
                  >
                    Benefits
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2 transition-all relative ${
                      activeTab === 'ingredients'
                        ? 'text-gold-600 border-b-2 border-gold-600'
                        : 'text-cocoa-500 hover:text-cocoa-900'
                    }`}
                  >
                    Ingredients
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-2 transition-all relative ${
                      activeTab === 'usage'
                        ? 'text-gold-600 border-b-2 border-gold-600'
                        : 'text-cocoa-500 hover:text-cocoa-900'
                    }`}
                  >
                    How to Use
                  </button>
                </div>

                <div className="py-3 text-xs text-cocoa-700 leading-relaxed min-h-[90px]">
                  {activeTab === 'benefits' && (
                    <ul className="space-y-1.5">
                      {(selectedProduct.benefits || ['Delivers deep clarity and long-lasting glow.']).map(
                        (b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                  {activeTab === 'ingredients' && (
                    <p className="font-mono text-[11px] text-cocoa-600 bg-white p-3 rounded-xl border border-ivory-200">
                      {selectedProduct.ingredients || 'Deionized Aqua, Natural Botanical Bio-Actives, Niacinamide, Glycerin.'}
                    </p>
                  )}
                  {activeTab === 'usage' && (
                    <p>
                      {selectedProduct.usageInstructions || 'Apply onto clean skin and massage gently until absorbed.'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-4 border-t border-ivory-200">
              <div className="flex items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center border border-ivory-300 rounded-xl bg-white px-3 py-1.5 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="p-1 text-cocoa-700 hover:text-gold-600 disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-semibold text-cocoa-900 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    disabled={quantity >= selectedProduct.stock || isOutOfStock}
                    className="p-1 text-cocoa-700 hover:text-gold-600 disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Stock Note */}
                <div className="text-xs text-cocoa-500">
                  {isOutOfStock ? (
                    <span className="text-rose-600 font-semibold">Currently Out of Stock</span>
                  ) : (
                    <span>{selectedProduct.stock} units currently available</span>
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className={`w-full py-4 px-6 rounded-2xl font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md ${
                  isOutOfStock
                    ? 'bg-ivory-300 text-cocoa-400 cursor-not-allowed'
                    : justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-cocoa-900 text-ivory-100 hover:bg-gold-600'
                }`}
              >
                {isAdding ? (
                  <span>Adding to Bag...</span>
                ) : justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatPrice(currentPrice * quantity)}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
