// BB Glow Storefront Context
// Authoritative State Management powered by Nile Storefront API

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  NileStore,
  NileStatus,
  NileProduct,
  NileCategory,
  NileCart,
  NileOrder,
  NileCustomerProfile,
  NileReview,
  NileReviewPayload,
  NileCheckoutPayload,
  NileApiError
} from '../types/nile';
import { nile, NileClientConfig } from '../services/nile';

interface StoreContextType {
  // Store & Status
  store: NileStore | null;
  status: NileStatus | null;
  storeError: NileApiError | null;
  isLoadingStore: boolean;
  refetchStore: () => Promise<void>;

  // Catalog
  products: NileProduct[];
  categories: NileCategory[];
  activeCategory: string | null;
  setActiveCategory: (catId: string | null) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  isLoadingProducts: boolean;

  // Selected Product for Details Modal
  selectedProduct: NileProduct | null;
  setSelectedProduct: (product: NileProduct | null) => void;

  // Cart
  cart: NileCart | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCartLoading: boolean;
  addToCart: (productId: string, variantId?: string, quantity?: number) => Promise<boolean>;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;

  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeOrder: NileOrder | null;
  setActiveOrder: (order: NileOrder | null) => void;
  paymentUrl: string | null;
  createCheckoutAndPay: (payload: NileCheckoutPayload) => Promise<string | null>;

