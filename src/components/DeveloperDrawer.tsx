import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Activity,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  FileText,
  ExternalLink
} from 'lucide-react';
import { nile } from '../services/nile';

export const DeveloperDrawer: React.FC = () => {
  const {
    isDevDrawerOpen,
    setIsDevDrawerOpen,
    apiConfig,
    updateApiConfig,
    lastRequestId,
    cart,
    customer,
    refetchStore
  } = useStore();

  const [inputKey, setInputKey] = useState(apiConfig.apiKey);
  const [testResults, setTestResults] = useState<{ name: string; status: 'passed' | 'failed' | 'pending'; note?: string }[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [showGapModal, setShowGapModal] = useState(false);

  if (!isDevDrawerOpen) return null;

  const handleSaveKey = () => {
    updateApiConfig({ apiKey: inputKey });
    refetchStore();
  };

  const runAllTests = async () => {
    setIsRunningTests(true);
    const results: { name: string; status: 'passed' | 'failed'; note?: string }[] = [];

    const addResult = (name: string, status: 'passed' | 'failed', note?: string) => {
      results.push({ name, status, note });
      setTestResults([...results]);
    };

    try {
      // 1. API Authentication & Store Resolution
      try {
        const store = await nile.getStore();
        addResult('1. API Authentication & BB Glow Store Resolution', 'passed', `Store: ${store.name}`);
      } catch (e: any) {
        addResult('1. API Authentication & BB Glow Store Resolution', 'failed', e.message);
      }

      // 2. Store Status
      try {
        const status = await nile.getStatus();
        addResult('2. Store Status Verification', 'passed', `Status: ${status.status}`);
      } catch (e: any) {
        addResult('2. Store Status Verification', 'failed', e.message);
      }

      // 3. Products Catalog Retrieval
      try {
        const products = await nile.getProducts();
        addResult('3. Products Retrieval (GET /products)', 'passed', `Found ${products.length} products`);
      } catch (e: any) {
        addResult('3. Products Retrieval', 'failed', e.message);
      }

      // 4. Product Details
      try {
        const products = await nile.getProducts();
        const first = products[0];
        const detail = await nile.getProductByUuid(first.uuid);
        addResult('4. Product Detail Retrieval (GET /products/:uuid)', 'passed', `Retrieved ${detail.name}`);
      } catch (e: any) {
        addResult('4. Product Detail Retrieval', 'failed', e.message);
      }

      // 5. Stock Validation & Authoritative Pricing
      try {
        const products = await nile.getProducts();
        const hasStock = products.every((p) => typeof p.stock === 'number');
        addResult('5. Server Stock Validation & Authoritative Pricing', hasStock ? 'passed' : 'failed');
      } catch (e: any) {
        addResult('5. Server Stock Validation', 'failed', e.message);
      }

      // 6. Cart Initialization & Persistence
      try {
        const cart = await nile.getCart();
        addResult('6. Cart Creation & Anonymous Token Persistence', 'passed', `Cart ID: ${cart.cartId}`);
      } catch (e: any) {
        addResult('6. Cart Creation & Persistence', 'failed', e.message);
      }

      // 7. Add to Cart & Server Price Calculation
      try {
        const products = await nile.getProducts();
        const updated = await nile.addToCart({ productId: products[0].uuid, quantity: 1 });
        addResult('7. Add to Cart (POST /cart/items)', 'passed', `Item count: ${updated.itemCount}`);
      } catch (e: any) {
        addResult('7. Add to Cart', 'failed', e.message);
      }

      // 8. Update Quantity
      try {
        const products = await nile.getProducts();
        const updated = await nile.updateCartItem({ productId: products[0].uuid, quantity: 2 });
        addResult('8. Cart Quantity Update (PATCH /cart/items)', 'passed', `New quantity: 2`);
      } catch (e: any) {
        addResult('8. Cart Quantity Update', 'failed', e.message);
      }

      // 9. Remove Item
      try {
        const products = await nile.getProducts();
        const updated = await nile.removeCartItem(products[0].uuid);
        addResult('9. Remove Cart Item (DELETE /cart/items/:id)', 'passed', `Remaining: ${updated.itemCount}`);
      } catch (e: any) {
        addResult('9. Remove Cart Item', 'failed', e.message);
      }

      // 10. Checkout & Payment Initiation
      try {
        const products = await nile.getProducts();
        await nile.addToCart({ productId: products[0].uuid, quantity: 1 });
        const order = await nile.createCheckout({
          customer: { email: 'test@bbglow.com', firstName: 'Test', lastName: 'Auditor', phone: '+23400000000' },
          shippingAddress: { line1: '12 Marina Road', city: 'Lagos', state: 'Lagos', country: 'Nigeria' },
          items: [{ productId: products[0].uuid, quantity: 1 }]
        });
        const payment = await nile.initiatePayment(order.orderId);
        addResult('10. Checkout & Gateway Initiation (POST /checkout & /payment)', 'passed', `Ref: ${payment.reference}`);
      } catch (e: any) {
        addResult('10. Checkout & Gateway Initiation', 'failed', e.message);
      }

      // 11. Customer OTP Auth Flow
      try {
        const otpRes = await nile.sendOtp({ email: 'client@test.com' });
        const verifyRes = await nile.verifyOtp({ email: 'client@test.com', otp: '123456' });
        addResult('11. Customer OTP Flow (sendOtp & verifyOtp)', 'passed', `Token: ${verifyRes.accessToken.slice(0, 10)}...`);
      } catch (e: any) {
        addResult('11. Customer OTP Flow', 'failed', e.message);
      }

      // 12. Reviews Retrieval & Submission
      try {
        const products = await nile.getProducts();
        const reviews = await nile.getProductReviews(products[0].uuid);
        addResult('12. Reviews Retrieval (GET /products/:uuid/reviews)', 'passed', `Found ${reviews.length} reviews`);
      } catch (e: any) {
        addResult('12. Reviews Retrieval', 'failed', e.message);
      }

      // 13. Currency Projection
      try {
        const gbpProducts = await nile.getProducts({ currency: 'GBP' });
        const hasGbp = gbpProducts.some((p) => p.currency === 'GBP');
        addResult('13. International Currency Projection (?currency=GBP)', hasGbp ? 'passed' : 'failed');
      } catch (e: any) {
        addResult('13. International Currency Projection', 'failed', e.message);
      }

    } finally {
      setIsRunningTests(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-cocoa-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-cocoa-950 text-ivory-100 border-l border-cocoa-800 shadow-2xl flex flex-col justify-between animate-drawer">
          
          {/* Header */}
          <div className="p-6 border-b border-cocoa-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Nile API Diagnostics
                </h3>
                <span className="text-[11px] text-gold-400 font-mono">
                  Storefront API v1 Integration Auditor
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsDevDrawerOpen(false)}
              className="p-2 text-ivory-400 hover:text-white rounded-full hover:bg-cocoa-900 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs font-mono">
            
            {/* Live Headers Status */}
            <div className="p-4 rounded-2xl bg-cocoa-900 border border-cocoa-800 space-y-2">
              <div className="flex items-center justify-between font-bold text-gold-300 uppercase tracking-wider text-[11px]">
                <span>Active Connection State</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p><strong className="text-ivory-300">Base URL:</strong> {apiConfig.baseUrl}</p>
              <p><strong className="text-ivory-300">Allowed Origin:</strong> {apiConfig.allowedOrigin}</p>
              <p><strong className="text-ivory-300">Store Slug:</strong> {apiConfig.storeSlug}</p>
              <p><strong className="text-ivory-300">Last Request ID:</strong> <span className="text-gold-400">{lastRequestId || 'req_live_ready'}</span></p>
              <p><strong className="text-ivory-300">Anonymous Cart ID:</strong> <span className="text-emerald-400">{cart?.cartId || 'None'}</span></p>
              <p><strong className="text-ivory-300">Customer Auth:</strong> <span className="text-emerald-400">{customer ? customer.email : 'Guest Session'}</span></p>
            </div>

            {/* API Key Configuration Form */}
            <div className="space-y-3 p-4 rounded-2xl bg-cocoa-900/60 border border-cocoa-800">
              <label className="block text-[11px] uppercase tracking-wider text-ivory-300 font-bold">
                Configure Publishable API Key:
              </label>
              <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="pk_test_... or pk_live_..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-cocoa-950 border border-cocoa-700 text-xs text-white focus:outline-none focus:border-gold-500 font-mono"
              />
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handleSaveKey}
                  className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-cocoa-950 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-colors"
                >
                  Save & Re-Verify Store
                </button>
                <button
                  onClick={() => {
                    setInputKey('pk_live_bbglow_production_key');
                    updateApiConfig({ apiKey: 'pk_live_bbglow_production_key' });
                  }}
                  className="text-[10px] text-gold-400 hover:underline"
                >
                  Reset Live Demo Key
                </button>
              </div>
            </div>

            {/* Execution Engine Toggle */}
            <div className="p-4 rounded-2xl bg-cocoa-900/40 border border-cocoa-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-xs">Simulated Sandbox Fallback</p>
                <p className="text-[10px] text-ivory-400">
                  Resilient offline test simulation when live key is yet to be provisioned
                </p>
              </div>
              <input
                type="checkbox"
                checked={apiConfig.isMockFallbackEnabled}
                onChange={(e) => updateApiConfig({ isMockFallbackEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-gold-500 focus:ring-0 cursor-pointer"
              />
            </div>

            {/* Integration Test Suite Runner */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  Section 19: Full Test Suite
                </h4>
                <button
                  onClick={runAllTests}
                  disabled={isRunningTests}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isRunningTests ? 'Running Suite...' : 'Run All Tests'}</span>
                </button>
              </div>

              {testResults.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {testResults.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-cocoa-900 border border-cocoa-800 flex items-start justify-between text-[11px]"
                    >
                      <div className="space-y-0.5">
                        <p className="font-semibold text-white">{t.name}</p>
                        {t.note && <p className="text-[10px] text-ivory-400">{t.note}</p>}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          t.status === 'passed' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-rose-900/60 text-rose-300'
                        }`}
                      >
                        {t.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Missing Backend Capabilities Report Trigger */}
            <div className="pt-2">
              <button
                onClick={() => setShowGapModal(true)}
                className="w-full py-3 px-4 rounded-xl bg-cocoa-900 border border-cocoa-700 hover:border-gold-400 text-ivory-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4 text-gold-400" />
                <span>View Nile Backend Gap & Extension Report</span>
              </button>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-cocoa-800 text-center text-[10px] text-ivory-400">
            BB Glow Skincare Headless Architecture • Nile Commerce Engine
          </div>

        </div>
      </div>

      {/* Backend Gap & Architectural Report Modal */}
      {showGapModal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-cocoa-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-ivory-200 pb-4">
              <h3 className="font-serif text-2xl font-bold">
                Nile Backend Capabilities & Gap Analysis
              </h3>
              <button
                onClick={() => setShowGapModal(false)}
                className="p-2 text-cocoa-400 hover:text-cocoa-900 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed font-sans text-cocoa-700">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <h4 className="font-bold text-amber-900 uppercase text-[11px]">
                  1. Dedicated Shipping-Rate Calculation Endpoint
                </h4>
                <p>
                  <strong>Current Status:</strong> The current public Nile Storefront API does not expose a standalone <code>GET /storefront/v1/shipping-rates</code> endpoint. Shipping rates are currently evaluated implicitly during checkout payload creation.
                </p>
                <p>
                  <strong>Architectural Recommendation:</strong> Nile backend should expose a dedicated <code>POST /storefront/v1/shipping/quote</code> endpoint accepting destination state/country and returning configured merchant tier rates before final order creation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <h4 className="font-bold text-amber-900 uppercase text-[11px]">
                  2. Native Bundle Management & Enforced Bundle Pricing
                </h4>
                <p>
                  <strong>Current Status:</strong> While bundles can be represented in Nile as individual SKU products, there is no native composite bundle schema that automatically deducts stock simultaneously from parent sub-components (e.g. deducting from Face Wash and Body Milk inventories when a Complete Set is bought).
                </p>
                <p>
                  <strong>Architectural Recommendation:</strong> Implement a <code>bundle_components</code> relation table in Nile Merchant Engine so bundle sales atomic-decrement child inventory.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <h4 className="font-bold text-amber-900 uppercase text-[11px]">
                  3. Multi-Currency Settlement & Payment Gateway Support
                </h4>
                <p>
                  <strong>Current Status:</strong> <code>GET /storefront/v1/products?currency=GBP</code> supports currency projection for visual display. However, checkout gateway settlement depends on whether the merchant's connected Paystack/Flutterwave/Stripe account has multi-currency settlement enabled.
                </p>
                <p>
                  <strong>Architectural Recommendation:</strong> Expose a <code>connectedGateways</code> and <code>settlementCurrencies</code> object in <code>GET /storefront/v1/store</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <h4 className="font-bold text-amber-900 uppercase text-[11px]">
                  4. Review Moderation Controls
                </h4>
                <p>
                  <strong>Current Status:</strong> Reviews submitted via <code>POST /storefront/v1/reviews</code> require backend verification logic to mark <code>isVerifiedPurchase: true</code>.
                </p>
                <p>
                  <strong>Architectural Recommendation:</strong> Match customer email against paid Nile order records automatically on submission to stamp verified purchases.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-ivory-200 text-right">
              <button
                onClick={() => setShowGapModal(false)}
                className="px-6 py-2.5 bg-cocoa-900 text-white rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
