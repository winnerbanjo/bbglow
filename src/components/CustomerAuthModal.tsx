import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Mail, KeyRound, ShieldCheck, User, Package, LogOut, CheckCircle2, ArrowRight } from 'lucide-react';

export const CustomerAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    customer,
    customerOrders,
    sendOtp,
    verifyOtp,
    logout,
    currency
  } = useStore();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'enter_email' | 'enter_otp'>('enter_email');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const formatPrice = (val: number) => {
    if (currency === 'NGN') return `₦${val.toLocaleString()}`;
    if (currency === 'USD') return `$${val.toLocaleString()}`;
    if (currency === 'GBP') return `£${val.toLocaleString()}`;
    if (currency === 'EUR') return `€${val.toLocaleString()}`;
    if (currency === 'CAD') return `CA$${val.toLocaleString()}`;
    return `${currency} ${val.toLocaleString()}`;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setErrorMsg(null);
    setIsLoading(true);
    try {
      const res = await sendOtp(email);
      if (res.success) {
        setSuccessMsg(res.message || 'OTP verification code sent to your email.');
        setStep('enter_otp');
      } else {
        setErrorMsg('Failed to send verification code. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp || isLoading) return;

    setErrorMsg(null);
    setIsLoading(true);
    try {
      const success = await verifyOtp(email, otp);
      if (success) {
        setSuccessMsg('Successfully signed in via Nile Customer Auth!');
        setStep('enter_email');
      } else {
        setErrorMsg('Invalid or expired OTP code. Please retry.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'OTP verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-cocoa-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-10 shadow-2xl border border-ivory-200 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-cocoa-400 hover:text-cocoa-900 rounded-full hover:bg-ivory-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {customer ? (
          /* LOGGED IN VIEW: PROFILE & ORDER HISTORY */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-ivory-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-bold font-serif text-lg">
                  {customer.firstName ? customer.firstName[0] : 'C'}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-cocoa-950">
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <p className="text-xs text-cocoa-500 font-mono">{customer.email}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-xs text-cocoa-500 hover:text-rose-600 transition-colors font-medium p-2 rounded-lg hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Past Orders List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-900 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-gold-600" />
                  <span>Your Nile Order History ({customerOrders.length})</span>
                </h4>
              </div>

              {customerOrders.length === 0 ? (
                <div className="text-center py-8 bg-ivory-50 rounded-2xl border border-ivory-200 space-y-2 p-6">
                  <Package className="w-8 h-8 text-cocoa-400 mx-auto" />
                  <p className="text-xs text-cocoa-600">No past orders found on this account yet.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="p-4 rounded-xl border border-ivory-200 bg-ivory-50/70 hover:bg-white transition-colors space-y-2 text-xs"
                    >
                      <div className="flex justify-between items-center font-semibold">
                        <span className="font-mono text-cocoa-900">{ord.orderNumber}</span>
                        <span
                          className={`uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            ord.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-cocoa-600 text-[11px]">
                        <span>{ord.items.length} items purchased</span>
                        <span className="font-serif font-bold text-cocoa-950 text-sm">
                          {formatPrice(ord.total)}
                        </span>
                      </div>
                      <div className="text-[10px] text-cocoa-400">
                        {new Date(ord.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* NOT LOGGED IN: EMAIL OTP LOGIN */
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center mx-auto">
                <User className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-gold-600 font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nile Customer Authentication</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-950">
                Sign in to BB Glow
              </h3>
              <p className="text-xs text-cocoa-600 max-w-sm mx-auto">
                Enter your email address to receive a secure, passwordless one-time verification code (OTP).
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                {errorMsg}
              </div>
            )}

            {step === 'enter_email' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-cocoa-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-ivory-300 text-xs text-cocoa-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl bg-cocoa-900 text-ivory-100 hover:bg-gold-600 font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                >
                  {isLoading ? <span>Requesting Nile OTP...</span> : <span>Send One-Time Code</span>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {successMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-700 mb-1">
                    Enter Verification Code
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-cocoa-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit code (e.g. 123456)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-ivory-300 text-xs text-cocoa-900 font-mono tracking-widest text-center focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('enter_email')}
                    className="w-1/3 py-3 px-4 rounded-xl border border-ivory-300 text-xs text-cocoa-700 font-semibold hover:bg-ivory-100"
                  >
                    Change Email
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-2/3 py-3.5 px-6 rounded-xl bg-cocoa-900 text-ivory-100 hover:bg-gold-600 font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                  >
                    {isLoading ? <span>Verifying...</span> : <span>Verify & Sign In</span>}
                  </button>
                </div>
              </form>
            )}

            <p className="text-[11px] text-center text-cocoa-400">
              Guest shopping is always enabled. Account sign-in is optional.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