  // Customer Auth
  customer: NileCustomerProfile | null;
  customerOrders: NileOrder[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  sendOtp: (email: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  logout: () => void;

  // Reviews
  reviewsByProduct: Record<string, NileReview[]>;
  loadProductReviews: (productUuid: string) => Promise<void>;
  submitProductReview: (payload: NileReviewPayload) => Promise<boolean>;

  // Developer Diagnostics & API Config
  apiConfig: NileClientConfig;
  updateApiConfig: (config: Partial<NileClientConfig>) => void;
  lastRequestId: string | null;
  isDevDrawerOpen: boolean;
  setIsDevDrawerOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<NileStore | null>(null);
  const [status, setStatus] = useState<NileStatus | null>(null);
  const [storeError, setStoreError] = useState<NileApiError | null>(null);
  const [isLoadingStore, setIsLoadingStore] = useState<boolean>(true);

  const [products, setProducts] = useState<NileProduct[]>([]);
  const [categories, setCategories] = useState<NileCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>('NGN');
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);

  const [selectedProduct, setSelectedProduct] = useState<NileProduct | null>(null);

  const [cart, setCart] = useState<NileCart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCartLoading, setIsCartLoading] = useState<boolean>(false);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<NileOrder | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const [customer, setCustomer] = useState<NileCustomerProfile | null>(null);
  const [customerOrders, setCustomerOrders] = useState<NileOrder[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [reviewsByProduct, setReviewsByProduct] = useState<Record<string, NileReview[]>>({});

  const [apiConfig, setApiConfigState] = useState<NileClientConfig>(nile.getConfig());
  const [lastRequestId, setLastRequestId] = useState<string | null>(null);
  const [isDevDrawerOpen, setIsDevDrawerOpen] = useState<boolean>(false);

  const updateApiConfig = (newConfig: Partial<NileClientConfig>) => {
    nile.updateConfig(newConfig);
    setApiConfigState(nile.getConfig());
  };

  // 1. Initial Store Resolution & Verification
  const initStore = async () => {
    setIsLoadingStore(true);
    setStoreError(null);
    try {
      const [storeData, statusData] = await Promise.all([
        nile.getStore(),
        nile.getStatus()
      ]);
      setStore(storeData);
      setStatus(statusData);
      setLastRequestId(nile.getLastRequestId());
    } catch (err: any) {
      console.error('[Store Init Failure]:', err);
      setStoreError({
        type: err.type || 'store_error',
        code: err.code || 'init_failed',
        message: err.message || 'Failed to initialize store from Nile backend.',
        requestId: err.requestId || nile.getLastRequestId() || undefined,
        status: err.status
      });
    } finally {
      setIsLoadingStore(false);
    }
  };

  // 2. Fetch Catalog & Categories
  const fetchProductsAndCategories = async () => {
    setIsLoadingProducts(true);
    try {
      const [prods, cats] = await Promise.all([
        nile.getProducts({ currency, category: activeCategory || undefined }),
        nile.getCategories()
      ]);
      setProducts(prods);
      setCategories(cats);
      setLastRequestId(nile.getLastRequestId());
    } catch (err) {
      console.error('[Catalog Fetch Error]:', err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // 3. Fetch Cart State
  const fetchCart = async () => {
    setIsCartLoading(true);
    try {
      const cartData = await nile.getCart();
      setCart(cartData);
      setLastRequestId(nile.getLastRequestId());
    } catch (err) {
      console.error('[Cart Fetch Error]:', err);
    } finally {
      setIsCartLoading(false);
    }
  };

  // 4. Check Saved Customer Session
  const checkCustomerSession = async () => {
    if (nile.getAuthToken()) {
      try {
        const [profile, orders] = await Promise.all([
          nile.getCustomerProfile(),
          nile.getCustomerOrders()
        ]);
        setCustomer(profile);
        setCustomerOrders(orders);
      } catch (err) {
        console.warn('Customer session expired or invalid:', err);
        nile.logout();
        setCustomer(null);
      }
    }
  };

  useEffect(() => {
    initStore();
    fetchCart();
    checkCustomerSession();
  }, []);

  useEffect(() => {
    fetchProductsAndCategories();
  }, [currency, activeCategory]);

  // Cart Handlers
  const addToCart = async (productId: string, variantId?: string, quantity: number = 1): Promise<boolean> => {
    setIsCartLoading(true);
    try {
      const updatedCart = await nile.addToCart({ productId, variantId, quantity });
      setCart(updatedCart);
      setLastRequestId(nile.getLastRequestId());
      setIsCartOpen(true);
      return true;
    } catch (err) {
      console.error('[Add to Cart Error]:', err);
      return false;
    } finally {
      setIsCartLoading(false);
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number, variantId?: string) => {
    setIsCartLoading(true);
    try {
      const updatedCart = await nile.updateCartItem({ productId, variantId, quantity });
      setCart(updatedCart);
      setLastRequestId(nile.getLastRequestId());
    } catch (err) {
      console.error('[Update Cart Error]:', err);
    } finally {
      setIsCartLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setIsCartLoading(true);
    try {
      const updatedCart = await nile.removeCartItem(productId);
      setCart(updatedCart);
      setLastRequestId(nile.getLastRequestId());
    } catch (err) {
      console.error('[Remove Cart Item Error]:', err);
    } finally {
      setIsCartLoading(false);
    }
  };

  const clearCart = async () => {
    setIsCartLoading(true);
    try {
      const updatedCart = await nile.clearCart();
      setCart(updatedCart);
      setLastRequestId(nile.getLastRequestId());
    } catch (err) {
      console.error('[Clear Cart Error]:', err);
    } finally {
      setIsCartLoading(false);
    }
  };

  // Checkout & Payment
  const createCheckoutAndPay = async (payload: NileCheckoutPayload): Promise<string | null> => {
    try {
      // 1. Create order on Nile
      const order = await nile.createCheckout(payload);
      setActiveOrder(order);
      setLastRequestId(nile.getLastRequestId());

      // 2. Initiate Payment on Nile
      const paymentResponse = await nile.initiatePayment(order.orderId);
      setPaymentUrl(paymentResponse.authorizationUrl);
      setLastRequestId(nile.getLastRequestId());

      // Refresh cart (should be emptied)
      await fetchCart();

      return paymentResponse.authorizationUrl;
    } catch (err: any) {
      console.error('[Checkout / Payment Error]:', err);
      throw err;
    }
  };

  // Customer Auth
  const sendOtp = async (email: string) => {
    return nile.sendOtp({ email });
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    try {
      const res = await nile.verifyOtp({ email, otp });
      setCustomer(res.customer);
      const orders = await nile.getCustomerOrders();
      setCustomerOrders(orders);
      return true;
    } catch (err) {
      console.error('[OTP Verify Error]:', err);
      return false;
    }
  };

  const logout = () => {
    nile.logout();
    setCustomer(null);
    setCustomerOrders([]);
  };

  // Reviews
  const loadProductReviews = async (productUuid: string) => {
    try {
      const revs = await nile.getProductReviews(productUuid);
      setReviewsByProduct((prev) => ({ ...prev, [productUuid]: revs }));
      setLastRequestId(nile.getLastRequestId());
    } catch (err) {
      console.error(`[Load Reviews Error for ${productUuid}]:`, err);
    }
  };

  const submitProductReview = async (payload: NileReviewPayload): Promise<boolean> => {
    try {
      const res = await nile.submitReview(payload);
      if (res.success) {
        await loadProductReviews(payload.productUuid);
        return true;
      }
      return false;
    } catch (err) {
      console.error('[Submit Review Error]:', err);
      return false;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        store,
        status,
        storeError,
        isLoadingStore,
        refetchStore: initStore,
        products,
        categories,
        activeCategory,
        setActiveCategory,
        currency,
        setCurrency,
        isLoadingProducts,
        selectedProduct,
        setSelectedProduct,
        cart,
        isCartOpen,
        setIsCartOpen,
        isCartLoading,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeOrder,
        setActiveOrder,
        paymentUrl,
        createCheckoutAndPay,
        customer,
        customerOrders,
        isAuthModalOpen,
        setIsAuthModalOpen,
        sendOtp,
        verifyOtp,
        logout,
        reviewsByProduct,
        loadProductReviews,
        submitProductReview,
        apiConfig,
        updateApiConfig,
        lastRequestId,
        isDevDrawerOpen,
        setIsDevDrawerOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
