import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingWhatsApp: React.FC = () => {
  const { selectedProduct, store } = useStore();

  const phone = (store?.whatsappPhone || '+234 704 2061 009').replace(/[^0-9]/g, '');
  
  const text = selectedProduct
    ? `Hello BB Glow Skincare, I have a question regarding ${selectedProduct.name} (Ref: ${selectedProduct.uuid}). Could you provide more details?`
    : `Hello BB Glow Skincare, I would like to enquire about the Flawless Collection and skincare consultations.`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <aside aria-label="Customer Support" className="fixed bottom-6 right-6 z-40 flex items-center group">
      <div className="mr-3 px-3 py-1.5 rounded-full bg-cocoa-900 text-ivory-100 text-xs font-medium shadow-lg border border-gold-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block whitespace-nowrap">
        <span>Chat with Skincare Specialist</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat with BB Glow on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold-400 rounded-full border-2 border-white animate-ping" />
      </a>
    </aside>
  );
};
