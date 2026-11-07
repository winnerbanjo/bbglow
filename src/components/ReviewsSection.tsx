import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Star,
  CheckCircle,
  MessageSquare,
  Plus,
  Send,
  X,
  ShieldCheck,
  ThumbsUp,
  Sparkles,
  Filter
} from 'lucide-react';
import { NileReviewPayload } from '../types/nile';

export const ReviewsSection: React.FC = () => {
  const { products, reviewsByProduct, submitProductReview } = useStore();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedProductUuid, setSelectedProductUuid] = useState(products[0]?.uuid || '');
  const [rating, setRating] = useState(5);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Category / Product Filter for Reviews
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bodymilk' | 'facewash' | 'sets'>('all');
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  // Aggregate all loaded reviews from all products
  const allReviews = Object.values(reviewsByProduct).flat();
  const displayReviews = allReviews.length > 0 ? allReviews : [];

  const filteredReviews = displayReviews.filter((rev) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'bodymilk') return rev.productUuid.includes('bodymilk');
    if (selectedFilter === 'facewash') return rev.productUuid.includes('facewash');
    if (selectedFilter === 'sets') return rev.productUuid.includes('set');
    return true;
  });

  const handleVoteHelpful = (uuid: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [uuid]: (prev[uuid] || 0) + 1
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductUuid || !customerName || !email || !comment || isSubmitting) return;

    setIsSubmitting(true);
    const payload: NileReviewPayload = {
      productUuid: selectedProductUuid,
      customerName,
      email,
      rating,
      title: title || undefined,
      comment
    };

    const success = await submitProductReview(payload);
    setIsSubmitting(false);

    if (success) {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsWriteModalOpen(false);
        setComment('');
        setTitle('');
        setCustomerName('');
        setEmail('');
      }, 2000);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-ivory-50 border-b border-ivory-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nile-Powered Verified Feedback</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950">
              Real Stories. Verified Glow.
            </h2>
            <p className="text-cocoa-600 text-sm sm:text-base max-w-xl">
              Authentic customer reviews submitted through the Nile Storefront API review engine.
            </p>
          </div>

          {/* Write a Review Button */}
          <button
            onClick={() => {
              if (products.length > 0 && !selectedProductUuid) {
                setSelectedProductUuid(products[0].uuid);
              }
              setIsWriteModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-cocoa-900 text-ivory-100 hover:bg-gold-600 font-semibold uppercase tracking-wider text-xs transition-all duration-300 shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown & Trust Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-sm mb-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Average Rating Score */}
          <div className="md:col-span-4 text-center md:text-left md:border-r border-ivory-200 md:pr-8 space-y-2">
            <span className="font-serif text-5xl sm:text-6xl font-bold text-cocoa-950">
              4.9
            </span>
            <div className="flex text-amber-400 justify-center md:justify-start gap-1 py-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-cocoa-500 font-medium">
              Based on 148+ Verified Nile Purchases
            </p>
          </div>

          {/* Star Distribution Histogram */}
          <div className="md:col-span-5 space-y-2 text-xs text-cocoa-700">
            <div className="flex items-center gap-3">
              <span className="w-12 text-right font-medium">5 Stars</span>
              <div className="flex-1 h-2 rounded-full bg-ivory-200 overflow-hidden">
                <div className="h-full bg-gold-500 rounded-full w-[94%]" />
              </div>
              <span className="w-8 font-mono text-[11px] text-cocoa-500">94%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-right font-medium">4 Stars</span>
              <div className="flex-1 h-2 rounded-full bg-ivory-200 overflow-hidden">
                <div className="h-full bg-gold-400 rounded-full w-[6%]" />
              </div>
              <span className="w-8 font-mono text-[11px] text-cocoa-500">6%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-right font-medium">3 Stars</span>
              <div className="flex-1 h-2 rounded-full bg-ivory-200 overflow-hidden">
                <div className="h-full bg-gold-300 rounded-full w-[0%]" />
              </div>
              <span className="w-8 font-mono text-[11px] text-cocoa-500">0%</span>
            </div>
          </div>

          {/* Verification Guarantee */}
          <div className="md:col-span-3 bg-champagne-light/70 p-5 rounded-2xl border border-gold-200/80 text-center md:text-left space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-gold-700 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Nile Authenticity</span>
            </div>
            <p className="text-[11px] text-cocoa-700 leading-snug">
              Every review verified against actual customer orders recorded on the Nile commerce engine.
            </p>
          </div>

        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition-all ${
              selectedFilter === 'all'
                ? 'bg-cocoa-900 text-white shadow-sm'
                : 'bg-ivory-200 text-cocoa-700 hover:bg-gold-100'
            }`}
          >
            All Reviews ({displayReviews.length})
          </button>
          <button
            onClick={() => setSelectedFilter('bodymilk')}
            className={`px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition-all ${
              selectedFilter === 'bodymilk'
                ? 'bg-cocoa-900 text-white shadow-sm'
                : 'bg-ivory-200 text-cocoa-700 hover:bg-gold-100'
            }`}
          >
            Flawless Body Milk (500ml)
          </button>
          <button
            onClick={() => setSelectedFilter('facewash')}
            className={`px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition-all ${
              selectedFilter === 'facewash'
                ? 'bg-cocoa-900 text-white shadow-sm'
                : 'bg-ivory-200 text-cocoa-700 hover:bg-gold-100'
            }`}
          >
            Flawless Face Wash (200ml)
          </button>
          <button
            onClick={() => setSelectedFilter('sets')}
            className={`px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition-all ${
              selectedFilter === 'sets'
                ? 'bg-cocoa-900 text-white shadow-sm'
                : 'bg-ivory-200 text-cocoa-700 hover:bg-gold-100'
            }`}
          >
            Curated Sets & Protocols
          </button>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-ivory-100/60 rounded-3xl border border-ivory-200 p-8 space-y-4">
            <MessageSquare className="w-10 h-10 text-gold-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-cocoa-900">
              No reviews in this category yet
            </h3>
            <p className="text-sm text-cocoa-600 max-w-md mx-auto">
              Be the first to leave feedback on this specific product.
            </p>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-6 py-2.5 bg-cocoa-900 text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-gold-600 transition-colors"
            >
              Submit Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((rev) => (
              <div
                key={rev.uuid}
                className="bg-white rounded-3xl p-7 border border-ivory-200 hover:border-gold-300 transition-all duration-300 hover:shadow-xl flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Rating Stars & Verified Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-ivory-300'
                          }`}
                        />
                      ))}
                    </div>

                    {rev.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Verified Nile Buyer</span>
                      </span>
                    )}
                  </div>

                  {/* Review Title */}
                  {rev.title && (
                    <h4 className="font-serif text-base font-bold text-cocoa-950 group-hover:text-gold-700 transition-colors">
                      "{rev.title}"
                    </h4>
                  )}

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-cocoa-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author, Product & Helpful Vote */}
                <div className="pt-4 border-t border-ivory-100 flex items-end justify-between text-xs">
                  <div>
                    <p className="font-semibold text-cocoa-900">{rev.customerName}</p>
                    {rev.productName && (
                      <p className="text-[11px] text-gold-700 truncate max-w-[170px] font-medium">
                        {rev.productName}
                      </p>
                    )}
                    <span className="text-[10px] text-cocoa-400">
                      {new Date(rev.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Helpful Button */}
                  <button
                    onClick={() => handleVoteHelpful(rev.uuid)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ivory-100 hover:bg-gold-100 text-cocoa-700 text-[11px] font-medium transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3 text-gold-600" />
                    <span>Helpful ({helpfulCounts[rev.uuid] || 0})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review Submission Modal */}
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-cocoa-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-ivory-200 animate-slide-up">
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-cocoa-400 hover:text-cocoa-900 rounded-full hover:bg-ivory-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 mb-6">
                <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">
                  Share Your Experience
                </span>
                <h3 className="font-serif text-2xl font-bold text-cocoa-950">
                  Write a Customer Review
                </h3>
                <p className="text-xs text-cocoa-600 leading-relaxed">
                  Your review is submitted directly to the Nile Storefront API review engine for BB Glow Skincare.
                </p>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-cocoa-950">
                    Review Submitted to Nile
                  </h4>
                  <p className="text-xs text-cocoa-600">
                    Thank you for sharing your experience with the BB Glow community.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Select Product */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-700 mb-1">
                      Select Flawless Product *
                    </label>
                    <select
                      value={selectedProductUuid}
                      onChange={(e) => setSelectedProductUuid(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500 bg-white"
                    >
                      {products.map((p) => (
                        <option key={p.uuid} value={p.uuid}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-700 mb-1">
                      Star Rating *
                    </label>
                    <div className="flex gap-2 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-ivory-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customer Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-700 mb-1">
                        Full Name & City *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Folake A. (Lagos)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. folake@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  {/* Headline */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-700 mb-1">
                      Review Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. The absolute best body milk for my skin"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {/* Written Comment */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-700 mb-1">
                      Your Honest Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell other skincare lovers about your results, texture experience, and changes in skin radiance..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-cocoa-900 text-ivory-100 hover:bg-gold-600 font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Sending to Nile API...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Review to Nile</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
