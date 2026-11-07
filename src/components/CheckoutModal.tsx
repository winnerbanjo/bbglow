import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { NileCheckoutPayload, OrderStatus } from '../types/nile';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    createCheckoutAndPay,
    currency,
    activeOrder,
    setActiveOrder
  } = useStore();

  const [step, setStep] = useState<'details' | 'processing' | 'gateway_redirect' | 'status'>('details');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('Lagos');
  const [state, setState] = useState('Lagos State');
  const [country, setCountry] = useState('Nigeria');
  const [note, setNote] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [gatewayUrl, setGatewayUrl] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const items = cart?.items || [];

  const formatPrice = (val: number) => {
    if (currency === 'NGN') return `₦${val.toLocaleString()}`;
    if (currency === 'USD') return `$${val.toLocaleString()}`;
    if (currency === 'GBP') return `£${val.toLocaleString()}`;
    if (currency === 'EUR') return `€${val.toLocaleString()}`;
    if (currency === 'CAD') return `CA$${val.toLocaleString()}`;
    return `${currency} ${val.toLocaleString()}`;
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !phone || !line1 || items.length === 0) return;

    setErrorMsg(null);
    setStep('processing');

    try {
      const payload: NileCheckoutPayload = {
        customer: {
          email,
          firstName,
          lastName,
          phone
        },
        shippingAddress: {
          line1,
          city,
          state,
          country
        },
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity
        })),
        note: note || undefined
      };

      // Calls POST /storefront/v1/checkout and POST /storefront/v1/checkout/:orderId/payment
      const authUrl = await createCheckoutAndPay(payload);

      if (authUrl) {
        setGatewayUrl(authUrl);
        setStep('gateway_redirect');
      } else {
        setStep('status');
      }
    } catch (err: any) {
      console.error('Checkout failed:', err);
      setErrorMsg(err.message || 'Failed to initialize order. Please check your details and try again.');
      setStep('details');
    }
  };

  const handleSimulatePaymentStatus = (simulatedStatus: OrderStatus) => {
    if (activeOrder) {
      setActiveOrder({
        ...activeOrder,
        status: simulatedStatus,
        paidAt: simulatedStatus === 'paid' ? new Date().toISOString() : undefined
      });
    }
    setStep('status');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-cocoa-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-ivory-200 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setStep('details');
          }}
          className="absolute top-5 right-5 p-2 text-cocoa-400 hover:text-cocoa-900 rounded-full hover:bg-ivory-100 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: CUSTOMER & DELIVERY DETAILS */}
        {step === 'details' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-600 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Encrypted Secure Checkout</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-950">
                Secure Delivery & Payment
              </h3>
              <p className="text-xs text-cocoa-600">
                Your order is securely encrypted and validated in real time.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Order Brief Summary */}
            <div className="bg-ivory-50 p-4 rounded-2xl border border-ivory-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-medium text-cocoa-800">
                  {cart?.itemCount} {cart?.itemCount === 1 ? 'item' : 'items'} in Bag
                </span>
                <span className="text-cocoa-400"> • </span>
                <span className="text-cocoa-600">Complimentary nationwide shipping</span>
              </div>
              <span className="font-serif text-base font-bold text-cocoa-950">
                {formatPrice(cart?.total || 0)}
              </span>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-900 border-b border-ivory-200 pb-1">
                  1. Contact Information
                </h4>
                <div>
                  <label className="block text-[11px] font-medium text-cocoa-700 uppercase tracking-wider mb-1">
                    Email Address (for Order Confirmation) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-cocoa-700 uppercase tracking-wider mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Amina"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-cocoa-700 uppercase tracking-wider mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Ibrahim"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-cocoa-700 uppercase tracking-wider mb-1">
                    Phone Number (for Courier Dispatch) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-900 border-b border-ivory-200 pb-1">
                  2. Shipping Address
                </h4>
                <div>
                  <label className="block text-[11px] font-medium text-cocoa-700 uppercase tracking-wider mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    placeholder="e.g. 14 Adeola Odeku Street, Victoria Island"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-cocoa-700 uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-cocoa-700 uppercase tracking-wider mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-cocoa-700 uppercase tracking-wider mb-1">
                      Country *
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500 bg-white"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-cocoa-900 text-ivory-100 hover:bg-gold-600 font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg group"
                >
                  <Lock className="w-4 h-4 text-gold-400" />
                  <span>Proceed to Secure Payment</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: PROCESSING ORDER */}
        {step === 'processing' && (
          <div className="py-16 text-center space-y-6">
            <Loader2 className="w-12 h-12 text-gold-600 animate-spin mx-auto" />
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-cocoa-950">
                Preparing Your Secure Order...
              </h3>
              <p className="text-xs text-cocoa-600 max-w-sm mx-auto">
                Connecting securely to encrypted payment authorization.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: GATEWAY REDIRECT PROMPT */}
        {step === 'gateway_redirect' && (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-gold-100 text-gold-700 mx-auto flex items-center justify-center">
              <CreditCard className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                Order Reference: {activeOrder?.orderNumber}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-950">
                Complete Your Payment
              </h3>
              <p className="text-xs text-cocoa-600 max-w-md mx-auto leading-relaxed">
                Your order total is{' '}
                <strong className="text-cocoa-900">{formatPrice(activeOrder?.total || 0)}</strong>.
                Click below to complete authorization through the secure payment gateway.
              </p>
            </div>

            {/* Gateway Redirection Link */}
            <div className="space-y-3 max-w-md mx-auto">
              {gatewayUrl && (
                <a
                  href={gatewayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-cocoa-900 text-ivory-100 hover:bg-gold-600 font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Open Payment Gateway Window</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {/* Development / Testing Verification Buttons (Simulating Gateways Callbacks) */}
              <div className="pt-4 border-t border-ivory-200 space-y-2">
                <p className="text-[11px] text-cocoa-500 uppercase tracking-wider font-semibold">
                  Test Gateway Callback Simulation:
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleSimulatePaymentStatus('paid')}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Simulate Payment Success
                  </button>
                  <button
                    onClick={() => handleSimulatePaymentStatus('failed')}
                    className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors"
                  >
                    Simulate Payment Failed
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: ORDER & PAYMENT STATUS CONFIRMATION */}
        {step === 'status' && (
          <div className="py-8 text-center space-y-6">
            {activeOrder?.status === 'paid' ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Payment Verified Successfully
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-cocoa-950">
                    Thank You for Your Order!
                  </h3>
                  <p className="text-sm font-semibold text-gold-700 font-mono">
                    Order Reference: {activeOrder.orderNumber}
                  </p>
                  <p className="text-xs text-cocoa-600 max-w-md mx-auto leading-relaxed pt-2">
                    A confirmation email has been dispatched to <strong>{activeOrder.customer.email}</strong>.
                    Our Victoria Island fulfillment team is preparing your Flawless package for dispatch.
                  </p>
                </div>

                <div className="bg-ivory-50 p-5 rounded-2xl border border-ivory-200 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between font-semibold text-cocoa-900 border-b border-ivory-200 pb-2">
                    <span>Amount Paid</span>
                    <span>{formatPrice(activeOrder.total)}</span>
                  </div>
                  <div className="text-cocoa-600">
                    <p><strong>Deliver To:</strong> {activeOrder.customer.firstName} {activeOrder.customer.lastName}</p>
                    <p>{activeOrder.shippingAddress?.line1}, {activeOrder.shippingAddress?.city}</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setStep('details');
                    }}
                    className="px-8 py-3.5 bg-cocoa-900 text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-gold-600 transition-colors"
                  >
                    Continue Exploring
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    Payment Status: {activeOrder?.status.toUpperCase() || 'FAILED'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-cocoa-950">
                    Payment Could Not Be Completed
                  </h3>
                  <p className="text-xs text-cocoa-600 max-w-md mx-auto leading-relaxed">
                    We did not receive a confirmed authorization from the gateway. Your order is safely held in pending status.
                  </p>
                </div>

                <div className="flex justify-center gap-3 pt-4">
                  <button
                    onClick={() => setStep('gateway_redirect')}
                    className="px-6 py-3 bg-cocoa-900 text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-gold-600 transition-colors"
                  >
                    Retry Payment
                  </button>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-6 py-3 border border-cocoa-300 rounded-full text-xs uppercase tracking-wider font-semibold text-cocoa-800"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
