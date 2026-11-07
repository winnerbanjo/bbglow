import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How quickly will I notice visible results with the Flawless collection?',
      answer: 'Most clients observe improved skin hydration, clarity, and texture within 7 to 10 days of daily use. More stubborn hyperpigmentation, uneven sun tan, and post-blemish discoloration progressively soften and blend uniformly over 3 to 6 weeks of consistent protocol.'
    },
    {
      question: 'How is this website powered by Nile Commerce Backend?',
      answer: 'This entire campaign storefront operates headlessly with Nile. Product details, real-time stock availability, authoritative discounted pricing, the shopping cart drawer, checkout order creation, customer OTP authentication, and reviews are all directly synchronized through the Nile Storefront API v1.'
    },
    {
      question: 'Does the Flawless Body Milk contain harsh bleaching chemicals or hydroquinone?',
      answer: 'Strictly no. BB Glow Skincare formulates exclusively with clean, dermatologically respected bio-actives such as alpha arbutin, niacinamide, glutathione, and pure cold-pressed botanical lipids. We never use hydroquinone, steroids, or mercury.'
    },
    {
      question: 'What payment methods can I use during Nile Checkout?',
      answer: 'Nile connects to licensed Tier-1 payment gateways including Paystack, Flutterwave, and Stripe. You can pay securely with Nigerian debit/credit cards, bank transfers, USSD, or international Visa and Mastercard.'
    },
    {
      question: 'Can I purchase items as a guest without creating an account?',
      answer: 'Yes! Guest shopping is completely supported. Account login via email OTP is optional and allows you to view your Nile order history and track deliveries.'
    },
    {
      question: 'What should I do if I need personalized skincare advice?',
      answer: 'Our certified skincare advisors are available 7 days a week on WhatsApp (+234 704 2061 009). Click the floating WhatsApp button anywhere on this page for immediate assistance.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-ivory-50 border-b border-ivory-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa-950">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
          <p className="text-cocoa-600 text-sm sm:text-base leading-relaxed pt-2">
            Everything you need to know about our formulations, delivery, and Nile commerce integration.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-ivory-200 overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-cocoa-950 hover:text-gold-700 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-600 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-cocoa-700 leading-relaxed border-t border-ivory-100 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
