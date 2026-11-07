import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { StoreStatusBanner } from './components/StoreStatusBanner';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ReviewMarquee } from './components/ReviewMarquee';
import { BrandIntro } from './components/BrandIntro';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ProductCollection } from './components/ProductCollection';
import { RoutineSection } from './components/RoutineSection';
import { FeaturedCompleteSet } from './components/FeaturedCompleteSet';
import { IngredientsSection } from './components/IngredientsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { DeliverySection } from './components/DeliverySection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { DeveloperDrawer } from './components/DeveloperDrawer';

export const AppContent: React.FC = () => {
  return (
    <StoreStatusBanner>
      <div className="min-h-screen flex flex-col justify-between selection:bg-gold-200 selection:text-cocoa-950 overflow-x-hidden">
        <div>
          <AnnouncementBar />
          <Navbar />
          <main>
            <Hero />
            <ReviewMarquee />
            <BrandIntro />
            <BeforeAfterSection />
            <ProductCollection />
            <RoutineSection />
            <FeaturedCompleteSet />
            <IngredientsSection />
            <ReviewsSection />
            <DeliverySection />
            <FAQSection />
            <FinalCTA />
          </main>
        </div>
        <Footer />

        {/* Global Commerce Modals & Drawers */}
        <ProductModal />
        <CartDrawer />
        <CheckoutModal />
        <CustomerAuthModal />
        <FloatingWhatsApp />
        <DeveloperDrawer />
      </div>
    </StoreStatusBanner>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
