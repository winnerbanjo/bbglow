import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Search, Filter } from 'lucide-react';

export const ProductCollection: React.FC = () => {
  const { products, categories, activeCategory, setActiveCategory, isLoadingProducts } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by active category & search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !activeCategory ||
      product.categories.some((c) => String(c.id) === activeCategory || c.slug === activeCategory);
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="collection" className="py-16 sm:py-24 bg-ivory-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
              <span>Pure Botanical Formulations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950">
              The Flawless Collection
            </h2>
            <p className="text-cocoa-600 text-xs sm:text-sm md:text-base max-w-xl">
              Authentic medical-grade formulations designed to restore pure radiance, deeply nourish, and maintain a luminous complexion.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-cocoa-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Flawless products..."
              className="w-full pl-10 pr-4 py-3 sm:py-2.5 rounded-full bg-white border border-ivory-300 text-xs text-cocoa-900 placeholder:text-cocoa-400 focus:outline-none focus:border-gold-500 shadow-sm"
            />
          </div>
        </div>

        {/* Category Tabs - Touch-Friendly Swipe on Mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 shrink-0 ${
              activeCategory === null
                ? 'bg-cocoa-900 text-ivory-100 shadow-sm'
                : 'bg-ivory-200/80 text-cocoa-700 hover:bg-gold-100 hover:text-cocoa-900'
            }`}
          >
            All Products ({products.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(String(cat.id))}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 shrink-0 ${
                activeCategory === String(cat.id)
                  ? 'bg-cocoa-900 text-ivory-100 shadow-sm'
                  : 'bg-ivory-200/80 text-cocoa-700 hover:bg-gold-100 hover:text-cocoa-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-ivory-100 rounded-2xl h-80 sm:h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 sm:py-16 bg-ivory-100/50 rounded-3xl border border-ivory-200 p-6 sm:p-8 space-y-4">
            <Filter className="w-10 h-10 text-gold-500 mx-auto" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-cocoa-900">
              No products found
            </h3>
            <p className="text-xs sm:text-sm text-cocoa-600 max-w-md mx-auto">
              We couldn't find any products matching your selection. Try clearing filters or searching for another skincare item.
            </p>
            <button
              onClick={() => {
                setActiveCategory(null);
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-cocoa-900 text-ivory-100 text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-gold-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Products Grid - 1 Col on small mobile, 2 Col on tablet, 3-4 Col on desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.uuid} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
